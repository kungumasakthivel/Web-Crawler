const {JSDOM} = require('jsdom');

const crawlPage = async (currentURL) => {

    try {
        const res = await fetch(currentURL);

        if (res.status > 399) {
            console.log(`error is fetch code ${res.status} on page ${currentURL}`);
            return 
        }

        const contentType = res.headers.get('content-type');
        if (!contentType.includes('text/html')) {
            console.log(`no html content status code ${res.status}, on page ${currentURL}`);
            return 
        }

        console.log(await res.text());
    } catch (error) {
        console.log(error);
    }
}

const getURLsFromHTML = (htmlBody, baseURL) => {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    for(const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/') {
            // relative url
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href);
                console.log('try block');
            } catch(error) {
                console.log('error with relative url link', error);
            }
        } else {
            try {
                const urlObj = new URL(linkElement.href);
                urls.push(urlObj.href);
            } catch (error) {
                console.log('error with absolute url', error);
            }
        }
    }
    return urls;
}

const normalizeURL = (urlString) => {
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if(hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }
    return urlString;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}