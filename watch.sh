dirname=$(dirname $0)
cd $dirname
../node_modules/.bin/watch ./build.sh pages shared templates config
