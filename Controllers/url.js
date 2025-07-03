
const shortid = require('shortid');
// const {nanoId} = require('nanoid');
const Url = require('../Model/Url');
const express = require('express');
const app = express();


app.use(express.json()); // Ensure JSON body parsing is enabled

async function ShortUrl(req, res) {
    const body= req.body;
    if (!body || !body.url) {
        return res.status(400).json({error: 'URL is required'});
    }

    const shortUrll = shortid.generate();
    console.log("Generated short URL:", shortUrll);
    await Url.create({
        url: body.url,
        shortUrl: shortUrll,
        clicks: 0
    });

    res.status(201).json({shortUrl: shortUrll, redirectUrl: body.url});
};
module.exports = {
    ShortUrl
};

