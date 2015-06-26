Social Media Combine
================

**This is an alpha release. Please do not use this for production services.**

Steps to run
-------------
1. Install [Git](https://help.github.com/articles/set-up-git/)
2. Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
3. Install [Vagrant](https://www.vagrantup.com/downloads.html) version >= 1.7.2 on your host machine.
4. Open `Terminal` on a Mac, `Git Shell` on Windows, or your preferred shell on Linux and clone this repository using git.

    ```
    git clone https://github.ncsu.edu/ncsu-libraries/SMALT-virtualization.git
    cd SMALT-virtualization
    ```
5. Run

   ```
   vagrant up
   ```
> **If working on Windows** and `vagrant up` immediately returns errors, you may need to run `sh eol_to_unix.sh`

   This opens a web browser with configuration form. If it doesn't, visit http://localhost:8081 in your browser. Make changes and click OK.

6. Enter configuration parameters in the web configuration form and click OK.
7. Your applications should be updated within a minute or so.
8. Commit the changes

Visit
 - Lentil: http://localhost:3001
 - Social Feed Manager: http://localhost:8001
 - Configuration tool: http://localhost:8081

Troubleshooting
---------------
1. The first time it's started, the Combine will download a lot of application data. Occasionally, one of these downloads will fail and you may see some error messages or be unable to reach one of the applications. In order to retry the Combine setup, run `vagrant provision`.

2. You may occasionally set `apt-get` errors when first setting up the Combine. In this case, you may sometimes need to update the underlying machine image by running `vagrant box update.`

Administrative information
--------------------------
Lentil:
 - URL: http://localhost:3001/admin
 - default username: admin@example.com
 - default password: password

Social Feed Manager:
 - URL: http://localhost:8001/admin
 - default username: sfmadmin
 - default password: password

Steps for Reconfiguration
--------------------------
Application reconfiguration can be performed after deployment.

1. Open web configuration tool at http://localhost:8081. Make changes and click OK.

2. Your applications should be updated within a minute or so.

> If your applications are not updated or you are changing configuration files on the filesystem, you may need to manually launch the configuration task by running `vagrant exec ./reconfig.sh`.

Steps for updating applications
-------------------------------

1. In your terminal application, while in the project directory, run
    ```
    vagrant provision
    ```

TO DO
=====
* Upgrade and Rollback
  - There is a hook in VagrantFile for upgrade procedure.
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

Social Feed Manager is developed at George Washington University Libraries.

Lentil is developed at NCSU Libraries.
