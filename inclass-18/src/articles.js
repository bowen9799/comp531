let articles = {
    articles: [
        { id: 1, author: 'bl191', text: 'post 1' },
        { id: 2, author: 'bl192', text: 'post 2' },
        { id: 3, author: 'bl193', text: 'post 3' },
        { id: 4, author: 'bl194', text: 'post 4' },
        { id: 5, author: 'bl195', text: 'post 5' },

    ]
}

const addArticle = (req, res) => {
    const numArticles = articles['articles'].length;
    const article = {}
    let result = {}
    article.id = numArticles + 1
    article.text = req.body.text
    result.articles = [article]
    res.send(result)
    articles['articles'].push(article)

}

const getArticles = (req, res) => {
    const id = req.params.id
    if (!id) {
        res.send(articles)
    } else {
        const result = {}
        result.articles = articles.articles.filter(x => (x.id == id))
        res.send(result)
    }
}

module.exports = (app) => {
    app.post('/article', addArticle)
    app.get('/articles/:id*?', getArticles)
}