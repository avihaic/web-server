const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode =  require('./utils/geocode');
const { query } = require('express');

//apply express server
const app = express(); 

//setup static directory of public folder 
const publicdir = path.join(__dirname, '../public');
app.use(express.static(publicdir));

//setup handlebars engine module and views location
const tempdir = path.join(__dirname, '../templates/views');
app.set('view engine', 'hbs');
app.set('views', tempdir);

//setup setup partials directory
const partialsdir = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsdir);

//index.hbs page
app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
    })
})

//about.hbs page
app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About page',
    })
})

//help.hbs page
app.get('/help',(req,res) => {
    res.render('help',{
        title: 'help page',
    })
})

//404 page
app.get('/404',(req,res) => {
    res.render('404',{
        title: '404 page', 
    })
});

app.get('/weather', (req,res) =>{
    if(!req.query.address){
        return res.send({error:'address must provied',})
    }

    const address = req.query.address;
    geocode(address,(error,data) => 
    {
       if(error)
          return res.send({error})

        forecast(data,(error,dataforecast) => {
            if(error)
            return res.send({error})

            res.send({
                forecast: dataforecast.weather_descriptions, 
                location: dataforecast.location,
                address: req.query.address
            })
        })    
    })
});  

app.get('/help/*', (req,res) =>{
    res.render('404',{
        title: '404 page', 
        error: 'help article not found', 
    })
});

app.get('*', (req,res) =>{
    res.render('404',{
        title: '404 page', 
        error: 'page not found', 
    })
});



app.listen(3000, () => {
    console.log('Server is up on port 3000');
})
