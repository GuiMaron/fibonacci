FILE="./.env"

cat <<EOM >$FILE
REACT_APP_REDIS_HOST=$REACT_APP_REDIS_HOST
REACT_APP_REDIS_PORT=$REACT_APP_REDIS_PORT
REACT_APP_PGHOST=$REACT_APP_PGHOST
REACT_APP_PGPORT=$REACT_APP_PGPORT
REACT_APP_PGUSER=$REACT_APP_PGUSER
REACT_APP_PGPASSWORD=$REACT_APP_PGPASSWORD
REACT_APP_PGDATABASE=$REACT_APP_PGDATABASE
EOM

exit 0
