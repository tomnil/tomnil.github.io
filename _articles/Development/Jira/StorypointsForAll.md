---
layout: article
title:  Worklog to storypoints (with or without subtasks) in Jira Cloud NextGen projects 
description:
date: 2020-04-10
tags: development jira
supertag: jira
---

## The dual problem

Jira Cloud Nextgen has much code built around Story Points, but often it's better to use "Estimated Time Left" and logging work. So what if we want the following setup:

* Estimated time left should be stored as Story Points, but:
  * For small stories, just plan the time using "Estimated time left"
  * For larger stories, use subtasks to plan and use the story (aka the parent) as the Σ of the "Estimated time left"

## Technical implementation

Basically it's like this:

* Find the issue
* Is it a Story?
  * If it doesn't have subtasks, copy "Estimated time left" to Story Points.
* Is it a subtask?
  * Copy "Estimated time left" to Story Points
  * Update the parent with the sum of "Estmated time left"

```groovy
{% include_relative dualsetup.groovy %}
```

Ps. This gracefully handles regardless if you update the user story, a subtask or log work.

## Enjoy

:)
