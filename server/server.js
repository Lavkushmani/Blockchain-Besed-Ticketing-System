const express = require("express")
const app = express()
const mysql = require("mysql")
const cors=require("cors")

const bodyparser=require("body-parser")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Komal@123KEW",
    database: "tms"
})

app.use(cors())
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.post("/login", async (req, res) => {
    try {
      const { userid, password } = req.body;
  
      const query =
        "SELECT * FROM login WHERE userid = ? AND password = ?";
  
      db.query(query, [userid, password], (error, results) => {
        if (error) {
        // console.error(error);
          res.status(500).send("Internal Server Error");
        } else {
          //console.log(results);
          res.send(results);
        }
      });
    } catch (err) {
     // console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });

  app.post('/insertuser', async (req, res) => {
    try {
  
      // Define query to insert form data into database
      const query = `
        INSERT INTO login (userid, password)
        VALUES (?, ?)
      `;
  
      // Execute query to insert form data
      db.query(
        query,
        [
          req.body.userid,
          req.body.password
        ],
        (error, results) => {
          if (error) {
            //console.error(error);
            res.status(500).send({ success: false, message: 'Failed to insert form data' });
          } else {
            // Send success response
            res.status(200).send({ success: true, data: results });
          }
        }
      );
    } catch (error) {
      // Log any errors
      console.error(error);
  
      // Send error response
      res.status(500).send({ success: false, message: 'Failed to insert form data' });
    }
  });
  
  

app.listen(3001, () => {
    console.log("Running on port 3001")
})