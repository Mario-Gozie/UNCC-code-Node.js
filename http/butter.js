const http = require("node:http");
const fs = require("node:fs/promises");

class Buttter {
  constructor() {
    this.server = http.createServer();
    /**
     * {
     * "get /": {}=>{},
     * "post /upload": () =>{ ... }
     *
     * }
     */
    this.routes = {};
    this.middleware = [];

    this.server.on("request", (req, res) => {
      // Send a file back to the client
      res.sendFile = async (path, mime) => {
        const fileHandle = await fs.open(path, "r");
        const fileStream = fileHandle.createReadStream();
        res.setHeader("Content-Type", mime);

        fileStream.pipe(res);
      };

      // set the statuscode of the response
      res.status = (code) => {
        res.statusCode = code;
        return res;
      };

      // send a Json data back to the client (for small json data, less than the highWaterMark) eg res.writeableHighWaterMark or req.readableHighWaterMark (which is just how much a buffer can contain)
      res.json = (data) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data)); // we are writing to this end here because the Json file is less than the highwatermark value so there is no need to create streams.
      };

      // run all the middleware functions before running the corresponding route

      // this.middleware[0](req, res, () => {
      //   this.middleware[1](req, res, () => {
      //     this.middleware[2](req, res, () => {
      //       this.routes[req.method.toLocaleLowerCase() + req.url](req, res);
      //     });
      //   });
      // });

      const runMiddleware = (req, res, middleware, index) => {
        // Out exit point ...
        if (index === this.middleware.length) {
          // if the routes object does not have a key of req.method + req.url, return 404

          if (!this.routes[req.method.toLocaleLowerCase() + req.url]) {
            return res
              .status(404)
              .json({ error: `Cannot ${req.method} ${req.url}` });
          }

          this.routes[req.method.toLocaleLowerCase() + req.url](req, res);
        } else {
          middleware[index](req, res, () => {
            runMiddleware(req, res, middleware, index + 1);
          });
        }
      };

      runMiddleware(req, res, this.middleware, 0);
    });
  }

  route(method, path, cb) {
    this.routes[method + path] = cb;
  }

  beforeEach(cb) {
    this.middleware.push(cb);
  }

  listen(port, cb) {
    this.server.listen(port, () => {
      cb();
    });
  }
}

module.exports = Buttter;
