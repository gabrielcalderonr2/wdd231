const container = document.getElementById("directory-container");
const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");


const jsonURL = "./chamber/scripts/members.json"; 

async function getMembers() {
  const response = await fetch('data/members.json');
  const data = await response.json();
  displayMembers(data.members);
}

function displayMembers(members) {
  const display = document.getElementById('members');
  members.forEach((member) => {
    const card = document.createElement('section');
    card.innerHTML = `
      <h2>${member.name}</h2>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <img src="images/${member.image}" alt="${member.name} logo">
    `;
    display.appendChild(card);
  });
}

getMembers();


const gridButton = document.getElementById('grid');
const listButton = document.getElementById('list');
const display = document.getElementById('members');

gridButton.addEventListener('click', () => {
  display.classList.add('grid');
  display.classList.remove('list');
});

listButton.addEventListener('click', () => {
  display.classList.add('list');
  display.classList.remove('grid');
});
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;
