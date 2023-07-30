const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(require('./routes'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
