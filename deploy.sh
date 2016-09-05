#!/bin/bash 
meteor build --directory .build
rsync --numeric-ids -avze ssh .build/bundle/ feintrac@antares.uberspace.de:~/apps/tracy/
ssh feintrac@antares.uberspace.de <<'ENDSSH'
cd ~/apps/tracy/programs/server
npm install
ENDSSH
