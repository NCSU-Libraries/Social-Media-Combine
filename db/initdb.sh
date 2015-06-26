#!/bin/bash
echo "******CREATING DOCKER DATABASES******"
gosu postgres postgres --single <<- EOSQL
CREATE DATABASE sfm;
CREATE DATABASE lentil;
EOSQL
echo ""
echo "******DOCKER DATABASES CREATED******"
