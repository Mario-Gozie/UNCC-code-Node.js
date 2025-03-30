const net = require("net");
const fs = require("node:fs/promises")

const server = net.createServer(()=>{})

let fileHandle, fileStream; // These things are defined there to avoid scope issue. in other words, using it within a function.


server.on("connection", (socket)=>{
    console.log("New Connection!");

    socket.on("data", async(data)=>{

        // Checking if fileHandle is open and if it is I write directly. if it is not, I open before I write.
        if(!fileHandle){
            fileHandle = await fs.open(`storage/test.txt`, "w");
        fileStream = fileHandle.createWriteStream();


        // Writing to our destination file
        fileStream.write(data);
        }else{
            fileStream.write(data)
        }
        

        
    })

    socket.on("end", ()=>{
        console.log("Connection ended!")
        fileHandle.close()
    })
})

server.listen(5050, "::1", () => {
    console.log("Uploader server opened on", server.address())
})