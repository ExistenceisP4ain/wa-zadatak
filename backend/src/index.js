import express from 'express';
import storage from './memory_storage.js'
import cors from 'cors'

const app = express()  // instanciranje aplikacije
const port = 3000  // port na kojem će web server slušati

app.use(cors())

app.get('/posts', (req, res) => {
    let posts = storage.posts
    let query = req.query
    
    if (query.title) {
        posts = posts.filter(e => e.title.indexOf(query.title) >= 0)
    }
    
    if (query.createdBy) {
        posts = posts.filter(e => e.createdBy.indexOf(query.createdBy) >= 0)
    }
    
    /*if (query._any) {
        let terms = query._any.split(" ")
        posts = posts.filter(doc => {
            let info = doc.title + " " + doc.createdBy
            return terms.every(term => info.indexOf(term) >= 0)
        })
    }*/
    if (query._any) {
        let pretraga = query._any
        let pojmovi = pretraga.split(" ")

        posts = posts.filter(posts =>{
            let podaci = posts.title + post.createdBy
            let rezultat = pojmovi.every(pojam => {
                return podaci.index0f(pojam) >= 0
            })
            return rezultat
            console.log(rezultat)
        })
    }

    res.json(posts)
    console.log(query._any)
})

app.listen(port, () => console.log(`Slušam na portu ${port}!`))
