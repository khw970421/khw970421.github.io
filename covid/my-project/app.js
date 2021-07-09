
const express = require('express');
const app = express();
const db = require('./data/db.js')
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())  // request body를 사용하기 위함
app.use(express.static('public')) // static file을 사용하기 위함
app.get('/', (req,res)=>res.send({'Hello' :'World'}));

app.route('/api/covidDate')
  .get(async(req,res)=>{
    const result = {success:true};
    try{
      const json = await db.getData()
      result.data = json.date;
    }catch(err){
      result.success = false;
      result.err = err;
    }
    res.json(result);
  })
  .put(async(req,res)=>{
    const result = {success: true}
    const date = req.body.date;
    const idx = req.params.parent
    try {
      const json = await db.getData()
      json.date = date
      await db.setData(json)
    } catch (err) {
      result.success = false
      result.err = err
    }
    res.json(result)
  })
  .post(async(req,res)=>{
    const result = {success: true}
    const date = req.body.date
    try {
      const json = await db.getData()
      json.date = date;
      await db.setData(json)
    } catch (err) {
      result.success = false
      result.err = err
    }
    res.json(result)
  })


app.listen(port,()=>console.log(`Example app listeneing on port ${port}!`))
