# sails-hook-morgan-loggin

*Note: Requires Sails.js version >=0.11.0-rc*

Loggin all [Sails JS](http://sailsjs.org) resquest with [morgan](https://github.com/expressjs/morgan) that your API receives.

It can also automatically rotate your log file using the [file-stream-rotator](https://www.npmjs.com/package/file-stream-rotator).

### Installation

`npm i sails-hook-morgan-loggin --save`

### Usage

Just Lift your application and it starts loggin all request in a daily file stored in ./log folder as the format

`::ffff:127.0.0.1 - - [11/Aug/2016:19:54:07 +0000] "POST /v1/auth/login HTTP/1.1" 403 34 "-" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36"`


### Configuration

Tou can disale the logger setting the "silently" boolean variable at `sails.config.log.silently` to `false`.

Enjoy!