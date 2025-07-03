const mongoose = require('mongoose');
const UrlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        // unique: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // expires: '1d' // Automatically delete after 1 day
    }
});

module.exports = mongoose.model('Url', UrlSchema);
