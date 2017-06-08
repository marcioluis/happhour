# Instruções
Instalar Android Studio e Android/Java SDK.
Criar as variaveis de ambiente android_home e definir para:
`ANDROID_HOME=C:\Users\<<user name>>\AppData\Local\Android\sdk`
Adicionar no **path**
```
%ANDROID_HOME%
%ANDROID_HOME%\tools
%ANDROID_HOME%\platform-tools
```
Instalar npm.
`npm i -g ionic cordova`
Clonar esse repositório.
Navegar até o diretório criado.
```
mkdir www
npm i
npm i -D
```
substituir a android **debug.keystore** por esse do projeto em:
`<<user dir>>/.android`
Para rodar no emulador:
`ionic cordova emulate android --debug`
Para rodar no device:
`ionic cordova run android --debug`
