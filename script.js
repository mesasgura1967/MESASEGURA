// ===================================
// GLOBAL STATE
// ===================================
const state = {
    user: null,
    restaurants: [],
    reservations: [],
    currentView: 'home'
};

// ===================================
// CREATOR PANEL (GOD MODE)
// ===================================
let keySequence = [];
const SECRET_CODE = 'willisau39';

document.addEventListener('keydown', (e) => {
    keySequence.push(e.key);
    if (keySequence.length > SECRET_CODE.length) {
        keySequence.shift();
    }
    if (keySequence.join('') === SECRET_CODE) {
        openCreatorPanel();
    }
});

function openCreatorPanel() {
    const content = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">⚡</div>
            <h2 style="font-family: var(--font-display); margin-bottom: 0.5rem;">Creator Panel</h2>
            <p style="color: var(--text-secondary);">Admin tools for demo & debugging</p>
        </div>

        <div style="display: grid; gap: 1rem;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <button onclick="seedDemoData()" class="btn btn-primary" style="background: #8b5cf6; border-color: #8b5cf6;">
                    🌱 Seed Data
                </button>
                <button onclick="nukeAllData()" class="btn btn-outline" style="color: #ef4444; border-color: #ef4444;">
                    🗑️ Nuke All
                </button>
            </div>
            
            <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: var(--radius-md); font-family: monospace; font-size: 0.75rem; max-height: 200px; overflow: auto; color: var(--text-secondary);">
                ${JSON.stringify(localStorage, null, 2)}
            </div>
        </div>
    `;
    createModal('⚡ God Mode', content);
}

function seedDemoData() {
    const mockReservations = [
        {
            id: Date.now(),
            restaurant: 'La Bella Vita',
            guests: 4,
            time: '20:30',
            date: new Date().toISOString().split('T')[0],
            table: 'Terraza - T1',
            deposit: 80,
            status: 'confirmed'
        },
        {
            id: Date.now() - 10000,
            restaurant: 'Sakura Sushi',
            guests: 2,
            time: '21:00',
            date: new Date().toISOString().split('T')[0],
            table: 'Barra - B1',
            deposit: 60,
            status: 'no-show'
        }
    ];

    localStorage.setItem('mesasegura_reservations', JSON.stringify(mockReservations));
    showNotification('🌱 Data seeded successfully!', 'success');
    closeModal();
    setTimeout(() => location.reload(), 1000);
}

function nukeAllData() {
    if (confirm('Are you sure you want to wipe all data?')) {
        localStorage.clear();
        showNotification('🗑️ All data nuked.', 'error');
        closeModal();
        setTimeout(() => location.reload(), 1000);
    }
}

// ===================================
// NAVIGATION
// ===================================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navActions.style.display = navActions.style.display === 'flex' ? 'none' : 'flex';
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===================================
// MODALS
// ===================================
function createModal(title, content) {
    const modalContainer = document.getElementById('modal-container');

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">${title}</h2>
                <button class="modal-close" onclick="closeModal()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;

    modalContainer.innerHTML = '';
    modalContainer.appendChild(modal);

    // Add styles for modal
    addModalStyles();

    // Animate in
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
    document.removeEventListener('keydown', handleEscapeKey);
}

function addModalStyles() {
    if (!document.getElementById('modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
                padding: 1rem;
            }
            
            .modal-overlay.active {
                opacity: 1;
            }
            
            .modal-content {
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-2xl);
                max-width: 500px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                transform: scale(0.9) translateY(20px);
                transition: transform 0.3s ease;
            }
            
            .modal-overlay.active .modal-content {
                transform: scale(1) translateY(0);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .modal-title {
                font-family: var(--font-display);
                font-size: 1.5rem;
                font-weight: 700;
            }
            
            .modal-close {
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: var(--radius-md);
                color: var(--text-secondary);
                transition: all 0.2s;
            }
            
            .modal-close:hover {
                background: var(--bg-card);
                color: var(--text-primary);
            }
            
            .modal-body {
                padding: 1.5rem;
            }
            
            .form-group {
                margin-bottom: 1.5rem;
            }
            
            .form-label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 600;
                color: var(--text-primary);
            }
            
            .form-input {
                width: 100%;
                padding: 0.875rem 1rem;
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                color: var(--text-primary);
                font-family: inherit;
                font-size: 1rem;
                transition: all 0.2s;
            }
            
            .form-input:focus {
                outline: none;
                border-color: var(--primary-500);
                box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
            }
            
            .form-input::placeholder {
                color: var(--text-tertiary);
            }
            
            .form-checkbox {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            
            .form-checkbox input {
                width: 18px;
                height: 18px;
                accent-color: var(--primary-500);
            }
            
            .form-link {
                color: var(--primary-500);
                text-decoration: none;
                transition: color 0.2s;
            }
            
            .form-link:hover {
                color: var(--primary-600);
                text-decoration: underline;
            }
            
            .form-divider {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin: 1.5rem 0;
                color: var(--text-tertiary);
            }
            
            .form-divider::before,
            .form-divider::after {
                content: '';
                flex: 1;
                height: 1px;
                background: var(--border-color);
            }
            
            .social-login {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
                margin-bottom: 1.5rem;
            }
            
            .social-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                padding: 0.875rem;
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                color: var(--text-primary);
                font-weight: 600;
                transition: all 0.2s;
            }
            
            .social-btn:hover {
                background: var(--bg-card-hover);
                border-color: var(--border-color-hover);
            }
        `;
        document.head.appendChild(style);
    }
}

// ===================================
// AUTH MODALS
// ===================================
function showLogin() {
    showRoleSelection('Iniciar Sesión');
}

function showSignup() {
    showRoleSelection('Crear Cuenta');
}

function showRoleSelection(title) {
    const content = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <p style="color: var(--text-secondary); font-size: 1.125rem;">
                Selecciona tu perfil para continuar
            </p>
        </div>

        <div style="display: grid; gap: 1rem;">
            <button onclick="handleRoleSelect('diner')" class="role-card" style="display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem; background: var(--bg-card); border: 2px solid var(--border-color); border-radius: var(--radius-lg); cursor: pointer; transition: all 0.3s; text-align: left;">
                <div style="width: 60px; height: 60px; background: rgba(255, 107, 53, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                    🍽️
                </div>
                <div>
                    <div style="font-weight: 700; font-size: 1.125rem; margin-bottom: 0.25rem;">Soy Comensal</div>
                    <div style="color: var(--text-secondary); font-size: 0.875rem;">Quiero reservar mesas y disfrutar</div>
                </div>
            </button>

            <button onclick="handleRoleSelect('restaurant')" class="role-card" style="display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem; background: var(--bg-card); border: 2px solid var(--border-color); border-radius: var(--radius-lg); cursor: pointer; transition: all 0.3s; text-align: left;">
                <div style="width: 60px; height: 60px; background: rgba(99, 102, 241, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                    👨‍🍳
                </div>
                <div>
                    <div style="font-weight: 700; font-size: 1.125rem; margin-bottom: 0.25rem;">Soy Restaurante</div>
                    <div style="color: var(--text-secondary); font-size: 0.875rem;">Quiero gestionar reservas y evitar no-shows</div>
                </div>
            </button>
        </div>

        <style>
            .role-card:hover {
                border-color: var(--primary-500) !important;
                background: var(--bg-card-hover) !important;
                transform: translateY(-2px);
                box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.1);
            }
        </style>
    `;

    createModal(title, content);
}

function handleRoleSelect(role) {
    showNotification('Conectando con tu dashboard...', 'success');
    closeModal();

    setTimeout(() => {
        if (role === 'diner') {
            window.location.href = 'booking.html';
        } else {
            window.location.href = 'dashboard.html';
        }
    }, 1000);
}

function showForgotPassword() {
    const content = `
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
            Ingresa tu email y te enviaremos instrucciones para restablecer tu contraseña.
        </p>
        
        <form onsubmit="handleForgotPassword(event)">
            <div class="form-group">
                <label class="form-label" for="forgot-email">Email</label>
                <input 
                    type="email" 
                    id="forgot-email" 
                    class="form-input" 
                    placeholder="tu@email.com"
                    required
                />
            </div>
            
            <button type="submit" class="btn btn-primary btn-block btn-large">
                Enviar Instrucciones
            </button>
            
            <p style="text-align: center; margin-top: 1rem;">
                <a href="#" class="form-link" onclick="event.preventDefault(); closeModal(); showLogin();">
                    Volver al inicio de sesión
                </a>
            </p>
        </form>
    `;

    createModal('Recuperar Contraseña', content);
}

function showDemo() {
    const content = `
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
            Agenda una demo personalizada con nuestro equipo y descubre cómo MesaSegura puede transformar tu restaurante.
        </p>
        
        <form onsubmit="handleDemoRequest(event)">
            <div class="form-group">
                <label class="form-label" for="demo-name">Nombre Completo</label>
                <input 
                    type="text" 
                    id="demo-name" 
                    class="form-input" 
                    placeholder="Juan Pérez"
                    required
                />
            </div>
            
            <div class="form-group">
                <label class="form-label" for="demo-email">Email</label>
                <input 
                    type="email" 
                    id="demo-email" 
                    class="form-input" 
                    placeholder="tu@email.com"
                    required
                />
            </div>
            
            <div class="form-group">
                <label class="form-label" for="demo-phone">Teléfono</label>
                <input 
                    type="tel" 
                    id="demo-phone" 
                    class="form-input" 
                    placeholder="+34 600 000 000"
                    required
                />
            </div>
            
            <div class="form-group">
                <label class="form-label" for="demo-restaurant">Nombre del Restaurante</label>
                <input 
                    type="text" 
                    id="demo-restaurant" 
                    class="form-input" 
                    placeholder="La Bella Vita"
                    required
                />
            </div>
            
            <div class="form-group">
                <label class="form-label" for="demo-message">Mensaje (Opcional)</label>
                <textarea 
                    id="demo-message" 
                    class="form-input" 
                    rows="4"
                    placeholder="Cuéntanos más sobre tu restaurante y tus necesidades..."
                ></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary btn-block btn-large">
                Solicitar Demo
            </button>
        </form>
    `;

    createModal('Agendar Demo', content);
}

// ===================================
// FORM HANDLERS
// ===================================
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Simulate login
    console.log('Login attempt:', { email, password });

    // Show success message
    showNotification('¡Bienvenido de vuelta!', 'success');
    closeModal();

    // Update UI to show logged in state
    state.user = { email, name: 'Usuario' };

    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
}

function handleSignup(event) {
    event.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Simulate signup
    console.log('Signup attempt:', { name, email, password });

    // Show success message
    showNotification('¡Cuenta creada exitosamente!', 'success');
    closeModal();

    // Update UI to show logged in state
    state.user = { email, name };

    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
}

function handleForgotPassword(event) {
    event.preventDefault();

    const email = document.getElementById('forgot-email').value;

    // Simulate password reset
    console.log('Password reset for:', email);

    showNotification('Instrucciones enviadas a tu email', 'success');
    closeModal();
}

function handleDemoRequest(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('demo-name').value,
        email: document.getElementById('demo-email').value,
        phone: document.getElementById('demo-phone').value,
        restaurant: document.getElementById('demo-restaurant').value,
        message: document.getElementById('demo-message').value
    };

    // Simulate demo request
    console.log('Demo request:', formData);

    showNotification('¡Demo agendada! Te contactaremos pronto.', 'success');
    closeModal();
}

function loginWithGoogle() {
    console.log('Login with Google');
    showNotification('Iniciando sesión con Google...', 'info');
    closeModal();
}

function loginWithApple() {
    console.log('Login with Apple');
    showNotification('Iniciando sesión con Apple...', 'info');
    closeModal();
}

// ===================================
// NOTIFICATIONS
// ===================================
function showNotification(message, type = 'info') {
    // Add notification styles if not already added
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 2rem;
                padding: 1rem 1.5rem;
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                display: flex;
                align-items: center;
                gap: 1rem;
                z-index: 10001;
                animation: slideInRight 0.3s ease-out;
                max-width: 400px;
            }
            
            .notification.success {
                border-left: 4px solid #10b981;
            }
            
            .notification.error {
                border-left: 4px solid #ef4444;
            }
            
            .notification.info {
                border-left: 4px solid var(--primary-500);
            }
            
            .notification-icon {
                font-size: 1.5rem;
            }
            
            .notification-message {
                flex: 1;
                color: var(--text-primary);
            }
            
            .notification-close {
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--text-secondary);
                cursor: pointer;
                transition: color 0.2s;
            }
            
            .notification-close:hover {
                color: var(--text-primary);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    };

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-icon">${icons[type]}</div>
        <div class="notification-message">${message}</div>
        <div class="notification-close" onclick="this.parentElement.remove()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </div>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ===================================
// ANIMATIONS ON SCROLL
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards and step cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .step-card, .pricing-card');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// ===================================
// SMOOTH SCROLL FOR ALL LINKS
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

console.log('🚀 MesaSegura initialized successfully!');
