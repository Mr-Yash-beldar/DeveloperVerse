// Loading Animation
const loadingText = "Developer Verse";
const loadingElement = document.getElementById("loadingText");
const loadingScreen = document.getElementById("loadingScreen");
const mainContent = document.getElementById("mainContent");

function createLoadingAnimation() {
  loadingElement.innerHTML = "";

  for (let i = 0; i < loadingText.length; i++) {
    const span = document.createElement("span");
    span.textContent = loadingText[i] === " " ? "\u00A0" : loadingText[i];
    span.style.animationDelay = `${i * 0.1}s`;
    loadingElement.appendChild(span);
  }
}

function hideLoadingScreen() {
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
    mainContent.classList.add("show");
  }, loadingText.length * 100 + 1000);
}

// Mobile Navigation
function setupMobileNavigation() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  mobileMenuBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("open");

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileMenuOverlay.addEventListener("click", closeMobileMenu);

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = e.target.getAttribute("data-target");
      scrollToSection(target);
      closeMobileMenu();
    });
  });

  function openMobileMenu() {
    mobileMenu.classList.add("open");
    mobileMenuOverlay.classList.add("active");
    mobileMenuBtn.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("open");
    mobileMenuOverlay.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Navigation scroll effect
function setupNavigationScroll() {
  const navigation = document.getElementById("navigation");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navigation.classList.add("scrolled");
    } else {
      navigation.classList.remove("scrolled");
    }
  });
}

// GitHub Projects Integration
async function loadGitHubProjects() {
  const projectsGrid = document.getElementById("projectsGrid");
  const username = "Mr-Yash-beldar";

  // Show loading state
  projectsGrid.innerHTML =
    '<div class="loading-projects">Loading projects from GitHub... 🚀</div>';

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`
    );
    const repos = await response.json();

    if (!repos || repos.length === 0) {
      showFallbackProjects();
      return;
    }

    projectsGrid.innerHTML = "";

    repos.forEach((repo, index) => {
      const projectCard = createProjectCard(repo, index);
      projectCard.classList.add("animate"); // Make visible immediately
      projectsGrid.appendChild(projectCard);
    });

    // Re-setup filtering after loading
    setupWorkFiltering();

    // Re-setup scroll animations for new cards
    setupScrollAnimations();
  } catch (error) {
    console.error("Error loading GitHub projects:", error);
    showFallbackProjects();
  }
}

function createProjectCard(repo, index) {
  const card = document.createElement("div");
  card.className = "work-card";

  // Determine category based on repo topics or name
  const topics = repo.topics || [];
  let category = "student";
  if (
    topics.includes("website") ||
    topics.includes("web") ||
    repo.name.includes("website")
  ) {
    category = "websites";
  }
  card.setAttribute("data-category", category);

  // Create card content
  card.innerHTML = `
    <div class="work-image">
      <div class="github-project-placeholder">
        <div class="project-number">${index + 1}</div>
        <div class="project-lang">${repo.language || "Code"}</div>
      </div>
      <div class="work-overlay">
        <div class="work-buttons">
          ${
            repo.homepage
              ? `<a href="${repo.homepage}" class="work-btn live-btn" target="_blank">🔗 Live Visit</a>`
              : ""
          }
          <a href="${
            repo.html_url
          }" class="work-btn details-btn" target="_blank">💻 GitHub</a>
        </div>
      </div>
    </div>
    <div class="work-content">
      <h3>${repo.name.replace(/-/g, " ").replace(/_/g, " ")}</h3>
      <p>${repo.description || "A project by DeveloperVerse"}</p>
      <div class="work-tech">
        ${repo.language ? `<span class="tech-tag">${repo.language}</span>` : ""}
        ${
          repo.topics
            ? repo.topics
                .slice(0, 3)
                .map((topic) => `<span class="tech-tag">${topic}</span>`)
                .join("")
            : ""
        }
      </div>
      <div class="work-stats">
        <span class="stat-item">⭐ ${repo.stargazers_count}</span>
        <span class="stat-item">🔱 ${repo.forks_count}</span>
      </div>
    </div>
  `;

  return card;
}

function showFallbackProjects() {
  const projectsGrid = document.getElementById("projectsGrid");
  projectsGrid.innerHTML = `
    <!-- Website Projects -->
    <div class="work-card animate" data-category="websites">
      <div class="work-image">
        <img src="swami.png" alt="Swami Green Website" style="display:block; width:100%; height:300px; object-fit:contain; border-radius:12px;">
        <div class="work-overlay">
          <div class="work-buttons">
            <a href="https://github.com/Mr-Yash-beldar" class="work-btn details-btn" target="_blank">💻 GitHub</a>
          </div>
        </div>
      </div>
      <div class="work-content">
        <h3>Swami Green Website</h3>
        <p>Eco-friendly website with modern design and sustainable features</p>
        <div class="work-tech">
          <span class="tech-tag">HTML</span>
          <span class="tech-tag">CSS</span>
          <span class="tech-tag">JavaScript</span>
        </div>
      </div>
    </div>

    <div class="work-card animate" data-category="websites">
      <div class="work-image">
        <img src="marconi.png" alt="Marconi Website" style="display:block; width:100%; height:300px; object-fit:contain; border-radius:12px;">
        <div class="work-overlay">
          <div class="work-buttons">
            <a href="https://github.com/Mr-Yash-beldar" class="work-btn details-btn" target="_blank">💻 GitHub</a>
          </div>
        </div>
      </div>
      <div class="work-content">
        <h3>Marconi Website</h3>
        <p>Professional business website with advanced functionality</p>
        <div class="work-tech">
          <span class="tech-tag">React</span>
          <span class="tech-tag">Node.js</span>
        </div>
      </div>
    </div>

    <!-- Student Projects -->
    <div class="work-card animate" data-category="student">
      <div class="work-image">
        <div class="github-project-placeholder">
          <div class="project-number">3</div>
          <div class="project-lang">PHP</div>
        </div>
        <div class="work-overlay">
          <div class="work-buttons">
            <a href="https://github.com/Mr-Yash-beldar" class="work-btn details-btn" target="_blank">💻 GitHub</a>
          </div>
        </div>
      </div>
      <div class="work-content">
        <h3>Reclaim Tour & Travel</h3>
        <p>Complete travel booking system with user management</p>
        <div class="work-tech">
          <span class="tech-tag">PHP</span>
          <span class="tech-tag">MySQL</span>
        </div>
      </div>
    </div>

    <div class="work-card animate" data-category="student">
      <div class="work-image">
        <div class="github-project-placeholder">
          <div class="project-number">4</div>
          <div class="project-lang">Python</div>
        </div>
        <div class="work-overlay">
          <div class="work-buttons">
            <a href="https://github.com/Mr-Yash-beldar" class="work-btn details-btn" target="_blank">💻 GitHub</a>
          </div>
        </div>
      </div>
      <div class="work-content">
        <h3>Course Cloud</h3>
        <p>Online learning management system for educational institutions</p>
        <div class="work-tech">
          <span class="tech-tag">Django</span>
          <span class="tech-tag">Python</span>
        </div>
      </div>
    </div>
  `;
}

// Contact Form Handler
function setupContactForm() {
  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");
  const whatsappBtn = document.getElementById("whatsappBtn");

  // Email form submission
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const formObject = {};

    // Convert FormData to object
    for (const [key, value] of formData.entries()) {
      formObject[key] = value;
    }

    // Create email content
    const emailSubject = `New Project Inquiry - ${formObject.project}`;
    const emailBody = `
Name: ${formObject.name}
Email: ${formObject.email}
Phone: ${formObject.phone || "Not provided"}
Project Type: ${formObject.project}

Project Details:
${formObject.message}
        `;

    // Create mailto link
    const mailtoLink = `mailto:developerverse@gmail.com?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    contactForm.style.display = "none";
    successMessage.classList.add("show");

    // Hide success message after 5 seconds and reset form
    setTimeout(() => {
      successMessage.classList.remove("show");
      contactForm.style.display = "block";
      contactForm.reset();
    }, 5000);
  });

  // WhatsApp button handler
  whatsappBtn.addEventListener("click", () => {
    const formData = new FormData(contactForm);
    const name = formData.get("name") || "Potential Client";
    const email = formData.get("email") || "Not provided";
    const phone = formData.get("phone") || "Not provided";
    const project = formData.get("project") || "Not specified";
    const message = formData.get("message") || "No details provided";

    const whatsappMessage = `Hi! I'm interested in your services.

Name: ${name}
Email: ${email}
Phone: ${phone}
Project Type: ${project}

Details: ${message}`;

    const phoneNumber = "+918767884273";
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(
      "+",
      ""
    )}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, "_blank");
  });
}

// Smooth scrolling function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const offsetTop = element.offsetTop - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
}

// Setup smooth scrolling for all navigation links
function setupSmoothScrolling() {
  // Desktop navigation links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      const target = this.getAttribute("data-target");
      scrollToSection(target);
    });
  });

  // Footer navigation links
  document.querySelectorAll(".footer-nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      const target = this.getAttribute("data-target");
      scrollToSection(target);
    });
  });

  // Hero buttons
  document.querySelectorAll(".hero-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const target = this.getAttribute("data-target");
      if (target) {
        scrollToSection(target);
      }
    });
  });
}

// Work section filtering
function setupWorkFiltering() {
  const categoryBtns = document.querySelectorAll(".category-btn");
  const workCards = document.querySelectorAll(".work-card");

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      categoryBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");

      workCards.forEach((card) => {
        if (
          category === "all" ||
          card.getAttribute("data-category") === category
        ) {
          card.classList.remove("hidden");
          card.classList.add("show");
        } else {
          card.classList.add("hidden");
          card.classList.remove("show");
        }
      });
    });
  });
}

// Add scroll animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  // Observe service cards and work cards
  document.querySelectorAll(".service-card, .work-card").forEach((card) => {
    observer.observe(card);
  });
}

// Back to top functionality
function setupBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  // Smooth scroll to top when clicked
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Add interactive effects
function addInteractiveEffects() {
  // Add mouse move effect to the sun background
  const sunBackground = document.querySelector(".sun-background");
  const hero = document.querySelector(".hero");

  if (sunBackground && hero) {
    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      sunBackground.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    hero.addEventListener("mouseleave", () => {
      sunBackground.style.transform =
        "translate(-50%, -50%) rotateX(0deg) rotateY(0deg)";
    });
  }
}

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  createLoadingAnimation();
  hideLoadingScreen();
  setupMobileNavigation();
  setupNavigationScroll();
  loadGitHubProjects(); // Load GitHub projects
  setupContactForm();
  setupSmoothScrolling();
  setupScrollAnimations();
  setupBackToTop();
  addInteractiveEffects();
});
