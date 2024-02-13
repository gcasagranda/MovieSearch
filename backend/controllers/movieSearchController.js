const axios = require('axios');

function filterResults(data) {
    return data.results.map(movie => ({
      id: movie.id,
      title: movie.titleText.text,
      releaseYear: movie.releaseYear ? movie.releaseYear.year : null,
      posterUrl: movie.primaryImage ? movie.primaryImage.url : null
    }));
}

module.exports = {
    async searchMovies(req, res) {
        console.log(req.session.idUser);
        const keyword = req.params.keyword;
        const options = {
            method: 'GET',
            url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${keyword}`,
            params: {
                exact: 'false',
                titleType: 'movie'
            },
            headers: {
                'X-RapidAPI-Key': '5ad4f88740mshec0e04a130c5317p190a6cjsn046471307c03',
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
            };
      
        try {
          const response = await axios.request(options);
          const filteredResults = filterResults(response.data);
          res.status(200).json(filteredResults);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Erro ao buscar filmes' });
        }
      }
};