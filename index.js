const express = require('express')
const app = express() 
const port = process.env.PORT || 3002

const glasses = require('./data.json')

app.get('/', (req, res) => {
    res.json({ glasses })
})

app.listen(port)