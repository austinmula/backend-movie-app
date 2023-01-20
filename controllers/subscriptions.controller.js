const connection = require("../db/config");
const { sendError } = require("../utils/helpers");

exports.getMySubscriptions = async (req, res) => {
  try {
    let query =
      "SELECT * FROM subscription_series WHERE user_id = ? AND is_active=1";

    await connection.query(query, [req.params.id], async (error, response) => {
      if (error) return sendError(res, error, 400);

      res.send(response);
    });
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};

exports.checkIfSub = async (req, res) => {
  const { user_id, movie_id } = req.params;
  try {
    let query =
      "SELECT * FROM subscriptions WHERE user_id = ? AND tv_series_id = ?";

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

exports.getAllSubscriptions = async (req, res) => {
  try {
    let query = "SELECT * FROM movie_details.subscription_details";

    await connection.query(query, async (error, response) => {
      if (error) return sendError(res, error, 400);
      res.send(response);
    });
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};

exports.addNewSubscription = async (req, res) => {
  const { user_id, movie_id } = req.body;
  try {
    let query =
      "INSERT INTO subscriptions (user_id, tv_series_id ) VALUES (?, ?);";
    await connection.query(
      query,
      [user_id, movie_id],
      async (error, response) => {
        if (error) return sendError(res, error, 400);

        connection.query(
          "SELECT * FROM subscriptions WHERE id=?",
          [response.insertId],
          (error, response) => {
            if (error) return sendError(res, error, 400);
            res.json(response);
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};

exports.removeSubscription = async (req, res) => {
  const { user_id, movie_id } = req.body;
  try {
    let query =
      "UPDATE subscriptions SET is_active = 0 WHERE user_id = ? AND tv_series_id =?;";
    await connection.query(query, [user_id, movie_id], async (error) => {
      if (error) return sendError(res, error, 400);

      // res.json({ response });
      connection.query(
        "SELECT * FROM subscriptions WHERE user_id = ? AND tv_series_id =?",
        [user_id, movie_id],
        (error, response) => {
          if (error) return sendError(res, error, 400);
          res.json({ response });
        }
      );
    });
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};
