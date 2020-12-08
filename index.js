const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors')

const app = express();

// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/node-react-starter`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}

const routes = require('./routes/routes.js')(app, fs);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});