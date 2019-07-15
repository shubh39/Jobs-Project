const request = require('request');
const cheerio = require('cheerio');

request('https://www.seek.com.au/js-jobs/in-All-Melbourne-VIC', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

   
  // console.log($('div[data-automation=searchResults]').find("a[data-automation=jobTitle]").attr('href'));

  // console.log($('div[data-automation=searchResults]').find("[data-automation=jobTitle]").text());

  $('div[data-automation=searchResults]').each((i, el) => {
    const title = $(el)
    .find('[data-automation=jobTitle]')
    .text()
    
    const link = $(el)
    .find('a[data-automation=jobTitle]')
    .attr('href');
      
    console.log(title, link);
  });
}
  });