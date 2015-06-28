FROM phusion/passenger-customizable:latest

RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# Create directories
ENV HOME /home/app
CMD ["/sbin/my_init"]
RUN apt-get update -qq && \
/pd_build/nodejs.sh && \
apt-get install -y -o Dpkg::Options::="--force-confold" nginx-extras passenger && \
mkdir /tmp/webconfig \
/home/app/webconfig \
/home/app/webconfig/public \
/home/app/webconfig/tmp && \
mkdir -p /etc/my_init.d && \
apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy Files
COPY server.js /tmp/webconfig/app.js
COPY commit.sh /tmp/webconfig/commit.sh
COPY reconfig.sh /tmp/webconfig/reconfig.sh
COPY index.html /tmp/webconfig/index.html
COPY package.json /tmp/webconfig/package.json
COPY bower.json /tmp/webconfig/bower.json
COPY js/ /tmp/webconfig/js/

COPY webcfg_init.sh /etc/my_init.d/webcfg_init.sh
COPY webconfig.conf /etc/nginx/sites-enabled/webconfig.conf

WORKDIR /tmp/webconfig
RUN npm install && \
./node_modules/bower/bin/bower --allow-root install && \
npm cache clean && \
./node_modules/bower/bin/bower --allow-root cache clean && \
mv /tmp/webconfig/* /home/app/webconfig/. && \
chown -R app:app /home/app && \
rm /etc/nginx/sites-enabled/default && \
rm -f /etc/service/nginx/down && \
rm -rf /tmp/*

WORKDIR /home/app/webconfig
