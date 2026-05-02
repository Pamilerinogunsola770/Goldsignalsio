// Testimonial Carousel and Hero Graph Animation
function initCarousel() {
  const carousel = document.getElementById('testimonialCarousel');
  const testimonials = Array.from(carousel.getElementsByClassName('testimonial'));
  const dotsContainer = document.getElementById('carouselDots');
  let current = 0;

  function getVisibleCount() {
    if (window.innerWidth < 700) return 1;
    if (window.innerWidth < 1000) return 2;
    return 3;
  }

  function updateCarousel() {
    const visible = getVisibleCount();
    testimonials.forEach((el, i) => {
      const active = i >= current && i < current + visible;
      el.style.display = active ? 'flex' : 'none';
      el.classList.toggle('active', active);
    });
    Array.from(dotsContainer.children).forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  function createDots() {
    dotsContainer.innerHTML = '';
    const visible = getVisibleCount();
    const dotCount = Math.max(1, testimonials.length - visible + 1);
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('span');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        current = i;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function nextSlide() {
    const visible = getVisibleCount();
    const max = testimonials.length - visible;
    current = current < max ? current + 1 : 0;
    updateCarousel();
  }

  createDots();
  updateCarousel();
  let interval = setInterval(nextSlide, 4200);

  window.addEventListener('resize', () => {
    createDots();
    updateCarousel();
  });

  carousel.addEventListener('mouseenter', () => clearInterval(interval));
  carousel.addEventListener('mouseleave', () => interval = setInterval(nextSlide, 4200));
}

function initLinks() {
  document.getElementById('telegram-link').onclick = function() {
    window.location.href = 'YOUR_TELEGRAM_LINK_HERE';
  };
  const waBtn = document.getElementById('whatsapp-link');
  if (waBtn) waBtn.onclick = function() {
    window.location.href = 'YOUR_WHATSAPP_LINK_HERE';
  };
  document.getElementById('telegram-link-contact').onclick = function() {
    window.location.href = 'YOUR_TELEGRAM_LINK_HERE';
  };
  document.getElementById('whatsapp-link-contact').onclick = function() {
    window.location.href = 'YOUR_WHATSAPP_LINK_HERE';
  };
}

function initForexGraph() {
  const canvas = document.getElementById('forexGraph');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let t = 0;
  function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.9)';
    ctx.lineWidth = 3;
    ctx.shadowColor = 'rgba(255, 215, 0, 0.35)';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    const amplitude = canvas.height * 0.3;
    const yOffset = canvas.height * 0.55;
    ctx.moveTo(0, yOffset);
    for (let x = 0; x <= canvas.width; x += 3) {
      const wave = Math.sin((x + t) * 0.01) * amplitude * 0.4;
      const pulse = Math.cos((x - t * 0.7) * 0.014) * amplitude * 0.2;
      const y = yOffset - wave + pulse;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.18)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += 4) {
      const y = yOffset + Math.sin((x + t * 1.2) * 0.02) * amplitude * 0.18;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();

    t += 0.8;
    requestAnimationFrame(drawGraph);
  }
  drawGraph();
}

// Auto-scroll to contact section after 3 seconds on first load
function initAutoScroll() {
  const hasVisited = sessionStorage.getItem('goldSignalsVisited');
  if (!hasVisited) {
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 3000);
    sessionStorage.setItem('goldSignalsVisited', 'true');
  }
}

// Logo scroll button handlers
function initLogoScroll() {
  const heroLogo = document.getElementById('logo-scroll-btn');
  const scrollLogoContainer = document.getElementById('scrollLogo');
  const scrollLogoBtn = document.getElementById('scroll-logo-btn');
  const heroSection = document.querySelector('.hero-section');

  // Hero logo click - scroll to contact
  if (heroLogo) {
    heroLogo.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Scroll logo click - scroll back to hero
  if (scrollLogoBtn) {
    scrollLogoBtn.addEventListener('click', () => {
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Show/hide scroll logo on scroll
  window.addEventListener('scroll', () => {
    if (heroSection) {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const isScrolled = window.pageYOffset > heroBottom * 0.5;
      
      if (isScrolled) {
        scrollLogoContainer.classList.add('active');
      } else {
        scrollLogoContainer.classList.remove('active');
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initCarousel();
  initLinks();
  initForexGraph();
  initAutoScroll();
  initLogoScroll();
});
  