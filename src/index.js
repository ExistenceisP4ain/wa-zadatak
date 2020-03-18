import express from 'express'

const app = express()
const port = 3001
const staticMiddleware = express.static('public')

app.use('/', staticMiddleware)

app.get('/fibonacci/:n', (req,res) => {
    let n = parseInt(req.params['n']);

	console.log("Magija se desava .. ");
    let fibon = []
    fibon.push(0)
    fibon.push(1)
    let sum=0;
    for(let i=2;i<=n;i++){
        fibon.push(fibon[i-1] + fibon[i-2])
    }
    return res.json(fibon)
})

app.listen(port, () => console.log("Slušam na portu",port))