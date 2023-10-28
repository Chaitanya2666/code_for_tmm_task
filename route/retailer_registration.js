const express = require('express');
const retailer_reRouter = express.Router();      
const {post6,put6,delete6,get6,retailerLogin} = require('../controller/retailer_registration');
// routs
retailer_reRouter.post("/post6",post6);
retailer_reRouter.put("/put6",put6);
retailer_reRouter.delete("/delete6",delete6);
retailer_reRouter.get("/get6",get6);
retailer_reRouter.post("/retailerLogin",retailerLogin)
//...........
module.exports = {retailer_reRouter};