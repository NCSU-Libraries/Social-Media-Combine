Social Media Combine
================

**The Social Media Combine has been deprecated and is no longer supported.**

> On January 30th, 2018, Instagram [announced the release](https://developers.facebook.com/blog/post/2018/01/30/instagram-graph-api-updates/) of a new Instagram Graph API in order to focus on supporting business and advertising use of Instgram content. The Instagram Graph API does not support the use cases required by Lentil. Instagram immediately removed their mechanism for requesting developer credentials for the older Instagram API and **it is no longer possible to create new instances of Lentil**. The older Instagram API will be deprecated over the next two years. Lentil will continue to work **with pre-existing developer credentials until December 11, 2018**. Due to the deprecation of Lentil, the Social Media Combine project has also been deprecated and is no longer supported.

The Social Media Combine makes developing collections of social media much easier. It pre-assembles Lentil (for Instagram data harvesting) and Social Feed Manager (for Twitter data harvesting), along with the web servers and databases needed for their use, into a single package that can be deployed to desktop and laptop computers and used in Windows, OSX, or Linux. We believe in the [documentary value of social media archives](https://medium.com/on-archivy/documenting-the-now-ferguson-in-the-archives-adcdbe1d5788) and hope that the Social Media Combine will make it possible to quickly collect social media data on everyday hardware.

What's inside?
--------------
* [Social Feed Manager](https://github.com/gwu-libraries/social-feed-manager) Twitter collecting software from GWU Libraries
* [Lentil](https://github.com/NCSU-Libraries/lentil) Instagram collecting software from NCSU Libraries
* [twarc](https://github.com/edsu/twarc) Twitter collecting software developed by Ed Summers
* A full pre-configured server environment to support all included software
* A new single web-based configuration interface for all included software
* Upgrade and system management scripts
* Some data export capabilities

Steps to run
-------------
1. Install [Git](https://help.github.com/articles/set-up-git/)
2. Install [Vagrant](https://www.vagrantup.com/downloads.html) version 1.7.4 or greater on your host machine.
3. Open `Terminal` on a Mac, `Git Shell` on Windows, or your preferred shell on Linux and clone this repository using git.

    ```
    git clone https://github.com/NCSU-Libraries/Social-Media-Combine.git
    cd Social-Media-Combine
    ```
4. You can run Combine on VM (step 4.1) OR Combine without VM (directly on Docker)(step 4.2).

  4.1. Combine on VM
   - Install [Virtualbox](https://www.virtualbox.org/wiki/Downloads)
   - Run `vagrant up` from within the Social-Media-Combine directory.

   4.2. Combine without VM [tested on Ubuntu 14.04]
   -  Install [Docker](https://docs.docker.com/installation) version 1.8.1 or greater
   -  Run Docker Daemon on public interface

        Append following to the /etc/default/docker file

           ```
           DOCKER_OPTS="-H <ip>:<port>"
           ```

        Restart docker service

           ```
           service docker restart
           ```

        Define DOCKER_HOST and VAGRANT_NO_PARALLEL environment variables

           ```
           export DOCKER_HOST=<ip>:<port>
           export VAGRANT_NO_PARALLEL=true
           ```
   - Run

       ```
       vagrant up --docker=true
       ```
> **If working on Windows** and `vagrant up` immediately returns errors, you may need to run `sh eol_to_unix.sh`

    This opens a web browser with configuration form. If it doesn't, visit <http://localhost:8081> in your browser. Make changes and click OK.

6. Enter configuration parameters in the web configuration form and click OK. Your applications should be updated within a minute or so.

Visit:
 - Lentil: <http://localhost:3001>
 - Social Feed Manager: <http://localhost:8001>
 - twarc: run `vagrant ssh` on the command line and then the twarc.py
   commands described in the [official twarc
documentation](https://github.com/edsu/twarc). Store output files in the
`/vagrant/archive/twarc-store` directory.
 - Configuration tool: <http://localhost:8081>

> To stop the Social Media Combine virtual machine, run `vagrant halt` in the project directory.

Troubleshooting
---------------
1. The first time it's started, the Combine will download a lot of application data. Occasionally, one of these downloads will fail and you may see some error messages or be unable to reach one of the applications. In order to retry the Combine setup, run `vagrant provision`.
2. Don't see any data? Lentil will harvest images every 15 minutes, and Social Feed Manager will harvest Tweets every 6 hours.

Exporting data
---------------
After you have been harvesting content for a day or so, take a look in the `archive` directory. Some Social Feed Manager content may not yet appear in this directory, but will still be present in the database.

To generate a CSV export of data collected for a Twitter user (e.g. @cazzerson) in Social Feed Manager, you can run `vagrant exec 'docker exec vagrant_sfmapp_1 ./sfm/manage.py export_csv --twitter-user cazzerson'`. You can also add users to a set (e.g. myset) in the Social Feed Manager administrative tools and then export this set of users with `vagrant exec 'docker exec vagrant_sfmapp_1 ./sfm/manage.py export_csv --set-name myset'`.

Administrative information
--------------------------
Lentil:
 - URL: <http://localhost:3001/admin>
 - default username: admin@example.com
 - default password: password

Social Feed Manager:
 - URL: <http://localhost:8001/admin>
 - default username: sfmadmin
 - default password: password

Steps for Reconfiguration
--------------------------
Application reconfiguration can be performed after deployment.

1. Open web configuration tool at <http://localhost:8081>. Make changes and click OK.

2. Your applications should be updated within a minute or so.

> If your applications are not updated or you are changing configuration files on the filesystem, you may need to manually launch the configuration task by running `vagrant exec ./reconfig.sh`.

Steps for updating applications
-------------------------------

1. In your terminal application, while in the Social Media Combine directory, run
    ```
    vagrant provision
    ```

Feedback
========
Please email Bret Davidson at bddavids@ncsu.edu with any questions or suggestions.

TO DO
=====
* Upgrade and Rollback
  - There is a hook in Vagrantfile for upgrade procedure.
  - The upgrade.sh script shall perform check point to roll back in case of failure.
  - Then check the version number of lentil and Social Feed Manager application. Perform upgrade according to specified version.
  - If possible take the target version from web config form.
* Provide more configurations to Social Feed Manager container. As of now we have only 3 parameters for Social Feed Manager.
* Run webconfig container on demand. Start the container only when required.
* Enable automatic port selection in Vagrantfile. Automatically change the webconfig port 8081 to auto selected port.
* Give a host name to each application instead of localhost and port number.

## Developer Notes
### Docker Documentation
* [Building images with docker](https://docs.docker.com/userguide/dockerimages/#building-an-image-from-a-dockerfile)
* [Building images with docker-compose](https://docs.docker.com/compose/#build-and-run-your-app-with-compose)
* [Pushing images to Docker Hub](https://docs.docker.com/userguide/dockerrepos/#pushing-a-repository-to-docker-hub)

## Credits
* Aditya Ambre
* Jason Casden
* Bret Davidson
* Brian Dietz
* Abigail Jones
* Ramakant Moka
* Mitul Panchal
* Our many testers

The development of the Social Media Combine environment was partially supported by federal Library Services and Technology Act (LSTA) funds made possible through a grant from the Institute of Museum and Library Services, and administered by the State Library of North Carolina, a division of the Department of Cultural Resources. This grant-funded project, "New Voices and Fresh Perspectives," is hosted by NCSU Libraries and led by Brian Dietz and Jason Casden.

[Social Feed Manager](https://github.com/gwu-libraries/social-feed-manager) is developed at George Washington University Libraries.

[Lentil](https://github.com/NCSU-Libraries/lentil) is developed at NCSU Libraries.

[twarc](https://github.com/edsu/twarc) is developed by Ed Summers.
