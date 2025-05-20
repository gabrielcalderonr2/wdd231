const container = document.getElementById('directory-container');
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');

// Load members
async function fetchMembers() {
  try {
    const response = await fetch("./data/members.json");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error('Failed to fetch members:', error);
  }
}

function displayMembers(members) {
  container.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;
    container.appendChild(card);
  });
}

// Toggle views
gridBtn.addEventListener('click', () => {
  container.classList.add('grid-view');
  container.classList.remove('list-view');
});

listBtn.addEventListener('click', () => {
  container.classList.add('list-view');
  container.classList.remove('grid-view');
});

fetchMembers();
