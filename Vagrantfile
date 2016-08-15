# -*- mode: ruby -*-
# vi: set ft=ruby :

require 'getoptlong'

#var definition
current_dir=File.dirname(File.expand_path(__FILE__))
alreadyUpdated='false'
docker_provider='false'
LENTIL_PORT="3001"
SFM_PORT="8001"
WEBCONFIG_PORT="8081"

#env check
if ENV['VAGRANT_PLUGINS_UPDATED']=='true'
   alreadyUpdated = 'true'
end

if !ENV['DOCKER_HOST'].nil?
   docker_provider = 'true'
end

if !ENV['LENTIL_PORT'].nil?
   LENTIL_PORT = ENV['LENTIL_PORT']
end

if !ENV['SFM_PORT'].nil?
   SFM_PORT = ENV['SFM_PORT']
end

if !ENV['WEBCONFIG_PORT'].nil?
   WEBCONFIG_PORT = ENV['WEBCONFIG_PORT']
end

# Verify and install required plugins
required_plugins = "vagrant-host-shell vagrant-exec vagrant-vbguest"

if alreadyUpdated != 'true' && (ARGV[0] == "up" || ARGV[0] == "provision")
  system "vagrant plugin install #{required_plugins}"
  system "vagrant plugin update #{required_plugins}"
  ENV['VAGRANT_PLUGINS_UPDATED'] = 'true'
  ENV['VAGRANT_NO_PARALLEL']='true'
  # Restart vagrant after plugin updates
  exec "vagrant #{ARGV.join(' ')}"
end

Vagrant.configure(2) do |config|

      # Host platform detection
      if RUBY_PLATFORM["darwin"]
         hostOS="OSX"
    #TimeZone=`sudo systemsetup -gettimezone|cut -d':' -f2| tr -d '[[:space:]]'`
    ##res=`vagrant plugin install vagrant-timezone`
     elsif RUBY_PLATFORM["linux"]
         hostOS="Linux"
    #TimeZone=`cat /etc/timezone| tr -d '[[:space:]]'`
    #res=`vagrant plugin install vagrant-timezone`
     else
         hostOS="Windows"
       #TimeZone=`tzutil /g`
     end

  ## Setting timezone
  #print TimeZone
  #if Vagrant.has_plugin?("vagrant-timezone")
  #config.timezone.value = TimeZone
  #end
  if docker_provider == 'false'
    config.vm.box = "phusion/ubuntu-14.04-amd64"

  # port forwarding configuration
  # 8001 -> for sfm
  # 3001 -> for lentil
  # 8081 -> for the web configuration tool
     config.vm.network "forwarded_port", guest: 8001, host: 8002, auto_correct: false
     config.vm.network "forwarded_port", guest: 8000, host: 8001, auto_correct: false
     config.vm.network "forwarded_port", guest: 8080, host: 8081, auto_correct: false
     config.vm.network "forwarded_port", guest: 3000, host: 3001, auto_correct: false


  # Allocate RAM to VM
  # Parallels image
     config.vm.provider "parallels" do |p, override|
         override.vm.box = "parallels/ubuntu-14.04"
    #p.memory = "2048"
     end

  # Update package list
     config.vm.provision "update", type: "shell" do |s|
        s.inline = "apt-get update"
     end

  # docker based provisioning for lentil and sfm
  # Just pull the images from Docker Hub
    config.vm.provision "docker"

    config.vm.provision :shell, :inline => "sudo start docker || true", run: "always"
    # Shell based provisioning to bring up containers using docker compose
    config.vm.provision "init", type: "shell" do |s|
       s.inline = "cd /vagrant && chmod u+x init.sh && ./init.sh"
    end

     # TODO: Upgrade procedure
     #config.vm.provision "upgrade", type: "shell" do |s|
    #s.inline = "cd /vagrant && chmod u+x upgrade.sh && ./upgrade.sh"
    #end

  elsif docker_provider == 'true'
       h = Hash[*File.read('sfm/sfm_config.txt').split(/[= \n]+/)]
       config.vm.define "combinedb" do |db|
        db.vm.provider "docker" do |d|
           d.name = "combinedb"
           d.image = "ncsulibrariesdli/combine_pg:latest"
           d.pull = true
           d.env = {
		"POSTGRES_PASSWORD" => "gherD42#dl5"
   	   }
        end
       end

       config.vm.define "lentil" do |app|
        app.vm.provider "docker" do |d|
           d.name = "lentilapp"
           d.image = "ncsulibrariesdli/combine_lentil:latest"
           d.pull = true
           d.link "combinedb:mydb"
	   d.ports = ["#{LENTIL_PORT}:3000"]
           d.volumes = ["#{current_dir}/lentil:/src/lentil","#{current_dir}/archive/lentil-store:/lentil-store"]
        end
       end
       config.vm.define "sfm" do |app|
        app.vm.provider "docker" do |d|
           d.name = "sfmapp"
           d.image = "gwul/sfm_app:latest"
           d.pull = true
           d.link "combinedb:db"
  	   d.ports = ["#{SFM_PORT}:80"]
           d.env = {
		"SFM_TWITTER_DEFAULT_USERNAME" => h['SFM_TWITTER_DEFAULT_USERNAME'],
		"SFM_TWITTER_CONSUMER_KEY" => h['SFM_TWITTER_CONSUMER_KEY'],
		"SFM_TWITTER_CONSUMER_SECRET" => h['SFM_TWITTER_CONSUMER_SECRET']
	}
          d.volumes = ["#{current_dir}/sfm:/src/sfm","#{current_dir}/archive/sfm-store:/var/sfm"]
       end
      end
      config.vm.define "web" do |web|
       web.vm.provider "docker" do |d|
           d.name = "webconfig"
           d.image = "ncsulibrariesdli/combine_webconfig:latest"
           d.pull = true
	   d.ports = ["#{WEBCONFIG_PORT}:8080"]
           d.env = {
                 "DOCKER_HOST" => ENV['DOCKER_HOST']
           }
           d.volumes = ["#{current_dir}/lentil:/src/lentil","#{current_dir}/sfm:/src/sfm","#{current_dir}/web-configuration-tool:/src/web-configuration-tool","#{current_dir}/config_updates:/src/config_updates"]
       end
      end
    end
  # Host provisioning to spawn config tool
    if Vagrant.has_plugin?("vagrant-host-shell")
      config.vm.provision "configuration", type: "host_shell" do |host_shell|
        if hostOS == 'OSX'
          host_shell.inline = 'open http://localhost:8081'
        elsif hostOS == 'Linux'
          host_shell.inline = 'xdg-open "http://localhost:8081"'
        elsif hostOS == 'Windows'
          host_shell.inline = 'start "link" "http://localhost:8081"'
        end
      end
    end
end #config end
