const express = require('express')
const omdb = require('./movies.js')
const app = express()

app.get('/', function(req,res){
    res.send({
        greeting: 'Hola Mundo!'
    })
})

app.get('/omdb', function(req,res){
    if(!req.query.search){
        res.send({
            error: 'Envía el título de una película o serie'
        })
    }
    omdb.omdbMovie(req.query.search, function(error, response){
        if(error){
            return res.send({
                error: error
            })
        }   
        if(response.seasons){
            var title = response.title
            omdb.omdbSeason(response.title, response.seasons, function(error,response){
                if(error){
                    return res.send({
                        error: error
                    })
                }
                res.send({
                    title : title,
                    season: response.season,
                    episodes: response.episodes
                })
            })
        }
        else{
            res.send(response)
        }
    })
})

app.get('*', function(req,res){
    res.send({
        error: 'Ruta no valida'
    })
})

app.listen(3000, function(){
    console.log('Up and running!')
})