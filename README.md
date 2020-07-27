# zoomitlist

This project created for listing the latest posts of [zoomit](https://zoomit.ir) site in different way or even better. The information will update every 3hours.

(The spiritual value of all posts and content belongs to Zommit site)

For watching the live version see [this](https://zoomitlist.herokuapp.com)
## Run the project
For running the project you should have node.js installed and after clone the project, in project's directory in each **client** and **server** folder run :
```bash
npm ci
```
or
```bash
npm install
```
### Run the server
For running server in development mode run:
(for API)
```bash
npm run dev-api
```
and 
(for Background Work)
```bash
npm run dev-bw
```
In build mode run:
(for API)
```bash
npm run start-api
```
and 
(for Background Work)
```bash
npm run start-bw
```
### CAUTION!
When you run background worker, its automaticly starts to updating the database. So you must modify ```/server/util/constants.js``` with your mongoDB informations.
otherwise you will face some errors.

### Run the client
run:
```bash
npm start
```
the client project automaticly fetch data from original server. If you want change, you have to change it manualy.

## For production:
for production, in client folder run:
```bash
npm run build
```
and then replace the build folder with the ```/server/public/build``` in server folder.
then run ```npm run start-api``` and ```npm run start-bw```.


## Dependencies

**client side:**
react.js,
redux,
react-redux,
react-router-dom,
axios

**server side:**
express.js,
Cheerio.js,
mongoDB,
mongoose,
axios
