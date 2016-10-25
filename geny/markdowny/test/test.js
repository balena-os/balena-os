var fs = require("fs"),
    assert = require("assert"),
    cheerio = require("cheerio"),
    md2json = require("../");

fs.readFile("test/test.md","utf8",function(err,data){

  assert.deepEqual(err,null,"File error");

  var dict = md2json(data,{
    boolean: ["isShredderGood","isShredderEvil","pizzaIsDelicious"],
    text: ["Text"]
  });

  assert.deepEqual(dict.Leonardo,"leads","Parsing error.");
  assert.deepEqual(dict.Donatello,"does machines","Parsing error.");
  assert.deepEqual(dict.Rafael,"cool but rude","Parsing error.");
  assert.deepEqual(dict.Michaelangelo,"party dude","Parsing error.");
  assert.deepEqual(dict.isShredderGood,false,"Parsing error.");
  assert.deepEqual(dict.isShredderEvil,true,"Parsing error.");
  assert.deepEqual(dict.pizzaIsDelicious,true,"Parsing error.");
  assert.deepEqual(dict.Link,"<a href=\"http://en.wikipedia.org/wiki/Teenage_Mutant_Ninja_Turtles\">Wikipedia</a>","Parsing error.");
  assert.deepEqual(dict.Text,"Wikipedia","Parsing error.");
  assert.deepEqual(dict.singleQuotes,"These are 'single' quotes.","Parsing error.");
  assert.deepEqual(dict.doubleQuotes,'These are "double" quotes.',"Parsing error.");

});

fs.readFile("test/nested.md","utf8",function(err,data){

  var dict = md2json(data,{
    boolean: ["This Is A Test","This Is Not A Test"]
  });

  assert.deepEqual(dict.Countries.Canada,"CA","Parsing error.");
  assert.deepEqual(dict.Countries["United States"].California,"CA","Parsing error.");
  assert.deepEqual(dict.Countries["United States"].Texas.Dallas,"DAL","Parsing error.");
  assert.deepEqual(dict.Countries["United States"].Texas.Houston,"HOU","Parsing error.");
  assert.deepEqual(dict.Marco,"Polo","Parsing error.");
  assert.deepEqual(dict.Other.Nothing,"","Parsing error.");
  assert.deepEqual(dict.Other["This Is A Test"],true,"Parsing error.");
  assert.deepEqual(dict.Other["This Is Not A Test"],false,"Parsing error.");
  assert.deepEqual(cheerio.load(dict.Other["With HTML"])("strong").length,1,"Parsing error.");
  assert.deepEqual(cheerio.load(dict.Other["With HTML"])("p").length,0,"Parsing error.");
  assert.deepEqual(cheerio.load(dict.Other.Paragraphs)("p").length,2,"Parsing error.");

});