const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const cors = require("cors"); // <-- add this

dotenv.config();

const app = express();
const port = 3000;

// ✅ Enable CORS
app.use(cors({
  origin: "http://localhost:5173", // allow your React app
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// MongoDB connection setup
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "passop";

let collection; // global variable to store collection reference

async function main() {
  try {
    await client.connect();
    console.log("✅ Connected successfully to MongoDB server");

    const db = client.db(dbName);
    collection = db.collection("passwords");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}

main();

//  GET all passwords
app.get("/", async (req, res) => {
  try {
    const findResult = await collection.find({}).toArray();
    const resultWithIds = findResult.map((item) => ({
      ...item,
      id: item._id.toString(), // ✅ convert MongoDB _id → id
    }));
    res.json(resultWithIds);
  } catch (err) {
    console.error("❌ Error fetching passwords:", err);
    res.status(500).json({ error: "Failed to fetch passwords" });
  }
});


//  POST new password
app.post("/", async (req, res) => {
  try {
    const { site, username, password, id } = req.body;
    if (!site || !username || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await collection.insertOne({ site, username, password, id });
    res.json({ success: true, insertedId: result.insertedId });
    console.log("✅ Password saved:", { site, username });
  } catch (err) {
    console.error("❌ Error saving password:", err);
    res.status(500).json({ error: "Failed to save password" });
  }
});


//  Route: Delete a password by ID
app.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("🗑️ Deleting password with id:", id);

    // convert to MongoDB ObjectId
    const { ObjectId } = require("mongodb");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.json({ success: true, message: "Password deleted successfully" });
    } else {
      res.status(404).json({ error: "Password not found" });
    }
  } catch (err) {
    console.error("❌ Error deleting password:", err);
    res.status(500).json({ error: "Failed to delete password" });
  }
});

// Route: Update a password by ID
app.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { site, username, password } = req.body;
    const { ObjectId } = require("mongodb");

    if (!site || !username || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { site, username, password } }
    );

    if (result.modifiedCount === 1) {
      res.json({ success: true, message: "Password updated successfully" });
    } else {
      res.status(404).json({ error: "Password not found" });
    }
  } catch (err) {
    console.error("❌ Error updating password:", err);
    res.status(500).json({ error: "Failed to update password" });
  }
});


// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
