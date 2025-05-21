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

// Toggle View
const gridButton = document.getElementById('grid');
const listButton = document.getElementById('list');
const memberContainer = document.getElementById('members');

gridButton.addEventListener('click', () => {
    memberContainer.classList.add('grid');
    memberContainer.classList.remove('list');
});

listButton.addEventListener('click', () => {
    memberContainer.classList.add('list');
    memberContainer.classList.remove('grid');
});

// Initial Call
getMembers();
