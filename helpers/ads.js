const formatAds = (ads) => {
  return {
    id: ads._id,
    title: ads.title,
    image: ads.image,
    link: ads.link,
  };
};

module.exports = {
  formatAds,
};
