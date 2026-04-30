const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const users = await User.find({});
  console.log('Users in DB:', users.map(u => ({ email: u.email, role: u.role, name: u.name, id: u._id })));
  process.exit();
}).catch(err => {
  console.error(err);
  process.exit(1);
});
