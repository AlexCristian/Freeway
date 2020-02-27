#!/usr/bin/env bash

sudo systemctl start docker
sudo docker-compose run web bash
