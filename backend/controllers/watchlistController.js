const Watchlist = require('../schemas/watchlistSchema');

module.exports = {
    async addWatchlist (req, res) {
        const { userId, title, year, imdbId, poster } = req.body;
        new Watchlist({
            userId,
            title,
            year,
            imdbId,
            poster
        }).save().then(() => {
            console.log('Filme adicionado à watchlist com sucesso');
            res.status(200).json({ message: 'Filme adicionado à watchlist com sucesso!' });
        }).catch((err) => {
            console.log('Erro ao adicionar filme à watchlist ' + err);
            res.status(400).json({ message: 'Erro ao adicionar filme à watchlist!' });
        });
    },
    async getWatchlist (req, res) {
        const { userId } = req.params;
        Watchlist.find({ userId }).sort({createdAt: 'asc'}).then((watchlist) => {
            console.log('Watchlist encontrada com sucesso');
            res.status(200).json({ watchlist });
        }).catch((err) => {
            console.log('Erro ao encontrar watchlist ' + err);
            res.status(400).json({ message: 'Erro ao encontrar watchlist!' });
        });
    }
}