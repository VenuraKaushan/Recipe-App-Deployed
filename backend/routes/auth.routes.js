import express from "express";
import {
  signin,
  signup,
  google,
  logout,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.post("/google", google);

export default router;
