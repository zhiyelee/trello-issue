var fs = require('fs');
var Q = require('q');
var Trello = require('node-trello');
var path = require('path');
var conf = require('../conf/conf');
var db = require('../conf/db');
var t = new Trello(conf.key, conf.token);

exports.updateName = function *(card) {

    var id  = card.id;
    var name = card.name;
    console.log(card)

    // already contains
    if (/^#\d+ /.test(name)) return;

    var url = '/1/cards/' + id + '/name';
    var prefix = '#' + db.current;

    // updateDB
    db.current++;
    fs.writeFileSync(path.resolve(__dirname, '../conf/db.json'), JSON.stringify(db, null, 4))

    var newName = prefix + ' ' + name;
    var defer = Q.defer();

    t.put(url, { value: newName }, function(err, data) {
        console.log(err, data)
        if (err) throw err;
       defer.resolve('#card Name Change:' + name + '  ===> ' + data.name);
    });
    return defer.promise;

}
