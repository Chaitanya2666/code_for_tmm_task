const {connection} = require("../model/db");

let jwt=require('jsonwebtoken');

//..........................................................................................................................

// Routs for  retailer_registration.
// Rout  for post method

let post6=function (req, res) {
    let { retailer_id,shop_name,password,owner_name,registration_No,registration_doc,profile_photo,GST_No,Pan_No,Address,State,city,pin_code,Contact_No,Email,Register_on,status  } = req.body;
    let data = [retailer_id,shop_name,password,owner_name,registration_No,registration_doc,profile_photo,GST_No,Pan_No,Address,State,city,pin_code,Contact_No,Email,Register_on,status];
    let sql = "INSERT INTO retailer_registration(retailer_id,shop_name,password,owner_name,registration_No,registration_doc,profile_photo,GST_No,Pan_No,Address,State,city,pin_code,Contact_No,Email,Register_on,status) VALUES(?)";
    connection.query(sql, [data], function (err, result) {
      console.log("result", result);
      if (err) {
        res.send({
          errorcode: "405",
          message: `${mobile} already exists`,
          message: `${Email} already exists`,
        });
      } else {
        res.send(result);
      }
    });
  };
  
  //rout for put method
  
 let put6 = function(req, res){
    let retailer_id = req.query.retailer_id;
    let { shop_name,password,owner_name,registration_No,registration_doc,profile_photo,GST_No,Pan_No,Address,State,city,pin_code,Contact_No,Email,Register_on,status  } = req.body;
    let sql = 'UPDATE retailer_registration SET shop_name = ?,password = ?,owner_name = ?,registration_No = ? ,registration_doc = ? ,profile_photo = ?,GST_No,Pan_No = ?,Address = ?,State = ?,city = ?,pin_code = ?,Contact_No = ? ,Email = ?,Register_on = ?,status =? WHERE retailer_id = ?';
  
    connection.query(sql, [retailer_id,shop_name,password,owner_name,registration_No,registration_doc,profile_photo,GST_No,Pan_No,Address,State,city,pin_code,Contact_No,Email,Register_on,status], function(err, result){
        if(err){
            res.send({
                "errorcode": "407",
                "message": err.sqlMessage
            });
        }
        else{
            res.send(result);
        }
    })
  }
  
  
  // rout for delete method
  
 let delete6= function(req, res){
    let sql = "DELETE FROM retailer_registration WHERE  retailer_id = ?";
    connection.query(sql, [req.query.retailer_id], function(err, result){
      if(err){
          res.send({
              "errorcode": "408",
              "message": err.sqlMessage
          });
      }
      else{
          res.send(result)
      }
  })
  }
  
  // rout for get method
  
  let get6= function(req, res){
    let sqlquery = "SELECT * FROM retailer_registration";
    connection.query(sqlquery, function(err, result){
        if(err){
         console.log(error.sqlMessage);
        }
        else{
            res.send(result)
        }
    })
  }



//////////login api///////////////////////////////////



          let retailerLogin = async (req, res) => {
    try {
        let { retailer_id, password } = req.body;
        console.log({ retailer_id, password });
        let sqlQuery = "SELECT retailer_id,password,status,owner_name from retailer_registration where retailer_id= ? ";
        let a = await connection.query(sqlQuery, retailer_id, async function (error, result){
           
            const secretKey = 'secret-key';
            const options = {
                expiresIn: '1000000s',
            
            };

            const token = jwt.sign({ retailer_id }, secretKey, options.expiresIn);
            const getUser = jwt.verify(token, secretKey);
            console.log("token ", getUser);
            if (error) {
                return res.json({ status: 400, response: error.message })
            }
            if (result.length == 0) {
                return res.json({ status: 400, response: "user not found " })
            }

            if (result[0].password == password) {
                if (result[0].status === "active") {
                    return res.json({ status: 200, response: "user logged in",token })
                } else {
                    return res.json({ status: 400, response: "your account is blocked please contact admin" })
                }
            } else {
                res.json({ status: 400, response: "invalid credential" })
            }


        })
    } catch (error) {
        res.json({ status: 400, response: error.message })
    }
}












  module.exports={post6,put6,delete6,get6,retailerLogin};