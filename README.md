# Trello Issue

[Webhook](https://trello.com/docs/gettingstarted/webhooks.html) for Trello Board, auto prepend issue number to new-created card.

## Installation

### Getting your key and token
* [Generate your developer key](https://trello.com/1/appKey/generate) and supply it as the first constructor parameter.
* To read a user’s private information, get a token by directing them to `https://trello.com/1/connect?key=<PUBLIC_KEY>&name=MyApp&response_type=token` replacing, of course, &lt;PUBLIC_KEY&gt; with the public key obtained in the first step.
* If you never want the token to expire, include `&expiration=never` in the url from the previous step.
* If you need write access as well as read, `&scope=read,write` to the request for your user token.
`</PUBLIC>`

### Add webhook to your Board

Follow the instruction here: [Creating a Webhook](https://trello.com/docs/gettingstarted/webhooks.html#creating-a-webhook)

You can also use below command to add webhook with [httpie](https://github.com/jakubroztocil/httpie)
```
http -v POST https://trello.com/1/tokens/{OAUTH_TOKEN}/webhooks/\?key\={APP_KEY}   idModel={BOARD_ID} description='{custom_description}' callbackURL='http://{YOUR_DOMAIN}/callback?{any_parameters_you_want_append}'
```

Arguments description:
* OAUTH_TOKEN   Authorization token which you get from the last step.
* APP_KEY   Your application key
* BOARD_ID   The id of the board which you want to monitor.
* YOUR_DOMAIN   Replace with your domain which you deploy this webhook

### Config

Copy `conf/conf.sample.json` to `conf/conf.json`, add replace the placeholder with your key and token.

### Start the server

Use `node --harmony index.js` OR any other tools like [PM2](https://github.com/Unitech/pm2) to start the server.


## LICENCE
MIT
