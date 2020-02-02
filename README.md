# quizduell-cheat-web
A Web-GUI for my quizduell cheat

This is a Node JS based project. At the moment it is just showing your games and after clicking on a game you can see all the answers for all questions in this game.

### Requirements
- NodeJS (I'm using v12.14.1)
- Python (I'm using Python2, but it should also work with Python3)
- Python packages: cookielib, os, json, argparse, urllib, urllib2, hmac, hashlib, base64, datetime, re, ssl
- NodeJS packages: a huge list, see `package-lock.json` and `package.json` for details

### Installation
Clone/Download the repository with `https://github.com/henrydatei/quizduell-cheat-web.git`. Change the directory `cd quizduell-cheat-web`. Install Python packages `pip install cookielib os json argparse urllib urllib2 hmac hashlib base64 datetime re ssl`. Install NodeJS packages `npm install`. Start the application `DEBUG=quizduell-cheat-web:* node ./bin/www`. Use your browser and open [http://localhost:3000](http://localhost:3000).

### Remarks
- After entering your Quizduell credentials a cookie will be created (`cookie_file`) that has a lifetime of 10 years. The value of this cookie is used to authenticate the user over multiple requests. That means if you enter the wrong credentials you have to delete the cookie file and login again. If you want to change your account then you have to delete the cookie file too.
