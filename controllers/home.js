const Cat = require("../models/Cat")
const utils = require('../helpers/utils')
const moment = require('moment')

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getFeed: async (req, res) => {
    try {
      const cats = await Cat.find().sort({ needsHomeBy: "asc" }).lean();
      cats.forEach(cat => cat.age = utils.getAgeFromBirthday(cat.birthday))
      res.render("feed.ejs", { cats, moment: moment });
    } catch (err) {
      console.log(err);
    }
  },
};
