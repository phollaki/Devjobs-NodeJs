const express = require('express');
const {
  getAllStartups,
  getStartup,
  createStartup,
  updateStartup,
  deleteStartup,
} = require('../controllers/startups');

const router = express.Router();

router.route('/').get(getAllStartups).post(createStartup);
router.route('/:id').get(getStartup).put(updateStartup).delete(deleteStartup);

module.exports = router;
