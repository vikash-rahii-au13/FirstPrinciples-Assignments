import express from 'express';
var router = express.Router()
import { check, validationResult } from 'express-validator';
import postController from '../controller/postController';
import middleware from '../middleware/auth'
router.post('/create', [
    //check("oldPassword", "Please Enter old password").not().isEmpty(),
    check("isPrivate", "Please select true  or false").not().isEmpty(),
], middleware.verifyToken, postController.createPost);
router.put('/edit/:postId', middleware.verifyToken, postController.updatePost);
router.delete('/:postId', middleware.verifyToken, postController.deletePost);
router.get('/', middleware.verifyToken, postController.getAllPost);
router.get('/public', middleware.verifyToken, postController.getAllPublicPost);


module.exports = router;
