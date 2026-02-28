const express = require('express')
const cors = require('cors');
const checkAuth = require('./middlewares/jwtVerifier');
const getUploadUrl = require('./clients/s3Client');
const { v4: uuidv4 } = require("uuid");
const { putVideo } = require('./clients/ddbClient');
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
    const { fileName, type, title, description} = req.body;
    try {
        const videoId = `video_${uuidv4()}`;
        const video = {
            fileName: fileName,
            title: title,
            userId: req.user.username,
            description: description,
            status: 'PROGRESS',
            videoId: videoId
        }

        console.log(await putVideo(video));
    //    const url =  await getUploadUrl(fileName, type, req.user.username);

       res.json({"data": "url"});
    } catch (err) {
        res.json({"error": 'There is an issue'});
    }
})


/** user endpoint */
app.get('/userVideos', checkAuth, (req, res) => {

})


app.listen(PORT, (e) => {
    console.log('Service has started on PORT: ', PORT);
})