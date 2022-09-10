install: # Install dependencies
	npm ci

develop: # Run webpack serve
	npm run serve

build: # Run webpack production
	npm run build

lint: # Run linter
	npx eslint .
