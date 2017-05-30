const succink = require('./lib/index');

succink('http://www.goggle.com')
  .then((data) => {
    console.log('dataaa', data);
  })
