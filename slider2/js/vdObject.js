/==========CSV Search===========================================
/** A large object to:
  1. Display the records of a csv file, one record at a time
  2. Search the records for any substring that we type in.
*/
function csvSearch(csv, viewerDiv){
  O(viewerDiv).innerHTML = "";
  O(viewer).innerHTML = '';  
  S(viewerDiv).width = viewerDiv.offsetWidth +"px";
  //S(viewerDiv).margin = '0 auto';
  var rawRecordsArray = [];
  var recordsArray = [];
  var headerString = "";
  var titlesArray = [];
  setupData();
  createViewer();
  O(match).focus();  
  adjustSize();
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
        //------------------------------------------------
        //tack-on a search window
        var searchTitle = document.createTextNode('Search: ');
        var searchWindow = document.createElement('input');
        searchWindow.setAttribute('type','text');
        var searchRow =document.createElement('tr');
        var searchColumn = document.createElement('td');
        searchColumn.setAttribute('colspan','2');
        searchWindow.setAttribute('id','match');
        searchColumn.appendChild(document.createElement('br')); 
        tableObject.appendChild(searchRow);
        searchRow.appendChild(searchColumn);
        searchColumn.appendChild(searchTitle);    
        searchColumn.appendChild(searchWindow);
        
        S(match).background = "lightgray";       
        //------------------------------------------------
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
            var sizeFactor = 0.0015*innerWidth;            
            S(viewerTable).fontSize = sizeFactor + "rem";   
    }
    //-----------------------------------------
    window.onresize = adjustSize;
    
}//---end of showRecordsToSearch--
//===========================================================
