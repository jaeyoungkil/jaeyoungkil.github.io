// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Back to top button logic
const toTop = document.getElementById("to-top");
if (toTop) {
  const revealTopButton = () => {
    if (window.scrollY > 240) {
      toTop.classList.add("visible");
    } else {
      toTop.classList.remove("visible");
    }
  };
  window.addEventListener("scroll", revealTopButton, { passive: true });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// Project card entrance animation using IntersectionObserver
const projectCards = document.querySelectorAll(".project-card");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.animate(
          [
            { opacity: 0, transform: "translateY(20px) scale(0.95)" },
            { opacity: 1, transform: "translateY(0) scale(1)" },
          ],
          { duration: 400, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)", fill: "both" }
        );
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
projectCards.forEach((card) => observer.observe(card));

// Read More buttons now link directly to project pages
// No need for click handlers since they are now anchor tags

// Education items animation
const educationItems = document.querySelectorAll(".education-item");
const educationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.animate(
            [
              { opacity: 0, transform: "translateX(-20px)" },
              { opacity: 1, transform: "translateX(0)" },
            ],
            { duration: 350, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)", fill: "both" }
          );
        }, index * 100);
        educationObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
educationItems.forEach((item) => educationObserver.observe(item));

// Mobile menu toggle functionality
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

if (mobileMenuToggle && nav) {
  mobileMenuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    mobileMenuToggle.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Close menu when clicking nav links
  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      nav.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && !nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      mobileMenuToggle.classList.remove('active');
      nav.classList.remove('active');
    }
  });
}

// Mobile project card click functionality
function isMobile() {
  return window.innerWidth <= 1024;
}

document.addEventListener('click', (e) => {
  // Don't handle project card clicks if clicking on nav or menu toggle
  if (e.target.closest('.nav') || e.target.closest('.mobile-menu-toggle')) {
    return;
  }
  
  const projectCard = e.target.closest('.project-card');
  if (projectCard && isMobile()) {
    const readMoreBtn = projectCard.querySelector('.read-more-btn');
    if (readMoreBtn) {
      window.location.href = readMoreBtn.href;
    }
  }
});

// Position view more button to align with rightmost project card
function positionViewMoreButton() {
  const projectsGrid = document.getElementById('projectsGrid');
  const viewMoreBtn = document.getElementById('viewMoreBtn');
  
  if (projectsGrid && viewMoreBtn) {
    const projectCards = projectsGrid.querySelectorAll('.project-card:not(.hidden-project)');
    if (projectCards.length > 0) {
      // Get the rightmost visible project card
      let rightmostCard = projectCards[0];
      projectCards.forEach(card => {
        if (card.offsetLeft + card.offsetWidth > rightmostCard.offsetLeft + rightmostCard.offsetWidth) {
          rightmostCard = card;
        }
      });
      
      // Position button to align with right edge of rightmost card
      const gridRect = projectsGrid.getBoundingClientRect();
      const cardRect = rightmostCard.getBoundingClientRect();
      const offset = cardRect.right - gridRect.left;
      
      viewMoreBtn.style.position = 'absolute';
      viewMoreBtn.style.right = `calc(100% - ${offset}px)`;
    }
  }
}

// View More Projects functionality
const viewMoreBtn = document.getElementById('viewMoreBtn');
const projectsGrid = document.getElementById('projectsGrid');
let projectsExpanded = false;

if (viewMoreBtn && projectsGrid) {
  // Position button on load and resize
  positionViewMoreButton();
  window.addEventListener('resize', positionViewMoreButton);
  
  viewMoreBtn.addEventListener('click', () => {
    if (!projectsExpanded) {
      // Show hidden projects below original ones
      const hiddenProjects = projectsGrid.querySelectorAll('.hidden-project');
      hiddenProjects.forEach(project => {
        project.style.display = 'flex';
      });
      viewMoreBtn.innerHTML = '<span>View Less Projects</span><span class="arrow">⌃</span>';
      projectsExpanded = true;
    } else {
      // Hide additional projects
      const hiddenProjects = projectsGrid.querySelectorAll('.hidden-project');
      hiddenProjects.forEach(project => {
        project.style.display = 'none';
      });
      viewMoreBtn.innerHTML = '<span>View More Projects</span><span class="arrow">⌄</span>';
      projectsExpanded = false;
    }
    // Reposition after showing/hiding projects
    setTimeout(positionViewMoreButton, 10);
  });
}


