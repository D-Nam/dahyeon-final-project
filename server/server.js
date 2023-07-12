const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(require('./routes'));

app.listen(8080, () => {
  console.log('Serving on port 8080');
});
