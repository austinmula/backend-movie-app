const connection = require("../db/config");
const { sendError } = require("../utils/helpers");

exports.getFavourites = async (req, res) => {
  try {
    let query = "SELECT * FROM favourite_series WHERE user_id = ?";

    await connection.query(query, [req.params.id], async (error, response) => {
      if (error) return sendError(res, error, 400);

      res.send(response);
    });
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};

exports.checkIfFav = async (req, res) => {
  const { user_id, movie_id } = req.params;
  console.log(req.body);
  try {
    let query =
      "SELECT * FROM fovourites WHERE user_id = ? AND tv_series_id = ?";

    await connection.query(
      query,
      [user_id, movie_id],
      async (error, response) => {
        if (error) return sendError(res, error, 400);
        res.json(response);
      }
    );
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};

exports.addToFavourites = async (req, res) => {
  const { user_id, movie_id } = req.body;
  console.log(req.body);
  try {
    let query =
      "SELECT * FROM fovourites WHERE user_id = ? AND tv_series_id = ?";

    await connection.query(
      query,
      [user_id, movie_id],
      async (error, response) => {
        if (error) return sendError(res, error, 400);

        if (response.length !== 0)
          return sendError(res, "Already In favourites", 400);

        let query =
          "INSERT INTO fovourites (user_id, tv_series_id) VALUES (?, ?)";
        await connection.query(
          query,
          [user_id, movie_id],
          (error, response) => {
            if (error) return sendError(res, error, 400);

            connection.query(
              "SELECT * FROM fovourites WHERE id=?",
              [response.insertId],
              (error, response) => {
                if (error) return sendError(res, error, 400);
                res.json(response);
              }
            );
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};

exports.removeFromFavourites = async (req, res) => {
  const { user_id, movie_id } = req.body;
  console.log(req.body);
  try {
    let query = "DELETE FROM fovourites WHERE user_id = ? AND tv_series_id = ?";

    await connection.query(
      query,
      [user_id, movie_id],
      async (error, response) => {
        if (error) return sendError(res, error, 400);

        res.json({ response });
      }
    );
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};
