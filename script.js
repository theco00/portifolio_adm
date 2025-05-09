// Adicione estas funções no início do script
function initResponsiveFeatures() {
  // Fechar menu mobile ao clicar fora
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      mobileMenu.classList.remove('menu-open');
    }
  });

  // Redimensionamento da janela
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      mobileMenu.classList.remove('menu-open');
    }
  });

  // Lazy loading para imagens
  const lazyImages = document.querySelectorAll('img[data-src]');
  const lazyLoad = (target) => {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    io.observe(target);
  };
  lazyImages.forEach(lazyLoad);
}

// Sistema de animações otimizado
function initAdvancedAnimations() {
  const animateElements = document.querySelectorAll('[data-aos]');
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        animationObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animateElements.forEach(element => {
    animationObserver.observe(element);
  });
}

function initResponsiveFeatures() {
  // Fechar menu mobile ao clicar fora
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      mobileMenu.classList.remove('menu-open');
    }
  });

  // Redimensionamento da janela
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      mobileMenu.classList.remove('menu-open');
    }
  });

  // Lazy loading para imagens
  const lazyImages = document.querySelectorAll('img[data-src]');
  const lazyLoad = (target) => {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    io.observe(target);
  };
  lazyImages.forEach(lazyLoad);
}

// Sistema de animações otimizado
function initAdvancedAnimations() {
  const animateElements = document.querySelectorAll('[data-aos]');
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        animationObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animateElements.forEach(element => {
    animationObserver.observe(element);
  });
}

// Melhorias no carregamento de recursos
function optimizeResourceLoading() {
  // Pré-carregar recursos críticos
  const criticalResources = [
    'style.css',
    'perfil.jpg'
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = resource.includes('.css') ? 'style' : 'image';
    link.href = resource;
    document.head.appendChild(link);
  });
}

// Sistema de tratamento de erros
function initErrorHandling() {
  window.addEventListener('error', (e) => {
    console.error('Erro capturado:', e.error);
    // Aqui você pode adicionar tracking de erros (ex: Google Analytics)
  });

  window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise rejeitada:', e.reason);
    e.preventDefault();
  });
}

// Atualize o DOMContentLoaded para:
document.addEventListener('DOMContentLoaded', () => {
  initResponsiveFeatures();
  initAdvancedAnimations();
  optimizeResourceLoading();
  initErrorHandling();
  
  // Restante do código existente...
  animateOnScroll();
  
  // Adicione este trecho para melhorar o desempenho do scroll
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
    lastScrollY = currentScrollY;
    
    // Otimização para dispositivos móveis
    if (scrollDirection === 'down' && currentScrollY > 100) {
      document.querySelector('header').classList.add('header-scrolled');
    } else {
      document.querySelector('header').classList.remove('header-scrolled');
    }
  });
});

// Atualize a função sendEmail para incluir estado de carregamento
function sendEmail(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  
  submitBtn.innerHTML = `
    <span class="loader"></span>
    Enviando...
  `;
  submitBtn.disabled = true;

  const formData = new FormData(form);

  fetch('send-email.php', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) throw new Error('Erro na rede');
    return response.json();
  })
  .then(data => {
    if (data.success) {
      window.location.href = 'confirmacao_email.html';
    } else {
      showFormError(data.errors || data.message);
    }
  })
  .catch(error => {
    showFormError(error.message);
  })
  .finally(() => {
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
  });

  return false;
}

function showFormError(error) {
  const errorContainer = document.createElement('div');
  errorContainer.className = 'error-message';
  errorContainer.textContent = typeof error === 'string' ? error : error.join(', ');
  
  const form = document.getElementById('contact-form');
  form.prepend(errorContainer);
  
  setTimeout(() => {
    errorContainer.remove();
  }, 5000);
}