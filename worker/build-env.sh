FILE="./worker/.env"

cat <<EOM >$FILE
REACT_APP_REDIS_HOST=$REACT_APP_REDIS_HOST
REACT_APP_REDIS_PORT=$REACT_APP_REDIS_PORT
EOM

touch FILE
cat FILE

exit 0