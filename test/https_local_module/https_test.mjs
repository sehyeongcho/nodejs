import { makeRequest } from "./https.mjs";

const responseData = makeRequest("https://www.naver.com/", "any data");

console.log("responseData:", responseData);
