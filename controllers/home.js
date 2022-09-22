const Cat = require("../models/Cat")
const moment = require('moment')

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getFeed: async (req, res) => {
    try {
      const cats = await Cat.find().sort({ needsHomeBy: "asc" }).lean();
      res.render("feed.ejs", { cats: cats, moment: moment });
    } catch (err) {
      console.log(err);
    }
  },
};
