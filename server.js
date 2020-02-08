const express = require('express');
const path = require('path');
const grabity = require('grabity');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/get-image', async (req, res) => {
  try {
    const data = await grabity.grabIt(req.query.url);
    res.json(data);
  } catch {
    res.json({ data: null });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);