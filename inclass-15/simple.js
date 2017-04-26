const http = require('http')

const host = '127.0.0.1'
const port = 3333 || process.env.PORT

var articles = { articles: [ 
          { id:1, author: 'Scott', body:'A post 1' },
          { id:2, author: 'Scott1', body:'A post 2' },
          { id:3, author: 'Scott2', body:'A post 3' }
     ]}

http.createServer(preprocess).listen(port, host)
console.log(`Server running at http://${host}:${port}`)

function preprocess(req, res) {
     let body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)

    //  const payload = { 'hello': 'world' }

    var payload = {}
    switch (req.url) {
        case '/':
            payload = { 'hello': 'world' }
            break
        case '/articles':
            // request: curl http://127.0.0.1:3333/articles
            // response: the three article above
            payload = articles
            break
        case '/login':
            // request: curl http://127.0.0.1:3333/login -H "Content-Type : application/json" -d '
            // {"username":"bl19", "password":"foo"}'
            // response: {"username":"bl19","result":"success"}
            if (req.method === 'POST') {
                payload = {}
                var reqJson = JSON.parse(req.body)
                payload.username = reqJson.username
                payload.result = 'success'
            }
            break
        case '/logout':
            // request: curl http://127.0.0.1:3333/logout -X PUT
            // response: "OK"
            if (req.method === 'PUT') {
                payload = 'OK'
            }
            break
        default: 
            // otherwise warns
            console.log('this url is not valid')
    }

     res.setHeader('Content-Type', 'application/json')
     res.statusCode = 200
     res.end(JSON.stringify(payload))
}