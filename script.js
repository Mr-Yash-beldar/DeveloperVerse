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

// Countdown Timer
function startCountdown() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 5); // 5 days from now

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
      document.getElementById("days").textContent = "0";
      document.getElementById("hours").textContent = "0";
      document.getElementById("minutes").textContent = "0";
      document.getElementById("seconds").textContent = "0";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
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

  // Hero contact button
  const heroContactBtn = document.getElementById("heroContactBtn");
  if (heroContactBtn) {
    heroContactBtn.addEventListener("click", (e) => {
      scrollToSection("contact");
    });
  }
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
  startCountdown();
  setupContactForm();
  setupSmoothScrolling();
  setupWorkFiltering();
  setupScrollAnimations();
  setupBackToTop();
  addInteractiveEffects();
});
