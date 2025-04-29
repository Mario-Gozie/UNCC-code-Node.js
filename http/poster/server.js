const Butter = require("../butter");

// A sample object in this array would look like:
// {userId : 1, token: 23230384}

const SESSIONS = [];

const USERS = [
  { id: 1, name: "Liam Brown", username: "liam23", password: "string" },
  { id: 2, name: "Meredith Green", username: "marit.sky", password: "string" },
  { id: 3, name: "Ben Adams", username: "ben.poet", password: "string" },
];

const POSTS = [
  {
    id: 1,
    title: "This is a post title",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    userId: 1,
  },
];

const PORT = 8000;

const server = new Butter();

// Creating MiddleWare.

// server.beforeEach((req, res, next) => {
//   console.log("This is the middleware function!");
//   next();
// });

// server.beforeEach((req, res, next) => {
//   setTimeout(() => {
//     console.log("This is the second middleware function!");
//     next();
//   }, 2000);
// });

// server.beforeEach((req, res, next) => {
//   console.log("This is the third middleware function!");
//   next();
// });

// ------------------Files Routes ---------------------------- //

server.route("get", "/", (req, res) => {
  console.log("This is the / route");
  res.sendFile("./public/index.html", "text/html");
});
server.route("get", "/login", (req, res) => {
  res.sendFile("./public/index.html", "text/html");
});
server.route("get", "/profile", (req, res) => {
  res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/styles.css", (req, res) => {
  res.sendFile("./public/styles.css", "text/css");
});

server.route("get", "/scripts.js", (req, res) => {
  res.sendFile("./public/scripts.js", "text/javascript");
});

// --------- JSON ROUTE ---------------------

// Log a User in and give them a token.

server.route("post", "/api/login", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString("utf-8");
  });

  req.on("end", () => {
    body = JSON.parse(body);

    console.log(body);
    const username = body.username;
    const password = body.password;

    // Check if the user exist
    const user = USERS.find((user) => user.username === username);

    if (user && user.password === password) {
      // At this point, we know that the client is who they say they are;

      // generate random 10 digit token
      const token = Math.floor(Math.random() * 100000000000).toString(); //generating a random number, flooring it and converting it to string as a token.

      SESSIONS.push({ userId: user.id, token: token });
      console.log(SESSIONS);

      res.setHeader("Set-Cookie", `token = ${token}; path=/`); // Here I am saying set the token as part of the header for and send to the browser. then it should be returned for every request that has "/" that is why the path is there.

      res.status(200).json({ message: "Logged in successfully!" });
    } else {
      res.status(401).json({ error: "Invalid username or password. " });
    }
  });
});

server.route("delete", "/api/logout", (req, res) => {});

// Send User Info

server.route("get", "/api/user", (req, res) => {
  const token = req.headers.cookie.split("=")[1]; // get the token which will return something like token=28923612593. split it on the equal sighn and grab the value at position 1
  console.log(token);

  const session = SESSIONS.find((session) => session.token === token); //checking if a token match a perticular id in the session and returning that particular object of the array.

  if (session) {
    // Sending user profile info
    const user = USERS.find((user) => user.id === session.userId);

    res.json({ username: user.username, name: user.name });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Update a user info
server.route("put", "/api/user", (req, res) => {});

// send a list of all posts
server.route("get", "/api/posts", (req, res) => {
  const posts = POSTS.map((post) => {
    const user = USERS.find((user) => user.id === post.id); // Checking if user id matches post user id.

    post.author = user.name; // setting the authour to the based on the post user id.

    return post;
  });
  res.status(200).json(posts);
});

// Create a new post

server.route("post", "/api/logout", (req, res) => {});

server.listen(PORT, () => {
  console.log("Server has started on port " + PORT);
});
