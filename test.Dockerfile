FROM dftechs/ubuntu-dev
WORKDIR dfcommunity-api-test/
COPY . .
RUN apt update -y
RUN apt upgrade -y
RUN [ "apt install -y --no-install-recommends nodejs npm"] 
RUN [ "npm install" ]
EXPOSE 8080
EXPOSE 9000
CMD [ "npm", "test" ]