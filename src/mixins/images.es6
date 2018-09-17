import loadImage from 'image-promise';

const getImageUrl = function (url, action, width, height) {
  const pattern = 'https?:[\\/]{2}img[.]persik[.]by[\\/]([\\w\\/]*)?\\w*[.](jpg|png|gif)';
  const regex = new RegExp(pattern);
  const result = regex.exec(url);
  if (result !== null) {
    const [, bucketName, pictureName] = url.match(/([^/]+)\/([^/]+)$/);
    switch (action) {
      case 'crop':
        return `https://ir.persik.by/crop/${width}/${height}/${bucketName}/${pictureName}`;
      case 'resizeFull':
        return `https://ir.persik.by/resize/${width}/${height}/${bucketName}/${pictureName}`;
      case 'resizeWidth':
        return `https://ir.persik.by/resize/${width}/-/${bucketName}/${pictureName}`;
      case 'resizeHeight':
        return `https://ir.persik.by/resize/-/${height}/${bucketName}/${pictureName}`;
      default:
        return url;
    }
  } else return url;
};

export default {
  methods: {
    crop(url, width, height) { return getImageUrl(url, 'crop', width, height); },
    resize(url, width, height) { return getImageUrl(url, 'resizeFull', width, height); },
    resizeW(url, width) { return getImageUrl(url, 'resizeWidth', width, null); },
    resizeH(url, height) { return getImageUrl(url, 'resizeHeight', null, height); },
    async loadImage(url) {
      try {
        await loadImage(url);
      } catch (e) {
        return '';
      }
      return url;
    },
  },
  filters: {
    crop: (url, width, height) => getImageUrl(url, 'crop', width, height),
    resize: (url, width, height) => getImageUrl(url, 'resizeFull', width, height),
    'resize-w': (url, width) => getImageUrl(url, 'resizeWidth', width, null),
    'resize-h': (url, height) => getImageUrl(url, 'resizeHeight', null, height),
  },
};
