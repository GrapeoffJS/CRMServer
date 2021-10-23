#!/bin/bash
if [--d ./admin_panel]; then
  sudo rm -rf /usr/local/nginx/html/admin_panel
  sudo mv ./admin_panel /usr/local/nginx/html/
fi

if [--d ./client]; then
  sudo rm -rf /usr/local/nginx/html/client
  sudo mv ./client /usr/local/nginx/html/
fi

sudo systemctl reload nginx