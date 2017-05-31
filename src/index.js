const rp = require('request-promise');

const generateShortLinkPostUrl = 'https://qpb2m4eon4.execute-api.us-west-2.amazonaws.com/prod/';

function generateShortLink(long_url) {
  const options = {
    method: 'POST',
    url: generateShortLinkPostUrl,
    headers: { 'content-type': 'application/json' },
    body: { long_url },
    json: true
  };

  return rp(options);
}

function registerService(id) {

}

module.exports = {
  generateShortLink,
};
