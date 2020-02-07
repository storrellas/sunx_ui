#Grab the latest alpine image
FROM nginx:1.15
COPY ./build/ /usr/share/nginx/html/dist
COPY ./public/ /usr/share/nginx/html

# Change permissions
RUN chmod -R 755 /usr/share/nginx/html/
