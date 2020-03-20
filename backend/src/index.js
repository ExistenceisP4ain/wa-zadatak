import express from 'express';
import storage from './memory_storage.js';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.get('/', (req,res) => res.send('/posts?title=pula&createdBy=nikola'));
app.get('/posts', (req, res) => {
	let posts = storage.posts;
	let query = req.query;

	if(query.title || query.createdBy){
		posts = posts.filter(post => (post.title.includes(query.title) && 
									 post.createdBy.includes(query.createdBy)) ||
									 (post.title.includes(query.createdBy) &&
									 post.createdBy.includes(query.title)));
		console.log(posts);
		res.json(posts);
	}
	else res.json(posts)
});

app.listen(port, () => console.log(`Slušam na portu ${port}!`));
