
const express = require('express')
const bodyParser = require('body-parser')

var articles = {'articles': [
        {id: 1, author: 'Scott', text: 'This is my first article'},
        {id: 2, author: 'Max', text: 'This is Maxs article'},
        {id: 3, author: 'Lee', text: 'This is Lees article'}
    ]}

const addArticle = (req, res) => {
     console.log('Payload received', req.body)
     var article = {}
     article.id = articles['articles'].length + 1
     article.text = req.body.text
     res.send(article)
     articles["articles"].push(article)
}

const getArticles = (req, res) => {
    res.send(articles)
}

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticles)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})

// LiuBowendeMacBook-Pro:inclass-16 BowenLiu$ bash test.sh
// GET /
// {"hello":"world"}

// GET /articles
// {"articles":[{"id":1,"author":"Scott","text":"This is my first article"},{"id":2,"author":"Max","text":"This is Maxs article"},{"id":3,"author":"Lee","text":"This is Lees article"}]}

// POST /article
// {"id":4,"text":"This is my new article! Tue Mar  7 16:44:05 CST 2017"}

// GET /articles
// {"articles":[{"id":1,"author":"Scott","text":"This is my first article"},{"id":2,"author":"Max","text":"This is Maxs article"},{"id":3,"author":"Lee","text":"This is Lees article"},{"id":4,"text":"This is my new article! Tue Mar  7 16:44:05 CST 2017"}]}