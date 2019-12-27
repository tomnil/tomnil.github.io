---
layout: article
title:  Introduction to Jekyll (and Github Pages)
description: Jekyll is a tool to produce a static website built from your git repo at Github. Each time you change the repo, the website is rebuilt.
date:   2019-07-28
tags: jekyll git
supertag: jekyll
---

Github has this cool functionality where every push to your git will execute a "Jekyll" build of your website (not to confuse witht the CI tool "Jenkins"). In this build, all .md files will be converted to .html (and .html will be processed and copied as well). Now, the real power lies in the ability to mix in Jekyll code which will execute on build. An example would be:

```
This is the page title: {% raw %}{{ page.title }}{% endraw  %}.
```

## Example site

This zip file contains a fully working Jekyll site (which also is compatible with Github pages). To start it do one of:

1. Follow the guides to download an run locally, see: [https://jekyllrb.com/docs/installation/windows/](https://jekyllrb.com/docs/installation/windows/)
2. Initialize an empty Github repo and add all files. Don't forget to enable Github pages.
3. Clone the repo to your local drive
4. [Download](https://www.dropbox.com/s/p3r4mfi9tjcw7h6/EmptySite%20%28Fully%20working%20with%20example%20articles%29.zip?dl=1) and extract in this folder.
5. Build locally or push to Github.

## Jekyll Directory Structure

This is an example of an directory structure *where nothing has been compiled*

```
 ├── LICENSE.txt
 ├── README.md
 ├── _posts
 │   ├── 2019-01-01-my-first-post.md
 │   ├── 2019-01-02-second.md
 ├── _articles
 │   ├── hello world.md
 │   ├── test.md
 ├── _includes
 │   ├── footer.html
 │   ├── head.html
 │   ├── header.html
 ├── _layouts
 │   ├── default.html
 │   ├── home.html
 │   ├── page.html
 │   └── post.html
 └── assets
     └── main.scss
```

## Default pages

Jekyll (and specifically templates) has default files which are served to the browser - but are missing in the directory structure.  All such files can be overriden.

## Configuring your first Jekyll site

To make this work, you need some few things in place.

## /Gemfile

This file is the Jekyll configuration file. Jekyll reads this file to know which plugins to load (Gems).

## /_config.yml

This file is the main settings for your site. It may be as short as:

```
title: The title
email: your-email@example.com
description: The site description
baseurl: "" # the subpath of your site, e.g. /blog
url: "" # the base hostname & protocol for your site, e.g. http://example.com

# Build settings
markdown: kramdown
theme: minima
```

## /_posts-folder

This folder contains articles you've created. Do **not** deviate from the naming standard "yyyy-mm-dd-description-of-file.md" or they won't show up on your site.

As an example, create a file named "2019-12-24-christmas.md".

You must include the header, or the file will not be processed.

```
---
layout: post
title:  "It's christmas time!"
date:   2019-12-24
---

Merry Christmas.
```
 
## Collections

It's also possible to create a group of articles (of any kind). These will be grouped as collections and to enable such a collection you need to do the following:

1. Create an folder with a name of your choice. It must start with _. In this example we use _articles
2. Tell Jenkins it should activate this folder. The name of the folder and the name of the collection must match. Add the following to \config.yml.

```
collections:
  articles:
      output: true
```

Collections are preferred (for version 3.x of Jenkins) since other files (such as pictures) are handled much better.

(!) Creating this collection will also create an global variable named site.[collection_name].

## Variables

On each page there's a number of variables available. Let's use some of them:

```
{% raw %}
---
layout: post
title:  "It's christmas time!"
date:   2019-12-24
---

Merry Christmas.

This page is named {{ page.title }} and in my _config.yml
it's configured the email is {{ site.email }}.
{% endraw %}
```

There's a number of variables to play around with, take a look here: https://jekyllrb.com/docs/variables/


## More on variables

Create _layouts\post.html with the following contents. 

```
{% raw %}
---
layout: default
---

<div class="post">
  <h1 class="post-title">{{ page.title }}</h1>
  <span class="post-tags">
    [&nbsp;
    {% for tag in page.tags %}
      {% capture tag_name %}{{ tag }}{% endcapture %}
      <a class="no-underline" href="/tag/{{ tag_name }}"><code class="highligher-rouge"><nobr>{{ tag_name }}</nobr></code>&nbsp;</a>    
    {% endfor %}
    ]
  </span>
  <span class="post-date">{{ page.path | file_date | date: "%Y-%m-%d" }}</span>

  {{ content }}
</div>
{% endraw %}
```

Also, edit your christmas file to include atleast one tag. Example: 

```
---
layout: post
title:  "It's christmas time!"
date:   2019-12-24
tags: christmas, snow, presents
---
```

The result will now for layout "post" include a tag list.

## Theming

There's a number of themes available for Jekyll, and they might be tricky to use at first sight. First of all, all templates produce a result of CSS, HTML and JavaScript (after Jekyll compile). The challenge might be in understanding how the css is built (that's another topic.). Anyway, when you've decided on which to use, do the following:

Tip: Understanding themes - https://jekyllrb.com/docs/themes/#overriding-theme-defaults

### Modify "GemFile"

This will add a reference to the Gem.
```
gem "jekyll-theme-leap-day"
```

### Modify "_config.yml"

And this will activate the gem.

```
theme: jekyll-theme-leap-day 
```

### Optionally download the theme

If running locally you need to tell Jekyll to download the theme.

```
bundle install
```

If you get an error, install local tools (see below)

## Performing a local build

Local builds require tools to be installed. Follow this guide:

https://help.github.com/en/articles/setting-up-your-github-pages-site-locally-with-jekyll

### Running the build
```
bundle exec jekyll serve --incremental
```

This will start a webserver on http://127.0.0.1:4000 and watch for changed files.

### Verbose build

If you're interested what's happening behind the scenes, run:

```
bundle exec jekyll build --verbose
```


## Cheat Sheet

https://devhints.io/jekyll

## This site?

This site is built using Jekyll. Take a look at [Github](https://github.com/tomnil/tomnil.github.io)

