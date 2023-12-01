var express = require('express');
var router = express.Router();

const { User } = require('../domain/user/user');

router.get('/:userId', async function(req, res) {
  const user = await User.find_by_id(req.params.userId);
  
  if (!user.id) {
    res.status(404).json({"error": "User not found"});
    return;
  }
  res.json(user);
});

router.put('/:userId', async function(req, res) {
  const status = await User.update_user(req.params.userId, req.body);
  
  if (status['error']) {
    res.status(500).json(status);
    return;
  }
  res.json(status)
});

// router.post('/', async function(req, res) {
//   const message = await User.create_user(req.body);

//   res.json(message);
// });

module.exports = router;
