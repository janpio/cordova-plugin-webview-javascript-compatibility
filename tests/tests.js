/* eslint-env jasmine */

// based on https://codereview.stackexchange.com/questions/147892/small-javascript-library-for-ecmascript-version-detection

var features = {
    // 'arrayComprehensions': '[for(_ of [0])_]',
    'arrowFunction': '(_=>_)',
    'class': '(class{})',
    'const': 'const c=true',
    'defaultParams': '(function(a=false){})',
    'destructuring': 'let {d}={a:true}',
    'forOf': 'for(var b of [])',
    'generator': '(function*(){})',
    'getter': '({get a(){}})',
    'label': 'l:0',
    'let': 'let o',
    'reservedWords': '({catch:true})',
    'setter': '({set a(v){}})',
    'spread': '[...[]]',
    // eslint-disable-next-line no-template-curly-in-string,no-useless-escape
    'stringInterpolation': '`$\{0}`',
    'stringLineBreak': "'\\\n'",
    'super': '({b(){super.a}})',
    'yield': '(function*(){yield true})'
};

function evaluate (code) {
    console.log('evaluate', code);
    try {
        // eslint-disable-next-line no-eval
        console.log(eval(code));
        // eslint-disable-next-line no-eval
        eval(code);
        return true;
    } catch (e) {
        return false;
    }
}

function supports () {
    var i = 0; var len = arguments.length;
    for (; i < len; ++i) {
        var feature = arguments[i].toString();
        if (features.hasOwnProperty(feature)) {
            it('syntax: ' + features[feature], function () {
                expect(evaluate(features[feature] + ';')).toBe(true);
            });
        }
    }
}

exports.defineAutoTests = function () {
    describe('ES3', function () {
        it('methods', function () {
            expect(typeof [].hasOwnProperty === 'function').toBe(true);
        });
    });

    describe('ES5', function () {
        it('methods', function () {
            expect(typeof [].filter === 'function' &&
                typeof Function.prototype.bind === 'function' &&
                typeof Object.defineProperty === 'function' &&
                typeof ''.trim === 'function' &&
                typeof JSON === 'object').toBe(true);
        });

        supports('reservedWords');
    });

    describe('ES6', function () {
        it('methods', function () {
            expect(typeof Object.assign === 'function' &&
                typeof Object.freeze === 'function').toBe(true);
        });

        supports(
            'arrowFunction', 'class', 'const', 'forOf', 'defaultParams', 'destructuring', 'super', 'yield'
        );
    });

    describe('ES7', function () {
        // supports('arrayComprehensions');
    });
};

exports.defineManualTests = function (contentEl, createActionButton) {
    var logMessage = function (message, color) {
        var log = document.getElementById('info');
        var logLine = document.createElement('div');
        if (color) {
            logLine.style.color = color;
        }
        logLine.innerHTML = message;
        log.appendChild(logLine);
    };

    var clearLog = function () {
        var log = document.getElementById('info');
        log.innerHTML = '';
    };

    var device_tests = '<h3>Press Dump Device button to get device information</h3>' +
        '<div id="dump_device"></div>' +
        'Expected result: Status box will get updated with device info. (i.e. platform, version, uuid, model, etc)';

    contentEl.innerHTML = '<div id="info"></div>' + device_tests;

    createActionButton('Dump device', function () {
        clearLog();
        logMessage(JSON.stringify(window.device, null, '\t'));
    }, 'dump_device');
};
