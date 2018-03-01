const path    = require('path');
const express = require('express');
const app     = express(); 
const port    = process.env.PORT || 8080;

const server  = app.listen(()=>console.log(`listening on ${port}`));