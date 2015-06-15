# Trello Issue

[Webhook](https://trello.com/docs/gettingstarted/webhooks.html) for Trello Board, auto prepend issue number to the new-created cards, such as `#11`.

![trello Issue Demo](https://github.com/zhiyelee/trello-issue/raw/master/trello-issue.gif)

## Installation

### Get your key and token

1. [Get your developer key](https://trello.com/1/appKey/generate)
2. Get an authorization token with this url: `https://trello.com/1/connect?key=<APP_KEY>&name=YOUR_APP_NAME&response_type=token&expiration=never&scope=read,write`

### Bind Webhook to your Board

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
