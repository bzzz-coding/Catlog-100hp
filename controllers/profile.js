const cloudinary = require("../middleware/cloudinary")
const Cat = require("../models/Cat")
const User = require("../models/User")
const utils = require('../helpers/utils')
const moment = require('moment')

module.exports = {
  getProfile: async (req, res) => {
    try {
      const cats = await Cat.find({ volunteer: req.user.id }).sort({archived: "asc", urgent:'desc', needsHomeBy: 'asc'}).lean();
      cats.forEach(cat => cat.age = utils.getAgeFromBirthday(cat.birthday))
      res.render("profile.ejs", { cats, user: req.user, moment });
    } catch (err) {
      console.log(err);
    }
  },
  updateProfile: async (req, res) => {
    try {
      console.log(req.user.id)
      let user = await User.findById(req.user.id).lean()
      console.log(user)

      // if user loaded a new image file
      if (req.file) {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        req.body.image = result.secure_url
        req.body.cloudinaryId = result.public_id
        // Delete old image from cloudinary if there is one
        if (user.cloudinaryId) {
          await cloudinary.uploader.destroy(user.cloudinaryId);
        }
      }

      user = await User.findOneAndUpdate({ _id: req.user.id }, req.body, {
        new: true,
        runValidators: true,
      })
      res.redirect('/profile') 
    } catch (err) {
      console.log(err)
      return res.render('error/500.ejs')
    }
  }
  
  // getFeed: async (req, res) => {
  //   try {
  //     const posts = await Post.find().sort({ createdAt: "desc" }).lean();
  //     res.render("feed.ejs", { posts: posts });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // getPost: async (req, res) => {
  //   try {
  //     const post = await Post.findById(req.params.id);
  //     const comments = await Comment.find({post:req.params.id}).sort({createdAt: "asc"}).lean();
  //     res.render("post.ejs", { post: post, user: req.user, comments: comments });//if issues make 'comments' singular
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },

  // // Add a new cat profile
  // addCat: async (req, res) => {
  //   try {
  //     req.body.volunteer = req.user.id
  //     // Upload image to cloudinary
  //     const result = await cloudinary.uploader.upload(req.file.path);
  //     req.body.image = result.secure_url
  //     req.body.cloudinaryId = result.public_id

  //     // console.log(req.body) 

  //     await Cat.create(req.body)

  //     console.log('Cat profile has been added!')
  //     res.redirect("/profile");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // likePost: async (req, res) => {
  //   try {
  //     await Post.findOneAndUpdate(
  //       { _id: req.params.id },
  //       {
  //         $inc: { likes: 1 },
  //       }
  //     );
  //     console.log("Likes +1");
  //     res.redirect(`/post/${req.params.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // deletePost: async (req, res) => {
  //   try {
  //     // Find post by id
  //     let post = await Post.findById({ _id: req.params.id });
  //     // Delete image from cloudinary
  //     await cloudinary.uploader.destroy(post.cloudinaryId);
  //     // Delete post from db
  //     await Post.remove({ _id: req.params.id });
  //     console.log("Deleted Post");
  //     res.redirect("/profile");
  //   } catch (err) {
  //     res.redirect("/profile");
  //   }
  // },
};
