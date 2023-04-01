const testingRouter = require('express').Router();
const blogModel = require('../models/Blog');
const userModel = require('../models/User');
testingRouter.post('/reset', async (request, response) => {
  await userModel.deleteMany({});
  await blogModel.deleteMany({});
  response.status(204).end();
});
module.exports = testingRouter;
