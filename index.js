var fs = require('fs');

function isStartLine(line) {
    var exec = /^\s*(<!--|\/\/|#|\/\*)/.exec(line) || [];
    return exec[1];
}

var parserMap = {
    '<!--': function(line, token) {
        if (token > 0) {
            if (line.indexOf('-->') > -1) {
                token = -1;
            }
        }
        return {
            token: token,
            value: line
        };
    },

    '/*': function(line, token) {
        if (token > 0) {
            if (line.indexOf('*/') > -1) {
                token = -1;
            }
            line = line.replace(/^\s*[\*]*/, '');
        }
        return {
            token: token,
            value: line
        }
    },
    '#': function(line, token) {
        if (token > 0) {
            if (!/^\s*(\#){1,}/.test(line)) {
                token = -1;
            }
            line = line.replace(/^\s*[\#]*/, '');
        }
        return {
            token: token,
            value: line
        }
    },
    '//': function(line, token) {
        if (token > 0) {
            if (!/^\s*\/\//.test(line)) {
                token = -1;
            }
            line = line.replace(/^\s*\/\/*/, '');
        }
        return {
            token: token,
            value: line
        }
    }
};

module.exports = function(fileName, opt) {
    opt = opt || {};
    if (!fs.existsSync(fileName)) {
        throw new Error(fileName + ' is not exists!');
    }
    // 读取文件内容
    var encoding = opt.encoding || 'UTF-8';
    var mata = opt.meta = 'meta:';
    var content = fs.readFileSync(fileName, encoding);
    var lines = content.split(/\r?\n/);

    var key;
    var parser;
    var token = 0;

    content = [];
    lines.forEach(function(line, i) {
        var result;
        if (!key && (key = isStartLine(line))) {
            parser = parserMap[key];
        }
        if (parser) {
            if (line.indexOf(mata) > -1) {
                token = 1;
            } else if (token == 0) {
                key = null;
                return;
            }
            result = parser(line, token) || {};
            token = result.token;
            if (token < 0) {
                parser = undefined;
            } else if (token > 0) {
                content.push(result.value);
            }
        }
    });
    if (token < 0) {
        content = content.join('').replace(/^[^\{]*|[^\}]*$/g, '');
        return JSON.parse(content);
    }
};