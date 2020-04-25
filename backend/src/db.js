import mongo from "mongodb"
import { isMainThread } from "worker_threads"

let connection_string = 'mongodb+srv://admin:admin123@wapp-uq5qp.mongodb.net/test?retryWrites=true&w=majority'

let client = new mongo.MongoClient(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let db = null
export default () => {
    return new Promise((resolve, reject) =>{

        if(db && client.isConnected()){
            resolve(db)
        }
        
        client.connect(err => {
            if(err){
                reject("oof, cant connect: " + err)
            }
            else{
                console.log("Povezan s bazom" )
                db = client.db("fipugram")
                resolve(db)
            }
        })
    })      
}

/*
export const api = {
    gettask: handleError(async id => {
      const res = await axios.get(baseURL + id);
      return res.data;
    }),
    gettasks: handleError(async () => {
      const res = await axios.get(baseURL);
      return res.data;
    }),
    deletetask: handleError(async id => {
      const res = await axios.delete(baseURL + id);
      return res.data;
    }),
    createtask: handleError(async payload => {
      const res = await axios.post(baseURL, payload);
      return res.data;
    }),
    updatetask: handleError(async payload => {
      const res = await axios.put(baseURL + payload._id, payload);
      return res.data;
    })
  };*/
