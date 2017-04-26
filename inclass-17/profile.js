
const index = (req, res) => {
     res.send({ hello: 'world' })
}

// // this is profile.js which contains all user profile 
// // information except passwords which is in auth.js

// PUT /headline
const putHeadline = (req, res) => {
    res.send({
        headlines: [{
            username: 'bl19',
            headline: req.body.headline || 'headline'
        }]
    })
}

// GET /headlines/bl19
const getHeadlines = (req, res) => {
    console.log(req.params.user)
    res.send({
        username: 'bl19',
        headline: 'headline'
    })

}

// GET /email/:user?
const getEmail = (req, res) => {
    console.log(req.params.user)
    res.send({
        username: 'bl19',
        email: 'foo@foo.com'
    })
}

// PUT /email
const putEmail = (req, res) => {
    res.send({
        username: 'bl19',
        email: req.body.email || 'foo@foo.com'
    })
}

// GET /zipcode/:user? 
const getZipcode = (req, res) => {
    console.log(req.params.user)
    res.send({
        username: 'bl19',
        zipcode: '77005'
    })
}

// PUT /zipcode
const putZipcode = (req, res) => {
    res.send({
        username: 'bl19',
        zipcode: req.body.zipcode || '77005'
    })
}

// GET /avatars/:user? 
const getAvatars = (req, res) => {
    console.log(req.params.user)
    res.send({
        username: 'bl19',
        avatar: 'avatar'
    })
}
// PUT /avatar
const putAvatar = (req, res) => {
    res.send({
        username: 'bl19',
        avatar: req.body.avatar || 'avatar'
    })
}

module.exports = app => {
    app.get('/', index)
    app.get('/headlines/:user?', getHeadlines)
    app.put('/headline', putHeadline)
    app.get('/email/:user?', getEmail)
    app.put('/email', putEmail)
    app.get('/zipcode/:user?', getZipcode)
    app.put('/zipcode', putZipcode)
    app.get('/avatars/:user?', getAvatars)
    app.put('/avatar', putAvatar)
}