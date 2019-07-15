const express = require('express');
const cors = require('cors');

const scraper = require('./scraper');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'Scraping is Fun!'
  });
});


// /search/js
// /search/python
// /search/javascript
app.get('/search/:title', (req, res) => {
  scraper
    .searchJobs(req.params.title)
    .then(jobs => {
      res.json(jobs);
    });
});

app.get('/job/:imdbID', (req, res) => {
  scraper
    .getJob(req.params.imdbID)
    .then(job => {
      res.json(job);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});