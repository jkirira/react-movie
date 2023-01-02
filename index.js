const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const apicache = require('apicache');

const moviesRouter = require('./server/routes/movie-routes');

// environment variables
require('dotenv').config();

const APP_ENV = process.env.APP_ENV;

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
app.use('/api/movies', moviesRouter);




// listen
if (APP_ENV === 'local') {
    app.listen(port);
}


// export for deployment
module.exports = app;
