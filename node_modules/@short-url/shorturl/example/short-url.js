var makeShortUrl = require("../lib/short-url").makeShortUrl;

makeShortUrl("132", {}, function (error, data) {
  if (error) {
    return console.log('ERROR', error);
  }

  console.log('URL', data);
});

makeShortUrl("https://www.google.com/")
  .then((url) => {
    console.log('URL', url);
  })
  .catch((err) => {
    console.log('ERROR', error);
  });
