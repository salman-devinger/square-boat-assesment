
module.exports = (req, res, next) => {

    // Check if loged-in
    if(!req.session.isLoggedIn){
        return res.redirect('/login');
    }
    next();
}