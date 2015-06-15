# Trello Issue

[Webhook](https://trello.com/docs/gettingstarted/webhooks.html) for Trello Board, auto prepend issue number to the new-created cards, such as `#11`.

![trello Issue Demo](https://github.com/zhiyelee/trello-issue/raw/master/trello-issue.gif)

## Installation

### Getting your key and token

* [Generate your developer key](https://trello.com/1/appKey/generate) and supply it as the first constructor parameter.
* To read a user’s private information, get a token by directing them to `https://trello.com/1/connect?key=<PUBLIC_KEY>&name=MyApp&response_type=token` replacing, of course, &lt;PUBLIC_KEY&gt; with the public key obtained in the first step.
* If you never want the token to expire, include `&expiration=never` in the url from the previous step.
* If you need write access as well as read, `&scope=read,write` to the request for your user token.
`</PUBLIC>`

### Bind webhook to your Board

Follow the instruction: [Creating a Webhook](https://trello.com/docs/gettingstarted/webhooks.html#creating-a-webhook)

You can also use below command to add webhook with [httpie](https://github.com/jakubroztocil/httpie)

```bash
http -v POST https://trello.com/1/tokens/{OAUTH_TOKEN}/webhooks/\?key\={APP_KEY}   idModel={BOARD_ID} description='{custom_description}' callbackURL='http://{YOUR_DOMAIN}/callback?{any_parameters_you_want_append}'
```

Arguments description:
* __OAUTH_TOKEN__   Authorization token which you get from the last step.
* __APP_KEY__   Your application key
* __BOARD_ID__   The id of the board which you want to monitor.
* __YOUR_DOMAIN__   Replace with your domain which you deploy this webhook. Note you should not change the `/callback` path.

### Configuration

```bash
make

# use your prefer editor to edit the config file
vim conf/config.yml
```

About the config file, you can custom below attributes:

```yaml
# The default prefix looks like below, based on the default config
#   '#TASK0001', '#TASK1101'

# Total length of numbers, exclude prefix
#   eg:
#     4 -- 0001
#     4 -- 0123
#     3 -- 001
#
numbersLength: 4

# Start number, start from which the app generates issue number
startNumber: 1

# Prefix of the issue number, any string you want, such as `#TASK`
prefix: '#'
```


### Start the server

```bash
# start use `--harmony`
node --harmony index.js
# OR use PM2
pm2 start index.js --name trello-issue
```


## LICENCE
ISC LICENCE
