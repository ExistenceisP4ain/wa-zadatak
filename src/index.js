import express from 'express';
import routes from './routes';
const app = express()
const port = 3000
const staticMiddleware = express.static('public') // direktorij sa
app.use('/', staticMiddleware)
app.get('/datum', (req, res) => {
    var moment = require('moment');
    var vrijeme = moment().format('DD/MM/YYYY HH:mm')
    res.json(vrijeme)
})
app.get('/prognoza', (req, res) => {
    var polje = ['sunčano', 'kišovito', 'oblačno']
    const random = polje[Math.floor(Math.random() * polje.length)];
    res.json(random)
})
app.listen(port, () => console.log(`Slušam na portu ${port}!`))