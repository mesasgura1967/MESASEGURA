// Authentication System
// Manages user login, signup, and session management

const AUTH_KEY = 'mesasegura_user';
const SESSION_KEY = 'mesasegura_session';

// User types
const USER_TYPES = {
    CUSTOMER: 'customer',
    RESTAURANT: 'restaurant',
    ADMIN: 'admin'
};

// Mock database
const MOCK_USERS = [
    {
        id: 1,
        email: 'ana@example.com',
        password: 'demo123',
        name: 'Ana Martínez',
        type: USER_TYPES.CUSTOMER,
        phone: '+34 612 345 678'
    },
    {
        id: 2,
        email: 'restaurant@example.com',
        password: 'demo123',
        name: 'La Bella Vita',
        type: USER_TYPES.RESTAURANT,
        phone: '+34 612 987 654'
    }
];

// Initialize auth system
function initAuth() {
    const session = getSession();
    if (session && session.expiresAt > Date.now()) {
        // Valid session exists
        return session.user;
    } else {
        // Clear expired session
        clearSession();
        return null;
    }
}

// Login function
function login(email, password) {
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);

    if (user) {
        // Create session (24 hours)
        const session = {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                type: user.type
            },
            expiresAt: Date.now() + (24 * 60 * 60 * 1000),
            token: generateToken()
        };

        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        return { success: true, user: session.user };
    }

    return { success: false, error: 'Email o contraseña incorrectos' };
}

// Signup function
function signup(userData) {
    // In a real app, this would make an API call
    const existingUser = MOCK_USERS.find(u => u.email === userData.email);

    if (existingUser) {
        return { success: false, error: 'Este email ya está registrado' };
    }

    // Create new user
    const newUser = {
        id: MOCK_USERS.length + 1,
        email: userData.email,
        password: userData.password,
        name: userData.name,
        type: userData.type || USER_TYPES.CUSTOMER,
        phone: userData.phone || ''
    };

    MOCK_USERS.push(newUser);

    // Auto-login
    return login(newUser.email, newUser.password);
}

// Logout function
function logout() {
    clearSession();
    window.location.href = 'index.html';
}

// Get current session
function getSession() {
    const sessionStr = localStorage.getItem(SESSION_KEY);
    if (!sessionStr) return null;

    try {
        return JSON.parse(sessionStr);
    } catch (e) {
        return null;
    }
}

// Clear session
function clearSession() {
    localStorage.removeItem(SESSION_KEY);
}

// Get current user
function getCurrentUser() {
    const session = getSession();
    return session && session.expiresAt > Date.now() ? session.user : null;
}

// Check if user is logged in
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// Check if user is of specific type
function isUserType(type) {
    const user = getCurrentUser();
    return user && user.type === type;
}

// Require authentication (redirect if not logged in)
function requireAuth(requiredType = null) {
    const user = getCurrentUser();

    if (!user) {
        window.location.href = 'index.html?login=required';
        return false;
    }

    if (requiredType && user.type !== requiredType) {
        showNotification('No tienes permisos para acceder a esta página', 'error');
        window.location.href = getDashboardUrl(user.type);
        return false;
    }

    return true;
}

// Get dashboard URL based on user type
function getDashboardUrl(userType) {
    switch (userType) {
        case USER_TYPES.CUSTOMER:
            return 'user-dashboard.html';
        case USER_TYPES.RESTAURANT:
            return 'dashboard.html';
        case USER_TYPES.ADMIN:
            return 'admin-dashboard.html';
        default:
            return 'index.html';
    }
}

// Generate simple token
function generateToken() {
    return Math.random().toString(36).substr(2) + Date.now().toString(36);
}

// Enhanced login handler for forms
window.handleLogin = function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const result = login(email, password);

    if (result.success) {
        closeModal();
        showNotification(`¡Bienvenido, ${result.user.name}! 👋`, 'success');

        setTimeout(() => {
            window.location.href = getDashboardUrl(result.user.type);
        }, 1000);
    } else {
        showNotification(result.error, 'error');
    }
}

// Enhanced signup handler for forms
window.handleSignup = function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');

    if (password !== confirmPassword) {
        showNotification('Las contraseñas no coinciden', 'error');
        return;
    }

    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: password,
        phone: formData.get('phone'),
        type: formData.get('user-type') || USER_TYPES.CUSTOMER
    };

    const result = signup(userData);

    if (result.success) {
        closeModal();
        showNotification(`¡Cuenta creada con éxito! Bienvenido, ${result.user.name}! 🎉`, 'success');

        setTimeout(() => {
            window.location.href = getDashboardUrl(result.user.type);
        }, 1500);
    } else {
        showNotification(result.error, 'error');
    }
}

// Update login modal to use new auth system
window.showLogin = function () {
    const content = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, var(--primary-500), var(--primary-600)); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 1.5rem;">
                👤
            </div>
            <h2 style="font-family: var(--font-display); margin-bottom: 0.5rem;">Iniciar Sesión</h2>
            <p style="color: var(--text-secondary);">Accede a tu cuenta de MesaSegura</p>
        </div>

        <form onsubmit="handleLogin(event)" id="login-form">
            <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" name="email" class="form-input" placeholder="tu@email.com" required value="ana@example.com">
            </div>
            
            <div class="form-group">
                <label class="form-label">Contraseña</label>
                <input type="password" name="password" class="form-input" placeholder="••••••••" required value="demo123">
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                    <input type="checkbox" name="remember" style="cursor: pointer;">
                    <span style="font-size: 0.875rem; color: var(--text-secondary);">Recordarme</span>
                </label>
                <a href="#" onclick="showForgotPassword(); return false;" style="font-size: 0.875rem; color: var(--primary-500); text-decoration: none;">
                    ¿Olvidaste tu contraseña?
                </a>
            </div>

            <button type="submit" class="btn btn-primary btn-block btn-large">
                Iniciar Sesión
            </button>
        </form>

        <div style="text-align: center; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
            <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 0.5rem;">
                ¿No tienes cuenta?
            </p>
            <a href="#" onclick="closeModal(); showSignup(); return false;" style="color: var(--primary-500); font-weight: 600; text-decoration: none;">
                Regístrate ahora
            </a>
        </div>

        <div style="background: rgba(99, 102, 241, 0.05); padding: 1rem; border-radius: var(--radius-md); margin-top: 1rem;">
            <p style="font-size: 0.75rem; color: var(--text-secondary); margin: 0; text-align: center;">
                🔐 <strong>Demo:</strong> ana@example.com / demo123
            </p>
        </div>
    `;

    createModal('', content);
}

// Update signup modal
window.showSignup = function () {
    const content = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, var(--primary-500), var(--primary-600)); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 1.5rem;">
                ✨
            </div>
            <h2 style="font-family: var(--font-display); margin-bottom: 0.5rem;">Crear Cuenta</h2>
            <p style="color: var(--text-secondary);">Únete a MesaSegura y empieza a reservar</p>
        </div>

        <form onsubmit="handleSignup(event)" id="signup-form">
            <div class="form-group">
                <label class="form-label">Nombre completo</label>
                <input type="text" name="name" class="form-input" placeholder="Tu nombre" required>
            </div>

            <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" name="email" class="form-input" placeholder="tu@email.com" required>
            </div>

            <div class="form-group">
                <label class="form-label">Teléfono</label>
                <input type="tel" name="phone" class="form-input" placeholder="+34 612 345 678">
            </div>
            
            <div class="form-group">
                <label class="form-label">Contraseña</label>
                <input type="password" name="password" class="form-input" placeholder="Mínimo 6 caracteres" required minlength="6">
            </div>

            <div class="form-group">
                <label class="form-label">Confirmar contraseña</label>
                <input type="password" name="confirm-password" class="form-input" placeholder="Repite tu contraseña" required>
            </div>

            <div class="form-group">
                <label class="form-label">Tipo de cuenta</label>
                <select name="user-type" class="form-input">
                    <option value="customer">Cliente (reservar mesas)</option>
                    <option value="restaurant">Restaurante (gestionar reservas)</option>
                </select>
            </div>

            <div style="margin-bottom: 1.5rem;">
                <label style="display: flex; align-items: start; gap: 0.5rem; cursor: pointer;">
                    <input type="checkbox" required style="margin-top: 0.25rem; cursor: pointer;">
                    <span style="font-size: 0.875rem; color: var(--text-secondary);">
                        Acepto los <a href="#" style="color: var(--primary-500);">términos y condiciones</a> y la <a href="#" style="color: var(--primary-500);">política de privacidad</a>
                    </span>
                </label>
            </div>

            <button type="submit" class="btn btn-primary btn-block btn-large">
                Crear Cuenta
            </button>
        </form>

        <div style="text-align: center; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
            <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 0.5rem;">
                ¿Ya tienes cuenta?
            </p>
            <a href="#" onclick="closeModal(); showLogin(); return false;" style="color: var(--primary-500); font-weight: 600; text-decoration: none;">
                Inicia sesión
            </a>
        </div>
    `;

    createModal('', content);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = initAuth();

    if (currentUser) {
        console.log('✅ User logged in:', currentUser.name);
    } else {
        console.log('🔓 No active session');
    }
});

console.log('🔐 Auth system loaded');
