FROM dftechs/ubuntu-dev
WORKDIR dfcommunity-api-test/
COPY . .
RUN [ "apt install -y --no-install-recommends nodejs npm && npm install" ]
EXPOSE 8080
EXPOSE 9000
CMD [ "npm", "test" ]