var allRights = ["manage content", "play games", "delete users", "view site"];


var allGroups = {
	"admin": [allRights[2]],
	"manager": [allRights[0]],
	"basic": [allRights[1], allRights[3]]
}

var allUsers = [
	{nickname: "admin", pas: "1234", groups: ["admin", "manager", "basic"],session: false},
	{nickname: "sobakajozhec", pas: "ekh228", groups: ["basic", "manager"],session: false},
	{nickname: "patriot007", pas: "russiaFTW", groups: ["basic"],session: false}
];

function clear(array){
	var a =[];
	for(var i in array){
		if(array[i]!=undefined){
			a.push(array[i]);
		}
	}
	return a;
};

function createUser(username,password) {
	allUsers.push({nickname:username,pas:password,groups:[],session:false});
	return allUsers[allUsers.length-1];
};

function deleteUser(user) {
	var count = 0;
	for(var i=0;i<allUsers.length;i++){
		if(allUsers[i]==user){
			count++;
			allUsers.splice(i,1);
		}
	}
	if(count==0){
		throw new Error("такого пользователя нет")
	}
};

function users() {
	return allUsers;
};

function createGroup() {
	var n = Object.keys(allGroups).length;
	if(arguments[0]==undefined){
		n += '';
		allGroups[n]=[];
		return n;
	}
	else{
		allGroups[arguments[0]]=[];
		return arguments[0];
	}
};

function deleteGroup(group) {
	if(group in allGroups){
		delete allGroups[group];
		for(var i in allUsers){
			if(allUsers[i].groups.includes(group)){
				allUsers[i].groups.splice(allUsers[i].groups.indexOf(group),1);
			}
		}
	}
	else{
		throw new Error("group not in allGroups");
	}
};

function groups() {
	var a=[];
	for(key in allGroups){
		a.push(key);
	}
	return clear(a);
};

function addUserToGroup(user,group) {
	var count=0;
	for(var i=0;i<allUsers.length;i++){
		if(user==allUsers[i] && typeof user==='object' && group in allGroups){
			count++;
			user.groups.push(group);
			clear(user.groups);
		}
	}
	if(count==0){
		throw new Error("wrong user or group");
	}
};

function userGroups(user) {
	for(var i=0;i<allUsers.length;i++){
		if(user==allUsers[i]){
			return clear(allUsers[i].groups)
		}
	}
};

function removeUserFromGroup(user,group) {
	if(allUsers.includes(user) && typeof user==='object'  && typeof group==='string'){
		if(!user.groups.includes(group)){
			throw new Error('user not in group');
		}	
		user.groups.splice(user.groups.indexOf(group),1);
	}	
	else{	
		throw new Error('Error from removeUserFromGroup');
		}	
};

function createRight() {
	var n = allRights.length;
	if(arguments[0]==undefined){
		allRights[n]=n;
		return n;
	}
	else{
		allRights.push(arguments[0]);
		return arguments[0];
	}
};

function deleteRight(right) {
	if(allRights.includes(right)){
		allRights.splice(allRights.indexOf(right),1);
		for(var i in Object.keys(allGroups)){
			if(allGroups[Object.keys(allGroups)[i]].includes(right)){
				allGroups[Object.keys(allGroups)[i]].splice(allGroups[Object.keys(allGroups)[i]].indexOf(right),1);
			}
		}
	}
	else
		throw new Error('Error deleteRight');
};

function groupRights(group) {
	return allGroups[group];
};

function rights() {
	return clear(allRights);
};

function addRightToGroup(right,group) {
	if(right!=undefined && group!=undefined && allRights.includes(right) && group in allGroups){
		allGroups[group].push(right);		
	}
	else{
		throw new Error('Error from addRightToGroup');
	}
};

function removeRightFromGroup(right,group) {	
	if(right!=undefined && group!=undefined && allRights.includes(right) && group in allGroups && allGroups[group].includes(right)){
		allGroups[group].splice(allGroups[group].indexOf(right),1);
	}
	else
    throw new Error('Error from removeRightFromGroup');
};

function login(username, password) {
	for(var i in allUsers){
		if(allUsers[i].nickname===username && allUsers[i].pas===password && allUsers[i].session===false){
			allUsers[i].session=true;
			return true;
		}
	}
	return false;
};

function currentUser() {
	for(var i in allUsers){
		if(allUsers[i].session==true){
			return allUsers[i];
		}
	}
};

function logout() {
	for(var i in allUsers){
		allUsers[i].session=false;
	}
};

function isAuthorized(user, right) {
	if(user!=undefined && right!=undefined && allUsers.includes(user) && allRights.includes(right)){
		for(var i in user.groups){
			if(user.groups[i] in allGroups){
				if(allGroups[user.groups[i]].includes(right)){
					return true;
				}
			}
		}
		return false;
	}
	else
	throw new Error('Error from isAuthorized');		
};

var us=createUser("da","da");
var gr=createGroup();
var ra=createRight();
console.log(gr);
console.log(ra);

console.log("admin" in allGroups);

/*
var a = [1,2,3,4,5];
alert(ReverseArray(a));

function ReverseArray(arr) {
    if(arr.length < 2) {
        return arr;
    } else {
        return [arr.pop()].concat(ReverseArray(arr));
    }
}
*/