var mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
  
// DB CONNECTION EVENT
mongoose.connection.on('connected', function () {
  console.log(`Mongoose Connected`);
});

module.exports = mongoose;