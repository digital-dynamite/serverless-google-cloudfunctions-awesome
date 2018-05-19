# Serverless Google Cloud Functions Plugin

[![Coverage Status](https://coveralls.io/repos/github/serverless/serverless-google-cloudfunctions/badge.svg?branch=master)](https://coveralls.io/github/serverless/serverless-google-cloudfunctions?branch=master)

This plugin enables support for [Google Cloud Functions](https://cloud.google.com/functions/) within the [Serverless Framework](https://github.com/serverless/serverless).


## Why is this fork AWESOME?

This repo is a fork of the official [Serverless Google Cloud Functions](https://github.com/serverless/serverless-google-cloudfunctions),
but adds extra features for staging:

In the `serverless.yml`, you can add `prependService` and `prependStage` to the `provider` key.

For example, the configuration below

```
service: users

provider:
  name: google
  runtime: nodejs
  project: <project-id>
  credentials: <credentials>
  stage: purple
  prependService: true
  prependStage: true

functions:
  login:
    handler: login
    entryPoint: login
    events:
      - http: path
```

will deploy your Google Cloud Function with:

`name: my-awesome-service-purple-login`

`handler: login` // Note that the handler is not affected

`trigger: https://us-central1-<project-id>.cloudfunctions.net/users-purple-login `


It also adds an option to retry background jobs upon failure:
```
functions:
  email:
    handler: email
    entryPoint: send
    events:
      - event:
          eventType: providers/cloud.pubsub/eventTypes/topic.publish
          resource: projects/${self:provider.project}/topics/${self:provider.stage}-new-account
          retry: true
```

*Special thanks to [@CaptainJojo](https://github.com/CaptainJojo) for his contribution to these awesome features.*


## Documentation

The documentation can be found [here](https://serverless.com/framework/docs/providers/google).

---

## Easier development with Docker

You can spin up a Docker container which mounts this code with the following command:

```bash
docker-compose run node bash
```
