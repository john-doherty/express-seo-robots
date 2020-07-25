'use strict';

var express = require('express');

/**
 * Intercepts robots.txt requests and returns result
 * @example app.use(expressRobotsTxt([ {userAgent: '*', allow: '/' }]))
 * @param {Array<object>} config - robots txt config
 * @returns {function} express middleware
 */
module.exports = function (config) {

    config = (Array.isArray(config)) ? config : [config];

    var router = express.Router();
    var rules = [];
    
    // convert rules to string
    config.forEach(function(item) {

        if (item.userAgent) rules.push('User-agent: ' + String(item.userAgent || ''));
        if (item.allow) rules.push('Allow: ' + String(item.allow || ''));
        if (item.disallow) rules.push('Disallow: ' + String(item.disallow || ''));
        if (item.crawlDelay) rules.push('Crawl-delay: ' + String(item.crawlDelay || ''));

        if (Array.isArray(item.sitemap)) {
            item.sitemap.forEach(function(sitemap) {
                rules.push('Sitemap: ' + sitemap);
            })
        }
        else if (item.sitemap) {
            rules.push('Sitemap: ' + item.sitemap);
        }
    });

    router.get('/robots.txt', function (req, res) {
        res.header('Content-Type', 'text/plain');
        res.send(rules.join('\n'));
        res.end();
    });

    return router;
};