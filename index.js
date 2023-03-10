const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const apicache = require('apicache');
const path = require('path');

const moviesRouter = require('./server/routes/movie-routes');
const tvShowsRouter = require('./server/routes/tv-show-routes');

// environment variables
require('dotenv').config();

const APP_ENV = process.env.APP_ENV;
const API_IMAGE_URL = process.env.API_IMAGE_URL;

const port = process.env.PORT || 4000;
 
const app = express();


// set static folders
app.use(express.static('public'));


// cors
app.use(cors());


// rate limiting
const limiter = rateLimit({
    // api limit is 10 requests per min(60000ms)
    windowMs: 1 * 60 * 1000,
    max: 9,
    standardHeaders: true,
    requestPropertyName: 'RateLimit',
	handler: (request, response, next, options) => {
        // if limit reached wait until reset time then go to next()
        if (request.RateLimit.remaining) {
            next();
        } else {
            let delayInMilliseconds = Math.abs(Date.parse(request.RateLimit.resetTime) - Date.now()) + 500;
            setTimeout( () => next(), delayInMilliseconds );
        }

    },
});
app.use(limiter);
app.set('trust proxy', 1);




// caching successful responses
let cache = apicache.middleware;
const cacheIfSuccessResponse = cache('1 hour', (req, res) => res.statusCode === 200 );
app.use(cacheIfSuccessResponse);



// routes
app.get('/images/:file_path', (req, res) => {

    let file_path = req.params['file_path'];
    if (!file_path) {
        res.status(500).json({error: "Missing file path"});
    }

    
    let width = req.query.width;
    width = ( !width || isNaN(width) ) ? 'original' : `w${width}`;


    let image_url = `${API_IMAGE_URL}/${width}/${file_path}`;
    res.redirect(image_url);

});

app.post('/api/subscribe', function (req, res) {

    const random_boolean = Math.random() < 0.5;
    
    // Math.floor(Math.random() * (max - min + 1) + min);
    const random_delay_in_seconds = Math.floor(Math.random() * (10 - 1 + 1) + 1);

    setTimeout(() => {

        // TODO: implement subscription backend

        random_boolean 
            ? res.status(200).json({message: "User subscribed successfully."})
            : res.status(500).json({message: "Could not subscribe user."})

    }, random_delay_in_seconds * 1000);

})

app.use('/api/movies', moviesRouter);

app.use('/api/tv-shows', tvShowsRouter);

app.get('/*', function(req, res) {
    res.sendFile(path.resolve(__dirname) + '/public/index.html');
});



// listen
if (APP_ENV === 'local') {
    app.listen(port);
}


// export for deployment
module.exports = app;
