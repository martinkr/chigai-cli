# chigai-cli [![Build Status](https://travis-ci.org/martinkr/chigai-cli.svg?branch=master)](https://travis-ci.org/martinkr/chigai-cli)
Modern visual regression testing with ```puppeteer``` and ```blink-diff```

## Visual regression testing
Visual regression testing: compare your current state against your baseline.
It's nothing new. We've done this for ages. Comparing two images. Looking at the current version and the previous one. Searching for the difference. On our own. Manually.

Well, Chiagi does this automatically. It takes a screenshot from a given URI and compares it to the previous version.

## Automated. Always
Chigai is designed to be used in your tests. You can use it in your favourite testrunner. As a regression tool. If your layout changes, it won't go on unnoticed.

# How to use this?
Chigai-cli provides a clean facade for chiga-core. The regression testing of a given url and creating a fresh reference item beforehand.
Chigai-cli is designed to be used in your favourite build script.

## Regression testing
Provide a url and options such as the viewport width (default: 1024), viewport height (default: 720) or a threshold (default: 0.01 = 1%) for the image comparison. Chigai-cli creates a new screenshot of the whole page and compares it to the last specified reference. If their difference is lower than the given threshold it will exit with ```0``, otherwise ```1```.

## Fresh reference
If you know  you changed the layout, just set a new reference item before running the tests again.

# Installation
```$ yarn add chigai-cli chigai-cli```

# Regression test on the CLI
```$ chigai regression http://example.com -w 1200 -h 800 -t 0.01```

# Create a fresh reference on the CLI
```$ chigai reference http://example.com -w 1200 -h 800 -t 0.01```


# Tech Stack
- ECMAScript 2018 on ```nodejs v8.5.0```
- ```blink-diff v^1.0.1```
- ```fs-extra-plus v0.1.3```
- ```puppeteer v0.11.0```
- ```yargs v9.10```
- ```cross-spawn v5.1.0```
- 100% code coverage using ```mocha v3.5.2```, ```chai v4.1.2``` and```nyc v11.2.1``,

## Resources
- [GoogleChrome/puppeteer - Headless Chrome Node cli](https://github.com/GoogleChrome/puppeteer)
- [yahoo/blink-diff - A lightweight image comparison tool](https://github.com/yahoo/blink-diff)

## License
Licensed under the [MIT license](http://www.opensource.org/licenses/mit-license.php).

Copyright (c) 2016, 2017 Martin Krause <github@mkrause.info> [http://martinkr.github.io)](http://martinkr.github.io)