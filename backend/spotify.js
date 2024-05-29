const express = require("express");
const router = express.Router();

require("dotenv").config();
const request = require("request");
const util = require("util");
const requestGet = util.promisify(request.get);
const axios = require("axios");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

// backend port
const port = 5001;

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URL;

const stateKey = "spotify_auth_state";

const generateRandomString = (length) => {
  return crypto.randomBytes(60).toString("hex").slice(0, length);
};

router.use(cookieParser());

router.get("/login", function (req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = "user-read-private user-read-email user-top-read";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

router.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, async function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        const userInfoResponse = await requestGet(options);
        const userInfo = userInfoResponse.body;

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          "http://localhost:5173/?" +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
              id: userInfo.id,
            })
        );
      } else {
        res.redirect(
          "http://localhost:5173/" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});

router.get("/refresh_token", function (req, res) {
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token,
        refresh_token = body.refresh_token;
      res.send({
        access_token: access_token,
        refresh_token: refresh_token,
      });
    }
  });
});

router.get("/user-info", (req, res) => {
  const accessToken = req.query.access_token;

  if (!accessToken) {
    return res.status(400).json({ error: "Access token is required" });
  }

  const options = {
    url: "https://api.spotify.com/v1/me",
    headers: { Authorization: "Bearer " + accessToken },
    json: true,
  };

  request.get(options, (error, response, body) => {
    if (error) {
      return res.status(500).json({ error: "Failed to fetch user data" });
    }
    res.status(200).json(body);
  });
});

/* 
  Getting a user's top tracks
*/
router.get("/top-tracks", (req, res) => {
  const accessToken = req.query.access_token;

  if (!accessToken) {
    return res.status(400).json({ error: "Access token is required" });
  }

  const options = {
    url: "https://api.spotify.com/v1/me/top/tracks",
    headers: { Authorization: "Bearer " + accessToken },
    json: true,
  };

  request.get(options, (error, response, body) => {
    if (error) {
      return res.status(500).json({ error: "Failed to fetch top tracks" });
    }
    res.status(200).json(body);
  });
});

router.get("/top-artists", (req, res) => {
  const accessToken = req.query.access_token;

  if (!accessToken) {
    return res.status(400).json({ error: "Access token is required" });
  }

  const options = {
    url: "https://api.spotify.com/v1/me/top/artists",
    headers: { Authorization: "Bearer " + accessToken },
    json: true,
  };

  request.get(options, (error, response, body) => {
    if (error) {
      return res.status(500).json({ error: "Failed to fetch top artists" });
    }
    res.status(200).json(body);
  });
});

router.get("/artist", (req, res) => {
  const accessToken = req.query.access_token;
  const artistId = req.query.artistId;

  if (!accessToken) {
    return res.status(400).json({ error: "Access token is required" });
  }

  const options = {
    url: `https://api.spotify.com/v1/artists/${artistId}`,
    headers: { Authorization: "Bearer " + accessToken },
    json: true,
  };

  request.get(options, (error, response, body) => {
    if (error) {
      return res
        .status(500)
        .json({ error: `Failed to fetch artist info with id ${artistID}` });
    }
    res.status(200).json(body);
  });
});
module.exports = router;
