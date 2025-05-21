// Display Current Year in Footer
document.getElementById("year").textContent = new Date().getFullYear();

// Display Last Modified Date in Footer
document.getElementById("lastModified").textContent = document.lastModified;

// Fetch and Display Members
async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

// Render Member Cards
function displayMembers(members) {
    const container = document.getElementById('members');
    container.innerHTML = ''; // Clear container in case of reload

    members.forEach((member) => {
        const card = document.createElement('section');
        card.classList.add('member-card');
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        container.appendChild(card);
    });
}

const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");
const display = document.querySelector("section.members"); // o el contenedor que uses

gridButton.addEventListener("click", () => {
  display.classList.add("grid");
  display.classList.remove("list");
});

listButton.addEventListener("click", () => {
  display.classList.add("list");
  display.classList.remove("grid");
});

// Obtener los datos del JSON
const url = "data/members.json";

async function getMembers() {
  const response = await fetch(url);
  const data = await response.json();
  displayMembers(data.members); // asegúrate que el JSON tenga esta estructura
}

function displayMembers(members) {
  members.forEach((member) => {
    let card = document.createElement("div");
    card.classList.add("member-card");
    card.innerHTML = `
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">${member.website}</a>
    `;
    display.appendChild(card);
  });
}

getMembers();