import express from 'express';
var router   = express.Router()
import { check, validationResult } from 'express-validator';
import authController from '../controller/authcontroller';
import middleware from '../middleware/auth'
router.post('/signup',
[
    check("name", "Please Enter a Valid Username")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").matches(/.+\@.+\..+/)
      .withMessage("Email must contain @"),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
],
authController.signup);
router.post('/login', authController.login)
router.put('/change-password',middleware.verifyToken,
[
  check("oldPassword", "Please Enter old password").not().isEmpty(),
  check("newPassword", "Please Enter new password").not().isEmpty(),
  check("confirmPassword", "Please Enter new password again").not().isEmpty() 
],
authController.changePassowrd)




module.exports = router;
   