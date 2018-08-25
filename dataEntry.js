var p=1;
function billItem(pid,description,price,units,total,x)
{
	//To ignore any user operations on the upper row items
	if(x<p-1)
	return;

	p++;
	var ProductEntries;

	if(window.DOMParser){	
		myParser = new DOMParser();
		myXmlDocument = myParser.parseFromString(productData,"text/xml");
		ProductEntries = myXmlDocument.getElementsByTagName("PRODUCTS")[0];
	}
	else{
		myXmlDocument = new ActiveXObject("Microsoft.XMLDOM");
		myXmlDocument.async = false;
		myXmlDocument.loadXML(productData);
		root=myXmlDocument.documentElement;
		ProductEntries = root.getElementsByTagName("PRODUCTS")[0];
	}
	//check for duplicate
		for(i=0;i<p-2;i++)	{			
			if(pid[x].value==pid[i].value){
				units[i].value=parseInt(units[i].value)+1;
				total[i].value=parseInt(total[i].value)+parseInt(price[i].value);
				document.getElementById("totalBox").value =parseInt(document.getElementById("totalBox").value)+ parseInt(price[i].value);
				pid[x].value='';			
				pid[x].focus();
				p--;
				return;
			}	
		}
	//populate details	
	flag_found=0;
	for(i=0;i<ProductEntries.childNodes.length;i++)
	{
		if(ProductEntries.childNodes[i].getAttribute("EAN")==pid[x].value)
		{
			flag_found=1;
			description[x].value=ProductEntries.childNodes[i].getAttribute("NAME");
			price[x].value=ProductEntries.childNodes[i].getAttribute("Unit_Price");			
		}
	}
	pid[x].style.borderColor = "darkgray";
	//If No Entry matched
	if(flag_found==0)
	{
		alert("Please Enter valid ID");
		pid[x].style.borderColor = "red";
		pid[x].value='';
		pid[x].focus();
		p--;
	}
	
}
function calcTotal(x){
	var pid=document.getElementsByName("pid");
	var price=document.getElementsByName("price");
	var units=document.getElementsByName("units");
	var total=document.getElementsByName("total");
	// for unwanted events
	if((pid[x]=='')||(units[x]=='')||(x<p-2))
	{	
		return;
	}
	if(units[x].value<=0)
	{
		alert("Please Enter valid number of units");
		units[x].style.borderColor = "red";
		units[x].value='';
		units[x].focus();
		return;
	}
	units[x].style.borderColor = "darkgray";
	pid[x].readdOnly=true;
	units[x].readOnly=true;
	document.getElementById("totalBox").value=0;
	//calculate line total
	total[x].value=parseInt(price[x].value)*parseInt(units[x].value);
	//calculate grand total
	for(i=0;i<=x;i++)
		document.getElementById("totalBox").value=parseInt(document.getElementById("totalBox").value)+ parseInt(total[i].value);
	//display the next row
	if(p<=5){
		document.getElementById('item'+p).style.display ='';	
		pid[x+1].focus();
	}		
}			
function cash(){
	// alert("1");
	var price=document.getElementsByName("price");
	var units=document.getElementsByName("units");
	var total=document.getElementsByName("total");
	var description=document.getElementsByName("description");
	var today = new Date();
	var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()%2000;
	var time = today.getHours()+'-'+today.getMinutes()+'-'+today.getSeconds();
	var win=window.open("");
	var address="&copy; 2018 Acme Grocers Pvt Ltd.,Varthur Road,Whitefield,Bangalore 560039 ph:080-21491328";
	win.document.write('<html><head><title>Bill Preview</title><link type="text/css" rel="stylesheet" href="billing.css"/></head><body>');
	win.document.write('<center><div id="bill"><h1>&copyAcme Grocers</h1>'+address+'<br><br><hr><p id="date_time">Date:&nbsp'+date+'<br>Time:'+time+'</p><hr>');
	win.document.write('<table cellspacing="15px" cellpadding="2px" border-collapse: collapse;><thead><tr><th>Name</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>');
	for(i=0;i<p-1;i++)
	{
		win.document.write('<tbody><tr><td>'+description[i].value+'</td>'+'<td>'+units[i].value+'</td>'+'<td>'+price[i].value+'</td>'+'<td>'+total[i].value+'</td>');
	}
	win.document.write('<tr><td></td><td></td><td><hr>cgst(4%):</td><td><hr>'+parseInt(document.getElementById("totalBox").value)/25+'</td></tr>');
	win.document.write('<tr> <td></td><td></td><td>sgst(4%):</td><td>'+parseInt(document.getElementById("totalBox").value)/25+'</td></tr>');
	win.document.write('<tr><td></td><td></td><td><b>Gross:<b></td><td>'+'<b>'+parseInt(document.getElementById("totalBox").value)*108/100+'&nbsp INR'+'</td></tr>');
	win.document.write('</tbody></table>');
	win.document.write('<br><br><br><p id="conclusion">Thank you, visit again</p><hr></div>');
	win.document.write('<br><input type=button id="printButton" value="Print Bill" onclick="window.print()"+/>');
	win.document.write("<center></body></html>");
	win.document.write('<input type="button" id="back" value="New Bill" onclick="goBack()"/>');
	win.document.write('<script>function goBack(){window.open("DataEntry.html","_self");}</script>');
}
