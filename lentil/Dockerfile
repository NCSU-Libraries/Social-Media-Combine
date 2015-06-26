FROM phusion/passenger-ruby22:latest

RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

ENV HOME /root
CMD ["/sbin/my_init"]
# Install and upgrade dependencies
RUN apt-get update && \
apt-get -y install git postgresql-client && \
apt-get install -y -o Dpkg::Options::="--force-confold" nginx-extras passenger && \
mkdir /applications && \
mkdir /home/app/lentilapp

WORKDIR /applications

# Use most recent RubyGems
# RUN rvm rubygems current

# Install bundler
#ENV BUNDLER_VERSION 1.8.4
#RUN gem install bundler --version "$BUNDLER_VERSION"

# Install required version for rails
ENV RAILS_VERSION '~> 3.2'
RUN gem install rails --version "$RAILS_VERSION" && \
rails new lentilapp -d postgresql

WORKDIR /applications/lentilapp
#ENV JQUERY_VERSION 2.3.0
#RUN gem install jquery-rails --version "$JQUERY_VERSION"

# Create rails app

# Removing jquery requirement from Gemfile to replace it with required version associated with lentil
RUN grep -v "jquery-rails" Gemfile > temp && mv temp Gemfile && \
echo "gem 'jquery-rails', '2.3.0'" >> Gemfile && \
echo "gem 'lentil'" >> Gemfile && \
echo "gem 'therubyracer'" >> Gemfile && \
echo "gem 'whenever'" >> Gemfile && \
bundle install

COPY database.yml /applications/lentilapp/database.yml
COPY lentil_example_config.yml /applications/lentilapp/lentil_example_config.yml

# FIXME: Why is lentilapp copied (see above configs)?
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
rm /etc/nginx/sites-enabled/default && \
cp -r /applications/lentilapp/* /home/app/lentilapp/. && \
cp -n lentil_example_config.yml /applications/lentilapp/lentil_config.yml && \
cp -n /applications/lentilapp/lentil_config.yml /applications/lentilapp/config/lentil_config.yml && \
chown -R app:app /home/app && \
rm -f /etc/service/nginx/down && \
mkdir -p /etc/my_init.d

COPY invoke.sh /etc/my_init.d/lentil_init.sh
COPY lentilapp.conf /etc/nginx/sites-enabled/lentilapp.conf

# Let's do remaining task from script
