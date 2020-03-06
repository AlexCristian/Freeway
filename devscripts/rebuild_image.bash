#!/usr/bin/env bash
# Use this script to rebuild the image after changing the
# requirements.txt file, dockerfile, etc.

sudo systemctl start docker
sudo docker-compose -f docker-compose.yml up --build
