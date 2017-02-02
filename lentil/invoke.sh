#!/bin/bash -l
echo "invoke script"
cd /home/app/lentilapp
#ADDHOST=`echo "8 a  host: $MYDB_PORT_3306_TCP_ADDR"`
#sed "$ADDHOST" database.yml > database.yml
#echo "  host: $MYDB_PORT_3306_TCP_ADDR">> config/database.yml
echo "
development:
  adapter: postgresql
  encoding: utf8
  host: $MYDB_PORT_5432_TCP_ADDR
  port: $MYDB_PORT_5432_TCP_PORT
  database: lentil
  pool: 5
  username: postgres
  password: $MYDB_ENV_POSTGRES_PASSWORD
production:
  adapter: postgresql
  encoding: utf8
  host: $MYDB_PORT_5432_TCP_ADDR
  port: $MYDB_PORT_5432_TCP_PORT
  database: lentil
  pool: 5
  username: postgres
  password: $MYDB_ENV_POSTGRES_PASSWORD" > config/database.yml

# sleep required for database to come up
MYSQL_LOOPS="20"

#wait for mysql
i=0
while ! nc $MYDB_PORT_5432_TCP_ADDR $MYDB_PORT_5432_TCP_PORT >/dev/null 2>&1 < /dev/null; do
  i=`expr $i + 1`
  if [ $i -ge $MYDB_PORT_5432_TCP_PORT ]; then
    echo "Lentil database still not reachable, giving up"
    exit 1
  fi
  echo "Waiting for Lentil database..."
  sleep 1
done

# if not already installed
if [ ! -e installed ]; then
  bundle update
  # run lentil generator
  yes | bundle exec rails generate lentil:install
  bundle update

  # run upgrade hooks
  # mark installed
  touch installed
fi

# copy schedule.rb
cp /src/lentil/schedule.rb /home/app/lentilapp/config/schedule.rb

# Overwrite the current config
cp '/src/lentil/lentil_config.yml' 'config/lentil_config.yml'

# update crontab
bundle exec whenever -i
