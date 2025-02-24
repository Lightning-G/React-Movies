const express = require("express");
const router = express.Router();
const pool = require("../db"); // Ensure this is your PostgreSQL connection
const authenticateToken = require("../middleware/authMiddleware"); // ✅ Correct






// ✅ Add a movie to favorites
router.post("/:movie_id", authenticateToken, async (req, res) => {
    const { movie_id } = req.params;
    const user_id = req.user.id; // Ensure user_id comes from the token

    if (!user_id) {
        return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }

    try {
        const insertResult = await pool.query(
            "INSERT INTO favorites (user_id, movie_id) VALUES ($1, $2) RETURNING *",
            [user_id, movie_id]
        );

        res.status(201).json(insertResult.rows[0]); // Return the inserted row
    } catch (error) {
        console.error("Error adding favorite:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Get all favorites for logged-in user
router.get("/", authenticateToken, async (req, res) => {
    const user_id = req.user.id;  // Ensure the middleware is attaching this

    try {
        const result = await pool.query(
            "SELECT * FROM favorites WHERE user_id = $1",
            [user_id]
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({ error: "Server error" });
    }
});


// ✅ Remove a movie from favorites
router.delete("/:movie_id", authenticateToken, async (req, res) => {
    const { movie_id } = req.params;
    const user_id = req.user.id;

    try {
        const deleteResult = await pool.query(
            "DELETE FROM favorites WHERE movie_id = $1 AND user_id = $2",
            [movie_id, user_id]
        );

        if (deleteResult.rowCount === 0) {
            return res.status(404).json({ error: "Favorite not found" });
        }

        res.json({ message: "Favorite removed!" });
    } catch (error) {
        console.error("Error removing favorite:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;
