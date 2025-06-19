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

// Form submission handling with email validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  try {
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    
    // Validate email format
    if (!isValidEmail(email)) {
      throw new Error('Please enter a valid email address (e.g., user@example.com)');
    }
    
    // If validation passes, proceed with form submission
    this.style.display = 'none';
    document.getElementById('thankYouMessage').style.display = 'block';
    
    setTimeout(() => {
      this.reset();
      this.style.display = 'block';
      document.getElementById('thankYouMessage').style.display = 'none';
    }, 5000);
    
  } catch (error) {
    // Display error message to user
    const errorElement = document.createElement('p');
    errorElement.className = 'error-message';
    errorElement.textContent = error.message;
    errorElement.style.color = 'red';
    errorElement.style.marginTop = '0.5rem';
    
    // Remove previous error if exists
    const existingError = document.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Insert error below email field
    const emailGroup = document.querySelector('#email').closest('.form-group');
    emailGroup.appendChild(errorElement);
    
    // Focus on the email field
    document.getElementById('email').focus();
  }
});

// Helper function to validate email format
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}