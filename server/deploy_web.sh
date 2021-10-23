#!/bin/bash
sudo rm -rf /usr/local/nginx/html/admin_panel
sudo rm -rf /usr/local/nginx/html/client

if [--d ./admin_panel]; then
  sudo mv ./admin_panel /usr/local/nginx/html/
fi

if [--d ./client]; then
  sudo mv ./client /usr/local/nginx/html/
fi

sudo systemctl reload nginx