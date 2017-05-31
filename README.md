## succink - Succinct Links

A promise based shortlink generator.

```
npm install succink
```

Promise
```javascript
succink.generateShortLink('https://github.com/BlakeGuilloud/succink/blob/master/README.md')
  .then((response) => {
    response === {
      short_url: 'http://tael.ninja/0ioctcx',
      long_url: 'https://github.com/BlakeGuilloud/succink/blob/master/README.md',
      err: '',
    };
  });
```

async / await
```javascript
const shortLink = await succink.generateShortLink('https://github.com/BlakeGuilloud/succink/blob/master/README.md');

shortLink === {
  short_url: 'http://tael.ninja/0ioctcx',
  long_url: 'https://github.com/BlakeGuilloud/succink/blob/master/README.md',
  err: '',
};
```
