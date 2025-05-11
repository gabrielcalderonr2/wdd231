const courses = [
  { code: 'WDD130', name: 'HTML and CSS', credits: 3, completed: true },
  { code: 'WDD230', name: 'JavaScript', credits: 3, completed: false },
  // Add more courses as needed
];

function displayCourses(filter) {
  const courseContainer = document.getElementById('course-cards');
  courseContainer.innerHTML = '';
  const filteredCourses = courses.filter(course => {
    if (filter === 'all') return true;
    if (filter === 'completed') return course.completed;
    return !course.completed;
  });

  filteredCourses.forEach(course => {
    const courseCard = document.createElement('div');
    courseCard.className = 'course-card';
    courseCard.style.backgroundColor = course.completed ? '#3498db' : '#95a5a6';
    courseCard.style.color = '#fff';
    courseCard.style.padding = '1rem';
    courseCard.style.margin = '0.5rem 0';
    courseCard.innerHTML = `
      <h3>${course.code}: ${course.name}</h3>
      <p>Credits: ${course.credits}</p>
      <p>${course.completed ? 'Completed' : 'In Progress'}</p>
    `;
    courseContainer.appendChild(courseCard);
  });
}

// Initialize with all courses
displayCourses('all');
