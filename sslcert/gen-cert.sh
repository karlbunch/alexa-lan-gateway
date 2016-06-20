#!/bin/bash
#

read -p "Endpoint DNS name: " ENDPOINT
read -p "Company: " DN_ORG
read -p "Country [US, UK, etc.]: " DN_COUNTRY
read -p "City: " DN_CITY
read -p "State: " DN_STATE

cat << ! > self-signed-ssl.cnf
[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no
 
[req_distinguished_name]
C = ${DN_COUNTRY}
ST = ${DN_STATE}
L = ${DN_CITY}
O = ${DN_ORG}
CN = alexa-lan-gateway
 
[v3_req]
keyUsage = keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @subject_alternate_names
 
[subject_alternate_names]
DNS.1 = ${ENDPOINT}
!
set -xe
openssl genrsa -out self-signed-ssl.key 2048
openssl req -new -x509 -days 365 -key self-signed-ssl.key -config self-signed-ssl.cnf -out self-signed-ssl.pem
