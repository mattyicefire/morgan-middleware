const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('common'));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use('/gyms', (req, res, next) => {
    console.log('GYM ROUTE');
    next();
})

const verifyPassword = app.use((req, res, next) => {
    const { password } = req.query;//never use a query for a password
    if (password === 'gains') {
        next();
    } 
    res.send('Unauthorized');
})

// app.use((req, res, next) => {
//     console.log("This is my middleware");
//     return next();
//     console.log("This is my middleware AGAIN");
// })

app.get('/', (req, res) => {
    console.log(`REQUEST D8: ${req.requestTime}`);
    res.send('Hello World!');
});

app.get('/gyms', (req, res) => {
    console.log(`REQUEST D8: ${req.requestTime}`);
    res.send('Hello Gyms!');
});

app.get('/secret', verifyPassword, (req, res) => {
    res.send('Secret!');
})

app.use((req, res, next) => {
   res.status(404).send('404 Not Found');
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});