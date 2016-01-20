var path = require("path");

module.exports = function(contents, file, options, process, callback) {

  var includes = [
    path.join(__dirname, "../../node_modules/bluebird/js/browser/bluebird.js"),
    path.join(__dirname, "../../node_modules/web3/dist/web3.min.js"),
    path.join(__dirname, "../../node_modules/ether-pudding/build/ether-pudding.js")
  ];

  process(includes, function(err, processed) {
    if (err != null) {
      callback(err);
      return;
    }

    callback(null, processed + "\n\n" + contents);
  });
};
