---
layout: article
title: Regex notes from the field
description: 
date: 2020-03-02
tags: devmisc
supertag: devmisc
---

## The most important about regex

It's hard to read, but by visualizing it, it will become understandable. I strongly recommend [https://regexper.com/](https://regexper.com/).

### Example

```text
^hello, (world|moon)\\.$
```

![](2020-03-02-23-01-07.png)

## The regex basics

| **Character** | **Description** | **Example** | **Result** |
|--|--|--|--|
| \ | Escapes the next character (so \\n matches newline) | \\n | ![](2020-03-02-22-30-57.png) |
| ^ | Matches the beginning of input | ^hello | ![](2020-03-02-22-31-53.png) |
| $ | Matches the end of input. | hello$ | ![](2020-03-02-22-32-25.png) |
| * | Matches the previous character zero or more times. "te*" will match "te", "tee", "teee", "teeee" and so forth. | te* | ![](2020-03-02-22-33-45.png) |
| . | Matches any single character | hel.o | ![](2020-03-02-22-34-22.png) |
| .\ | Matches any string from zero character to "unlimited length". | hel.*o | ![](2020-03-02-22-35-05.png) |
| + | As with * it matches the previous character, but *one* or more times. | hel+o | ![](2020-03-02-22-35-47.png)
| ? | Matches a single character zero or one time. | hel?o | ![](2020-03-02-22-36-39.png) |
| x\|y | Matches either x or y | hi\|goodbye | ![](2020-03-02-22-38-09.png) |
| (x\|y) | Matches either x or y  | (hey\|hello) world! |  ![](2020-03-02-22-43-39.png) |
| [xyz] | Matches any one of the characters inside of the brackets. Ranges are possible. | [abck-z] | ![](2020-03-02-22-46-17.png) |
| \d | Matches a digit. Equivalent to [0-9]. |

## More examples

* /\\(([^)]+)\\)/
* ^.*$
* ^[A-C][a-zA-Z0-9]{4}$
* {([A-Za-z]+)+([a-z]+)}
* ^\\w$

Try them all in [https://regexper.com/](https://regexper.com/).

## Learn it!

There's tons of resources for learning rexex, for example this one:

* [https://regexone.com/](https://regexone.com/)
