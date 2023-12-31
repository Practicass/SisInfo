

const express = require("express")
const router = express.Router()
const multer = require("multer");
const UserController = require("../controllers/usuario")
const auth  = require("../middlewares/auth")

// Configuracion de subida
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/avatars/")
    },
    filename: (req, file, cb) => {
        cb(null, "avatar-"+Date.now()+"-"+file.originalname);
    }
});

const uploads = multer({storage});



router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.get("/profile/:id", auth.auth, UserController.profile)
router.get("/profileById/:id", UserController.profileById)
router.put("/update", auth.auth, UserController.update)
router.post("/upload", [auth.auth, uploads.single("file")], UserController.upload)
router.get("/avatar/:file", auth.auth, UserController.avatar)
router.get("/counters/:id?", auth.auth, UserController.counters)
router.get("/searchUsers/:searchTerm", auth.auth, UserController.searchUsers)
router.get("/searchRequests", auth.auth, UserController.searchRequests)



module.exports = router