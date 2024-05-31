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

const client_id = process.env.clientId;
const client_secret = process.env.clientSecret;

const redirect_uri = "http://localhost:5001/spotify/callback";

const stateKey = "spotify_auth_state";

// Utilizing firebase to store items
const db = require("./firebase");
const {
  collection,
  getDocs,
  updateDoc,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  query,
  where,
} = require("firebase/firestore");

const generateRandomString = (length) => {
  return crypto.randomBytes(60).toString("hex").slice(0, length);
};

router.use(cookieParser());

router.get("/login", function (req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope =
    "user-read-private user-read-email user-library-read user-top-read";
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

router.delete("/logout/:id", async (req, res) => {
  try {
    console.log(req.params);
    const id = req.params.id;
    await deleteDoc(doc(db, "users", id));
    res.status(200).json({ message: `Successfully deleted user` });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
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
        // grab the user's info
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        const usersResponse = await requestGet(options);
        const user = usersResponse.body;

        let userdata = {};

        userdata.display_name = user.display_name;
        userdata.user_id = user.id;
        // userdata.user_image = user.images[1].url;
        if (user.images.length > 0){
          userdata.user_image = user.images[0].url;
        }
        else{
          userdata.user_image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
        }

        const docsnap = await getDoc(doc(db, "users", user.id));
        if (docsnap.exists()) {
          await updateDoc(doc(db, "users", user.id), userdata);
        } else {
          await setDoc(doc(db, "users", user.id), userdata);
        }

        // console.log(usersResponse.body);

        //get a list of the songs saved in the current spotify user's library
        options = {
          url: "https://api.spotify.com/v1/me/tracks",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        const users_likedtracksResponse = await requestGet(options);
        const users_likedtracks = users_likedtracksResponse.body;
        let likedsongsdata = [];

        // console.log(users_likedtracks);

        // displays track
        users_likedtracks.items.forEach((track) => {
          // initializing empty object
          let trackdata = {};

          trackdata.track_album = track.track.album.name;
          trackdata.track_artist = track.track.artists[0].name;
          trackdata.track_img = track.track.album.images[1].url;
          trackdata.track_name = track.track.name;

          // track information
          // console.log(trackdata);

          likedsongsdata.push(trackdata);

          // Access the album object within each track
          // const album = track.track.album;
          // console.log("This is the album's artists: ", album.artists);
        });

        await updateDoc(doc(db, "users", user.id), {
          liked_tracks: likedsongsdata,
        });

        // console.log(likedsongsdata);

        // grab the user's top artists'
        options = {
          url: "https://api.spotify.com/v1/me/top/artists",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        const users_topartistsResponse = await requestGet(options);
        const users_topartists = users_topartistsResponse.body;

        let topartistsdata = [];

        users_topartists.items.forEach((artist) => {
          let topartist = {};

          topartist.artist_name = artist.name;
          topartist.artist_img = artist.images[1].url;

          topartistsdata.push(topartist);
          // console.log(artist.images);
        });

        // console.log(topartistsdata);

        await updateDoc(doc(db, "users", user.id), {
          top_artists: topartistsdata,
        });

        // grab user's top tracks
        options = {
          url: "https://api.spotify.com/v1/me/top/tracks",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        const users_toptracksResponse = await requestGet(options);
        const users_toptracks = users_toptracksResponse.body;

        let toptracksdata = [];

        users_toptracks.items.forEach((track) => {
          // console.log(track);

          let trackdata = {};

          // parsing for the specific information we want in the track
          trackdata.track_album = track.album.name;
          trackdata.track_artist = track.artists[0].name;
          trackdata.track_img = track.album.images[1].url;
          trackdata.track_name = track.name;

          // track information
          // console.log(trackdata);

          toptracksdata.push(trackdata);
        });

        // console.log(toptracksdata);

        await updateDoc(doc(db, "users", user.id), {
          // in our database, we will initialize a field called top_tracks that will contain the array of objects called toptracksdata
          top_tracks: toptracksdata,
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          "http://localhost:5173/home/?" +
            querystring.stringify({
              id: user.id,
            })
        );
      } else {
        res.redirect(
          "http://localhost:5173/#" +
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

module.exports = router;
