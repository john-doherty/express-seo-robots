# express-seo-robots

Simple robots.txt file generation for express

## Install

```bash
npm install --save express-seo-robots
```

## Usage

Add middleware to your express application before all other routes.

```js
var express = require('express');
var app = express();
var robotsTxt = require('express-seo-robots');

// add middleware with robots.txt config
app.use(robotsTxt({ userAgent: '*', allow: '/', sitemap: 'https://yourdomain.com/sitemap.xml' }));

// standard express route
app.get('/', function(req, res) {
    res.send('Hello world!');
});
```

Based on the setup above, a requests to `/robots.txt` will now return:

```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

You can provide multiple entries by passing an array of values, the following:

```js
// add robots.txt middleware with custom config
app.use(robotsTxt([
    { userAgent: 'Googlebot-news', allow: '/news', CrawlDelay: '5' },
    { userAgent: 'Googlebot', disallow: '/private' },
    { userAgent: 'Googlebot' disallow: '/*.xls$' }
]);
```

Produces:

```
User-agent: Googlebot-news
Allow: /
Crawl-delay: 5

User-agent: Googlebot
Disallow: /private

User-agent: Googlebot
Disallow: /*.xls$
```

### Options

Property     | Type      | Description
:----------- |:--------- |:------------------------------------------
`userAgent`  | _string_  | Name of a search engine/bot that the rule applies to
`allow`      | _string_  | URL relative to the root domain that should be crawled by the user agent
`disallow`   | _string_  | URL relative to the root domain that should **not** be crawled by the user agent
`crawlDelay` | _integer_ | Time in seconds the search engine/bot should wait before sending the next request
`sitemap`    | _Array_   | List of fully-qualified SiteMap URLs

## Contributing

Feel free to contribute, either by [raising an issue](https://github.com/john-doherty/express-seo-robots/issues) or:

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## History

For change-log, check [releases](https://github.com/john-doherty/express-seo-robots/releases).

## License

Licensed under [MIT License](LICENSE) &copy; [John Doherty](https://twitter.com/mrjohndoherty)
