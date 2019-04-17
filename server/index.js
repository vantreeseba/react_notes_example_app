const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT;


app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
app.get('/api', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
