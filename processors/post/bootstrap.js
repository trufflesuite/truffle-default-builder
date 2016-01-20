var fs = require("fs");

module.exports = function(contents, file, options, process, callback) {

  var contract_names = options.contracts.map(function(contract) {return contract.name;}).join(", ");
  var contract_source = options.contracts.map(function(contract) {return contract.code;}).join("");

  contents = contract_source + "\n\n" + contents + "\n\n" + " \
// Added by Truffle bootstrap.                                \
// Supports Mist, and other wallets that provide 'web3'.      \
if (typeof web3 !== 'undefined') {                            \
  // Use the Mist/wallet provider.                            \
  window.web3 = new Web3(web3.currentProvider);               \
} else {                                                      \
  // Use the provider from the config.                        \
  window.web3 = new Web3(new Web3.providers.HttpProvider('http://" + options.rpc.host + ":" + options.rpc.port + "')); \
}                                                             \
                                                              \
Pudding.setWeb3(window.web3);                                 \
Pudding.load([" + contract_names + "], window);               ";

  callback(null, contents);
};
