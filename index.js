import express from 'express'

const app = express()
const port = 3001
//const staticMiddleware = express.static('public')

//app.use('/', staticMiddleware)

app.get('/', (req,res) => {
    let studenti = [
	{oib: "12312349172", ime: "Hrvoje", prezime: "Horvat"},
	{oib: "82723412342", ime: "Ivana", prezime: "Ivić"},
	{oib: "97283742342", ime: "Stjepan", prezime: "Stjepanović"},
]
let rezultat = studenti.map(student => student['ime'] + " " + student['prezime'] + ' (' + student['oib'] + ')');
console.log(rezultat)
res.json(rezultat)
// ["Hrvoje Horvat (12312349172)", "Ivana Ivić (82723412342)", "Stjepan Stjepanović (97283742342)"]
})

app.listen(port, () => console.log(`Slušam na portu ${port}!`))