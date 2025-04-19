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

document.addEventListener('DOMContentLoaded', () => {
  const sortButton = document.getElementById('sort-button');
  const sortMenu = document.getElementById('sort-menu');
  const sortOptions = document.getElementsByName('sort-option');
  const projectsContainer = document.getElementById('projects-container');
  const rows = Array.from(projectsContainer.getElementsByClassName('w3-row-padding'));

  // Utility function to sort projects
  const sortProjects = (order) => {
    const allProjects = rows.flatMap(row => Array.from(row.getElementsByClassName('w3-col')));

    // Sort projects by date
    const sortedProjects = allProjects.sort((a, b) => {
      const dateA = new Date(a.getAttribute('data-date'));
      const dateB = new Date(b.getAttribute('data-date'));
      return order === 'newest' ? dateB - dateA : dateA - dateB;
    });

    // Clear and rebuild the grid with sorted projects
    rows.forEach(row => (row.innerHTML = '')); // Clear rows
    sortedProjects.forEach((project, index) => {
      const rowIndex = Math.floor(index / 4); // 4 projects per row
      rows[rowIndex].appendChild(project);
    });
  };

  // Initialize page with 'newest' sort
  sortProjects('newest');
  sortOptions.forEach(option => {
    if (option.value === 'newest') option.checked = true; // Select 'newest' by default
  });

  // Show/hide the sort menu when sort button is clicked
  sortButton.addEventListener('click', () => {
    sortMenu.style.display = sortMenu.style.display === 'none' || sortMenu.style.display === '' ? 'block' : 'none';
  });

  // Apply sorting when a sort option is selected
  sortOptions.forEach(option => {
    option.addEventListener('change', () => {
      sortProjects(option.value);
      sortMenu.style.display = 'none'; // Auto-close the menu
    });
  });

  // Close the dropdown if clicked outside
  document.addEventListener('click', (event) => {
    if (!sortButton.contains(event.target) && !sortMenu.contains(event.target)) {
      sortMenu.style.display = 'none';
    }
  });
});