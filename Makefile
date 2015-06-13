config: conf/db.sample.json conf/conf.sample.json
	test -s conf/db.json || cp conf/db.sample.json conf/db.json
	test -s conf/conf.json || cp conf/conf.sample.json conf/conf.json

