#! /usr/bin/env node

var app_key = '5449cb32dff125bcccc9cc7d2be4f094';
var oauth_access_token = '916e27cc97ad646d90713682ea841f6f9e13eea0b12895e5a4708a5ec198ae09';

var Q = require('q');
var fs = require('fs');
var Trello = require('node-trello');
var t = new Trello(app_key, oauth_access_token);

t.get("/1/boards/5564819adce6f3e252b31d3a/lists", function(err, data) {
      if (err) throw err;
        console.log(data);
});

var config = [
    '556482a52cd00bc5a6f1093d',
    '556f1845f7fd35fc9ec67d21'
];
var meta = [];


function proxy(url) {
    var defer = Q.defer();
    t.get(url, function(err, data) {
          if (err) throw err;
          defer.resolve(data);
    });
    return defer.promise;

}

function getMeta() {
    return proxy('/1/boards/5564819adce6f3e252b31d3a/lists')
}

function getCards(data) {
    var defer = Q.defer();
    var pCards = [];
    data.forEach(function (item) {
        var itemId = item.id;
        if (config.indexOf(itemId) === -1) return;
        meta.push(item);

        pCards.push(proxy('/1/list/' + itemId + '/cards'));
    });
    Q.all(pCards).then(function (arr) {
        defer.resolve(arr);
    })

    return defer.promise;
}

function generateMockup(cardsList) {
    var html = '';
    html = cardsList.map(function (cards, idx) {
        var title = '\n\n## ' + meta[idx].name + '\n';

        return title + cards.map(function (card) {
            return '* ' + card.name + '  <' + card.shortUrl + '>\n';
        }).join('');
    }).join('');

    console.log(html)
    fs.writeFileSync('changelog.md', html);
}


getMeta()
    .then(getCards)
    .then(generateMockup)
    .fail(function (err) {
        console.log(err)
    });



