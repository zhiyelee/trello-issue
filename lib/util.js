"use strict";
var fs = require('fs');
var Q = require('q');
var exists = require('path-exists').sync;
var yaml = require('js-yaml');
var path = require('path');


// load app config
var config = loadConfig();
exports.config = config;

// trello config
var Trello = require('node-trello');
var t = new Trello(config.appKey, config.oauthToken);

var db;
var dbPath = path.resolve(__dirname, '../conf/db.json');
if (exists(dbPath)) {
  db = require('../conf/db');
} else {
  db = {
    current: config.startNumber
  }
}

exports.updateName = function *(card) {

  var id = card.id;
  var name = card.name;

  // already contains
  if (/^#\d+ /.test(name)) return;

  var url = '/1/cards/' + id + '/name';
  var issueNumber = generateIssueNumber();

  // TODO: use queue in case of  race conditions?
  // updateDB
  db.current ++;

  var newName = issueNumber + ' ' + name;
  var defer = Q.defer();

  t.put(url, {value: newName}, function (err, data) {
    if (err) {
      db.current --;
      defer.reject(err);
    } else {
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 4));
      defer.resolve('#card Name Change:' + name + '  ===> ' + data.name);
    }
  });

  return defer.promise;
};

function loadConfig() {
  var file = path.resolve(__dirname, '../conf/config.yml');

  return yaml.load(fs.readFileSync(file));
}

function generateIssueNumber() {
  var prefix = config.prefix;
  var len = config.numbersLength;
  var current = db.current;

  var currentLen = ('' + current).length;
  if (currentLen < len) {
    let arr = [];
    arr.length = len + 1;
    current = (arr.join('0') + current).substr(-len);
  }

  return prefix + current;
}
