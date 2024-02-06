#!/bin/bash

# Update and upgrade server
sudo apt update -y && sudo apt upgrade -y

# Install Apache2
sudo apt install apache2 -y

# Start Apache and check status
sudo systemctl start apache2
sudo systemctl status apache2

# Change owner of /var/www
sudo chown -R ubuntu:ubuntu /var/www

# Remove symbolic html link
sudo rm /var/www/html/index.html

# Clone GitHub repository for lab-2b
git clone https://github.com/your_username/lab-2b.git /var/www/lab-2b

# Create symbolic html link for cloned GitHub repo
sudo ln -s /var/www/lab-2b /var/www/html

# Navigate to sites-available directory
cd /etc/apache2/sites-available

# Copy 000-default.conf to it210_lab.conf
sudo cp 000-default.conf it210_lab.conf

# Disable default site and enable new site
sudo a2dissite 000-default.conf
sudo a2ensite it210_lab.conf

# Reload Apache2
sudo systemctl reload apache2

# Update and upgrade Apache2
sudo apt install apache2 -y

# Install Certbot for TLS certificate
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

# Obtain TLS certificate
sudo certbot --apache

# Change ownership of SSL certificate
sudo chown ubuntu -R /etc/letsencrypt
