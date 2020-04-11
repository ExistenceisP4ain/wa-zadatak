
### Zadatak:

*Napiši funkciju (na backendu) za izlistaj Mongo postova, ali po stranicama (tzv. paginacija)* 



__backend/src/index.js__
```
async function dohvati(db, stranica, velicina) {
	
    let pics = velicina * (stranica -1)
	
    let cursor = await db.collection("posts").find().limit(velicina).skip(pics)
    let result = await cursor.toArray()
    return result
}

  ```
  
