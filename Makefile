REPORTER = spec

test:
	@./node_modules/.bin/mocha \
		--require should \
		--globals baseview \
		--reporter $(REPORTER) \
		tests/*.js

docs: test-docs

test-docs:
	make test REPORTER=doc \
		| cat docs/head.html - docs/tail.html \
		> docs/test.html

.PHONY: test docs