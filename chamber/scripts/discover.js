// Visit Message 
const visitBox = document.getElementById("visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  visitBox.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const diff = now - parseInt(lastVisit, 10);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) {
    visitBox.textContent = "Back so soon! Awesome!";
  } else if (days === 1) {
    visitBox.textContent = "You last visited 1 day ago.";
  } else {
    visitBox.textContent = `You last visited ${days} days ago.`;
  }
}
localStorage.setItem("lastVisit", now);

// Load JSON and Build Cards
fetch("data/discover.json")
  .then(res => res.json())
  .then(data => {
    const grid = document.querySelector(".discover-grid");
    data.forEach((item, index) => {
      const section = document.createElement("section");
      section.classList.add("card");
      section.id = `card${index + 1}`;
      section.innerHTML = `
        <h2>${item.title}</h2>
        <figure><img src="${item.image}" alt="${item.title}"></figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      `;
      grid.appendChild(section);
    });
  });
