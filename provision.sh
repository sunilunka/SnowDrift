#!/usr/bin/env bash
NODE_VERSION=18
echo "*** Installing updates ***"
apt-get update
echo "*** Installing node version ${NODE_VERSION} ***"
sudo snap install node --classic --channel=$NODE_VERSION 
echo "*** Installing NPM dependencies ***"
cd /vagrant
npm create vite@latest SnowDrift-svelte -- --template svelte-ts 
cd ./SnowDrift-svelte
npm install