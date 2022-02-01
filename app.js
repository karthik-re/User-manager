const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require("swagger-ui-express");
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/users', require('./users/router'));

app.get('/', (req, res) => {
    res
      .status(200)
      .send(
        `Welcome!. Please got to <a href="/api-docs">docs</a> to see swagger UI`
      );
  });
  
  module.exports = app;