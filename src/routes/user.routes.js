import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { uploadUserFiles } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(uploadUserFiles, registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT,logoutUser);


export default router;
