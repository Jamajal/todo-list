const express = require('express');
const routes = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Port ${port} is on and routing!`);
});