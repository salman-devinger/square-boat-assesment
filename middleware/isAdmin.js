module.exports = (req, res, next) => {

    // Check if loged-in as admin
    if(!req.session.isAdmin){
        req.session.destroy((err) => {
            // cannot access session here
        });
        return res.redirect('/login');
    }
    next();
}