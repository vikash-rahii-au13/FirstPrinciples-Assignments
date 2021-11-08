import express from 'express';
import multer from 'multer';
var router   = express.Router()
import { check, validationResult } from 'express-validator';
import userController from '../controller/usercontroller';
import middleware from '../middleware/auth'
//multer config
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  });
  
  const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif' || file.mimetype === 'image/tiff') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
  // image path
  // limit: 5mb
  // filter : png, jpeg,jpg
  
  var upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });
  

router.get('/my-profile', middleware.verifyToken, userController.myProfile );
router.post('/change-profile-image', upload.single('profileImage') ,middleware.verifyToken, userController.changeProfilePic );
router.post('/change-cover-image', upload.single('coverImage') ,middleware.verifyToken, userController.changeCoverPic );


module.exports = router;