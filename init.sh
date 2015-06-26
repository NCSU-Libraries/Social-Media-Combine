#!/usr/bin/env bash
# Run Upgrade
export PATH=$PATH:/usr/local/bin

source /vagrant/upgrade.sh

cd /tmp

echo "Override docker upstart init config"
echo "start on (vagrant-mounted and filesystem and net-device-up IFACE!=lo)" > /etc/init/docker.override
echo "Install curl if required..."
sudo apt-get -y install curl nodejs wget inoticoming

echo "Installing docker-compose..."
wget https://raw.github.com/pypa/pip/master/contrib/get-pip.py
python get-pip.py

/usr/local/bin/pip install -U docker-compose

cd /vagrant

echo "Copying application configs"
cp -n lentil/lentil_example_config.yml lentil/lentil_config.yml
cp -n sfm/sfm_example_config.txt sfm/sfm_config.txt

echo "Pulling containers"
sudo docker-compose pull
echo "Running containers"
sudo docker-compose up -d --timeout 600

echo "Launching configuration watcher"
cp config_updates/combine_reconfig.conf /etc/init/combine_reconfig.conf
initctl reload-configuration
start combine_reconfig
# Give the containers some time to start up
sleep 5s
