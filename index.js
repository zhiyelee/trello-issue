var koa = require('koa');
var router = require('koa-router')();
var bodyParser = require('koa-bodyparser');
var accesslog = require('koa-accesslog');
var util = require('./lib/util');

var app = koa();

app.use(bodyParser());
app.use(accesslog());

var TYPE_CREATE = 'createCard';

router.head('/callback', function *(next) {
    this.body = 'You get the trello callback';
    yield next;
});
router.post('/callback', function *(next) {
    var ctx = this,
        action = ctx.request.body.action,
        card = action.data.card;

    if (action.type === TYPE_CREATE) {
        this.body = yield util.updateName(card);
    } else {
        this.body = '#' + card.id + ' --- ' + action.type;
    }
    yield next;
})

router.get('/', function *(next) {
    this.body = '<h1> Trello Webhook Server</h1>';
    yield next;
})

app.use(router.routes());

app.listen('9001');
