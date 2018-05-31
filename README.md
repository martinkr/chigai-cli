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

## Example
```$ ./bin/chigai regression -?```
```$ ./bin/chigai regression http://shaky-library.surge.sh/```

## Regression testing
Provide a url and options such as the viewport width (default: 1024), viewport height (default: 720) or a threshold (default: 0.01 = 1%) for the image comparison. Chigai-cli creates a new screenshot of the whole page and compares it to the last specified reference. If their difference is lower than the given threshold it will exit with ```0```, otherwise ```1```.

### Configuration options
Options can either be passed as arguments per call or globally via .chigairs.json file. The options-object takes precedence.

#### ```-?```
Displays the manual.

#### ```-w```
Default: ```1024```. The with of the viewport you cant to screenshot. This will be part of the unique identifier. ```vw```in  ```.chigairc.json```

#### ```-h```
Default: ```786```. The height of the viewport you cant to screenshot. This will be part of the unique identifier. ```vh```in  ```.chigairc.json```

#### ```-p```
Default: ```0```. Wait this amount of miliseconds after the page's ```load-event``` before making the screenshot. This will not be part of the unique identifier. ```path```in  ```.chigairc.json```

#### ```-t```
Default: ```0.01```. The threshold to use for the comparison. This will not be part of the unique identifier. ```threshold```in  ```.chigairc.json```

#### ```path```
Default: ```./screenshots``` There's the possiblitly to pass a custom path to chigai. It's relative to your working directory. ```.chigairc.json```- only
Use this to share your reference items (e.g. via source control, rsync ...).

#### .chigai.json
You can store project wide setttings in this file. It takes the same key-value-pairs as the options-object. Plus an additional ```path``` property.


```JavaScript
{
	"path" : "./myscreenshots",
	"threshold": 0.5,
	"vw": 1200,
	"vh" : 800,
	"wait": 5000
}
```

## Fresh reference
If you know  you changed the layout, just set a new reference item before running the tests again.

# Installation
```$ yarn add chigai-cli```

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
- Complete testsuite based on ```mocha v3.5.2```and ```chai v4.1.2```

## Resources
- [GoogleChrome/puppeteer - Headless Chrome Node cli](https://github.com/GoogleChrome/puppeteer)
- [yahoo/blink-diff - A lightweight image comparison tool](https://github.com/yahoo/blink-diff)

## License
Licensed under the [MIT license](http://www.opensource.org/licenses/mit-license.php).

Copyright (c) 2016, 2017 Martin Krause <github@mkrause.info> [http://martinkr.github.io)](http://martinkr.github.io)
