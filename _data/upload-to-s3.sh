FILE_NAME=user-data.json
BUCKET_NAME=es4al-data

node generate-data.mjs
/usr/local/bin/aws s3 cp user-data.json s3://es4al-data/
echo 'upload finished'