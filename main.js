const {crawlPage} = require('./crawl.js');

const main = () => {
    const baseURL = "https://github.com"

    console.log('started crewling of', baseURL);
    crawlPage(baseURL);
}

main();
