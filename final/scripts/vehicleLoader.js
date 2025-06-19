export async function loadVehicles() {
  try {
    const response = await fetch('vehicles.json');
    if (!response.ok) throw new Error('Vehicle data not available');
    const data = await response.json();
    const grid = document.querySelector('#vehicle-grid');
    data.vehicles.forEach(vehicle => {
      const card = document.createElement('div');
      card.className = 'vehicle-card';
      card.innerHTML = `
        <img src="${vehicle.image}" alt="${vehicle.name}" loading="lazy">
        <h3>${vehicle.name}</h3>
        <p>Type: ${vehicle.type}</p>
        <p>Year: ${vehicle.year}</p>
        <p>Price: ${vehicle.price}</p>
        <p>${vehicle.description}</p>
      `;
      grid.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading vehicles:', error);
  }
}
