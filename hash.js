const crypto = require('crypto');

function generateBase64Hash(length) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer.toString('base64').slice(0, length));
      }
    });
  });
}

const desiredLength = 32;
generateBase64Hash(desiredLength)
  .then((base64Hash) => {
    console.log(base64Hash);
  })
  .catch((err) => {
    console.error('Error generating Base64 hash:', err);
  });
