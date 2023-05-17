const { roles } = require("../../middleware/client/auth");

const endPoint = {
  profile: [roles.User, roles.Admin],
};

module.exports = endPoint;
