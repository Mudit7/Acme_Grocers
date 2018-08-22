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
				//alert("duplicate");
				units[i].value=parseInt(units[i].value)+1;
				total[i].value=parseInt(total[i].value)+parseInt(price[i].value);
				pid[x].value='';			
				pid[x].focus();
				p--;
				return;
			}	
		}
	//populate details	
	for(i=0;i<ProductEntries.childNodes.length;i++)
	{
		if(ProductEntries.childNodes[i].getAttribute("EAN")==pid[x].value)
		{
			description[x].value=ProductEntries.childNodes[i].getAttribute("NAME");
			price[x].value=ProductEntries.childNodes[i].getAttribute("Unit_Price");			
		}
	}
	
}
function calcTotal(x)
			{
				var pid=document.getElementsByName("pid");
				var price=document.getElementsByName("price");
				var units=document.getElementsByName("units");
				var total=document.getElementsByName("total");
				// for unwanted events
				if((pid[x]='')||(units[x]='')||(x<p-2))
				return;
				pid[x].readOnly=true;
				units[x].readOnly=true;
				document.getElementById("totalBox").value=0;
				//calculate line total
				total[x].value=parseInt(price[x].value)*parseInt(units[x].value);
				//calculate grand total
				for(i=0;i<=x;i++)
					document.getElementById("totalBox").value =parseInt(document.getElementById("totalBox").value)+ parseInt(total[i].value);
				
				//display the next row
				if(p<=5){
					document.getElementById('item'+p).style.display ='';	
					pid[x+1].focus();
				}		
			}