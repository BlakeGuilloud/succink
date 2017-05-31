## succink - Succinct Links

A promise based shortlink generator.

```
npm install succink
```

```javascript
import succink from 'succink';


succink('https://github.com/BlakeGuilloud/succink/blob/master/README.md')
  .then((response) => {
    response === {
      short_url: 'tael.ninja/asdfgh',
      long_url: 'https://github.com/BlakeGuilloud/succink/blob/master/README.md',
      err: '',
    };
  });
```

```javascript
import succink from 'succink';

const shortLink = await succink('https://github.com/BlakeGuilloud/succink/blob/master/README.md');

shortLink === {
  short_url: 'tael.ninja/asdfgh',
  long_url: 'https://github.com/BlakeGuilloud/succink/blob/master/README.md',
  err: '',
};
```
