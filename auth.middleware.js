module.exports = function(req, res, next) {
    if (!req.headers.authorization) return res.status(401).end();
    if (req.headers.authorization !== `Bearer ${process.env.TOKEN}`) return res.status(403).send('Invalid token!');
    next();
}