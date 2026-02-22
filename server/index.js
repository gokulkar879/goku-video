const express = require('express')
const cors = require('cors');
const checkAuth = require('./middlewares/jwtVerifier');
const getUploadUrl = require('./clients/s3Client');
require('dotenv').config();

const app = express();
const PORT = 3001;


app.use(cors())
app.use(express.json());



app.get('/', checkAuth, (req, res) => {
    console.log(req.user);
    res.json({"data": "hello"});
})

app.post('/uploadVideo', checkAuth, async (req, res) => {
    console.log(req.user);
    console.log(req.body);
    const { fileName, type } = req.body;
    try {
       const url =  await getUploadUrl(fileName, type, req.user.username);
       res.json({"data": url});
    } catch (err) {
        res.json({"error": 'There is an issue'});
    }
})

app.listen(PORT, (e) => {
    console.log('Service has started on PORT: ', PORT);
})