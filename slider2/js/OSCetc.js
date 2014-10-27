//==================================================
/*
    A Suite of three wrappers for common DOM utilities.
    1.  A wrapper for document.getElementById(obj)
        Clever: you can use the object reference or its id string!
    2.  Wrapper for style property; again obj or id can be used.
    3.  C(className) returns a collection (array) of all elements in the DOM with class name className.
        Objects with multiple classes have only the first assigned class checked.
*/
function O(obj){
    if (typeof obj == 'object') return obj;
    else return document.getElementById(obj);
}
function S(obj){
    return O(obj).style;
}
function C(className){
    var elements = document.getElementsByTagName('*');
    var objects = [];
    for (var i = 0 ; i < elements.length ; ++i){
        if (elements[i].className == className){
            objects.push(elements[i]);
        }
    }
    return objects;
}
//--------------------------------------------------------------
//==========CSV Search===========================================
/** A large function to:
  1. Display the records of a csv file, one record at a time
  2. Search the records for any substring that we type in.
*/
function csvSearch(csv, viewerDiv){
  S(viewerDiv).width = viewerDiv.offsetWidth +"px";
  var rawRecordsArray = [];
  var recordsArray = [];
  var headerString = "";
  var titlesArray = [];
  setupData();
  createViewer();
  adjustSize();
  S(match).background = "lightblue";
  S(match).fontWeight ='bold';  
  //show first record
  showRecord(0);
  //----Helper function for setup---
  function setupData(){
    rawRecordsArray = csv.split('\n');
    headerString = rawRecordsArray[0];
    //get recordsArray without header
    for(var i=1; i<rawRecordsArray.length; i++){
      recordsArray.push(rawRecordsArray[i])
    }
    //create titlesArray
    titlesArray = headerString.split(',');
  }
  //----end of setupData-----
  //----Helper function that creates a "viewer" in the viewerDiv
    function createViewer(){
        var tableObject = document.createElement('table');      
        tableObject.setAttribute('id','viewerTable');
        //-----------------------------
        //tack-on a search window
        var searchTitle = document.createTextNode('Search: ');
        var searchWindow = document.createElement('input');
        searchWindow.setAttribute('type','text');
        var searchRow =document.createElement('tr');
        var searchColumn = document.createElement('td');
        searchColumn.setAttribute('colspan','2');
        searchWindow.setAttribute('id','match');

        tableObject.appendChild(searchRow);
        searchRow.appendChild(searchColumn);        
        searchColumn.appendChild(searchTitle);       
        searchColumn.appendChild(searchWindow);
        searchColumn.appendChild(document.createElement('br'));   
        searchColumn.appendChild(document.createElement('br'));           
        //------------------------------
        viewerDiv.appendChild(tableObject);
        var maxTitles = titlesArray.length;
        for(var i=0; i< maxTitles; i++ ){
        //create the viewer table's rows and columns, etc:
        var row = document.createElement('tr');
        var columnTitle = document.createElement('td');
        S(columnTitle).textAlign = 'right';
        var columnData = document.createElement('td');
        columnData.setAttribute('class','fieldValues');
        var dataSpan = document.createElement('span');
        dataSpan.setAttribute('id', 'field'+i);
        //attach rows,columns, etc, to the table
        columnTitle.innerHTML = "<b>" + titlesArray[i] + "&nbsp;&nbsp;</b>";
        S(row).FontWeight = 'bold';
        columnData.appendChild(dataSpan);
        row.appendChild(columnTitle);
        row.appendChild(dataSpan);
        tableObject.appendChild(row);
    }
  }//---end of createViewer----
  //----Helper function showRecord()---
    function showRecord(j){
        if(j < recordsArray.length){
        var fieldArray = recordsArray[j].split(',');
            for(var i=0; i< titlesArray.length; i++){
                var spanName = "field"+i;
                O(spanName).innerHTML = fieldArray[i];
            }
        }
    }//---end of showRecord----
    //---intialize centering the record display
    function adjustSize(){
        var sizeFactor = 0.0027*O(topDiv).offsetWidth;         
        S(viewerTable).fontSize = sizeFactor + "rem";
        S(match).width = 0.3*(O(topDiv).offsetWidth) +"px";
        S(match).height = 0.3*(O(topDiv).offsetWidth)/5.5 +"px";
        S(match).fontSize = 0.9*sizeFactor + "rem";          
    }
    //-----------------------------------------
    window.onresize = function(){
        adjustSize();
        reSize();
    }
    //-------------------------------------------
    //setInterval("adjustSize", 100);    
}//---end of showRecordsToSearch--
//===========================================================






