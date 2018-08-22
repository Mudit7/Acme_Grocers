function validate(username,password){
	var bodyRef=document.getElementsByTagName("body");
	var UserEntries;
	if(window.DOMParser){	
		myParser = new DOMParser();
		myXmlDocument = myParser.parseFromString(userData, "text/xml");
		UserEntries=myXmlDocument.getElementsByTagName("USERS")[0];
	}
	else{
		myXmlDocument = new ActiveXObject("Microsoft.XMLDOM");
		myXmlDocument.async = false;
		myXmlDocument.loadXML(userData);
		root=myXmlDocument.documentElement;
		UserEntries = root.getElementsByTagName("USERS")[0];
		}
	if(check(UserEntries,username,password)==1)
			location.href="DataEntry.html";
	else if(check(UserEntries,username,password)==0)
			alert("Wrong Password, Try Again");		
	else
			alert("Wrong Username");
}
function check(UserEntries,username,password){
	var user_f=0;
	for(i=0;i<5;i++)
	{
		if(UserEntries.childNodes[i].getAttribute("ID")==username)
		{
			user_f=1;
			if(UserEntries.childNodes[i].getAttribute("PASSWORD")==password)
			return 1;	
			else
			return 0;
		}
	}
	if(user_f==0)
	{
		return -1;
	}		
}