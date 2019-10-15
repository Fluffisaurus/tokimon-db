var tokiInfo = [];
var tokiAbilities = [];
var insertButton;
var currID = Math.random() * (999 - 4) + 4;

function initReferences(){
  tokiInfo.push(document.getElementById('insert-id'));
  tokiInfo.push(document.getElementById('insert-name'));
  tokiInfo.push(document.getElementById('insert-weight'));
  tokiInfo.push(document.getElementById('insert-height'));
  tokiInfo.push(document.getElementById('insert-trainer'));

  tokiAbilities.push(document.getElementById('insert-flying'));
  tokiAbilities.push(document.getElementById('insert-fight'));
  tokiAbilities.push(document.getElementById('insert-fire'));
  tokiAbilities.push(document.getElementById('insert-water'));
  tokiAbilities.push(document.getElementById('insert-grass'));
  tokiAbilities.push(document.getElementById('insert-electric'));
  tokiAbilities.push(document.getElementById('insert-ice'));
  tokiAbilities.push(document.getElementById('insert-total'));

  insertButton = document.getElementById('insert-button');
}

function handleInfoChange(event){
  let index;
  if(tokiInfo.indexOf(event.target) !== -1){
    index = tokiInfo.indexOf(event.target);
  }else{
    console.log("something went wrong when handling change");
    return;
  }

  if(tokiInfo[index].value > 999) {
    tokiInfo[index].value = 999;
  }
  else if(tokiInfo[index].value < 0){
    tokiInfo[index].value = 0;
  }

}

function handleAbilityChange(event){
  let index;
  if(tokiAbilities.indexOf(event.target) !== -1){
    index = tokiAbilities.indexOf(event.target);
  }else{
    console.log("something went wrong when handling change");
    return;
  }

  //check if value input is in range
  if(tokiAbilities[index].value > 99){
    tokiAbilities[index].value = 99;
  }
  else if(tokiAbilities[index].value < 0){
    tokiAbilities[index].value = 0;
  }

  updateTotal();
}

function updateTotal(){
  let sum = 0;
  for(let i = 0; i < tokiAbilities.length - 1; i++){
    if( isNaN(tokiAbilities[i].value) || tokiAbilities[i].value === "" ){
      continue;
    }
    else{
      sum += parseFloat(tokiAbilities[i].value);
    }
  }
  console.log(sum);
  tokiAbilities[tokiAbilities.length - 1].value = sum; //set sum of last in array which is total
}

function initSetOnChange(){
  tokiInfo[2].onchange = handleInfoChange; //weight info
  tokiInfo[3].onchange = handleInfoChange; //height info

  for(let i = 0; i < tokiAbilities.length - 1; i++){
    tokiAbilities[i].onchange = handleAbilityChange;
  }
}

initReferences();
initSetOnChange();

console.log(tokiInfo);
console.log(tokiAbilities);


// send request to server on click 
$( () =>{
  $("#insert-button").click( (e)=>{
    e.preventDefault();

    var formData = { 
      'id': currID,
      'name': (tokiInfo[1].value === "") ? "testmon" : tokiInfo[1].value,
      'trainer': (tokiInfo[4].value === "") ? "trainer1" : tokiInfo[4].value,
      'weight': (tokiInfo[2].value === "") ? 0 : tokiInfo[2].value,
      'height': (tokiInfo[3].value === "") ? 0 : tokiInfo[3].value,
      'flying': (tokiAbilities[0].value === "") ? 0 : tokiAbilities[0].value,
      'fight': (tokiAbilities[1].value === "") ? 0 : tokiAbilities[1].value,
      'fire': (tokiAbilities[2].value === "") ? 0 : tokiAbilities[2].value,
      'water': (tokiAbilities[3].value === "") ? 0 : tokiAbilities[3].value,
      'grass': (tokiAbilities[4].value === "") ? 0 : tokiAbilities[4].value,
      'electric': (tokiAbilities[5].value === "") ? 0 : tokiAbilities[5].value,
      'ice': (tokiAbilities[6].value === "") ? 0 : tokiAbilities[0].value,
      'total': (tokiAbilities[7].value === "") ? 0 : tokiAbilities[7].value
    }

    console.log("insertButton was clicked");
    $.ajax({
      url: "/",
      type: "POST",
      dataType: "JSON",
      data: JSON.stringify(formData),
      contentType: "application/json",
      cache: false,
      timeout: 5000,
      success: (data) => {
        console.log(data.status);
        // cheap hack to insert html, since i already loop through table when loading... 
        // https://stackoverflow.com/a/25897371 
        location.reload(); 
      },
      error: (data) => {
        console.log("error occurred during insert: " + data.status);
      }
    })
  });
});


var delButtons = document.getElementsByClassName('delete-button');
console.log(delButtons[0].parentNode.parentNode);

$( ()=>{
  $('.delete-button').click((event) =>{ //set event listeners for all delete buttons
    event.preventDefault();
    // console.log(event.target);
    // console.log(event.target.parentNode.parentNode);
    event.target.parentNode.parentNode.remove();

    //send delete query to database to delete that entry
    //post request here...

    
  });
});