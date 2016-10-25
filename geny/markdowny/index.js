var marked = require("marked"),
    extend = require("extend"),
    cheerio = require("cheerio"),
    entities = require("entities");

// All fields string by default
var $;

module.exports = function(markdown,userOptions) {

  // Markdown parsing, loading, default options
  var html = fixQuotes(marked(removeComments(markdown),{gfm: false})),
      dict = {};

  $ = cheerio.load(html,{decodeEntities: false});

  // For each header, get the key and the subsequent tags until the next h1
  $("h" + userOptions.startLevel ).each(function(){
    var key = $(this).html().trim();
    dict[key] = getValue($(this), userOptions.startLevel);
  });

  // Coerce variable types
  dict = coerce(dict,extend({
    "boolean": [],
    "text": []
  },userOptions));

  return dict;

};

// Get the value at a particular level
function getValue($this,level) {

  // Get all the following tags until the next tag at the same level
  var $tags = $this.nextUntil(limitSelector(level)),
      $nested = $tags.filter("h" + (level + 1));

  // If there are no tags, return an empty string;
  if (!$tags.length) {
    return "";
  }

  // If there are tags one level down (e.g. <h2> after an <h1>)
  // Recurse
  if ($nested.length) {
    // it's nested
    var result = {};

    $nested.each(function(){
      result[$(this).text().trim()] = getValue($(this),level+1);
    });

    return result;

  }

  // Otherwise, combine the outerHTML of all tags and return that string
  return $tags.map(function(){
    return $.html(this);
  }).get().join("");

}

// To get tags following any particular level, need to stop at any tag of the same level or higher
// e.g. limitSelector(4) returns "h1,h2,h3,h4"
function limitSelector(level) {

  var levels = [];
  for (var i = 1; i <= level; i++) {
    levels.push(i);
  }

  return levels.map(function(l){
    return "h"+l;
  }).join(",");

}

// String values become boolean or raw HTML if their key is in the options
// Otherwise they get tags stripped
function coerce(dict,options) {

  for (var key in dict) {

    if (typeof dict[key] !== "string") {
      // Recurse
      dict[key] = coerce(dict[key],options);
    } else if (options.boolean.indexOf(key) >= 0) {
      // Coerce to boolean
      dict[key] = toBoolean(dict[key]);
    } else if (options.text.indexOf(key) >= 0) {
      // Strip tags
      dict[key] = toText(dict[key]);
    } else {
      // Coerce to raw HTML
      dict[key] = toHTML(dict[key]);
    }
  }

  return dict;

}

// marked escapes quotes to &quot; etc.
// https://github.com/chjj/marked/issues/269
// Use entities to reencode quotes and ampersands because that's dumb
function fixQuotes(text) {
  return text.replace(/&(quot|#39|amp);/g,function unEscape(match){
    return entities.decodeHTML(match);
  });
}

// Strip tags, text only
function toText(html) {

  var $$ = cheerio.load("<body>" + html + "</body>",{decodeEntities: false});

  return $$("body").text();

}

// Get raw text, and treat "true" or "yes" as true, anything else as false
function toBoolean(html) {

  var text = toText(html);

  return !!text.match(/^(yes|true)$/i);

}

// Get the raw HTML
function toHTML(html) {

  var $$ = cheerio.load("<body>" + html + "</body>",{decodeEntities: false}),
      $children = $$("body").children();

  // There's a single child tag, so return its CONTENTS as raw HTML
  if ($children.length === 1) {

    return $children.eq(0).html();

  // There are multiple child tags, return the tags in their entirety, concatenated
  } else if ($children.length > 1) {

    return $$("body").html();

  }

  // There are no child tags, probably this shouldn't happen
  return html;

}

// Strip out lines beginning with a single tick mark
function removeComments(text) {

  return text.split(/\r?\n/).filter(function(line){
    return !line.slice(0,2).match(/^`([^`])?$/);
  }).join("\n");

}
