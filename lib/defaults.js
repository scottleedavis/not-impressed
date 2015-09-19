var build_config = {
    "ruby": {
        pattern: "Gemfile",
        command: "bundle install --path vendor/bundle"
    },
    "maven": {
        pattern: "pom.xml",
        command: "mvn package; rm -f target; ln -s dist target"
    },
    "node": {
        pattern: "package.json",
        command: "npm install"
    },
    "debug": false
};

var scan_config = {
    "license": {
        "command": "license_finder"
    },
    "debug": false
};

var parse_config = {};

var target_config = {};

var seperator = (/^win/.test(process.platform)) ? "& " : "; ";

var file_opts = {
    encoding: "utf8"
};

var node_version = Number(process.version.match(/^v(\d+\.\d+)/)[1]);

switch( node_version ) {
    case 0.8:

        var Iconv = require('iconv').Iconv;

        Buffer.prototype._$_toString = Buffer.prototype.toString;
        Buffer.prototype.toString = function(charset) {
            if (typeof charset == 'undefined' || charset == 'utf8' || charset == 'utf16le'
                || charset == 'ascii' || charset == 'ucs2' || charset == 'binary'
                || charset == 'base64' || charset == 'hex') {
                return this._$_toString.apply(this, arguments);
            }
            var iconv = new Iconv(charset.encoding, 'UTF-8');
            var buffer = iconv.convert(this);
            var args = arguments;
            args[0] = 'utf8';
            return buffer.toString.apply(buffer, args);
        }
        file_opts = 'utf8';
        break;

    case 0.9:
        file_opts = 'utf8';
        break;
    default:

        break;
}

module.exports = {
    parse: parse_config,
    build: build_config,
    scan: scan_config,
    target: target_config,
    seperator: seperator,
    file_opts: file_opts
}