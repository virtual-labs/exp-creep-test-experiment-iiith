function rodM(){
	var elem=document.getElementById("rod");
	var xpos=434;
	var ypos=150;
	var id1=setInterval(frame1,250);
	var id11 = setInterval(frame11, 220);
  	var id12 = setInterval(frame12, 220);
	function frame1()
	{
		if (xpos == 446 && ypos == 162) {

      clearInterval(id1);
    } else {
      xpos+=1; 
      ypos+=1;
      elem.style.left = xpos + 'px'; 
      elem.style.top = ypos + 'px';	
    }
	}
	  var i=0;
  function frame11() {
  	len1=[203,227,244,258,270,281,294,308,321,340,361,390,450,540,590,641,690,740,800,865,940,1020,1120,1250,1400,1675];
  	if(i==26){
  		document.getElementById("invis").style.left=50 + 'px';
  		clearInterval(id11);
  	}
  	else{
  	
  	document.getElementById("pextension").innerHTML=len1[i]+' *5*10^(-3)mm';}
  	i++;
  	
  }
var j=0;
  function frame12() {
  	len2=[0.25,0.50,0.75,1.00,1.25,1.50,1.75,2.00,2.25,2.50,2.75,3.00,3.50,4.00,4.25,4.50,4.75,5.00,5.25,5.50,5.75,6.00,6.25,6.50,6.75,7.00];
  	if(j==26){
  		clearInterval(id12);
  	}
  	else{
  	
  	document.getElementById("ptime").innerHTML=len2[j] + 'mins';}
  	j++;
  	
  }
}
function myfun2()
{
	 var x = document.getElementById("chartContainer");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
