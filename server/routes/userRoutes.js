import express from "express";
import { getUserProfile, createUser } from "../controllers/userController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

// Auth check endpoint
router.get("/check-auth", (req, res) => {
    if(req.oidc.isAuthenticated()){
        return res.status(200).json({
            isAuthenticated: true,
            user: req.oidc.user,
        });
    } else {
        return res.status(200).json({
            isAuthenticated: false,
            message: "Not authenticated"
        });
    }
});

// Create new user (public endpoint)
router.post("/register", createUser);

// Protected routes
router.get("/user/:id", protect, getUserProfile);

export default router;