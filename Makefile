all: npm config

npm:
	npm install
config: conf/config.sample.yml
	test -s conf/config.yml || cp conf/config.sample.yml conf/config.yml

.PHONY: config npm all

