document.addEventListener('DOMContentLoaded', () => {
  const projects = document.querySelectorAll('.w3-col');

  // Add formatted date to each project's image text
  projects.forEach(project => {
    const date = project.dataset.date;
    const name = project.dataset.name;
    const imageText = project.querySelector('#image-text');

    if (imageText && date) {
      const formattedDate = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      imageText.innerHTML = `${name} <br> <span style="font-size: 12px; color: #ccc;">${formattedDate}</span>`;
    }
  });

  // Sorting functionality
  document.getElementById('sort-options').addEventListener('change', function () {
    const sortOption = this.value;
    const container = document.getElementById('projects-container');
    const rows = Array.from(container.getElementsByClassName('w3-row-padding'));
    const projects = rows.flatMap(row => Array.from(row.getElementsByClassName('w3-col')));

    // Sort projects based on the selected option
    if (sortOption === 'newest') {
      projects.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
    } else if (sortOption === 'oldest') {
      projects.sort((a, b) => new Date(a.dataset.date) - new Date(b.dataset.date));
    } else {
      projects.sort((a, b) => a.dataset.index - b.dataset.index);
    }

    // Rebuild the grid with sorted projects
    container.innerHTML = '';
    let newRow = document.createElement('div');
    newRow.className = 'w3-row-padding';
    newRow.style.paddingTop = '80px';

    projects.forEach((project, index) => {
      newRow.appendChild(project);
      if ((index + 1) % 4 === 0) {
        container.appendChild(newRow);
        newRow = document.createElement('div');
        newRow.className = 'w3-row-padding';
      }
    });

    if (newRow.children.length > 0) {
      container.appendChild(newRow);
    }
  });

  if (window.innerWidth <= 768) { // Only apply this behavior for mobile view
    const imageContainers = document.querySelectorAll('#image-container');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const imageText = entry.target.querySelector('#image-text');
          entry.target.classList.add('visible'); // Add a class to make the background visible
          if (imageText) {
            imageText.style.display = 'block'; // Show the text
          }
        } else {
          const imageText = entry.target.querySelector('#image-text');
          entry.target.classList.remove('visible'); // Remove the class when out of view
          if (imageText) {
            imageText.style.display = 'none'; // Hide the text
          }
        }
      });
    });

    imageContainers.forEach(container => observer.observe(container));
  }
});