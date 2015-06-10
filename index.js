var koa = require('koa');
var router = require('koa-router')();
var bodyParser = require('koa-bodyparser');
var accesslog = require('koa-accesslog');

var app = koa();

app.use(bodyParser());
app.use(accesslog());

router.head('/callback', function *(next) {
    this.body = 'You get the trello callback';
    yield next;
});
router.post('/callback', function *(next) {
    var ctx = this,
        data = ctx.request.body;
    console.log(data);
    this.body = data.action;
    yield next;
})

router.get('/', function *(next) {
    this.body = '<h1> Trello Webhook Server</h1>';
    yield next;
})

app.use(router.routes());

app.listen('9001');
