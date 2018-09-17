# persik-app-tv

> Persik App for TV-devices

## Prepare

### Ubuntu

```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
apt install -y nodejs
npm install -g npm
```

### Docker Agent

```
#prepare tizen sdk
docker create --name tizen-sdk -v tizen-sdk:/tizen-sdk mkborg/tizen-sdk false

#prepare webos sdk
docker create --name webos-sdk -v webos-sdk:/webOS_SDK persiktv/ubuntu-webos-sdk false

docker run -it -d --rm --name srv-agent-01 \
 -e SERVER_URL="http://teamcity.persik.by:8111" \
 --volume tizen-sdk:/tizen-sdk  \
 --volume webos-sdk:/webOS_SDK  \
 persiktv/teamcity-agent

или

docker run -it -d --rm --name srv-agent-01 \
 -e SERVER_URL="http://teamcity.persik.by:8111" \
 -p 8080:8080 \
 --volume tizen-sdk:/tizen-sdk \
 --volume webos-sdk:/webOS_SDK \
 jetbrains/teamcity-agent

#2nd agent:
docker run -it -d --rm --name srv-agent-02 \
 -e SERVER_URL="http://teamcity.persik.by:8111" \
 --volume tizen-sdk:/tizen-sdk \
 --volume webos-sdk:/webOS_SDK \
 jetbrains/teamcity-agent
 
docker exec -i -t srv-agent-01 /bin/bash
 
curl -sL https://deb.nodesource.com/setup_8.x | bash -
apt install -y nodejs build-essential zip uni2ascii
npm install -g npm
npm install -g node-gyp

#Android
npm install -g cordova

add-apt-repository ppa:webupd8team/java
apt-get update
apt-get install oracle-java8-installer
#check installed java:
update-alternatives --config java
 
echo 'export JAVA_HOME="/usr/lib/jvm/java-8-oracle"' >> ~/.bashrc

download latest android sdk-tools
cd
wget https://dl.google.com/android/repository/sdk-tools-linux-3859397.zip
unzip sdk-tools-linux-3859397.zip
mkdir /android-sdk
mv tools /android-sdk
cd /android-sdk/tools/bin

./sdkmanager "platform-tools" "platforms;android-26" "build-tools;26.0.3"

echo 'export PATH=${PATH}:/android-sdk/platform-tools:/android-sdk/tools' >> ~/.bashrc

#gradle
add-apt-repository ppa:cwchien/gradle
apt update
apt install gradle

mkdir ~/.gradle
#apt install nano
#nano ~/.gradle/gradle.properties
org.gradle.daemon=false


#nano /data/teamcity_agent/conf/buildAgent.properties
env.ANDROID_HOME=/android-sdk
env.PATH=%env.PATH%:/android-sdk/platform-tools:/android-sdk/tools

```

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## Сборка под платформы

### 1. Browser
По-умолчанию сборка осуществляется в этом режиме
```bash
npm run build -- --target=browser --type=web
```

### 2. Samsung Orsay
#### 2.1. Launcher
Оболочка приложения
```bash
npm run build -- --target=orsay --type=launcher
npm run package -- --target=orsay --type=launcher
```
#### 2.2. Web  
```bash
npm run build -- --target=orsay --type=web
```
#### 2.3. Standalone  
```bash
npm run build -- --target=orsay --type=standalone
```


### 3. LG WebOS
```bash
npm run build -- --target=lg --type=web
```

#Заметки

##2018-03-19
.babelrc нужен только для *.es6 -> *.js компиляции

У webpack'a свой конфигуратор js и css (build/platforms.js)

