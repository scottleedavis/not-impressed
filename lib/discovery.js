var _ = require('lodash'),
    fs = require('fs'),
    path = require('path');

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}

function determineContents(target) {
    var paths = [];
    _.mapKeys(target, function(value, key) {
        if (value === "*") {
            var dirs = getDirectories(path.resolve(process.env["NI_TARGET"], key));
            _.each(dirs, function(d) {
                    paths.push(path.join(process.env["NI_TARGET"], key, d));
            });
        } else if (value === ".") {
            paths.push(path.resolve(process.env["NI_TARGET"]));
        } else if (value === "") {
            paths.push(path.resolve(process.env["NI_TARGET"],key));
        } else if (Array.isArray(value)) {
            _.each(value, function(d) {
                paths.push(path.join(process.env["NI_TARGET"], key, d));
            });
        }
    });
    if (paths.length == 0) {
        paths.push(path.resolve(process.env["NI_TARGET"]));
    }
    return paths;
}

function scan(target) {
    return determineContents(target);
}

module.exports = {
    scan: function(target) {
        return scan(target);
    }
}