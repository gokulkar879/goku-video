const express = require('express')
const cors = require('cors')

const app = express();
const PORT = 3001;


app.use(cors())

app.get('/', (req, res) => {
    res.json({"data": "hello"});
})

app.listen(PORT, (e) => {
    console.log('Service has started on PORT: ', PORT);
})