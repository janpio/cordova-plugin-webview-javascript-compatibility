# cordova-plugin-webview-javascript-compatibility

A Cordova plugin that can tell you, what JavaScript features the used webview supports on different devices, operating systems and operating system versions via its automated tests.

## How it works

The [automated tests](tests/tests.js) contain a list of JavaScript features that are only available in some versions of JavaScript. During the test runs it tries to `eval` these code snippets and fails tests for code that can not successfully be executed:

![all features are supported](https://user-images.githubusercontent.com/183673/59503565-00742000-8ea1-11e9-9588-2c08a4dcde11.png)

## Usage

### Automated

This repository is set up with similar CI configuration to the official Cordova core plugins, and uses Travis CI and `cordova-paramedic` so for each commit it automatically runs the plugin tests via SauceLabs on the configured devices.

The result is visible as the individual build jobs: [![Travis Build Status](https://api.travis-ci.org/janpio/cordova-plugin-webview-javascript-compatibility.svg?branch=master)](https://travis-ci.org/janpio/cordova-plugin-webview-javascript-compatibility) (Click the badge to go to the most recent build on Travis CI)

This build is expected to fail, as it tests on some older devices that do not support all the tested functionality.

### Manually

You can of course also install this plugin manually in a Cordova app and run that on the device of your choice:

```shell
cordova create pluginTestApp
cd pluginTestApp
cordova plugin add cordova-plugin-webview-javascript-compatibility
cordova plugin add plugins/cordova-plugin-webview-javascript-compatibility/tests
cordova plugin add cordova-plugin-test-framework
sed -i -e 's/index.html/cdvtests\/index.html/g' config.xml # change `config.xml` to contain `<content src="cdvtests/index.html" />`
cordova platform add android
cordova run android
```

(You can of course also run this on other platform as `ios` or `browser`.)

