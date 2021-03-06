const express = require('express');
const app = express();
const path = require('path');
const request = require('request')

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(express.static('public'));

  app.get('/', (req, res)=>{
    res.render('search')
  });

  app.get('/results', (req, res)=>{

    let query = req.query.search
    request(' https://api.themoviedb.org/3/search/movie?api_key=8de1bdec4b227bbad94796ad9e0ddccc&query='+query, (error, response, body)=>{
      if(error){
        console.log(error)
      }

      let data = JSON.parse(body);
      res.render('movies', {data:data, searchQuery:query});
    })

  })
  const port = process.env.PORT || 4000 
app.listen(port, ()=>{
  console.log('Server Listening To Port 4000')
});