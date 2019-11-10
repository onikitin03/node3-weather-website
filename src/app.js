const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

// Define path
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const port = process.env.PORT || 3001;

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Andrew Mead'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Andrew Mead'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'This is the help section',
    name: 'Andrew Mead'
  })
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'You should provide address'
    })
  }

  geocode(address, (error, { location, latitude, longitude } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }

    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({
          error
        });
      }
      res.send({
        forecast,
        location,
        address
      });
    });
  });
});

app.get('/products', (req, res) => {
  console.log(req.query.search)
  res.send({
    products: []
  })
});

app.get('/help/*', (req, res) => {
  res.render('404_page', {
    title: '404',
    errorMessage: 'Help article not found',
    name: 'Andrew Mead'
  })
});

app.get('*', (req, res) => {
  res.render('404_page', {
    title: '404',
    errorMessage: 'page not found',
    name: 'Andrew Mead'
  });

});

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});