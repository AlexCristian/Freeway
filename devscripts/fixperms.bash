#!/usr/bin/env bash
# Run this every time Docker creates files owned by root.
# The command will change ownership of the files to yourself,
# so that you may edit them.

sudo chown -R $USER:$USER .
