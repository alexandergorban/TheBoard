// auth/index.js
(function(auth) {

    auth.init = function(app) {
        app.get("/register",
            function(req, res) {
                res.render("register", { title: "Register for The Board" });
            });
    };

})(module.exports);