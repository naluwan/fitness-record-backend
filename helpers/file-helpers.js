const imgur = require('imgur');
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;
imgur.setClientId(IMGUR_CLIENT_ID);

const imgurFileHandler = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    return imgur
      .uploadFile(file.path)
      .then((img) => {
        resolve(img || null);
      })
      .catch((err) => reject(err));
  });
};

const imgurMultipleFilesHandler = (files) => {
  return new Promise((resolve, reject) => {
    if (files.length === 0) return resolve(null);

    // 由於上傳圖片僅需要path，所以需要將files檔案中的path拿出來再傳入uploadImages裡面
    const currentFiles = files.map((file) => file.path);
    return imgur
      .uploadImages(currentFiles, 'File')
      .then((images) => resolve(images))
      .catch((err) => reject(err));
  });
};

const imgurDeleteImage = (hash) => {
  return new Promise((resolve, reject) => {
    if (!hash) return resolve(null);

    return imgur
      .deleteImage(hash)
      .then((status) => resolve(status))
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
  imgurMultipleFilesHandler,
  imgurDeleteImage,
};
