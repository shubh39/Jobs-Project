const express = require('express');
const path = require('path');
const app = express();
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');



request('https://www.seek.com.au/job/39372875?type=standard&searchrequesttoken=79806ee0-c3ab-457b-96e0-f3a5ab79ec49', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    $('._3394qVu').each((i, el) => {
      const title = $(el)
      .find('[data-automation="job-detail-title"]')
      .text()
      const date = $(el)
      .find('[data-automation="job-detail-date"]')
      .text()
      const location = $(el)
      .find('.eBOHjGN')
      .text()
      const Advertisingcompany = $(el)
      .find('[data-automation="advertiser-name"]')
      .text()
      const Jobdescription = $(el)
      .find('[data-automation="jobDescription"]')
      .text()
    
      const data = {
        title,
        date,
        location,
        Advertisingcompany,
        Jobdescription
      }
    console.log(data);
  });
}
});


// function fetchJobList(region, title) {
//   // get all jobs url
//   const urls = [];
//   for (const url of urls) {
//     fetchJobDescription(url)
//   }
// }

// function fetchJobDescription(url) {

// }