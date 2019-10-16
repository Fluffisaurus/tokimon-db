var oldInfo = [];
var updateInfo = [];
var updateButton;

function initReferences(){
  oldInfo.push(document.getElementById('old-id'));
  oldInfo.push(document.getElementById('old-name'));
  oldInfo.push(document.getElementById('old-trainer'));
  oldInfo.push(document.getElementById('old-weight'));
  oldInfo.push(document.getElementById('old-height'));
  oldInfo.push(document.getElementById('old-flying'));
  oldInfo.push(document.getElementById('old-fight'));
  oldInfo.push(document.getElementById('old-fire'));
  oldInfo.push(document.getElementById('old-water'));
  oldInfo.push(document.getElementById('old-grass'));
  oldInfo.push(document.getElementById('old-electric'));
  oldInfo.push(document.getElementById('old-ice'));
  oldInfo.push(document.getElementById('old-total'));

  updateInfo.push(document.getElementById('update-id'));
  updateInfo.push(document.getElementById('update-name'));
  updateInfo.push(document.getElementById('update-trainer'));
  updateInfo.push(document.getElementById('update-weight'));
  updateInfo.push(document.getElementById('update-height'));
  updateInfo.push(document.getElementById('update-flying'));
  updateInfo.push(document.getElementById('update-fight'));
  updateInfo.push(document.getElementById('update-fire'));
  updateInfo.push(document.getElementById('update-water'));
  updateInfo.push(document.getElementById('update-grass'));
  updateInfo.push(document.getElementById('update-electric'));
  updateInfo.push(document.getElementById('update-ice'));
  updateInfo.push(document.getElementById('update-total'));

  updateButton = document.getElementById('update-button');
}

function handleInfoChange(event){
  let index;
  if(updateInfo.indexOf(event.target) !== -1 && (updateInfo.indexOf(event.target) === 3 || updateInfo.indexOf(event.target) === 4)){
    index = updateInfo.indexOf(event.target);
  }else{
    console.log("something went wrong when handling change");
    return;
  }

  if(updateInfo[index].value > 999) {
    updateInfo[index].value = 999;
  }
  else if(updateInfo[index].value < 0){
    updateInfo[index].value = 0;
  }

}

function handleAbilityChange(event){
  let index;
  if(updateInfo.indexOf(event.target) !== -1 && (updateInfo.indexOf(event.target) >= 5 || updateInfo.indexOf(event.target) <= 11)){
    index = updateInfo.indexOf(event.target);
  }else{
    console.log("something went wrong when handling change");
    return;
  }

  //check if value input is in range
  if(updateInfo[index].value > 99){
    updateInfo[index].value = 99;
  }
  else if(updateInfo[index].value < 0){
    updateInfo[index].value = 0;
  }

  updateTotal();
}

function updateTotal(){
  let sum = 0;
  for(let i = 5; i < updateInfo.length - 1; i++){
    if( isNaN(updateInfo[i].value) || updateInfo[i].value === "" ){
      continue;
    }
    else{
      sum += parseFloat(updateInfo[i].value);
    }
  }
  console.log(sum);
  updateInfo[updateInfo.length - 1].value = sum; //set sum of last in array which is total
}

function initSetOnChange(){
  updateInfo[3].onchange = handleInfoChange; //weight info
  updateInfo[4].onchange = handleInfoChange; //height info

  for(let i = 5; i < updateInfo.length - 1; i++){
    updateInfo[i].onchange = handleAbilityChange;
  }
}

initReferences();
initSetOnChange();

console.log(oldInfo);
console.log(updateInfo);
console.log(updateButton);

// HANDLE INSERT CLICKS: send request to server on click 
$( () =>{
  $("#update-button").click( (e)=>{
    e.preventDefault();

    var formData = { 
      'id': oldInfo[0].value,
      'name': (updateInfo[1].value === "") ? oldInfo[1].value : updateInfo[1].value,
      'trainer': (updateInfo[2].value === "") ? oldInfo[2].value : updateInfo[2].value,
      'weight': (updateInfo[3].value === "") ? oldInfo[3].value : updateInfo[3].value,
      'height': (updateInfo[4].value === "") ? oldInfo[4].value : updateInfo[4].value,
      'flying': (updateInfo[5].value === "") ? oldInfo[5].value : updateInfo[5].value,
      'fight': (updateInfo[6].value === "") ? oldInfo[6].value : updateInfo[6].value,
      'fire': (updateInfo[7].value === "") ? oldInfo[7].value : updateInfo[7].value,
      'water': (updateInfo[8].value === "") ? oldInfo[8].value : updateInfo[8].value,
      'grass': (updateInfo[9].value === "") ? oldInfo[9].value : updateInfo[9].value,
      'electric': (updateInfo[10].value === "") ? oldInfo[10].value : updateInfo[10].value,
      'ice': (updateInfo[11].value === "") ? oldInfo[11].value : updateInfo[11].value,
      'total': (updateInfo[12].value === "") ? oldInfo[12].value : updateInfo[12].value
    }

    console.log(formData);
    $.ajax({
      url: "/update/values",
      type: "POST",
      dataType: "JSON",
      data: JSON.stringify(formData),
      contentType: "application/json",
      cache: false,
      timeout: 5000,
      success: (data) => {
        console.log(data.status);
        //help with redirecting after post https://stackoverflow.com/a/11574444
        window.location = data.redirect;
      },
      error: (data) => {
        console.log("error occurred during insert: " + data.status);
      }
    })
  });
});