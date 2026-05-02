// ============================================
// KONFIGURASI KONTAK - EDIT DI SINI
// ============================================
const CONTACT_INFO = {
    phone: '62XXXXXXXXXX',        // Format: 62 + nomor tanpa 0 (contoh: 6285123456789)
    address: 'Jl. Nama Jalan No. Nomor, Kota', // Alamat lengkap untuk Google Maps
    whatsapp: '628xxxxxxxxxxxx'   // Format: 62 + nomor tanpa 0
};

// Update semua link kontak otomatis
function initContactLinks() {
    // Update phone link
    const phoneLink = document.querySelector('.phone-link');
    if (phoneLink) {
        phoneLink.href = `tel:+${CONTACT_INFO.phone}`;
        phoneLink.textContent = `(0${CONTACT_INFO.phone.substring(2, 4)}) ${CONTACT_INFO.phone.substring(4, 8)}-${CONTACT_INFO.phone.substring(8)}`;
    }
    
    // Update address link
    const mapsLink = document.querySelector('.maps-link');
    if (mapsLink) {
        mapsLink.href = `https://maps.google.com/?q=${encodeURIComponent(CONTACT_INFO.address)}`;
        mapsLink.textContent = CONTACT_INFO.address;
    }
    
    // Update WhatsApp
    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}`;
    const floatingBtn = document.querySelector('.floating-whatsapp');
    if (floatingBtn) {
        floatingBtn.href = whatsappUrl;
    }
    
    const whatsappLink = document.querySelector('.whatsapp-link');
    if (whatsappLink) {
        whatsappLink.href = whatsappUrl;
    }
    
    const ctaLinks = document.querySelectorAll('.cta-whatsapp-link');
    ctaLinks.forEach(link => {
        link.href = whatsappUrl;
    });
}

// Initialize links on page load
document.addEventListener('DOMContentLoaded', initContactLinks);

// ============================================
// NAVIGASI & SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Filter Catalog Items
const filterButtons = document.querySelectorAll('.filter-btn');
const catalogItems = document.querySelectorAll('.catalog-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter items
        catalogItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'flex';
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'flex';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            }
        });
    });
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Form Submission - Disabled (form removed)
// Contact info is now display-only

// Add scroll effect to navbar
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Button click handlers
document.querySelectorAll('.btn-secondary').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        
        const itemName = this.closest('.catalog-item, .promo-card').querySelector('h3').textContent;
        
        // Show alert or redirect to booking
        alert('Anda memilih: ' + itemName + '\n\nSilakan hubungi kami untuk pemesanan.');
        
        // Optional: Scroll to contact section
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    });
});

// Hero button click
document.querySelector('.hero .btn-primary').addEventListener('click', function () {
    document.querySelector('#services').scrollIntoView({ behavior: 'smooth' });
});

// Add animation to elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .catalog-item, .promo-card, .testimonial-card').forEach(el => {
    el.style.opacity = '1';
    observer.observe(el);
});

// Initialize first filter button as active
document.querySelector('.filter-btn.active') || (filterButtons[0] && filterButtons[0].classList.add('active'));

console.log('Website loaded successfully!');
