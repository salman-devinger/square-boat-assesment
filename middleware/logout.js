module.exports = (req, res, next) => {

    req.session.destroy((err) => {
        // cannot access session here
    });
    
    next();
}