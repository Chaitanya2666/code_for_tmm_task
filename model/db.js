let mysql = require("mysql");
let connection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"project"
});
connection.connect(function(err){
    if(err){
        console.log("Not connected",err)
    }
    else {
        console.log ("connected")
    }
})
 
module.exports = {connection};