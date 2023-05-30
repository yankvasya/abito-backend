const formatUser = (user) => {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
    reviews: user.reviews,
    rating: user.rating,
    personType: user.personType,
  };
};

module.exports = {
  formatUser,
};
