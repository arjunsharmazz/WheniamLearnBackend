import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

import {ApiResponse} from "../utils/ApiResponse.js"
const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "ok"
    })
    console.log("helo")

    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    // get user details from frontend
    const { fullname, email, username, password } = req.body
    console.log("user", email)


    // if(fullname===""){
    //     throw new ApiError(400,"Full Nsme Is Required ")
    // }
    // validation - not empty
    if ([fullname, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Full Nsme Is Required ")
    }


    // check if user already exists: username, email
    const existedUser = User.findOne({
        $or: [{ username }, [email]]

    })
    if (existedUser) {
        throw new ApiError(409, "User WIth EAmil Name Already Exist ")
    }


    // check for images, check for avatar
    // check for images, check for avatar
    const avtarLocalPath = req.files?.avtar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avtarLocalPath) {
        throw new ApiError(402, "nhi himage ")
    }


    // upload them to cloudinary, avatar

    const avatar = await uploadOnCloudinary(avtarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if (!avtar){
          throw new ApiError(402, "nhi himage ")
    }
   // create user object - create entry in db
      // upload them to cloudinary, avatar
    const user = await User.create({
        fullname,
        avtar:avtar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()  
    })

   // check for user creation   
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"  
    )

    if(!createdUser){
        throw new ApiError(505,"bhai server ki galti h ")
    }



    return res.status(201).json(
        new ApiResponse(200,createdUser,"user cretaed hpgya j ")
    )



})


export { registerUser }