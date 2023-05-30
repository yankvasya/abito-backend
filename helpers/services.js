const formatServices = (ads) => {
  return {
    id: ads._id,
    title: ads.title,
    description: ads.description,
    icon: ads.icon,
  };
};

module.exports = {
  formatServices,
};
