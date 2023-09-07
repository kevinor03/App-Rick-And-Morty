const http = require("http")
const characters = require("./utils/data")

http.createServer((req, res) => {

    const { url } = req
    res.setHeader("Access-Control-Allow-Origin", "*")

    if (url.includes("rickandmorty/character")) {
        let urlId = url.split("/").pop()
        let found = characters.find(
            (character) => character.id === Number(urlId)
        );

        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify(found))
    }

}).listen(3001)