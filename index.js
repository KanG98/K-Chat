const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));


app.get('/', (req, res) =>{
    res.send("hello world")
})

const port = process.env.PORT || 3030;

app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);