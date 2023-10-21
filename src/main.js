//Variables
var randomBtn = document.querySelector('.random-cover-button');
var saveBtn = document.querySelector('.save-cover-button');
var viewBtn = document.querySelector('.view-saved-button');
var newBtn = document.querySelector('.make-new-button');
var newBookBtn = document.querySelector('.create-new-book-button');
var homeView = document.querySelector('.home-view');
var savedView = document.querySelector('.saved-view');
var formView = document.querySelector('.form-view');
var homeBtn = document.querySelector('.home-button');
var homeImg = document.querySelector('.cover-image');
var homeTitle = document.querySelector('.cover-title');
var homeDesc1 = document.querySelector('.tagline-1');
var homeDesc2 = document.querySelector('.tagline-2');
var savedCovers = [];
var currentCover = createRandomCover();

//Event Listeners
randomBtn.addEventListener('click', createRandomCover);
newBtn.addEventListener('click', makeNewBtn);
viewBtn.addEventListener('click', viewSavedCovers);
homeBtn.addEventListener('click', viewHome)
saveBtn.addEventListener('click', saveCover);
newBookBtn.addEventListener('click', createCustomCover);

//Event Handlers
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
  };
  return cover;
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}

function createRandomCover() {
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
  show(formView);
  hide(homeView);
  hide(savedView);
  show(homeBtn);
  hide(saveBtn);
  hide(randomBtn);
}

function viewHome() {
  show(homeView);
  hide(savedView);
  hide(formView);
  hide(homeBtn);
  show(saveBtn);
  show(randomBtn);
}

function viewSavedCovers() {
  show(savedView);
  hide(homeView);
  hide(formView);
  show(homeBtn);
  hide(saveBtn);
  hide(randomBtn);
  displaySavedCovers();
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

function displaySavedCovers() {
  var savedCoversSection = document.querySelector('.saved-covers-section');
  savedCoversSection.innerHTML = '';
  for (var i = 0; i < savedCovers.length; i++) {
    var cover = savedCovers[i];
    var miniCover = document.createElement('div');
    miniCover.classList.add('mini-cover');
    miniCover.dataset.index = i;
    miniCover.innerHTML = `
      <img class="cover-image" src="${cover.coverImg}">
      <h2 class="cover-title">${cover.title}</h2>
      <h3 class="tagline">A tale of <span class="tagline-1">${cover.tagline1}</span> and <span class="tagline-2">${cover.tagline2}</span></h3>
    `;
    savedCoversSection.appendChild(miniCover);
    miniCover.addEventListener('dblclick', deleteSavedCover);
  }
}

function saveCover() {
  var currentCoverData = createCover(homeImg.src, homeTitle.innerText, homeDesc1.innerText, homeDesc2.innerText);
  var isDuplicate = false;
  for (var i = 0; i < savedCovers.length; i++) {
    var cover = savedCovers[i];
    if (
      cover.coverImg === currentCoverData.coverImg &&
      cover.title === currentCoverData.title &&
      cover.tagline1 === currentCoverData.tagline1 &&
      cover.tagline2 === currentCoverData.tagline2
    ) {
      isDuplicate = true;
      break;
    }
  }
  if (isDuplicate) {
  } else {
    savedCovers.push(currentCoverData);
  }
}

function deleteSavedCover(event) {
  var index = event.currentTarget.dataset.index;
  savedCovers.splice(index, 1);
  displaySavedCovers();
}