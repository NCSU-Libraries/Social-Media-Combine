FROM phusion/passenger-nodejs

RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# Create directories
USER app
ENV HOME /home/app
CMD ["/sbin/my_init"]
RUN mkdir /home/app/webconfig \
/home/app/webconfig/public \
/home/app/webconfig/tmp \
/home/app/webconfig/bower_components \
/home/app/webconfig/node_modules \
/home/app/webconfig/js

# Copy Files
WORKDIR /home/app/webconfig
COPY server.js /home/app/webconfig/app.js
COPY commit.sh /home/app/webconfig/commit.sh
COPY reconfig.sh /home/app/webconfig/reconfig.sh
COPY index.html /home/app/webconfig/index.html
COPY package.json /home/app/webconfig/package.json
COPY bower.json /home/app/webconfig/bower.json
COPY js/ /home/app/webconfig/js/

RUN npm install && \
./node_modules/bower/bin/bower install

# Permissions and logging
USER root
COPY webconfig.conf /etc/nginx/sites-enabled/webconfig.conf

RUN apt-get update && \
apt-get install -y -o Dpkg::Options::="--force-confold" nginx-extras passenger && \
rm /etc/nginx/sites-enabled/default && \
chown -R app:app /home/app && \
rm -f /etc/service/nginx/down && \
apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
mkdir -p /etc/my_init.d

COPY webcfg_init.sh /etc/my_init.d/webcfg_init.sh
# Lets do remaining task from script
