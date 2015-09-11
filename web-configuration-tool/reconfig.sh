#!/bin/sh
cd /src/config_updates

touch configs.updated
# if env var says docker provider
# restart container from here
docker stop lentilapp
docker stop sfmapp

docker start lentilapp
docker start sfmapp
echo "Containers reconfigured!"
