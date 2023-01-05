const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log('Database connected successfully...!'));

 
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server is running on ${port} port`);
});
