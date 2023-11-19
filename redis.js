const redis = require("redis");

const client = redis.createClient();

client.on("connect", () => {
  console.log("Connected to Redis");
});
client.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});

module.exports = client;
