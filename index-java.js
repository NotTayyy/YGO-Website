//--Randomization Of The Header Background Image
const headerBG = ["url(Images/Header/HBG1.jpg)", "url(Images/Header/HBG2.jpg)", "url(Images/Header/HBG3.jpg)", "url(Images/Header/HBG4.jpg)", "url(Images/Header/HBG5.jpg)", "url(Images/Header/HBG6.jpg)", "url(Images/Header/HBG7.jpg)", "url(Images/Header/HBG8.jpg)", "url(Images/Header/HBG9.jpg)", "url(Images/Header/HBG10.jpg)"];
let randomBGNumber = Math.floor(Math.random() * headerBG.length);

document.getElementById("headeroverlay").style.backgroundImage = headerBG[randomBGNumber];
//-- End of Randomization


//--------------------I Was using this for API Calls, Might use again for api Calls after learning Back End
//  const FapiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=';
//  SearchBoxMainNav.addEventListener('submit', async(event) => {
//    event.preventDefault();
//    const searchText = document.getElementById('SearchTerm').value;
//    cardSearchApi = FapiUrl + searchText;
//    console.log(cardSearchApi);
//     try {
//    const response = await fetch(cardSearchApi);
//    const data = await response.json();
//    console.log(data[0]);
//    alert('Name: ' + data.data[0].name + '\n\n' + 'Type: ' + data.data[0].type + '\n\n' + 'Description: ' + data.data[0].desc);

//  } catch { alert("ERROR Please submit a Yu-Gi-Oh Card Name!"); 
//  }});
//------------------------------------------------

//-----Main Search Loop Uses a Function to Take the Param of the Search box in order to search the Api For A Name.
function cardSearch(input) {
  var result = [];
  for (var i=0; i < cardAPIListings.data.length ; i++ ) {
    if (cardAPIListings.data[i]["name"].toUpperCase().includes(input.toUpperCase())) {
      if (result.length < 5) {
        result.push(cardAPIListings.data[i]);
      }
    }
  }
  console.log(result);
  return result;
}

//-- Updates the Text Whenever an Input is made to the Text Field
SearchBoxMainNav.addEventListener('input', async(event) =>{
  var input = document.getElementById('SearchTerm').value;
  var inputlog = document.getElementById("placeholder");
  inputlog.innerHTML = "";
  if (input != "") {
    var result = cardSearch(input);
    for (var i = 0; i < 4; i++) {
      inputlog.innerHTML += '['+result[i].name +'] ' ;
    }
  } 
});

//Alerts the page whenever you Submit the Form search Field
SearchBoxMainNav.addEventListener('submit', async(event) => {
  event.preventDefault();
  var searchText = document.getElementById('SearchTerm').value;
  var result = cardSearch(searchText);
  
  if (result.length == 0) {
    alert("ERROR Please submit a Yu-Gi-Oh Card Name!" + result.length);
  } else {
    alert('Name: ' + result[0].name + '\n\n' + 'Type: ' + result[0].type + '\n\n' + 'Description: ' + result[0].desc + '\n\n' + 'Length: ' + result.length);
  }
});
