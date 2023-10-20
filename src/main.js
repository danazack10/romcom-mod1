// Create variables targetting the relevant DOM elements here :point_down:
var randomBtn = document.querySelector('.random-cover-button');
var saveBtn = document.querySelector('.save-cover-button');
var viewBtn = document.querySelector('.view-saved-button');
var newBtn = document.querySelector('.make-new-button');
var newBookBtn = document.querySelector('.create-new-book-button');
var homeView = document.querySelector('.home-view');
var savedView = document.querySelector('.saved-view');
var formView = document.querySelector('.form-view');
var homeBtn = document.querySelector('.home-button');

var homeImg = document.querySelector('.cover-image')
var homeTitle = document.querySelector('.cover-title')
var homeDesc1 = document.querySelector('.tagline-1')
var homeDesc2 = document.querySelector('.tagline-2')

// We've provided a few variables below
var savedCovers = [];
var currentCover = createRandomCover();

// Add your event listeners here :point_down:
randomBtn.addEventListener('click', createRandomCover);
newBtn.addEventListener('click', makeNewBtn);
viewBtn.addEventListener('click', viewSavedCovers);
homeBtn.addEventListener('click', viewHome)
saveBtn.addEventListener('click', saveCover);
newBookBtn.addEventListener('click', createCustomCover);

// Create your event handlers and other functions here :point_down:
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function createCover(imgSrc, title, descriptor1, descriptor2) {
  var cover = {
    id: Date.now(),
    coverImg: imgSrc,
    title: title,
    tagline1: descriptor1,
    tagline2: descriptor2
  }
  return cover
}

function createRandomCover(){
  var randomCover = covers[getRandomIndex(covers)];
  var randomTitle = titles[getRandomIndex(titles)];
  var randomDescriptor1 = descriptors[getRandomIndex(descriptors)];
  var randomDescriptor2 = descriptors[getRandomIndex(descriptors)];
  homeImg.src = randomCover;
  homeTitle.innerText = randomTitle;
  homeDesc1.innerText = randomDescriptor1;
  homeDesc2.innerText = randomDescriptor2;
}

function makeNewBtn() {
  console.log('Yes!');
  formView.classList.remove('hidden');
  homeView.classList.add('hidden');
  homeBtn.classList.remove('hidden');
  saveBtn.classList.add('hidden');
  randomBtn.classList.add('hidden');
}

function viewSavedCovers() {
  if (savedCovers.length > 0) {
    var savedCoversHTML = '';
    for (var i = 0; i < savedCovers.length; i++) {
      var savedCover = savedCovers[i];
      var coverElement = createCoverElement(savedCover);
      savedCoversHTML += coverElement;
    }
    savedView.innerHTML = savedCoversHTML;
  } else {
    savedView.innerHTML = '<p>No saved covers.</p>';
  }
  homeView.classList.add('hidden');
  savedView.classList.remove('hidden');
  formView.classList.add('hidden');
  homeBtn.classList.remove('hidden');
  saveBtn.classList.add('hidden');
  randomBtn.classList.add('hidden');
}

function createCoverElement(cover) {
  var coverElementHTML = `
    <div class="cover">
      <img src="${cover.coverImg}" alt="Cover Image">
      <h2>${cover.title}</h2>
      <h3>${cover.tagline1}</h3>
      <h3>${cover.tagline2}</h3>
  `;
  
  return coverElementHTML;
}

function viewHome(){
  homeView.classList.remove('hidden')
  savedView.classList.remove('hidden');
  formView.classList.add('hidden');
  homeBtn.classList.add('hidden');
  saveBtn.classList.remove('hidden');
  randomBtn.classList.remove('hidden');
}

function createCustomCover() {
  var userCover = document.querySelector('.user-cover').value;
  var userTitle = document.querySelector('.user-title').value;
  var userDesc1 = document.querySelector('.user-desc1').value;
  var userDesc2 = document.querySelector('.user-desc2').value;
  var customCover = createCover(userCover, userTitle, userDesc1, userDesc2);
  covers.push(userCover);
  titles.push(userTitle);
  descriptors.push(userDesc1);
  descriptors.push(userDesc2);
  homeImg.src = customCover.coverImg;
  homeTitle.innerText = customCover.title;
  homeDesc1.innerText = customCover.tagline1;
  homeDesc2.innerText = customCover.tagline2;
  event.preventDefault();
  viewHome();
}

function saveCover() {
  var currentCover = createCover(homeImg.src, homeTitle.innerText, homeDesc1.innerText, homeDesc2.innerText);
  var isDuplicate = false;
  for (var i = 0; i < savedCovers.length; i++) {
    if (savedCovers[i].id === currentCover.id) {
      isDuplicate = true;
      break;
    }
  }
  if (isDuplicate === false) {
    savedCovers.push(currentCover);
  }
}