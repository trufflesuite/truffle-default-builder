var fs = require("fs");

module.exports = function(contents, file, options, process, callback) {

  var contract_names = options.contracts.map(function(contract) {return contract.name;}).join(", ");
  var contract_source = options.contracts.map(function(contract) {return contract.code;}).join("");

  contents = contract_source + "\n\n" + contents + "\n\n" + " \
// Added by Truffle bootstrap.                                \n\n\
// Supports Mist, and other wallets that provide 'web3'.      \n\n\
if (typeof web3 !== 'undefined') {                            \n\n\
  // Use the Mist/wallet provider.                            \n\n\
  window.web3 = new Web3(web3.currentProvider);               \n\n\
} else {                                                      \n\n\
  // Use the provider from the config.                        \n\n\
  window.web3 = new Web3(new Web3.providers.HttpProvider('http://" + options.rpc.host + ":" + options.rpc.port + "')); \n\n\
}                                                             \n\n\
                                                              \n\n\
Pudding.setWeb3(window.web3);                                 \n\n\
Pudding.load([" + contract_names + "], window);               \n\n";

  callback(null, contents);
};
