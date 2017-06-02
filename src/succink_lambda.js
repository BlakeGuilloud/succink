'use strict';

const S3 = require('aws-sdk/clients/s3');
const url = require('url');

const S3_Bucket = process.env['S3_BUCKET'];
const S3_Region = process.env['S3_REGION'];
const S3_Prefix = process.env['S3_PREFIX'];
const Base_URL = process.env['Base_URL'];

const generateShortId = () => {
  return 'xxxxxxx'.replace(/x/g, (c) => {
    return (Math.random() * 36 | 0).toString(36);
  });
};

exports.handler = (event, context, callback) => {
  const s3 = new S3({ region: S3_Region });
  const long_url = event.long_url;
  const base_url = Base_URL;

  let retry = 0;

  const done = (short_url, err) => {
    callback(null, { long_url, short_url, err });
  };

  const checkAndCreateS3Redirect = (s3_bucket, short_key, long_url) => {
    const headObjectPayload = { Bucket: s3_bucket, Key: short_key };

    s3.headObject(headObjectPayload, (err, data) => {
      if (err) {
        if (err.code === 'NotFound') {
          const putObjectPayload = { Bucket: s3_bucket, Key: short_key, Body: '', WebsiteRedirectLocation: long_url, ContentType: 'text/plain' };

          s3.putObject(putObjectPayload, (err, data) => {
            if (err) {
              done('', err.message);
            } else {
              const returnUrl = `http://${base_url}/${short_id}`;

              done(returnUrl, '');
            }
          });
        } else {
          done('', `Could not set a suitable name, error: ${err.code}`);
        }
      } else {
        retry += 1;

        if (retry <= 3) {
          checkAndCreateS3Redirect(s3_bucket, short_key, long_url);
        } else {
          done('', 'Cannot generate an unused short id');
        }
      }
    });
  };

  const url_check = url.parse(long_url);

  if (!((url_check) && (url_check.host))) {
    return done('', 'Invalid URL format');
  }

  const short_id = generateShortId();
  const short_key = `${S3_Prefix}/${short_id}`;

  checkAndCreateS3Redirect(S3_Bucket, short_key, long_url);
};
