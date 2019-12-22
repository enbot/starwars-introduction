const express = require('express')
const app = express()

app.use(express.static('dist'))

app.get('/', (req, res) => res.send('starwars-introduction'))

app.listen(3000, () => console.log('Running on port 3000'))