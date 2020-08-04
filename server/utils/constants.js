const dbUser = process.env.DB_USER || "username";
const dbPassword = process.env.DB_PASSWORD || "password";
const dbName = process.env.DB_NAME || "databaseName";

module.exports = {
  db: `mongodb+srv://${dbUser}:${dbPassword}@cluster0-xxxxx.mongodb.net/${dbName}?retryWrites=true&w=majority`,
};
