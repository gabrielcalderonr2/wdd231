// Show the current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();

// Show the last time the page was updated
document.getElementById("lastModified").textContent = document.lastModified;

// Get the buttons and the section for member cards
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");
const display = document.querySelector("section.members");

// When the grid button is clicked, show grid view
gridButton.addEventListener("click", () => {
  display.classList.add("grid");
  display.classList.remove("list");
});

// When the list button is clicked, show list view
listButton.addEventListener("click", () => {
  display.classList.add("list");
  display.classList.remove("grid");
});

// Get the member data from the JSON file
async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Could not load the data");

    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error("Error getting the members:", error);
  }
}

// Show each member as a card
function displayMembers(members) {
  display.innerHTML = ""; // Clear the section before adding new cards

  members.forEach((member) => {
    const card = document.createElement("div");
    card.classList.add("member-card");

    // Add member info to the card
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit website</a>
    `;

    display.appendChild(card); // Add the card to the section
  });
}

getMembers(); // Call the function to start
