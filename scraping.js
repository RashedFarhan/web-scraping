var express = require("express");
var path = require("path");
var app = express();
var request = require("request");
var cheerio = require("cheerio");
var url = require('url');
var fs = require("fs");
var port = 8080;
var host = "127.0.0.1";

var urlstring = "bangladesh/article/1486166/";
var url = "http://www.prothomalo.com/"+urlstring;
request(url,function(err,resp,body){
	if(!err){
		var $ = cheerio.load(body);
		var title, details, source;
        var news = { title : "", details : "", source : ""};

		var newsTitle = $(".right_title .title");
		var newsTitleText = newsTitle.text();

		var newsDetails = $(".jw_detail_content_holder");
		var newsDetails = newsDetails.text();

		var news = {
			"title" : newsTitleText,
			"details" : newsDetails
		};

		app.get("/",function(request,response){
			//response.send("Hello");
			//var content = fs.readFileSync("./public/render.html");
			//content = content.toString("utf8").replace("{{Text}}",news.title);

			response.setHeader("Content-Type","application/json");
			response.send(news);
		});
	}
	
});


app.get("/news/:text/:text2/:text3",function(req,response){
	var url = "http://www.prothomalo.com/" + req.params.text+"/"+ req.params.text2+"/"+ req.params.text3;
	//console.log(url);
	request(url,function(err,resp,body){
		if(!err){
			var $ = cheerio.load(body);
			var title, details, source;
	        var news = { title : "", details : "", source : ""};

			var newsTitle = $(".right_title .title");
			var newsTitleText = newsTitle.text();

			var newsDetails = $(".jw_detail_content_holder");
			var newsDetails = newsDetails.text();

			var news = {
				"title" : newsTitleText,
				"details" : newsDetails
			};
			response.setHeader("Content-Type","application/json");
			response.send(news);
		}
		
	});
});
app.listen(port,host);
console.log("Server Running On : "+ host +" : " + port);