#!/bin/bash

git pull

npm install

(cd ../tools && node main.js)

NODE_OPTIONS='--max-old-space-size=1536' gatsby build

aws s3 sync \
--acl public-read \
--cache-control public,max-age=0,mush-revalidate \
--exclude "*" \
--include "*.html" --include "*.json" \
--delete \
./public s3://corona-board.co.kr

aws s3 sync \
--acl public-read \
--cache-control public,max-age=31536000 \
--delete \
./public s3://corona-board.co.kr
