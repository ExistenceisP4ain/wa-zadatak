import express from 'express';
import storage from './memory_storage.js';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());

app.get('/posts', (req, res) => {
	let posts = storage.posts;
	let query = req.query;

	if(query.title && query.createdBy){
		posts = posts.filter(post => post.title == query.title && post.createdBy == query.createdBy);
		res.json(posts);
	}
	else if(query.title){
		posts = posts.filter(post => post.title == query.title);
		res.json(posts);
	}
	else res.json(posts)
});

app.listen(port, () => console.log(`Slušam na portu ${port}!`));