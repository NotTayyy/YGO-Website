//--Randomization Of The Header Background Image
const headerBG = ["url(Images/Header/HBG1.jpg)", "url(Images/Header/HBG2.jpg)", "url(Images/Header/HBG3.jpg)", "url(Images/Header/HBG4.jpg)", "url(Images/Header/HBG5.jpg)", "url(Images/Header/HBG6.jpg)", "url(Images/Header/HBG7.jpg)", "url(Images/Header/HBG8.jpg)", "url(Images/Header/HBG9.jpg)", "url(Images/Header/HBG10.jpg)"];
let randomBGNumber = Math.floor(Math.random() * headerBG.length);

document.getElementById("headeroverlay").style.backgroundImage = headerBG[randomBGNumber];
//-- End of Ranzomizaton



//Main Seach Loop Uses a Function to Take the Param of the Search box in order to search the Api For A Name.
const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=';

SearchBoxMainNav.addEventListener('submit', async(event) => {
  event.preventDefault();
  const searchText = document.getElementById('SearchTerm').value;
  cardSearchApi = apiUrl + searchText;
  console.log(cardSearchApi);
try {
  const response = await fetch(cardSearchApi);
  const data = await response.json();
  console.log(data.data[0]);
  alert('Name: ' + data.data[0].name + '\n\n' + 'Type: ' + data.data[0].type + '\n\n' + 'Description: ' + data.data[0].desc);

} catch { alert("ERROR Please submit a Yu-Gi-Oh Card Name!"); 
//----in the future When the user types into the Search box, It will auto update a Dropdown menu populated with the first 5 options from the array 
//----that shows up so if you type in b a ccunction will call this code and pull whatever arrray it returns then taking the first 45 items from 
//----the array it will populate the Dropdown withh those 5, Making them Clickable and Making it ewasier to find the correct card
}});
