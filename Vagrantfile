# -*- mode: ruby -*-
# vi: set ft=ruby :

require 'getoptlong'

opts = GetoptLong.new(
  [ '--plugins-updated', GetoptLong::OPTIONAL_ARGUMENT ]
)

alreadyUpdated=''

opts.each do |opt, arg|
  case opt
    when '--plugins-updated'
      alreadyUpdated=arg
  end
end

# Verify and install required plugins
required_plugins = "vagrant-host-shell vagrant-exec vagrant-vbguest"

if alreadyUpdated != 'true' && (ARGV[0] == "up" || ARGV[0] == "provision")
  system "vagrant plugin update #{required_plugins}"

  # Restart vagrant after plugin updates
  exec "vagrant --plugins-updated=true #{ARGV.join(' ')}"
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

  # port forwarding configuration
  # 8001 -> for sfm
  # 3001 -> for lentil
  # 8081 -> for the web configuration tool
  config.vm.network "forwarded_port", guest: 8000, host: 8001, auto_correct: false
  config.vm.network "forwarded_port", guest: 8080, host: 8081, auto_correct: false
  config.vm.network "forwarded_port", guest: 3000, host: 3001, auto_correct: false

  config.vm.box = "phusion/ubuntu-14.04-amd64"

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
end
