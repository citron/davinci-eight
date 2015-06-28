define(["require", "exports", './literals', './operators', './builtins'], function (require, exports, literals, operators, builtins) {
    var NORMAL = 999; // <-- never emitted
    var TOKEN = 9999; // <-- never emitted
    // These things are called mode(s) and correspond to the following map.
    var BLOCK_COMMENT = 0;
    var LINE_COMMENT = 1;
    var PREPROCESSOR = 2;
    var OPERATOR = 3;
    var INTEGER = 4;
    var FLOAT = 5;
    var IDENT = 6;
    var BUILTIN = 7;
    var KEYWORD = 8;
    var WHITESPACE = 9;
    var EOF = 10;
    var HEX = 11;
    var map = [
        'block-comment',
        'line-comment',
        'preprocessor',
        'operator',
        'integer',
        'float',
        'ident',
        'builtin',
        'keyword',
        'whitespace',
        'eof',
        'integer'
    ];
    function tokenize() {
        function token(data) {
            if (data.length) {
                tokens.push({
                    type: map[mode],
                    data: data,
                    position: start,
                    line: line,
                    column: col
                });
            }
        }
        function write(chunk) {
            i = 0;
            input += chunk;
            len = input.length;
            var last;
            while (c = input[i], i < len) {
                last = i;
                switch (mode) {
                    case BLOCK_COMMENT:
                        i = block_comment();
                        break;
                    case LINE_COMMENT:
                        i = line_comment();
                        break;
                    case PREPROCESSOR:
                        i = preprocessor();
                        break;
                    case OPERATOR:
                        i = operator();
                        break;
                    case INTEGER:
                        i = integer();
                        break;
                    case HEX:
                        i = hex();
                        break;
                    case FLOAT:
                        i = decimal();
                        break;
                    case TOKEN:
                        i = readtoken();
                        break;
                    case WHITESPACE:
                        i = whitespace();
                        break;
                    case NORMAL:
                        i = normal();
                        break;
                }
                if (last !== i) {
                    switch (input[last]) {
                        case '\n':
                            col = 0;
                            ++line;
                            break;
                        default:
                            ++col;
                            break;
                    }
                }
            }
            total += i;
            input = input.slice(i);
            return tokens;
        }
        function end(chunk) {
            if (content.length) {
                token(content.join(''));
            }
            mode = EOF;
            token('(eof)');
            return tokens;
        }
        function normal() {
            content = content.length ? [] : content;
            if (last === '/' && c === '*') {
                start = total + i - 1;
                mode = BLOCK_COMMENT;
                last = c;
                return i + 1;
            }
            if (last === '/' && c === '/') {
                start = total + i - 1;
                mode = LINE_COMMENT;
                last = c;
                return i + 1;
            }
            if (c === '#') {
                mode = PREPROCESSOR;
                start = total + i;
                return i;
            }
            if (/\s/.test(c)) {
                mode = WHITESPACE;
                start = total + i;
                return i;
            }
            isnum = /\d/.test(c);
            isoperator = /[^\w_]/.test(c);
            start = total + i;
            mode = isnum ? INTEGER : isoperator ? OPERATOR : TOKEN;
            return i;
        }
        function whitespace() {
            if (/[^\s]/g.test(c)) {
                token(content.join(''));
                mode = NORMAL;
                return i;
            }
            content.push(c);
            last = c;
            return i + 1;
        }
        function preprocessor() {
            if (c === '\n' && last !== '\\') {
                token(content.join(''));
                mode = NORMAL;
                return i;
            }
            content.push(c);
            last = c;
            return i + 1;
        }
        function line_comment() {
            return preprocessor();
        }
        function block_comment() {
            if (c === '/' && last === '*') {
                content.push(c);
                token(content.join(''));
                mode = NORMAL;
                return i + 1;
            }
            content.push(c);
            last = c;
            return i + 1;
        }
        function operator() {
            if (last === '.' && /\d/.test(c)) {
                mode = FLOAT;
                return i;
            }
            if (last === '/' && c === '*') {
                mode = BLOCK_COMMENT;
                return i;
            }
            if (last === '/' && c === '/') {
                mode = LINE_COMMENT;
                return i;
            }
            if (c === '.' && content.length) {
                while (determine_operator(content)) {
                }
                mode = FLOAT;
                return i;
            }
            if (c === ';' || c === ')' || c === '(') {
                if (content.length) {
                    while (determine_operator(content)) {
                    }
                }
                token(c);
                mode = NORMAL;
                return i + 1;
            }
            var is_composite_operator = content.length === 2 && c !== '=';
            if (/[\w_\d\s]/.test(c) || is_composite_operator) {
                while (determine_operator(content)) {
                }
                mode = NORMAL;
                return i;
            }
            content.push(c);
            last = c;
            return i + 1;
        }
        function determine_operator(buf) {
            var j = 0, idx, res;
            do {
                idx = operators.indexOf(buf.slice(0, buf.length + j).join(''));
                res = operators[idx];
                if (idx === -1) {
                    if (j-- + buf.length > 0) {
                        continue;
                    }
                    res = buf.slice(0, 1).join('');
                }
                token(res);
                start += res.length;
                content = content.slice(res.length);
                return content.length;
            } while (1);
        }
        function hex() {
            if (/[^a-fA-F0-9]/.test(c)) {
                token(content.join(''));
                mode = NORMAL;
                return i;
            }
            content.push(c);
            last = c;
            return i + 1;
        }
        function integer() {
            if (c === '.') {
                content.push(c);
                mode = FLOAT;
                last = c;
                return i + 1;
            }
            if (/[eE]/.test(c)) {
                content.push(c);
                mode = FLOAT;
                last = c;
                return i + 1;
            }
            if (c === 'x' && content.length === 1 && content[0] === '0') {
                mode = HEX;
                content.push(c);
                last = c;
                return i + 1;
            }
            if (/[^\d]/.test(c)) {
                token(content.join(''));
                mode = NORMAL;
                return i;
            }
            content.push(c);
            last = c;
            return i + 1;
        }
        function decimal() {
            if (c === 'f') {
                content.push(c);
                last = c;
                i += 1;
            }
            if (/[eE]/.test(c)) {
                content.push(c);
                last = c;
                return i + 1;
            }
            if (/[^\d]/.test(c)) {
                token(content.join(''));
                mode = NORMAL;
                return i;
            }
            content.push(c);
            last = c;
            return i + 1;
        }
        function readtoken() {
            if (/[^\d\w_]/.test(c)) {
                var contentstr = content.join('');
                if (literals.indexOf(contentstr) > -1) {
                    mode = KEYWORD;
                }
                else if (builtins.indexOf(contentstr) > -1) {
                    mode = BUILTIN;
                }
                else {
                    mode = IDENT;
                }
                token(content.join(''));
                mode = NORMAL;
                return i;
            }
            content.push(c);
            last = c;
            return i + 1;
        }
        var i = 0, total = 0, mode = NORMAL, c, last, content = [], tokens = [], token_idx = 0, token_offs = 0, line = 1, col = 0, start = 0, isnum = false, isoperator = false, input = '', len;
        return function (data) {
            tokens = [];
            if (data !== null) {
                return write(data);
            }
            return end();
        };
    }
    return tokenize;
});
