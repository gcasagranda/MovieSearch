const mongoose = require('mongoose');

const watchlistSchema = mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title:{ type: String, required: true },
    year:{ type: String, required: true },
    imdbId:{ type: String, required: true },
    poster:{ type: String, required: true },
    createdAt:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('Watchlist', watchlistSchema);