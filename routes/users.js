var express = require('express');
var router = express.Router();
var app = express();

const { User } = require('../domain/user/user');

router.get('/:userId', async function(req, res) {
  const user = await User.find_by_id(req.params.userId);
  console.log(user);
  
  if (!user.id) {
    res.status(404).json({"error": "User not found"});
    return;
  }
  res.json(user);
});

router.put('/:userId', async function(req, res) {
  const user = await User.update(req.params.userId);

  if (!user.id) {
    res.status(500).json({"error": "Error on updating"});
    return;
  }
  res.json(user)
});

router.post('/', async function(req, res) {
  const user = await User.create_user(req.body);

  res.json(user);
});

module.exports = router;
