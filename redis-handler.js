var redis = require("redis");
var cleint = redi.createClient();

//Set error reporting!
client.on("error",function(err) {
	console.log("Redis Error: " + err);
});

exports.setNewUser = function(user) {
	var id = client.incr("global:currentMAXID");			
	client.set("user:"+id+":gcmid",user.gcmid);
	client.set("user:"+id+":token",user.token);
	client.set("token:"+user.token,id);
}

exports.deleteUser = function(token) {
	var userid = client.get("token:",token);
	if(!userid) return false;
	client.del("user:"+id+":gcmid");
	client.del("user:"+id+":token");
	client.del("token:"+token);
	return true;
}

exports.getUserGCMID = function(token) {
	var userid = client.get("token:"+token);
	var gcmid = client.get("user:"+userid+":gcmid");
  return gcmid;
}
