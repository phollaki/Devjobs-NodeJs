const mongoose = require('mongoose');
const slugify = require('slugify');

const StartupsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'Startup with name is already exists'],
    required: [true, 'Please add a name to the startup'],
    maxLenght: [50, 'Startup length should be between 0-50 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description to the startup'],
    maxlength: [500, 'Please add a valid description between 0-500 characters'],
  },
  address: {
    type: String,
    required: [true, 'Please add an address to the startup'],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please add a valid url for the website of the startup',
    ],
  },
  email: {
    type: String,
    match: [
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
      'Please add a valid email',
    ],
  },
  jobs: {
    type: [String],
    required: [true, 'Please add a list of jobs'],
    enum: ['Fullstack', 'Backend', 'Frontend', 'Devops'],
  },
  phone: {
    type: String,
    maxLenght: [15, 'Please add a valid phone number'],
  },
  remote: {
    type: Boolean,
    default: false,
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

StartupsSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next(); // move on to the next piece of middleware
});

module.exports = mongoose.model('Startups', StartupsSchema);
