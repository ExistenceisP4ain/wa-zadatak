
### Zadatak:

*(WA-402) Prouči Mongo dokumentaciju za pretraživanje i sastavi upit pomoću find() koji vraća
posts sortirane po vremenu silazno (najnoviji na vrhu), ali samo postove zadnjih 6 mjeseci.
Dokumentacija: https://mongodb.github.io/node-mongodb-native/3.5/tutorials/crud/* 



__backend/src/index.js__
```
let cursor = await db.collection("posts").find({ postedAt: { $gt: "1570217971000" }}).sort({postedAt: -1})

  ```
  
