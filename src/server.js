// this server could be anywhere, I personally use an isolated server in express js
// this solution is for setting cookie on server
// a path needs to exist on local server with the following

// ... app is an express app
const cors = require("cors");
const bodyParser = require("body-parser");

const express = require("express");
const app = express();
const port = 3000;
app.use(cors());
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.post("/localdata/setsession", (req, res) => {
  console.log("post /localdata/setsession");
  // read req and save cookie
  const body = req.body;
  console.log(body);
  // notice the HttpOnly
  res.cookie(body.cookieName, JSON.stringify(body.auth), {
    expires: new Date(body.auth.expiresAt),
    sameSite: "lax",
    // in production
    secure: true,
    httpOnly: true,
  });
  res.send(true);
});

app.post("/localdata/logout", (req, res) => {
  console.log("post /localdata/logout");
  // read req and save cookie
  const body = req.body;

  res.clearCookie(body.cookieName, {
    sameSite: "lax",
    secure: false,
    httpOnly: true,
  });
  res.send(true);
});

app.post("/api/auth/login", (req, res) => {
  console.log("post /api/auth/login");
  // read req and save cookie
  const body = req.body;
  if (body.username === "error") {
    res.status(500).send({ error: "error", code: "CODE", message: "message" });
  }
  const data = {
    accessToken: "some_acces_token",
    refreshToken: "some_refresh_token",
    payload: {
      id: "841fca92-eba8-48c8-8c96-92616554c590",
      email: "aa@gmail.com",
    },
    expiresIn: 3600,
  };
  const response = { data };

  res.send(response);
});

app.get("/api/auth/me", (req, res) => {
  console.log("get /api/auth/me");
  // read req and save cookie

  const data = {
    id: null,
    newUser: true,
  };
  const response = { data };

  res.send(response);
});

// crud service
app.post("/api/auth/users", (req, res) => {
  console.log("add /api/auth/users");
  // read req and save cookie
  const body = req.body;

  const data = {
    fullName: "fullName",
    username: "userName",
    email: "some_refresh_token",
    status: "ACTIVE",
    role: "ADMIN",
  };
  const response = { data };

  res.send(response);
});

app.get("/api/auth/users", (req, res) => {
  console.log("get list /api/auth/users");
  // read req and save cookie

  const data = [];

  for (let i = 1; i < 100; i++) {
    let row = {
      id: i + "",
      fullName: "full Name",
      username: "userName",
      email: "email@email.cpm",
      status: "ACTIVE",
      role: "ADMIN",
    };
    data.push(row);
  }

  const response = { data };

  res.send(response);
});

app.put(" put /api/auth/users", (req, res) => {
  console.log("add /api/auth/users");
  // read req and save cookie
  const body = req.body;

  const data = {
    fullName: "fullName",
    username: "userName",
    email: "some_refresh_token",
    status: "ACTIVE",
    role: "ADMIN",
  };
  const response = { data };

  res.send(response);
});

app.get("get one /api/auth/users/{id}", (req, res) => {
  console.log("add /api/auth/users");
  // read req and save cookie

  const data = {
    id: i + "",
    fullName: "fullName",
    username: "userName",
    email: "some_refresh_token",
    status: "ACTIVE",
    role: "ADMIN",
  };
  const response = { data };

  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
