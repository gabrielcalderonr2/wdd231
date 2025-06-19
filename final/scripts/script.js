document.addEventListener('DOMContentLoaded', function() {
    // Set current year and last modified date
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Get all vehicle cards
    const allVehicles = Array.from(document.querySelectorAll('.vehicle-card'));
    
    // Search functionality
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        allVehicles.forEach(function(vehicle) {
            const vehicleName = vehicle.querySelector('h3').textContent.toLowerCase();
            const vehicleText = vehicle.textContent.toLowerCase();
            
            if (searchTerm === '' || vehicleText.includes(searchTerm)) {
                vehicle.style.display = 'block';
                vehicle.closest('.type-category')?.style.display = 'block';
            } else {
                vehicle.style.display = 'none';
            }
        });
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') performSearch();
        });
    }

    // Browse by type functionality
    const typeButtons = document.querySelectorAll('.type-btn');

    typeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            typeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the type to filter by
            const type = this.dataset.type;
            
            // Filter vehicles
            filterVehicles(type);
        });
    });

    function filterVehicles(type) {
        allVehicles.forEach(function(vehicle) {
            if (type === 'all') {
                vehicle.style.display = 'block';
                vehicle.closest('.type-category')?.style.display = 'block';
            } else {
                const shouldShow = vehicle.dataset.vehicleType === type;
                vehicle.style.display = shouldShow ? 'block' : 'none';
                
                // Show/hide entire category sections
                const category = vehicle.closest('.type-category');
                if (category) {
                    category.style.display = shouldShow ? 'block' : 'none';
                }
            }
        });
    }

    // Initialize - show all vehicles
    filterVehicles('all');
});