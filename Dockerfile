FROM node:boron

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

RUN apt-get update && apt-get install -y unzip
 
# install consul agent
ADD https://releases.hashicorp.com/consul/0.9.0/consul_0.9.0_linux_amd64.zip /tmp/consul.zip
RUN cd /bin && \
    unzip /tmp/consul.zip&& \
    chmod +x /bin/consul && \
    mkdir -p {/data/consul,/etc/consul.d} && \
    rm /tmp/consul.zip
 
# copy service and check definition, as we wrote them earlier
COPY docker-files/consul.json /etc/consul.d/


