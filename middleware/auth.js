module.exports = {
    ensureAuth: (req, res, next) => {
      if (req.session.user) {
        return next();
      } else {
        res.redirect("/auth/login");
      }
    },
    ensureGuest: (req, res, next) => {
      if (req.session.user) {
        res.redirect("/dashboard");
      } else {
        return next();
      }
    },
  };
  