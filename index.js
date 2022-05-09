const express = require('express');
const session = require('express-session')
const passport = require('passport')
require('./auth')

//Middleware Function
function isLoggedIn(req,res,next){
    req.user ? next() : res.sendStatus(401)
}



const app = express();
//Session Management
app.use(session({secret:"cats"}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
    res.send('<a href = "/auth/google">Authenticate with Google</a>')
});


app.get('/auth/google',
passport.authenticate('google',{scope:['email','profile']})
);



app.get('/auth/google/callback',
// app.get('/redirect',
    passport.authenticate('google',{
        successRedirect:'/protected',
        failureRedirect:'/auth/google/failure',
})
);

app.get('/auth/google/failure',(req,res)=>{
    res.send("Something Went Wrong...");
})
app.get('/protected',isLoggedIn,(req,res)=>{
    res.send(`Hello ${req.user.displayName}`);
})

app.get('/logout',(req,res)=>{
    req.logout();
    req.session.destroy();
    res.send('Goodbye!')
})

app.listen(5000,()=> console.log("Listening on: 5000"));