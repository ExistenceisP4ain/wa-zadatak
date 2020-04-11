
### Zadatak:

*Napiši funkciju (na backendu) za pretragu Mongo postova čiji email autora započinje
određenim slovom dobivenim u parametru funkcije.* 



__backend/src/index.js__
```
let adasad = {}
	if (query.createdBy) {
    adasad["createdBy"] = new RegExp('^' + query.createdBy) 
    }
    
let cursor = await db.collection("posts").find({adasad).sort({postedAt: -1})

  ```
  
