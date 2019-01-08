const express = require('express')
const app = express() 
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 3002

app.use(bodyParser.json())
app.use(cors())

let glasses = require('./data.json')

app.get('/', (req, res) => {
    res.json({ glasses })
})

app.get('/:id', (req, res, next) => {
    let id = req.params.id
    let glassesById = glasses.filter(glasses => {
        return glasses.id == id
    })
    if(!glassesById.length) {
        next()
    }
    res.send(glassesById)
})

app.put('/:id', (req, res, next) => {
    let id = req.params.id
    let body = req.body
    let newGlassesArray = glasses.map(object => {
        if(object.id == id) {
            object = {
                id: object.id, 
                ... body
            }
        }
        return object 
    })
    glasses = newGlassesArray
    res.send({ glasses })
})

app.delete('/:id', (req, res) => {
    let id = req.params.id 
    let filteredGlasses = glasses.filter(object => {
        return object.id != id 
    })
    glasses = filteredGlasses 
    res.send({ glasses })
})

app.use(notFound)
app.use(errorHandler)

function notFound(req, res, next) {
  res.status(404).send({error: 'Not found!', status: 404, url: req.originalUrl})
}

function errorHandler(err, req, res, next) {
  console.error('ERROR', err)
  const stack =  process.env.NODE_ENV !== 'production' ? err.stack : undefined
  res.status(500).send({error: err.message, stack, url: req.originalUrl})
}

app.listen(port)