const Router = require('express');
const axios = require('axios');
require('dotenv').config();

const router = Router();

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;


router.get('/', async(req, res) => {
    let tv_shows_url = `${API_BASE_URL}/discover/tv?${API_KEY_NAME}=${API_KEY_VALUE}`;

    if (!!req.query['page']) {
        tv_shows_url = tv_shows_url + `&page=${req.query['page']}`;
    }
    
    await axios.get(tv_shows_url)
                .then(response => {
                    // console.log(response.data);
                    res.status(200).json(response.data);
                })
                .catch(error => {
                    console.log(error.response.data);
                    res.status(500).json(error.response.data);
                });

});


router.get('/:tv_show_id', async(req, res) => {
    await axios.get(`${API_BASE_URL}/tv/${req.params.tv_show_id}?${API_KEY_NAME}=${API_KEY_VALUE}`)
                .then(response => {
                    // console.log(response.data);
                    res.status(200).json(response.data);
                })
                .catch(error => {
                    console.log(`${API_BASE_URL}/tv/${req.params.tv_show_id}?${API_KEY_NAME}=${API_KEY_VALUE}`)
                    console.log(error.response.data);
                    res.status(500).json(error.response.data);
                });

});


router.get('/:tv_show_id/season/:season_number', async(req, res) => {
    await axios.get(`${API_BASE_URL}/tv/${req.params.tv_show_id}/season/${req.params.season_number}?${API_KEY_NAME}=${API_KEY_VALUE}`)
                .then(response => {
                    // console.log(response.data);
                    res.status(200).json(response.data);
                })
                .catch(error => {
                    console.log(error.response.data);
                    res.status(500).json(error.response.data);
                });

});

module.exports = router;
