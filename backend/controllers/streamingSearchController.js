const axios = require('axios');


function filterResults(data) {

    const title = data.result.title;
    const br = data.result.streamingInfo.br;
    const filtered = br.map (item => ({
        service: item.service,
        streamingType: item.streamingType.toLowerCase(),
        link: item.link

    })).filter(item => item.streamingType !== 'addon');

    return ({
        title,
        options: filtered
    });
}
  

module.exports = {
    async streamingSearch(req, res) {
        const imdbId = req.params.imdbId;
        const options = {
            method: 'GET',
            url: 'https://streaming-availability.p.rapidapi.com/get',
            params: {
              output_language: 'en',
              imdb_id: imdbId,
            },
            headers: {
              'X-RapidAPI-Key': '5ad4f88740mshec0e04a130c5317p190a6cjsn046471307c03',
              'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
            }
        };
          
        try {
            const response = await axios.request(options);
            const filteredResults = filterResults(response.data);
            res.status(200).json(filteredResults);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar filme' });
        }
    }
};