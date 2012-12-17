var http = require("http");
var db = require("./redis-handler");
var gcm = require("./gcm-handler");

register = function(httpdata) {
	var userdata = httpdata.split(":");
	var user = {token:userdata[0],gcmid:userdata[1]};
	db.setNewUser(user);
}

unregister = function(httpdata){
	db.deleteUser(httpdata);
}

sendmessage = function(httpdata) {
	var data = httpdata.split(":");
	var gcmid = db.getUserGCMID(data[0]); 
	gcm.send(gcmid,data[1]);
}

responder = function(req,res) {
	var path = require("url").parse(req.url).pathname;
	var body = "";
	req.setEncoding();
	if(path=="/register") {
		req.on("data",register);
	}
	else if(path="/unregister") {
		req.on("data",unregister);
	}
	else if(path="/send") {
		req.on("data",sendmessage);
	}
}
