const express = require('express');
const app = express();
const port = 3000;

app.get('/health', (req, res) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});

module.exports = app;
