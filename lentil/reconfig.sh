#!/bin/sh
# Configuration file update
cp /src/lentil/lentil_config.yml /home/app/lentilapp/config/lentil_config.yml

# Update schedule.rb if new periodic tasks added
cp /src/lentil/schedule.rb /home/app/lentilapp/config/schedule.rb
cd /home/app/lentilapp/ && bundle exec whenever -i

# restart lentil
touch /home/app/lentilapp/tmp/restart.txt
