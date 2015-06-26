#!/bin/sh
echo "invoke script"
cd /home/app/lentilapp
#ADDHOST=`echo "8 a  host: $MYDB_PORT_3306_TCP_ADDR"`
#sed "$ADDHOST" database.yml > database.yml
#echo "  host: $MYDB_PORT_3306_TCP_ADDR">> config/database.yml
echo "
development:
  adapter: postgresql
  encoding: utf8
  host: $COMBINEDB_1_PORT_5432_TCP_ADDR
  port: $COMBINEDB_1_PORT_5432_TCP_PORT
  database: lentil
  pool: 5
  username: postgres
  password: $COMBINEDB_1_ENV_POSTGRES_PASSWORD
production:
  adapter: postgresql
  encoding: utf8
  host: $COMBINEDB_1_PORT_5432_TCP_ADDR
  port: $COMBINEDB_1_PORT_5432_TCP_PORT
  database: lentil
  pool: 5
  username: postgres
  password: $COMBINEDB_1_ENV_POSTGRES_PASSWORD" > config/database.yml

# sleep required for database to come up
MYSQL_LOOPS="20"

#wait for mysql
i=0
while ! nc $COMBINEDB_1_PORT_5432_TCP_ADDR $COMBINEDB_1_PORT_5432_TCP_PORT >/dev/null 2>&1 < /dev/null; do
  i=`expr $i + 1`
  if [ $i -ge $COMBINEDB_1_PORT_5432_TCP_ADDR ]; then
    echo "Lentil database still not reachable, giving up"
    exit 1
  fi
  echo "Waiting for Lentil database..."
  sleep 1
done

# if not already installed
if [ ! -e installed ]; then
  # run lentil generator
  yes | bundle exec rails generate lentil:install

  # run upgrade hooks
  # mark installed
  touch installed
fi

# copy schedule.rb
cp /src/lentil/schedule.rb /home/app/lentilapp/config/schedule.rb

# Overwrite the current config
cp '/src/lentil/lentil_config.yml' 'config/lentil_config.yml'

# update crontab
whenever -i
