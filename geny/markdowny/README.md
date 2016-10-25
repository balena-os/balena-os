markdowneyjr
============

A quick markdown-to-JSON parser for somewhat easier copy editing.  Pass a markdown string like this:

```
` This is a comment. This will be ignored.

# First Name
John

# Last Name
Doe

# Whitespace


Does not matter.
```

And get back something like this:

```json
{
  "First Name": "John",
  "Last Name": "Doe",
  "Whitespace": "Does not matter."
}
```

## Installation

Install via `npm`:

```
npm install markdowneyjr
```

## Usage

### markdowneyjr(markdownText[,options])

```js
var markdowneyjr = require("markdowneyjr");

var dict = markdowneyjr(myMarkdown,myOptions);
```

## Comments

Any line that starts with one tick mark (`) will be discarded as a comment.

## Nesting

You can also nest values:

```
# Name

## First
John

## Last
Doe
```

```
{
  "Name": {
    "First": "John",
    "Last": "Doe"
  }
}
```

## Options

By default, every value will come back as a string, and if there's HTML, it will be preserved.

You can pass an array of `boolean` and/or `text` fields.

`boolean` fields will turn a string into true/false.  They will be false unless the trimmed contents are the word `true` or `yes`, case-insensitive.

`text` fields will come back with all HTML tags stripped out.

```
# Content

I want to preserve [this link](http://ilovealpacas.com).

# Alpacas

yes

# Name

Noah

# Bolding

I want to discard this **bolding.**
```

```js
var dict = markdowneyjr(myMarkdown,{
  boolean: ["Alpacas"],
  text: ["Bolding"]
});

console.log(dict);
```

```
{
  Content: 'I want to preserve <a href="http://ilovealpacas.com">this link</a>.',
  Alpacas: true,
  Name: 'Noah',
  Bolding: 'I want to discard this bolding.'
}
```

These options currently work based on field name only, so if you have nested options it will apply on any key with that name and a string value, regardless of depth.  Use with caution.

## Credits/License

By [Noah Veltman](https://twitter.com/veltman)

Available under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions.

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.