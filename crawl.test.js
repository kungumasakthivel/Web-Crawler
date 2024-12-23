const {normalizeURL, getURLsFromHTML} = require('./crawl.js');
const {test, expect} = require('@jest/globals')

test('normalizeURL strip test', () => {
    const input = 'https://blog.site.com/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.site.com/path';
    expect(actual).toEqual(expected);
})

test('normalizeURL captials test', () => {
    const input = 'https://BLOG.site.com/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.site.com/path';
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML fetch absolute URL links test', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://google.com/images">
                Google
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://google.com";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://google.com/images'];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML relative URL links test', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/images">
                Google
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://google.com";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://google.com/images'];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML invalid URL links test', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="images-invalid">
                Google
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://google.com";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
})