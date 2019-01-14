/* this is a node module for running scripts on the console */
const { execSync } = require('child_process');


/* you have to be logged in to Heroku CLI locally*/
export function getDataBaseURLonLocal() {
    /*  execute console or terminal command by blocking the event loop,
    retreives the database uri from Heroku CLI in DEV */
  execSync('heroku config:get MONGODB_URI -a gps-tourist-app', (err, out) => {
    if (err) {
      return err;
    }
    /* remove last character,  its a new line character*/
    return out.substring(0, out.length - 1);
  });
}
