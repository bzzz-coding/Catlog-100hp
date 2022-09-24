const cloudinary = require("../middleware/cloudinary");
const Cat = require("../models/Cat")
const utils = require('../helpers/utils')
const Comment = require('../models/Comment');
const moment = require('moment')

module.exports = {

  // @desc    Show add page
  // @route   GET /addCat
  getAddCatPage: (req, res) => {
    res.render("cats/addCat.ejs");
  },

  // @desc    Add a new cat
  // @route   POST /cat/add
  add: async (req, res) => {
    try {
      req.body.volunteer = req.user.id

      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      req.body.image = result.secure_url
      req.body.cloudinaryId = result.public_id

      console.log(req.body)

      await Cat.create(req.body)

      console.log('Cat profile has been added!')
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },

  // @desc    Show one cat
  // @route   GET /cat/:id
  getCat: async (req, res) => {
    try {
      const cat = await Cat.findById(req.params.id);
      const comments = await Comment.find({cat:req.params.id}).sort({createdAt: "asc"}).lean();

      // const catAge = functions.getAgeFromBirthday(cat.birthday)
      const catAge = utils.getAgeFromBirthday(cat.birthday)


      res.render("cats/showCat.ejs", { cat, catAge, user: req.user, comments, moment });
    } catch (err) {
      console.log(err);
    }
  },

  // @desc    Show edit page
  // @route   GET /cat/edit/:id
  editCat: async (req, res) => {
    try {
      const cat = await Cat.findOne({
        _id: req.params.id,
      }).lean()

      if (!cat) {
        return res.render('error/404.ejs')
      }

      if (cat.volunteer != req.user.id) {
        return res.redirect('/profile')
      } else {
        res.render('cats/editCat', {
          cat, moment
        })
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500.ejs')
    }
  },

  // @desc    Show edit page
  // @route   POST /cat/:id
  updateCat: async (req, res) => {
    console.log(req.params.id)
    try {
      let cat = await Cat.findById(req.params.id).lean()
      console.log(cat)

      if (!cat) {
        return res.render('error/404.ejs')
      }

      if (cat.volunteer != req.user.id) {
        return res.redirect('/profile')
      } else {
        // if user loaded a new image file
        if (req.file) {
          // Upload image to cloudinary
          const result = await cloudinary.uploader.upload(req.file.path);
          req.body.image = result.secure_url
          req.body.cloudinaryId = result.public_id
          // Delete old image from cloudinary
          await cloudinary.uploader.destroy(cat.cloudinaryId);
        }
        
        console.log(`after condition: ${cat}`)

        cat = await Cat.findOneAndUpdate({ _id: req.params.id }, req.body, {
          new: true,
          runValidators: true,
        })

        res.redirect('/profile')
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500.ejs')
    }
  },

  // @desc    Delete a cat
  // @route   DELETE /cat/delete/:id
  deleteCat: async (req, res) => {
    try {
      // Find cat by id
      let cat = await Cat.findById({ _id: req.params.id });

      // Delete image from cloudinary
      await cloudinary.uploader.destroy(cat.cloudinaryId);

      // Delete cat from db
      await Cat.remove({ _id: req.params.id });

      console.log("Deleted Cat");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile"); 
    }
  },
  
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
  // getProfile: async (req, res) => {
  //   try {
  //     const cats = await Cat.find({ volunteer: req.user.id });
  //     // const posts = await Post.find({ user: req.user.id });
  //     res.render("profile.ejs", { cats: cats, user: req.user });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // getFeed: async (req, res) => {
  //   try {
  //     const cats = await Cat.find().sort({ needsHomeBy: "asc" }).lean();
  //     res.render("feed.ejs", { cats: cats, moment: moment });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // getFeed: async (req, res) => {
  //   try {
  //     const posts = await Post.find().sort({ createdAt: "desc" }).lean();
  //     res.render("feed.ejs", { posts: posts });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
};
