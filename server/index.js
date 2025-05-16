var express = require('express');
var app = express();
var fs = require('fs');
var axios = require('axios');

require('dotenv').config();

const PORT = 8081;

app.get('/images/patients/:name_image', (request, response) => {
    var name_image = request.params.name_image;

    fs.readFile('./server/uploaded/images/patients/'+name_image, (error, data) => {
        if(error) return response.status(404).end();
        return response.status(201).end(data);
    })
})

app.get('/api/getPatients', (req, res) => {
    const credentialsApiCoalition = Buffer.from(process.env.USER_COALITION_API + ":" +
    process.env.PASS_COALITION_API).toString('base64');

    const headers = { 'Authorization': 'Basic '+credentialsApiCoalition };

    axios.get('https://fedskillstest.coalitiontechnologies.workers.dev', { headers })
    .then((responseApi) => res.json({'status': true, 'content': responseApi.data}))
    .catch((err) => res.json({'status': false, 'content': {}}));
})

app.listen(PORT, () => {
    
})