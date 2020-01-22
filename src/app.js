const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// setting up port for heroku
const port = process.env.PORT || 3000
const app = express()

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Davi Carvalho'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    imgPath: '/img/me.jpeg',
    name: 'Davi Carvalho'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Davi Carvalho',
    helpText: 'Some helpful information.'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'You must provide an address.'
      }
    )
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error) return res.send({error})
    forecast(latitude, longitude, (error, forecastData) => {
      if(error) return res.send({error})
      res.send({
        forecastData: forecastData,
        address: req.query.address
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Davi Carvalho',
    errorMessage: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Davi Carvalho',
    errorMessage: 'Page not found.'
  })
})

app.listen(port, () => {
  console.log(`server is up on port ${port}`)
})
