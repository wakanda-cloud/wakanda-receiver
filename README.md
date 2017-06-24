# Getting Started with Wakanda REST API

```POST -> https://wakanda-statistic-receiver.herokuapp.com/registerStatistic```<br>

The post must have a API Key and data "like" below.

```json
{
  "apiKey" : "<app key>",
  "data" : {
    "client": "",
    "module": "",
    "submodule": "",
    "title": "",
    "linkClicked": "",
    "location" : "" // `latitude;longitude`
  }
}
```
But this is will not work by itself, the "data" field, must be encrypted in AES-256 on CTR Mode using the Encrypt Key located on your project on of side from ApiKey.

We recommend to use <a href="https://code.google.com/archive/p/crypto-js"> CryptoJS</a> or simillar to do this.
Example on Javascript:

```javascript
var encryptKey = "12345678";
CryptoJS.AES.encrypt(jsonStatistic, encryptKey, {
    mode: CryptoJS.mode.CTR
}).toString()
```
*You need escape the "+" characters to %2B before send POST.*
<br><b>Try on https://jsfiddle.net/w1fb8pn0/</b>

*Note: we already have libraries for some languages like: 
<br>[Javascript: "wakanda-js"];
<br>[Java: "jwakanda"];
<br>[NodeJS: "node-wakanda"];

Help us developing your own or improve existing libraries on our repositories.

Browse libraries on https://github.com/wakanda-libraries/
