
pack:
	./node_modules/web-ext/bin/web-ext build

run:
	./node_modules/web-ext/bin/web-ext run

install:
	npm install web-ext

clean:
	rm -rf package-lock.json node_modules/
