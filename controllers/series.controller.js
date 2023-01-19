const connection = require("../db/config");
const { jwtGenerator, sendError } = require("../utils/helpers");

exports.getAllShows = async (req, res) => {
  try {
    //check if the user exists
    let query = "SELECT * FROM tv_series";

    await connection.query(query, async (error, response) => {
      if (error) return sendError(res, error, 400);

      res.send(response);
    });
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};