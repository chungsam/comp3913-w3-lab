const express = require('express');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { title: 'hello world yo!' });
});

app.get('/api/countries', (req, res) => {
    fs.readFile('./data/ten_most_populated_countries.json', (err, data) => {
        if (err) throw err;
        res.set('Content-Type', 'application/json');
        res.send(JSON.parse(data));
        // res.end();
    })
});

app.listen(port, () => {
    console.log(`Server started, listening on port ${port}`);
});