# API Builder Plugin for SendGrid

[**Axway API Builder**](https://docs.axway.com/bundle/API_Builder_4x_allOS_en/page/api_builder.html) flow-node that implements [**SendGrid**](https://www.sendgrid.com)'s email service: *api-builder-plugin-sendgrid*

Methods Implemented:

* sgMail.send

## About flow-nodes

Flow-nodes are used within Axway API Builder's flow editor that is a low-code / no-code solution to designing and developing services
that integrate to many different connected components, such as databases and APIs.

## Install

After creating your [**API Builder Project**](https://docs.axway.com/bundle/API_Builder_4x_allOS_en/page/api_builder_getting_started_guide.html), you can install this plugin using npm:

```
npm install api-builder-plugin-sendgrid
```

> Note that this command will install from npm. If you want to install locally, then provide the full path to the plugin folder

Before launching your API Builder app that uses this plugin, you must set the following environment variables as per your SendGrid account:

* SENDGRID_API_KEY

## Use

Find the plugin in the Messaging group in the Flow-Nodes panel. Drag onto the canvas and select the desired method and provide the input and wire up to the rest of your flow as shown below:

![](https://i.imgur.com/J8Pomfc.png)

## Methods

The currently implemented methods are described below.

### sgMail.send()

SendGrid email docs are [**here**](https://github.com/sendgrid/sendgrid-nodejs/tree/main/packages/mail)

Provide the *to* and *from* email addresses, the email *subject* and the email message body *html* as input:

* from =  'lbrenman99@hotmail.com'
* to = ['leor.brenman@gmail.com']
* html = '<strong>and easy to do anywhere, even with API Builder</strong>'
* subject = 'Test email'

If the email send fails you will get an error message. If the email send succeeds then there is not repsonse body.

> Note that the *to* email addresses are provided in an array. There are also the following optional fields:

* cc - array of cc email addresses
* bcc - array of bcc email addresses
* replyTo - the replyTo email address

> Note that the *from* email address must be a SendGrid verified email address.
