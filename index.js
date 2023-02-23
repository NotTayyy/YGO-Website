//--Randomization Of The Header Background Image
const headerBG = [
  "url(Images/Header/HBG1.jpg)", "url(Images/Header/HBG2.jpg)",
  "url(Images/Header/HBG3.jpg)", "url(Images/Header/HBG4.jpg)",
  "url(Images/Header/HBG5.jpg)", "url(Images/Header/HBG6.jpg)", 
  "url(Images/Header/HBG7.jpg)", "url(Images/Header/HBG8.jpg)", 
  "url(Images/Header/HBG9.jpg)", "url(Images/Header/HBG10.jpg)", 
  "url(Images/Header/HBG11.jpg)", "url(Images/Header/HBG12.jpg)"
  ];

async function getAPI() {
  await fetch('https://ygo-site-backend.herokuapp.com/card', {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }) 
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      cardAPIListings = data;
      RandomCard();
    })
    .then(function() {

    })
    ;
}

async function getStaples() {
  await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?staple=yes', {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    staples = data;
    stapleOfDay();
  })
}
    
function rndm() {
  let randomBGNumber = Math.floor(Math.random() * headerBG.length);
  document.getElementById("headeroverlay").style.backgroundImage = headerBG[randomBGNumber];
}
setTimeout(rndm, 1);
setInterval(rndm, 15000);

//--Resets Scroll Position To Top of page on reload
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

//---- Fetches the Api for Global Use
let cardAPIListings = getAPI();
let staples = getStaples();

function stapleOfDay() {
  const RC =Math.floor(Math.random() * staples.data.length);
  var cardShowcase = document.getElementById("popcardShowcase");
  var randomCardImage = document.getElementById('popimg');
  switch (staples.data[RC].type) {
      case "Spell Card":
      case "Trap Card":
        cardShowcase.innerHTML = '\"' +staples.data[RC].name + '\"' + '<br><br>' +  
        '[' + staples.data[RC].race + ' / ' + staples.data[RC].type + ']' +  '<br><br>' + 'Effect: ' + '<br>' + staples.data[RC].desc;
        
        randomCardImage.src = staples.data[RC].card_images[0].image_url;
        randomCardImage.alt = staples.data[RC].name;
      break;
    
      case "Effect Monster":
      case "Fusion Monster":
      case "Normal Monster":
        cardShowcase.innerHTML = '\"' +staples.data[RC].name + '\"' + ' Level: ' + staples.data[RC].level + '<br><br>' +  
        '[' + staples.data[RC].race + ' / ' + staples.data[RC].type + ']' + '<br>' + 'Attri: ' + 
        staples.data[RC].attribute + '<br><br>' + 'Desc: ' + '<br>' + staples.data[RC].desc + '<br><br>' + ' Atk: ' +
        staples.data[RC].atk + '  / Def: ' + staples.data[RC].def;
    
        randomCardImage.src = staples.data[RC].card_images[0].image_url;
        randomCardImage.alt = staples.data[RC].name;
      break;
    
      case "XYZ Monster":
        cardShowcase.innerHTML = '\"' +staples.data[RC].name + '\"' + ' Rank: ' + staples.data[RC].level + '<br><br>' +  
        '[' + staples.data[RC].race + ' / ' + staples.data[RC].type + ']' + '<br>' + 'Attri: ' + 
        staples.data[RC].attribute + '<br><br>' + 'Desc: ' + '<br>' + staples.data[RC].desc + '<br><br>' + ' Atk: ' +
        staples.data[RC].atk + ' / Def: ' + staples.data[RC].def;
    
        randomCardImage.src = staples.data[RC].card_images[0].image_url;
        randomCardImage.alt = staples.data[RC].name;
      break;
      
      case "Pendulum Effect Monster":
        cardShowcase.innerHTML = '\"' +staples.data[RC].name + '\"' + ' Level: ' + staples.data[RC].level + '<br><br>' +  
        '[' + staples.data[RC].race + ' / ' + staples.data[RC].type + ']' + '<br>' + 'Attri: ' + 
        staples.data[RC].attribute + '<br><br>' + 'Desc: ' + '<br>' + staples.data[RC].desc.replace(/\n/g, "<br />") + '<br><br>' + ' Atk: ' +
        staples.data[RC].atk + ' / Def: ' + staples.data[RC].def + ' / Scale: ' + staples.data[RC].scale;
    
        randomCardImage.src = staples.data[RC].card_images[0].image_url;
        randomCardImage.alt = staples.data[RC].name;
      break;
      
      case "Link Monster":
        cardShowcase.innerHTML = '\"' +staples.data[RC].name + '\"' + '/ Link-Rating: ' + staples.data[RC].linkval + '<br><br>' +  
        '[' + staples.data[RC].race + ' / ' + staples.data[RC].type + ']' + '<br>' + 'Attri: ' + 
        staples.data[RC].attribute + '<br><br>' + 'Desc: ' + '<br>' + staples.data[RC].desc + '<br><br>' + ' Atk: ' +
        staples.data[RC].atk + '<br><br>' + 'Markers: ' + staples.data[RC].linkmarkers;
    
        randomCardImage.src = staples.data[RC].card_images[0].image_url;
        randomCardImage.alt = staples.data[RC].name;
      break;
    
      case "Skill Card":
      default:
        stapleOfDay()
      break;
    
  }
}

//--- Grab a Random Card and Show it on the Page with its im P@!age
function RandomCard() {
  const RC = Math.floor(Math.random() * cardAPIListings.data.length);
  var cardShowcase = document.getElementById("randomcardshowcase");
  var randomCardImage = document.getElementById('randomImage');
  switch (cardAPIListings.data[RC].type) {
    case "Spell Card":
    case "Trap Card":
      cardShowcase.innerHTML = '\"' +cardAPIListings.data[RC].name + '\"' + '<br><br>' +  
      '[' + cardAPIListings.data[RC].race + ' / ' + cardAPIListings.data[RC].type + ']' +  '<br><br>' + 'Effect: ' + '<br>' + cardAPIListings.data[RC].desc;
      
      randomCardImage.src = cardAPIListings.data[RC].card_images[0].image_url;
      randomCardImage.alt = cardAPIListings.data[RC].name;
    break;
  
    case "Effect Monster":
    case "Fusion Monster":
    case "Normal Monster":
      cardShowcase.innerHTML = '\"' +cardAPIListings.data[RC].name + '\"' + ' Level: ' + cardAPIListings.data[RC].level + '<br><br>' +  
      '[' + cardAPIListings.data[RC].race + ' / ' + cardAPIListings.data[RC].type + ']' + '<br>' + 'Attri: ' + 
      cardAPIListings.data[RC].attribute + '<br><br>' + 'Desc: ' + '<br>' + cardAPIListings.data[RC].desc + '<br><br>' + ' Atk: ' +
      cardAPIListings.data[RC].atk + '  / Def: ' + cardAPIListings.data[RC].def;
  
      randomCardImage.src = cardAPIListings.data[RC].card_images[0].image_url;
      randomCardImage.alt = cardAPIListings.data[RC].name;
    break;
  
    case "XYZ Monster":
      cardShowcase.innerHTML = '\"' +cardAPIListings.data[RC].name + '\"' + ' Rank: ' + cardAPIListings.data[RC].level + '<br><br>' +  
      '[' + cardAPIListings.data[RC].race + ' / ' + cardAPIListings.data[RC].type + ']' + '<br>' + 'Attri: ' + 
      cardAPIListings.data[RC].attribute + '<br><br>' + 'Desc: ' + '<br>' + cardAPIListings.data[RC].desc + '<br><br>' + ' Atk: ' +
      cardAPIListings.data[RC].atk + ' / Def: ' + cardAPIListings.data[RC].def;
  
      randomCardImage.src = cardAPIListings.data[RC].card_images[0].image_url;
      randomCardImage.alt = cardAPIListings.data[RC].name;
    break;
    
    case "Pendulum Effect Monster":
      cardShowcase.innerHTML = '\"' +cardAPIListings.data[RC].name + '\"' + ' Level: ' + cardAPIListings.data[RC].level + '<br><br>' +  
      '[' + cardAPIListings.data[RC].race + ' / ' + cardAPIListings.data[RC].type + ']' + '<br>' + 'Attri: ' + 
      cardAPIListings.data[RC].attribute + '<br><br>' + 'Desc: ' + '<br>' + cardAPIListings.data[RC].desc.replace(/\n/g, "<br />") + '<br><br>' + ' Atk: ' +
      cardAPIListings.data[RC].atk + ' / Def: ' + cardAPIListings.data[RC].def + ' / Scale: ' + cardAPIListings.data[RC].scale;
  
      randomCardImage.src = cardAPIListings.data[RC].card_images[0].image_url;
      randomCardImage.alt = cardAPIListings.data[RC].name;
    break;
    
    case "Link Monster":
      cardShowcase.innerHTML = '\"' +cardAPIListings.data[RC].name + '\"' + '/ Link-Rating: ' + cardAPIListings.data[RC].linkval + '<br><br>' +  
      '[' + cardAPIListings.data[RC].race + ' / ' + cardAPIListings.data[RC].type + ']' + '<br>' + 'Attri: ' + 
      cardAPIListings.data[RC].attribute + '<br><br>' + 'Desc: ' + '<br>' + cardAPIListings.data[RC].desc + '<br><br>' + ' Atk: ' +
      cardAPIListings.data[RC].atk + '<br><br>' + 'Markers: ' + cardAPIListings.data[RC].linkmarkers;
  
      randomCardImage.src = cardAPIListings.data[RC].card_images[0].image_url;
      randomCardImage.alt = cardAPIListings.data[RC].name;
    break;
  
    case "Skill Card":
    default:
      RandomCard()
    break;
  }
}

function cardSearch(input){
  var result = [];

  for (var i=0; i < cardAPIListings.data.length ; i++ ) {
    if (cardAPIListings.data[i]["name"].toUpperCase().includes(input.toUpperCase())) {
      if (result.length < 5) {
        result.push(cardAPIListings.data[i]);
      } else {
        return result;
      }
    }
  }
  return result;
}

function CardTypeImage(type) {
  switch (type) {
    case "Spell Card":
      return "Images/Card-Types/Spell Card.jpg";
      break;
    case "Trap Card":
      return "Images/Card-Types/Trap Card.jpg";
      break;
    case "Spirit Monster":
    case "Union Effect Monster":
    case "Flip Effect Monster":
    case "Tuner Monster":
    case "Effect Monster":
      return "Images/Card-Types/Effect Monster.jpg";
      break;
    case "Fusion Monster":
      return "Images/Card-Types/Fusion Monster.jpg";
      break;
    case "Normal Monster":
      return "Images/Card-Types/Normal Monster.jpg";
      break;
    case "Synchro Tuner Monster":
    case "Synchro Monster":
      return "Images/Card-Types/Synchro Monster.jpg";
      break;
    case "XYZ Monster":
      return "Images/Card-Types/XYZ Monster.jpg";
      break;
    case "Pendulum Effect Monster":
      return "Images/Card-Types/Pendulum Effect Monster.jpg";
      break;
    case "Pendulum Normal Monster":
      return "Images/Card-Types/Pendulum Normal Monster.jpg";
      break;
    case "Pendulum Effect Fusion Monster":
      return "Images/Card-Types/Pendulum Effect Fusion Monster.jpg";
      break;
    case "Synchro Pendulum Effect Monster":
        return "Images/Card-Types/Synchro Pendulum Effect Monster.jpg";
        break;
    case "XYZ Pendulum Effect Monster":
        return "Images/Card-Types/XYZ Pendulum Effect Monster.jpg";
        break;
    case "Link Monster":
      return "Images/Card-Types/Link Monster.jpg";
      break;
    case "Ritual Monster":
      return "Images/Card-Types/Ritual Monster.jpg";
      break;
    case "Ritual Effect Monster":
      return "Images/Card-Types/Ritual Effect Monster.jpg";
      break;
    case "Token":
      return "Images/Card-Types/Token.jpg";
      break;
    case "Skill Card":
      return "Images/Card-Types/Skill Card.jpg";
      break;
    case "Undefined":
      return "Images/Card-Types/undefined.jpg";
      break;
    default:
      return "Images/Card-Types/undefined.jpg";
      break;
  }

}

//-- Updates the Text Whenever an Input is made to the Text Field and populates a Drop Down// SearchBoxMainNav.addEventListener('input', async(event) =>{
const cardDropdownTemplate = document.querySelector('[Card-Dropdown-Template]');
const cardDropdownContainer = document.querySelector('[card-dropdown-container]');
const cardDropdownMoreTem = document.querySelector('[More-Search-Template]');

SearchBoxMainNav.addEventListener('input', async(event) =>{
  const more = cardDropdownMoreTem.content.cloneNode(true).children[0];
  var input = document.getElementById('SearchTerm').value;
  cardDropdownContainer.innerHTML = "";
  if (input != "") {
    var result = cardSearch(input); 
    if (result.length == 0) {
      const card = cardDropdownTemplate.content.cloneNode(true).children[0];
      const name = card.querySelector("[Ygo-Card-Name]");
      const imge = card.querySelector("[card-image]");
      name.textContent = "No Card Found";
      imge.src = CardTypeImage("Undefined");
      cardDropdownContainer.append(card);
    } else {
    for (var i = 0; i < result.length; i++) {
      const card = cardDropdownTemplate.content.cloneNode(true).children[0];
      const name = card.querySelector("[Ygo-Card-Name]");
      const desc =  card.querySelector("[Ygo-Card-Desc]");
      const imge = card.querySelector("[card-image]");
      name.textContent = result[i].name;
      desc.textContent = result[i].desc;
      imge.src = CardTypeImage(result[i].type);
      cardDropdownContainer.append(card);
    }

    cardDropdownContainer.append(more);
    }
  }
});

//Hides everything in search box If You click out of It
document.addEventListener("click", (evt) => {
  const dropdownEl = cardDropdownContainer;
  const searchBox = document.querySelector("[search-main-nav]");
  let targetEl = evt.target;
  do {
    if (targetEl == dropdownEl || targetEl == searchBox) {
      return;
    }
    targetEl = targetEl.parentNode;
  } while (targetEl);
  cardDropdownContainer.innerHTML = "";
})

let searchFinal = "";
//Alerts the page whenever you Submit the Form search Field
SearchBoxMainNav.addEventListener('submit', async(event) => {
  event.preventDefault();
  var searchText = document.getElementById('SearchTerm').value;
  if (searchText != "") {
    var result = cardSearch(searchText); 
    if (result.length == 0) {
      alert("Please submit a Yu-Gi-Oh Card Name!" + result.length);
    } else {
      searchFinal = result[0].data.name;
      console.log(searchFinal);
      document.SearchForm.submit();
    }
  } else {
    alert("Please submit a Yu-Gi-Oh Card Name!")
  }
});

function SearchButton() {
  this.event.preventDefault();
  if (this.event.target.className == "NoButton" || this.event.target.parentElement.firstElementChild.innerHTML == "No Card Found") {

  } else {
    document.getElementById('SearchTerm').value = this.event.target.parentElement.firstElementChild.innerHTML;
    document.SearchForm.submit();
  }
}

//--Silly Little Scroll to Top Function
var mybutton = document.getElementById("TopButton");
document.addEventListener("scroll", async(event) => {
  console.log(scrollY)
  if (scrollY > "250") {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
});

const reloadBtn = document.getElementById('reloadRnd');
const reloadStl = document.getElementById('reloadStl')

reloadBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  evt.stopPropagation();
  RandomCard();
})

reloadStl.addEventListener('click', (evt) => {
  evt.preventDefault();
  evt.stopPropagation();
  stapleOfDay();
})

function ScrollToTop() {
  window.scrollTo(0, 0);
}

document.querySelectorAll('.cardshowcase div.cardsc img').forEach(image => {
  image.onclick = () => {
    document.querySelector('.image-popup').style.display = 'block'; 
    document.querySelector('.image-popup img').src = image.getAttribute('src')
  }

  document.querySelector('.image-popup > span').onclick = () => {
    document.querySelector('.image-popup').style.display = 'none'; 
  }
})
