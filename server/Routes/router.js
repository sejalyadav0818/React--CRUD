const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");

router.post("/create", (req, res) => {
  //console.log(req.body);
  const { name, email, age, work, add, desc } = req.body;
  // console.log(name , email , age , mobile , work , add , desc);
  console.log("out");
  if (!name || !email || !age || !work || !add || !desc) {
    res.status(402).json("fill all details");
    console.log("in");
  }

  try {
    conn.query(
      "SELECT * FROM temp_online_exam.admin_login where email= ?",
      email,
      (error, result) => {
        if (result.length) {
          res.status(422).json("user is already Register");
        } else {
          conn.query(
            `INSERT INTO temp_online_exam.admin_login SET ?;`,
            { name, email, age, work, add, desc },
            (error, result) => {
              if (error) {
                console.log(error);
              } else {
                res.status(422).json(req.body);
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

//regisetr data
router.get("/getusers", (req, res) => {
  conn.query("SELECT * FROM temp_online_exam.admin_login", (err, result) => {
    console.log(result);
    if (err) {
      res.status(422).json("Opps ! Data not avalible");
    } else {
      res.status(422).json(result);
    }
  });
});

//delete user
router.delete("/deleteuser/:id", (req, res) => {
  const { id } = req.params;

  conn.query(
    "DELETE FROM temp_online_exam.admin_login where id = ? ",
    id,
    (err, result) => {
      console.log(result);
      if (err) {
        res.status(422).json("Opps ! Data not avalible");
      } else {
        console.log(result);
        res.status(422).json(result);
      }
    }
  );
});

//get single user
router.get("/induser/:id", (req, res) => {
  const { id } = req.params;

  conn.query(
    "SELECT * FROM temp_online_exam.admin_login where id = ? ",
    id,
    (err, result) => {
      console.log(result);
      if (err) {
        res.status(422).json("Opps ! Data not avalible");
      } else {
        console.log(result);
        res.status(422).json(result);
      }
    }
  );
});

//get update/updateuser
router.patch("/updateuser/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  console.log(id, data);
  conn.query(
    "UPDATE temp_online_exam.admin_login SET ? WHERE id = ? ",
    [data, id],
    (err, result) => {
      console.log(result);
      if (err) {
        res.status(422).json("Opps ! Data not avalible");
      } else {
        console.log(result);
        res.status(201).json(result);
      }
    }
  );
});

module.exports = router;

// {
// {
//     "name" :	"varchar(45)",
// 	"email" :	"varchar(100)",
// 	"age" :	    "int",
// 	"mobile" :	"varchar(45)",
// 	"work" :	"varchar(45)",
// 	"add" :	    "varchar(45)",
// 	"desc" :	"varchar(45)"

// }
