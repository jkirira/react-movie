const Router = require('express');
const axios = require('axios');
require('dotenv').config();

const router = Router();

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;


router.get('/', async(req, res) => {
    await axios.get(`${API_BASE_URL}/discover/movie?${API_KEY_NAME}=${API_KEY_VALUE}`)
                .then(response => {
                    // console.log(response.data);
                    res.status(200).json(response.data);
                })
                .catch(error => {
                    console.log(error.response.data);
                    res.status(500).json(error.response.data);
                });

});


router.get('/:movie_id', async(req, res) => {
    await axios.get(`${API_BASE_URL}/movie/${req.params.movie_id}?${API_KEY_NAME}=${API_KEY_VALUE}`)
                .then(response => {
                    // console.log(response.data);
                    res.status(200).json(response.data);
                })
                .catch(error => {
                    console.log(`${API_BASE_URL}/movie/${req.params.movie_id}?${API_KEY_NAME}=${API_KEY_VALUE}`)
                    console.log(error.response.data);
                    res.status(500).json(error.response.data);
                });

});


module.exports = router;
