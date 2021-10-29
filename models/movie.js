const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        validator.isURL(url, { require_protocol: true });
      },
      message: 'Некорректная ссылка на картинку!',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        validator.isURL(url, { require_protocol: true });
      },
      message: 'Некорректная ссылка на картинку!',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        validator.isURL(url, { require_protocol: true });
      },
      message: 'Некорректная ссылка на картинку!',
    },
  },
  owner: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    unique: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('movie', movieSchema);
