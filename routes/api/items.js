const express = require("express");
const auth = require("../../middleware/auth");

const router = express.Router();

// Item model
const Item = require("../../models/Item");

// @router GET api/items
// @desc Get all items
// @access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @router POST api/items
// @desc Create an item
// @access Private
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem
    .save()
    .then(item => res.json(item))
    .catch(error => console.log(error));
});

// @router DELETE api/items/:id
// @desc Delete an item
// @access Private
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item =>
      item.remove().then(() => {
        res.json({ success: true });
      })
    )
    .catch(() => res.status(404).json({ success: false }));
});

module.exports = router;
