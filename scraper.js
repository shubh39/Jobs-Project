const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = 'https://www.seek.com.au/js-jobs/in-All-Melbourne-VIC?page=';

function searchJobs(searchTerm) {
    return fetch(`${url}${searchTerm}`)
    .then(response => response.text());
}

searchJobs('3')
    .then(body => {
        const jobs = [];
        const $ = cheerio.load(body);
        
        $('div[data-automation="searchResults"]').find("h1").each((i, ele) => {
            const $element = $(ele);
            const $title = $element.find('[data-automation="jobTitle"]');
            const $url = $element.find('a');
            const job = {
                url: $url.attr('href'),  
                title: $title.text()   
            }

            if (job.url) {
                jobs.push(job);
             }
           
        });
        jobs.pop();
        console.log(jobs);
    });
