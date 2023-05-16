const imgur = require('imgur');
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;
imgur.setClientId(IMGUR_CLIENT_ID);

const imgurFileHandler = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    return imgur
      .uploadFile(file.path)
      .then((img) => {
        resolve(img?.link || null);
      })
      .catch((err) => reject(err));
  });
};

// const { ImgurClient } = require('imgur');

// const imgurFileHandler = async (file) => {
//   console.log('imgur base64 ==> ', file);
//   const client = new ImgurClient({
//     clientId: process.env.IMGUR_CLIENT_ID,
//     clientSecret: process.env.IMGUR_CLIENT_SECRET,
//     refreshToken: process.env.IMGUR_REFRESH_TOKEN,
//   });

//   const response = await client.upload({
//     image: file,
//     type: 'base64',
//     album: process.env.IMGUR_ALBUM_ID,
//   });

//   return response.data.link;
// };

module.exports = {
  imgurFileHandler,
};
