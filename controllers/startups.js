const Startup = require('../models/Startups');
const ErrorResponse = require('../utils/ErrorResponse');

/* Description      Get all startups
 * Route            GET/api/startups
 * Access           Public
 */
exports.getAllStartups = async (req, res) => {
  try {
    const startups = await Startup.find();
    res
      .status(200)
      .json({ success: true, count: startups.length, data: startups });
  } catch (error) {
    res.status(500).json({ success: false, data: {}, message: error.message });
  }
};
/* Description      Get a single startups
 * Route            GET/api/startups/:id
 * Access           Public
 */
exports.getStartup = async (req, res, next) => {
  try {
    const startup = await Startup.findById(req.params.id);
    if (!startup) {
      return next(
        ErrorResponse(400, `Startup not found with id ${req.params.id}`)
      );
    }
    res.status(200).json({ success: true, data: startup });
  } catch (error) {
    next(error);
  }
};
/* Description      Create startup
 * Route            POST/api/startups/
 * Access           Public
 */
exports.createStartup = async (req, res) => {
  try {
    const startup = await Startup.create(req.body);
    res.status(201).json({ success: true, data: startup });
  } catch (error) {
    res.status(400).json({ success: false, data: {}, message: error.message });
  }
};

/* Description      Update startup
 * Route            PUT/api/startups/:id
 * Access           Public
 */
exports.updateStartup = async (req, res) => {
  try {
    const startup = await Startup.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!startup) {
      return res.status(400).json({
        success: false,
        data: {},
        message: `Startup not found with id ${req.params.id}`,
      });
    }
    res.status(200).json({ success: true, data: startup });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: {},
      message: `Couldn't update startup with id ${req.params.id}`,
    });
  }
};

/* Description      Get a single startups
 * Route            DELETE/api/startups
 * Access           Public
 */
exports.deleteStartup = async (req, res) => {
  try {
    const startup = await Startup.findOneAndDelete(req.params.id);

    if (!startup) {
      return res.status(400).json({
        success: false,
        data: {},
        message: `Startup with id ${req.params.id} was not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: `Startup successfully deleted with id ${req.params.id}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: error.message,
    });
  }
};
