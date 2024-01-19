import express from 'express';

const app = express();

app.get('/', (req, res, next) => {
    console.log(`Root route hit. Request path: ${req.path}`);
    console.log('first function');
    next();
}, (req, res) => {
    console.log('second function');
    res.send('Hello World!');
});

// app.get('*', (req, res) => {
//     console.log(`Wildcard route hit. Request path: ${req.path}`);
//     res.end();
// });

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
