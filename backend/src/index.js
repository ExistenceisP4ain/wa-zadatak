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
    
    if (query._any) {
        let terms = query._any.split(" ")
        posts = posts.filter(doc => {
            let ufo = doc.title + " " + doc.createdBy
            console.log(ufo);
            return terms.every(term => ufo.indexOf(term) >= 0)
        })
        
    }
	console.log(posts);
    res.json(posts)
})

app.listen(port, () => console.log(`Slušam na portu ${port}!`))
