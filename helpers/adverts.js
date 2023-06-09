const formatAdvert = (advert) => {
  return {
    id: advert._id,
    title: advert.title,
    price: advert.price,
    photo: advert.photos[0], // возвращает первое фото или undefined, если нет фото
    location: advert.location,
    date: advert.date,
  };
};

module.exports = {
  formatAdvert,
};
