const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('common'));
app.use((req, res, next) => {
    console.log("This is my middleware");
    return next();
    console.log("This is my middleware AGAIN");
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/gyms', (req, res) => {
    res.send('Hello Gyms!');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});