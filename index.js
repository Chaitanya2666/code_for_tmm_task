let express = require("express");
let cors = require('cors');

let app = express();
app.use(express.json())
app.use(cors());










//retailer_registration
const {retailer_reRouter } = require("./route/retailer_registration");
app.use("/api",retailer_reRouter);
//.......................................






app.listen(6000, function () {
    console.log("Server is running on port 6000...");
});





