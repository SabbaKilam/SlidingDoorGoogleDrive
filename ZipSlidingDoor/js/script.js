//=========== csv data==============
var csvData = '';
//=====end of csv data=================
//-----------------------------
window.onload = function(){
    getCsv('workers.csv');
    S(viewer).marginLeft = (0.5*innerWidth - 0.5*O(viewer).offsetWidth)+ 'px' 
    reSize();
    //csvSearch(csvData, O(viewer));    
}
O(topDiv).onresize = reSize;
function reSize(){
    S(menu).width = 0.075*innerWidth + "px";
    S(menu).paddingBottom = 0.075*innerWidth + "px"; 
    S(menu).marginTop = 0.0075*innerHeight + "px";
    S(viewer).marginTop = 0.02*innerHeight + "px";
    S(viewer).width = 0.7*innerWidth +'px'; 
    
    if(doorOpen){S(viewer).marginLeft = "2%";}
    else{S(viewer).marginLeft = (0.5*innerWidth - 0.5*O(viewer).offsetWidth)+ 'px'}
    
    var sizeFactor = 0.002*innerWidth;
    S(choices).fontSize = sizeFactor + "rem"; 

}
//--------------------------------
var doorOpen = false;//used below
//---------------------------------
O('menu').onclick=function(){
    if(!doorOpen){
        S(topDiv).width = 80 +"%";
        S(viewer).marginLeft = "2%";       
        doorOpen=true;
    }
    else{
        S(topDiv).width = 100+"%";
        S(viewer).marginLeft = (0.5*innerWidth - 0.5*O(viewer).offsetWidth)+ 'px'        
        doorOpen=false;
    }
}
//-------------------------------------
//=========== get Data ======================
function getCsv(filename){
  var xhrGetCsv = new XMLHttpRequest();
  var url = '';
  xhrGetCsv.open('GET', url + 'docs/' + filename, true);
  xhrGetCsv.send();
  //------------------------------------
  xhrGetCsv.onload = function(){
    if(this.status === 200 || this.status === 0 ){
      csvData = this.response;
      csvSearch(csvData, O(viewer));        
    }
    else{
      alert('Trouble at the server.');
      O(viewer).innerHTML = 'Trouble at the server.';      
    }
  }
}
//==========action to establish handlers for radio button choices ========
forAll(C('choice'), function(aChoice){
  aChoice.onclick = function(){
    O(viewer).innerHTML = '';
    getCsv(aChoice.value);  
  }
});
//=========action to establish handlers for radio botton lables ========== 
forAll(C('choices'), function(aChoice){
  aChoice.onclick = function(){
    if(aChoice.innerHTML == "Work"){
      O(viewer).innerHTML = ''; 
      O(aChoice.innerHTML).checked = true;
      getCsv('workers.csv');
    }
    else if(aChoice.innerHTML == "Family"){
      O(viewer).innerHTML = '';
      O(aChoice.innerHTML).checked = true;
      getCsv('family.csv')
    }
    else if(aChoice.innerHTML == "Friends"){
      O(viewer).innerHTML = '';
      O(aChoice.innerHTML).checked = true;
      getCsv('friends.csv')
    }
  }
});






