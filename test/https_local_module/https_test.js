const https = require("./https.js");

const responseData = https.makeRequest("https://www.naver.com/", "any data");

console.log("responseData:", responseData);
