const dns = require("node:dns/promises");
// HERE WE ARE JUST LOOKING AT DOMAIN NAME SERVER (DNS). WHICH CAN TAKE DOMAIN NAME AND RETURN IP ADDRESS.
(async()=>{
    const result = await dns.lookup("google.com")
    console.log(result)
})()