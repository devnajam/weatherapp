const express = require('express');
const https = require('https');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/', async (req, res) => {
  var url = `https://learnwebcode.github.io/json-example/animals-1.json`;
  var data = 'default';
  var weather = '';
  await https.get(url, res => {
    res.on('data', chunk => {
      data += chunk;
    });
    res.on('end', async () => {
      weather = await JSON.parse(data);
      console.log(weather);
    });
  });

  res.render('report', { data: weather });
});

app.listen(3000, () => console.log('server has started'));
