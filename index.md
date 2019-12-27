---
layout: default
---

This site is my notebook for all kinds of technical problems and solutions I've come across during the years working with computers. I hope you will find some of the information here helpful.

If you need to reach out to me, please view the [About](about) page.

## Article list

<div>

    {% assign sorted = site.articles | sort: 'date'%}
    {% assign sorted_reverse = sorted | reverse %}
    {% for article in sorted_reverse  %}
      <div class="coloritgrey">
        <div class="alignleft">&#8718; <a href="{{ article.url }}">{{ article.date | date: "%Y-%m-%d"}} - {{ article.title }}</a></div>
        <div class="alignright">
          {% if article.supertag %}
          <a href="/tags/{{ article.supertag }}/">#{{article.supertag}}</a>
          {% endif  %}
        </div>
        <div style="clear: both;">
          {{ article.description }}
        </div>
    </div>
    {% endfor %}

</div>
<br/>

## License

TL;DR; You can use any information on these pages as you see fit, but you cannot hold me responsible for anything. To read the fine print, open [MIT License](License.MD)

