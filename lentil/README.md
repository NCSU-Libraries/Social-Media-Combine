Lentil Docker
=============
Orchestration for lentil application.

Containers
==========
1. ncsulibrariesdli/lentil
  - Application container
  - Runs web server on port 3000
  - archive data container for image archives
  - links lentildb container for database
2. ncsulibrariesdli/mysql_store
  - data volume container for mysql database persistence
3. mysql
  - mysql standard database server container

What comes in lentilapp Container
=================================
base image: phusion/passenger-ruby21

1. mysql client
2. Ruby 2.15
3. Rails 3.2.21
4. nginx with passenger
5. Lentil
6. Whenever
