const net = require("net");
const fs = require("node:fs/promises")

const server = net.createServer(()=>{})

server.on("connection", (socket)=>{
    console.log("New Connection!");

    socket.on("data", async(data)=>{
        const fileHandle = await fs.open(`storage/test.txt`, "w");
        const fileStream = fileHandle.createWriteStream();


        // Writing to our destination file
        fileStream.write(data);
    })
})

server.listen(5050, "::1", () => {
    console.log("Uploader server opened on", server.address())
})