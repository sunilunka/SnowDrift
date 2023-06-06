#!/bin/bash
# Note, will try and move everything into Docker Compose to tidy it all up
echo "*** Starting Proxy Services ***"
cd ./development-proxy
echo "--> Changed to $(pwd)"
echo "--> Starting proxy container..."
docker run --rm -p 8666:8666 dev-proxy:latest