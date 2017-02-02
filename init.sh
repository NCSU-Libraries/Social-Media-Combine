#!/usr/bin/env bash
# Run Upgrade
export PATH=$PATH:/usr/local/bin

source /vagrant/upgrade.sh

cd /tmp

echo "Override docker upstart init config"
echo "start on (vagrant-mounted and filesystem and net-device-up IFACE!=lo)" > /etc/init/docker.override
echo "Install curl if required..."
sudo apt-get -y remove puppet chef
sudo apt-get upgrade -y -o Dpkg::Options::="--force-confold"
sudo apt-get -y install curl wget inoticoming htop \
  linux-image-extra-$(uname -r) linux-image-extra-virtual

echo "Installing docker-compose..."
wget https://bootstrap.pypa.io/get-pip.py
python get-pip.py

/usr/local/bin/pip install -U docker-compose twarc

cd /vagrant

echo "Copying application configs"
cp -n lentil/lentil_example_config.yml lentil/lentil_config.yml
cp -n sfm/sfm_example_config.txt sfm/sfm_config.txt

echo "Pulling containers"
sudo docker-compose pull
echo "Running containers"
./reconfig.sh

echo "Launching configuration watcher"
cp config_updates/workaround-vagrant-bug-6074.conf /etc/init/workaround-vagrant-bug-6074.conf
cp config_updates/combine_reconfig.conf /etc/init/combine_reconfig.conf
initctl reload-configuration
start combine_reconfig
# Give the containers some time to start up
sleep 5s
