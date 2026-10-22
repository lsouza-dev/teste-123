/**
 * Pet Shop SENAC - Grande Feira de Adoção de Animais de Estimação
 * Shopping Vitória - 7 e 8 de Novembro de 2026
 * Scripts interativos (Vanilla JavaScript)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Effect & ScrollSpy
  initNavbar();

  // 2. Filtro de Pets na Vitrine
  initPetFilters();

  // 3. Acordeão de Dúvidas Frequentes (FAQ)
  initFaqAccordion();

  // 4. Botões de Adoção Direta (WhatsApp)
  initAdoptButtons();
});

/* ==========================================================================
   1. Navbar & ScrollSpy com Transição Suave entre Âncoras
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinksList = document.getElementById('navLinks');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll effect na navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy para destacar o link ativo com suavidade
    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle && navLinksList) {
    const closeMenu = () => {
      mobileToggle.classList.remove('active');
      navLinksList.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    const openMenu = () => {
      mobileToggle.classList.add('active');
      navLinksList.classList.add('open');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinksList.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Fechar menu mobile ao clicar em um link âncora
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Fechar menu mobile e ir ao topo ao clicar na logo
    const logo = document.querySelector('.logo');
    if (logo) {
      logo.addEventListener('click', (e) => {
        e.preventDefault();
        closeMenu();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        navLinks.forEach(link => link.classList.remove('active'));
      });
    }

    // Fechar menu caso a janela seja redimensionada para desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navLinksList.classList.contains('open')) {
        closeMenu();
      }
    });
  }
}

/* ==========================================================================
   3. Filtro da Vitrine de Pets
   ========================================================================== */
function initPetFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const petCards = document.querySelectorAll('.pet-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      petCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. Acordeão de Dúvidas Frequentes (FAQ)
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fecha os outros para manter o layout limpo
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      if (isActive) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   5. Botões de Adoção dos Pets (WhatsApp Direto)
   ========================================================================== */
function initAdoptButtons() {
  const adoptButtons = document.querySelectorAll('.btn-adopt-pet');

  adoptButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const petName = btn.getAttribute('data-pet-name') || 'um pet';
      const petType = btn.getAttribute('data-pet-type') || 'animal de estimação';

      const message = `Olá, Pet Shop SENAC!
Vi o(a) ${petName} (${petType}) no site da Feira de Adoção do Shopping Vitória (7 e 8 de Novembro de 2026) e tenho interesse em adotá-lo(a)!
Gostaria de tirar dúvidas sobre o processo.`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/5527999999999?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
    });
  });
}
