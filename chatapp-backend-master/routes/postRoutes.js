const express = require('express');
const router = express.Router();
const PostCtrl = require('../controllers/posts');
const AuthHelper = require('../Helpers/AuthHelper');

router.get('/posts', AuthHelper.VerifyToken, PostCtrl.GetAllPosts);
router.get('/post/:id', AuthHelper.VerifyToken, PostCtrl.GetPost);

router.post('/post/add-post', AuthHelper.VerifyToken, PostCtrl.AddPost);
router.post('/post/add-like', AuthHelper.VerifyToken, PostCtrl.AddLike);
router.post('/post/add-comment', AuthHelper.VerifyToken, PostCtrl.AddComment);
router.delete('/post/delete-post/:postId', AuthHelper.VerifyToken, PostCtrl.DeletePost);

module.exports = router;


/*
exports.PostById = (req, res, next, id) => {
    console.log("Called");
    Post.findById(id).exec((err, post) => {
        if (error || !post) {
            return res.status(400).json({
                error: "No Post Found"
            });
        }

        req.post = post;
        next();
    });
};
*/