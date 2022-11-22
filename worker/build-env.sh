FILE="./worker/.env"

cat <<EOM >$FILE
REDIS_HOST  = $REDIS_HOST
REDIS_PORT  = $REDIS_PORT

EOM

touch FILE
cat FILE

exit 0
