---
layout: article
title: vCloud - postman setup
description:
date: 2020-07-18
tags: vmware virtualization postman
supertag: vmware
---

## Logon

In postman, create a new POST request.

```http
POST {{vdcHostName}}/api/sessions
```

For Authorisation, enter your username and password. Set it to "Basic Auth". 

In tests, enter the following script:

```javascript
let key = pm.response.headers.get('x-vcloud-authorization');
console.log("Found it: " + key)
pm.environment.set("x-vcloud-authorization", key);
```

It's also possible to use ```pm.globals.set("variable_key", "variable_value");```.

This environment variable will be used in all examples at this site.

Also, a detailed how-to-postman is found at [post_req_scripts.md] at this site.

## Enjoy

:)
