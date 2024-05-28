const express = require("express");
const db = require("./db");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await db.query("SELECT * FROM Users WHERE UserID = $1", [
      userId,
    ]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
