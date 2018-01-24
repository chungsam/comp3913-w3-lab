const express = require('express');
const fs = require('fs');
const port = process.env.PORT || 3000;

const app = express();

// Configure ejs as the view engine
app.set('view engine', 'ejs');

// Server static files
app.use(express.static('public'));
app.use('/styles', express.static(__dirname + 'styles'));

// Default route
app.get('/', (req, res, next) => {
    res.render('index', { title: 'Week 3 Lab' });
});

// API routes
app.get('/api/countries', (req, res, next) => {
    fs.readFile('./data/ten_most_populated_countries.json', (err, data) => {
        if (err) throw err;
        let countriesJson = JSON.parse(data);
        res.set('Content-Type', 'application/json');
        res.send(countriesJson);
    })
});

app.get('/api/capitals', (req, res, next) => {
    fs.readFile('./data/canada_capitals.json', (err, data) => {
        if (err) throw err;
        let capitalsJson = JSON.parse(data);
        res.render('capitals', {
            title: 'Canada Capitals',
            capitals: capitalsJson
        });
    });
    
});


// Finally, listen on localhost
app.listen(port, () => {
    console.log(`Server started, listening on port ${port}`);
});