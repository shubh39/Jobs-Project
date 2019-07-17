const fetch = require('node-fetch');
const request = require('request');
const cheerio = require('cheerio');

const url = 'https://www.seek.com.au/js-jobs/in-All-Melbourne-VIC?page=';

start().then(data => console.log(data));

function searchJobs(searchTerm) {
    return fetch(`${url}${searchTerm}`)
    .then(response => response.text())
    .then(body => {
        const jobs = [];
        const $ = cheerio.load(body);
        
        $('div[data-automation="searchResults"]').find("h1").each((i, ele) => {
            const $element = $(ele);
            const $title = $element.find('[data-automation="jobTitle"]');
            const $url = $element.find('a');
       //     const seekID = $url.attr('href').match(/job\/(.*)\?/)[1];

            const job = {
                url: $url.attr('href'),  
                title: $title.text(),   
            };

            if (job.url) {
                jobs.push(job);
             }
           
        });

        jobs.pop();
        return jobs;

    }).catch(err => {throw new Error(err.message)})

}


    function fetchJobDetails(url) {
       return request('https://www.seek.com.au' + url, (error, response, html) => {
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
              return data
            });
          }
          });

    }


function getAllJobs(jobs) {
    return Promise.all(jobs.map(job => {
        return fetchJobDetails(job.url);
    })); 
}


async function start(searchTerm) {
    try{
        const result = await searchJobs(searchTerm);  // job[]
        console.log(result);
        const data = await getAllJobs(result);
        return data;
        
        } 
        catch(err) {
            console.log(err)
           }

}