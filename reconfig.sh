#!/bin/sh
cd /vagrant

echo "configuring lentil"
cp -n lentil/lentil_example_config.yml lentil/lentil_config.yml
#docker exec vagrant_lentilapp_1 /src/lentil/reconfig.sh

echo "configuring sfm"
cp -n sfm/sfm_example_config.txt sfm/sfm_config.txt
#docker-compose restart sfmapp

echo "Recreating containers"
docker-compose up -d --timeout 300
