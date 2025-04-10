const Butter = require("../butter");

const PORT = 8000;

const server = new Butter();

server.listen(PORT, () => {
  console.log("Server has started on port " + PORT);
});
