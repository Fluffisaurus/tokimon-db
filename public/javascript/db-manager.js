var tokiInfo = [];
var tokiAbilities = [];
var insertButton;

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

initReferences();

console.log(tokiInfo);
console.log(tokiAbilities);


// send request to server on click 
$( () =>{
  $("#insert-button").click( (e)=>{
    e.preventDefault();

    var formData = { 
      'id': tokiInfo[0].value,
      'name': tokiInfo[1].value,
      'trainer': tokiInfo[4].value,
      'weight': tokiInfo[2].value,
      'height': tokiInfo[3].value,
      'flying': tokiAbilities[0].value,
      'fight': tokiAbilities[1].value,
      'fire': tokiAbilities[2].value,
      'water': tokiAbilities[3].value,
      'grass': tokiAbilities[4].value,
      'electric': tokiAbilities[5].value,
      'ice': tokiAbilities[6].value,
      'total': tokiAbilities[7].value
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
      },
      error: () => {
        console.log("error occurred during insert");
      }
    })
  });
});
