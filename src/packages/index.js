

let outPut = {};
let packages = require.context('./', true, /\.vue$/);

packages.keys().forEach(r => {
    let key = /\.\/([\s\S]*)\/[\s\S]*.vue/.exec(r)[1];
    outPut[key] = packages(r)
});

module.exports = outPut
