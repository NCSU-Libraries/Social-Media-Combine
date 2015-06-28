FROM phusion/passenger-customizable:latest
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

ENV HOME /root
CMD ["/sbin/my_init"]
COPY lentil_example_config.yml /tmp/lentil_example_config.yml
ENV RAILS_VERSION '~> 3.2'
RUN apt-get update -qq && \
/pd_build/ruby2.2.sh && \
apt-get -y install git postgresql-client && \
apt-get install -y -o Dpkg::Options::="--force-confold" nginx-extras passenger && \
mkdir /applications && \
mkdir /home/app/lentilapp && \
cd /applications && \
gem install rails --version "$RAILS_VERSION" && \
rails new lentilapp -d postgresql && \
cd lentilapp && \
grep -v "jquery-rails" Gemfile > temp && mv temp Gemfile && \
echo "gem 'jquery-rails', '2.3.0'" >> Gemfile && \
echo "gem 'lentil'" >> Gemfile && \
echo "gem 'therubyracer'" >> Gemfile && \
echo "gem 'whenever'" >> Gemfile && \
bundle install && \
rm /etc/nginx/sites-enabled/default && \
mv /applications/lentilapp/* /home/app/lentilapp/. && \
cp -n /tmp/lentil_example_config.yml /home/app/lentilapp/lentil_config.yml && \
cp -n /home/app/lentilapp/lentil_config.yml /home/app/lentilapp/config/lentil_config.yml && \
chown -R app:app /home/app && \
rm -f /etc/service/nginx/down && \
mkdir -p /etc/my_init.d && \
apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY invoke.sh /etc/my_init.d/lentil_init.sh
COPY lentilapp.conf /etc/nginx/sites-enabled/lentilapp.conf

# Let's do remaining task from script
