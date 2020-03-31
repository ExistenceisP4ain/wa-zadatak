### Zadatak:

* *Implementiraj pretragu na frontendu koja vraća rezultate sa ILI odnosom između
pojmova. Npr. "pula rijeka" vraća postove koji sadrže "pula" ili "rijeka". Nije potrebno mijenjati
backend kod. (Hint: Promise.all() )* *



__backend/index.js__
```
methods: {
    async fetchPosts(term) {
      term = term || store.searchTerm
	  
	  let pretraga = async (term) => {
	  let response = await fetch(`http://localhost:3000/posts?title=${term}`)
	  let data = await response.json()
	  return data
	  }
	  
	  let terms = term.split(" ")
	  console.log("terms", terms)
	  
	  let promises = terms.map(e => pretraga(e))
	  console.log ( "promises", promises)
	  
	  let results = await Promise.all(promises)
	  console.log("results", results)
	  
	  let rezultat = results.reduce( (final, e) => final.concat(e), [])
	  
	  
	  let data = rezultat
	  
	  let finalni = {}
	  data.forEach(post => finalni[post.id] = post)
	  console.log(finalni)
	  
	  data = Object.values(finalni)
	  
	  
	  console.log ("podaci s backenda", data)
	  this.cards = data.map(doc => {
	  return {id: doc.id, url: doc.source, email: doc.createdBy, title: doc.title, posted_at: Number(doc.postedAt)}
	  })	  
	  
    }
  ```
  
  video tutorial: https://www.youtube.com/watch?v=bJKjq1hENlg 
