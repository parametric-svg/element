#! /bin/sh

node_modules/.bin/browserify --transform=./node_modules/babelify test.js | testron | node_modules/.bin/tap-spec
