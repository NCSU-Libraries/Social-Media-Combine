FROM phusion/passenger-customizable:latest

ENV HOME /root
CMD ["/sbin/my_init"]
COPY lentil_example_config.yml /tmp/lentil_example_config.yml
COPY invoke.sh /tmp/lentil_init.sh
COPY lentilapp.conf /tmp/lentilapp.conf
ENV RAILS_VERSION '~> 3.2'
RUN apt-get update -qq && \
/pd_build/ruby2.2.sh && \
apt-get install -y -o Dpkg::Options::="--force-confold" git nginx-extras passenger && \
cd /home/app && \
gem install rails --version "$RAILS_VERSION" && \
rails new lentilapp -d postgresql && \
cd lentilapp && \
grep -v "jquery-rails" Gemfile > temp && mv temp Gemfile && \
echo "gem 'jquery-rails', '~> 2.3.0'\ngem 'lentil'\ngem 'whenever'" >> Gemfile && \
bundle install --no-cache && \
cp /tmp/lentilapp.conf /etc/nginx/sites-enabled/lentilapp.conf && \
rm /etc/nginx/sites-enabled/default && \
cp -n /tmp/lentil_example_config.yml /home/app/lentilapp/lentil_config.yml && \
cp -n /home/app/lentilapp/lentil_config.yml /home/app/lentilapp/config/lentil_config.yml && \
chown -R app:app /home/app && \
rm -f /etc/service/nginx/down && \
mkdir -p /etc/my_init.d && \
cp /tmp/lentil_init.sh /etc/my_init.d/lentil_init.sh && \
apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /pd_build
