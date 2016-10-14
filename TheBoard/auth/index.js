// auth/index.js
(function (auth) {
    
    var data = require("../data");
    var hasher = require("./hasher");
    
    var passport = require("passport");
    var localStrategy = require("passport-local").Strategy;
    
    function userVerify(username, password, next) {
        data.getUser(username,
            function (err, user) {
            if (!err && user) {
                var testHash = hasher.computeHash(password, user.salt);
                if (testHash === user.passwordHash) {
                    next(null, user);
                    return;
                }
            }
            next(null, false, { message: "Invalid Credentials." });
        });
    }
    
    auth.init = function (app) {
        
        app.get("/register",
            function (req, res) {
            res.render("register", { title: "Register for The Board", message: req.flash("registrationError") });
        });
        
        app.post("/register",
            function (req, res) {
            
            var salt = hasher.createSalt();
            
            var user = {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                passwordHash: hasher.computeHash(req.body.password, salt),
                salt: salt
            };
            
            data.addUser(user,
                    function (err) {
                if (err) {
                    req.flash("registrationError", "Could not save user to database.");
                    req.redirect("/register");
                } else {
                    res.redirect("/login");
                }
            });
        });

    };

})(module.exports);