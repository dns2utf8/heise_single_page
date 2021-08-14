
lint:
	./node_modules/web-ext/bin/web-ext --source-dir src lint

pack:
	./node_modules/web-ext/bin/web-ext --source-dir src build

run:
	./node_modules/web-ext/bin/web-ext --source-dir src run

install:
	npm install web-ext

clean:
	rm -rf package-lock.json node_modules/
