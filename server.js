// Imports:
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const passport = require("passport");
const path = require("path");

// Body Parser Middleware:
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "client/build")))
// DB Config:
const db = require("./config/keys");

// Passport Middleware:
app.use(passport.initialize());

// Passport Config:
require("./config/passport.js")(passport);

// Connect To MongoDB:


url = 'mongodb+srv://Dataversity:dataversity123@cluster0.ft1px.mongodb.net/mernstack?retryWrites=true&w=majority';

mongoose.connect(url,{
useNewUrlParser:true,
useCreateIndex:true,
useUnifiedTopology:true,
useFindAndModify:false
}).then(()=>{
console.log('mongodb connected')
}).catch((err)=>{
    console.log('mongodb not connected')
})

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);


// Listening
const port = process.env.PORT || 9000
app.listen(port, () => console.log(`Server Running on port ${port}`));