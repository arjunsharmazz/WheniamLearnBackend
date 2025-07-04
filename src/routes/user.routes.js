import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, getUserChannelProfile, getWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage } from "../controllers/user.controller.js";
import { uploadUserFiles } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(uploadUserFiles, registerUser);
router.route("/login").post(loginUser);
//securw routesss
router.route("/logout").post(verifyJWT,logoutUser);

router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)
 
export default router;
