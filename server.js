var express = require('express');
var app = express();

app.get('/hello', (req, res) =>
    res.send('Hello World!')
);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

