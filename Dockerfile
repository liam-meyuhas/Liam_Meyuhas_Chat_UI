FROM node:20.16.0

WORKDIR /opt

COPY package.json /opt/

RUN npm i

COPY src/ /opt/

COPY public/ /opt/

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]