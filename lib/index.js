'use strict';

var request = require("request-promise");

function succink(long_url) {
  var options = {
    method: 'POST',
    url: 'https://p71ulb59k5.execute-api.us-west-2.amazonaws.com/prod/',
    headers: { 'content-type': 'application/json' },
    body: { long_url: long_url },
    json: true
  };

  return request(options);
}

module.exports = succink;