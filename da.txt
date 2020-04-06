import express from 'express';
import storage from './memory_storage.js'
import cors from 'cors'
import connect from './db.js'


const app = express()  // instanciranje aplikacije
const port = 3000  // port na kojem će web server slušati

app.use(cors())
app.use(express.json());

app.get('/posts', async (req, res) => {
    let db = await connect()
    console.log("/posts")
    let query = req.query;

    let selekcija = {}
    
    if(query.title){
        selekcija.title = new RegExp(query.title)
        console.log("uwu")
    }
    console.log("selekcija: ", selekcija)
  /* ============= WA - 402 ======================= */
    let cursor = await db.collection("posts").find({ postedAt: { $gt: "1570217971000" }}).sort({postedAt: -1})
  //===============================================  
    let results = await cursor.toArray()

    console.log(results)
    res.json(results)
})

app.get('/posts_memory', (req, res) => {
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
            let info = doc.title + " " + doc.createdBy
            return terms.every(term => info.indexOf(term) >= 0)
        })
    }

    res.json(posts)
})

app.listen(port, () => console.log(`Slušam na portu ${port}!`))
