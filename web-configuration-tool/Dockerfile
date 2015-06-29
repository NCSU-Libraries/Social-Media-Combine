FROM phusion/passenger-customizable:latest

# Copy Files
RUN mkdir -p /home/app/webconfig \
/home/app/webconfig/public \
/home/app/webconfig/tmp \
/etc/my_init.d

WORKDIR /home/app/webconfig

COPY . /home/app/webconfig/

# Create directories
ENV HOME /home/app
CMD ["/sbin/my_init"]
RUN apt-get update -qq && \
mv /home/app/webconfig/webcfg_init.sh /etc/my_init.d/webcfg_init.sh && \
/pd_build/nodejs.sh && \
apt-get install -y -o Dpkg::Options::="--force-confold" nginx-extras passenger && \
npm install && \
./node_modules/bower/bin/bower --allow-root install && \
npm cache clean && \
./node_modules/bower/bin/bower --allow-root cache clean && \
chown -R app:app /home/app && \
mv /home/app/webconfig/webconfig.conf /etc/nginx/sites-enabled/webconfig.conf && \
rm /etc/nginx/sites-enabled/default && \
rm -f /etc/service/nginx/down && \
apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /pd_build

