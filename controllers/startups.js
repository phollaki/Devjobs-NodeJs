const Startup = require('../models/Startups');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
/* Description      Get all startups
 * Route            GET/api/startups
 * Access           Public
 */
exports.getAllStartups = asyncHandler(async (req, res, next) => {
  const startups = await Startup.find();
  res
    .status(200)
    .json({ success: true, count: startups.length, data: startups });
});
/* Description      Get a single startups
 * Route            GET/api/startups/:id
 * Access           Public
 */
exports.getStartup = asyncHandler(async (req, res, next) => {
  const startup = await Startup.findById(req.params.id);
  if (!startup) {
    return next(
      new ErrorResponse(400, `Startup not found with id ${req.params.id}`)
    );
  }
  res.status(200).json({ success: true, data: startup });
});
/* Description      Create startup
 * Route            POST/api/startups/
 * Access           Public
 */
exports.createStartup = asyncHandler(async (req, res, next) => {
  const startup = await Startup.create(req.body);
  res.status(201).json({ success: true, data: startup });
});

/* Description      Update startup
 * Route            PUT/api/startups/:id
 * Access           Public
 */
exports.updateStartup = asyncHandler(async (req, res, next) => {
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
});

/* Description      Get a single startups
 * Route            DELETE/api/startups
 * Access           Public
 */
exports.deleteStartup = asyncHandler(async (req, res, next) => {
  const startup = await Startup.findByIdAndDelete(req.params.id);
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
});

