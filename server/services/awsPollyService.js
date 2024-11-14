const AWS = require('aws-sdk');
const polly = new AWS.Polly();

exports.speak = (text) => {
  const params = {
    Text: text,
    OutputFormat: 'mp3',
    VoiceId: 'Joanna',
  };

  return new Promise((resolve, reject) => {
    polly.synthesizeSpeech(params, (err, data) => {
      if (err) reject(err);
      else resolve(data.AudioStream);
    });
  });
};
