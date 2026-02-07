// Internationalization System (i18n)
// Sistema de Internacionalización para MesaSegura

const LANGUAGES = {
    ES: 'es',
    EN: 'en',
    DE: 'de',
    FR: 'fr'
};

const TRANSLATIONS = {
    es: {
        // Brand
        'brand.name': 'MesaSegura',
        'brand.tagline': 'Tu mesa, siempre asegurada',
        'brand.subtitle': 'Plataforma de Reservas con Fianza Descontable de Factura',

        // Navigation
        'nav.features': 'Características',
        'nav.howItWorks': 'Cómo Funciona',
        'nav.pricing': 'Precios',
        'nav.searchRestaurants': 'Buscar Restaurantes',
        'nav.login': 'Iniciar Sesión',
        'nav.signup': 'Registrarse',
        'nav.myAccount': 'Mi Cuenta',
        'nav.bookNow': 'Reservar Ahora',

        // Hero Section
        'hero.badge': 'Revolucionando las Reservas de Restaurantes',
        'hero.title.1': 'Tu Mesa,',
        'hero.title.2': 'Siempre',
        'hero.title.3': 'Asegurada',
        'hero.subtitle': 'Reserva con confianza. Sistema de compromiso financiero que beneficia a restaurantes y comensales.',
        'hero.cta.primary': 'Buscar Restaurantes',
        'hero.cta.secondary': 'Cómo Funciona',
        'hero.stats.reduction': 'Reducción de No-Shows',
        'hero.stats.satisfaction': 'Satisfacción de Clientes',
        'hero.stats.restaurants': 'Restaurantes Activos',

        // Booking Page
        'booking.title': 'Restaurantes Cercanos',
        'booking.search.placeholder': 'Buscar restaurantes, cocinas o zonas...',
        'booking.filter.popular': '🔥 Popular',
        'booking.filter.japanese': '🍣 Japonés',
        'booking.filter.italian': '🍝 Italiano',
        'booking.filter.steakhouse': '🥩 Asador',
        'booking.filter.vegan': '🌱 Vegano',
        'booking.filter.winery': '🍷 Vinoteca',
        'booking.commitment': 'Compromiso',
        'booking.perPerson': 'persona',
        'booking.noResults.title': 'No se encontraron restaurantes',
        'booking.noResults.subtitle': 'Intenta con otros filtros o términos de búsqueda',

        // Booking Modal
        'modal.booking.title': 'Completar Reserva',
        'modal.booking.date': 'Fecha',
        'modal.booking.time': 'Hora',
        'modal.booking.guests': 'Personas',
        'modal.booking.person': 'persona',
        'modal.booking.people': 'personas',
        'modal.booking.depositPerPerson': 'Depósito por persona',
        'modal.booking.totalCommitment': 'Total a comprometer',
        'modal.booking.notice': 'La fianza se descontará automáticamente del total de tu factura al comer.',
        'modal.booking.warning': 'Solo se retiene si no asistes o no cancelas con al menos 3 horas de antelación.',
        'modal.booking.cta': 'Proceder al Pago',

        // Payment Modal
        'payment.title': 'Pago Seguro',
        'payment.subtitle': 'Completa el pago del depósito para confirmar tu reserva',
        'payment.summary': 'RESUMEN DE RESERVA',
        'payment.cardNumber': 'Número de tarjeta',
        'payment.expiry': 'Fecha exp.',
        'payment.cvv': 'CVV',
        'payment.cardHolder': 'Nombre del titular',
        'payment.cardHolderPlaceholder': 'Como aparece en la tarjeta',
        'payment.totalToPay': 'Total a pagar',
        'payment.refundableDeposit': 'Depósito descontable de factura',
        'payment.cta': 'Pagar',
        'payment.secure': 'Pago 100% seguro y encriptado',

        // Success Modal
        'success.title': '¡Reserva Confirmada!',
        'success.subtitle': 'Tu mesa en {restaurant} está asegurada',
        'success.dateTime': 'Fecha y Hora',
        'success.guests': 'Personas',
        'success.deposit': 'Depósito',
        'success.reminder': 'Recibirás un recordatorio por email 24h antes de tu reserva',
        'success.close': 'Cerrar',
        'success.viewReservation': 'Ver Mi Reserva',

        // User Dashboard
        'dashboard.greeting': '¡Hola, {name}! 👋',
        'dashboard.upcomingReservations': 'Tienes {count} reservas próximas',
        'dashboard.noReservations': 'No tienes reservas próximas',
        'dashboard.noReservationsSubtitle': '¡Explora restaurantes increíbles y haz tu primera reserva!',
        'dashboard.title': 'Mi Panel',
        'dashboard.home': 'Inicio',
        'dashboard.myReservations': 'Mis Reservas',
        'dashboard.favorites': 'Favoritos',
        'dashboard.settings': 'Configuración',
        'dashboard.newReservation': '+ Nueva Reserva',
        'dashboard.stats.totalReservations': 'Reservas Totales',
        'dashboard.stats.thisYear': 'Este año',
        'dashboard.stats.attendanceRate': 'Tasa de Asistencia',
        'dashboard.stats.perfect': '¡Perfecto!',
        'dashboard.stats.depositsReturned': 'Fianzas Descontadas',
        'dashboard.stats.completedReservations': 'reservas completadas',
        'dashboard.stats.favoriteRestaurants': 'Restaurantes Favoritos',
        'dashboard.stats.inYourList': 'En tu lista',
        'dashboard.upcomingReservations.title': 'Próximas Reservas',
        'dashboard.allReservations.title': 'Todas mis Reservas',
        'dashboard.favorites.title': 'Mis Restaurantes Favoritos',
        'dashboard.showQR': 'Ver QR',
        'dashboard.modify': 'Modificar',
        'dashboard.cancel': 'Cancelar',
        'dashboard.confirmed': 'Confirmado',
        'dashboard.completed': 'Completada',

        // Restaurant Dashboard
        'restaurant.dashboard.title': 'Vista General',
        'restaurant.dashboard.overview': 'Vista General',
        'restaurant.dashboard.reservations': 'Reservas',
        'restaurant.dashboard.clients': 'Clientes',
        'restaurant.dashboard.finance': 'Finanzas',
        'restaurant.dashboard.configuration': 'Configuración',
        'restaurant.stats.todayReservations': 'Reservas Hoy',
        'restaurant.stats.guaranteedIncome': 'Ingresos Asegurados',
        'restaurant.stats.guaranteed': 'garantizado',
        'restaurant.stats.attendanceRate': 'Tasa de Asistencia',
        'restaurant.stats.noShowsPrevented': 'No-Shows Prevenidos',
        'restaurant.stats.savings': 'Ahorro',
        'restaurant.upcomingReservations': 'Próximas Reservas',
        'restaurant.viewAll': 'Ver todas',
        'restaurant.quickActions': 'Acciones Rápidas',
        'restaurant.blockTable': 'Bloquear Mesa',
        'restaurant.createPromo': 'Crear Promo',
        'restaurant.adjustSchedule': 'Ajustar Horario',
        'restaurant.viewTickets': 'Ver Tickets',

        // Auth
        'auth.login.title': 'Iniciar Sesión',
        'auth.login.subtitle': 'Accede a tu cuenta de MesaSegura',
        'auth.login.email': 'Email',
        'auth.login.password': 'Contraseña',
        'auth.login.remember': 'Recordarme',
        'auth.login.forgot': '¿Olvidaste tu contraseña?',
        'auth.login.cta': 'Iniciar Sesión',
        'auth.login.noAccount': '¿No tienes cuenta?',
        'auth.login.signupLink': 'Regístrate ahora',
        'auth.signup.title': 'Crear Cuenta',
        'auth.signup.subtitle': 'Únete a MesaSegura y empieza a reservar',
        'auth.signup.name': 'Nombre completo',
        'auth.signup.phone': 'Teléfono',
        'auth.signup.confirmPassword': 'Confirmar contraseña',
        'auth.signup.accountType': 'Tipo de cuenta',
        'auth.signup.customer': 'Cliente (reservar mesas)',
        'auth.signup.restaurant': 'Restaurante (gestionar reservas)',
        'auth.signup.terms': 'Acepto los términos y condiciones y la política de privacidad',
        'auth.signup.cta': 'Crear Cuenta',
        'auth.signup.hasAccount': '¿Ya tienes cuenta?',
        'auth.signup.loginLink': 'Inicia sesión',

        // Notifications
        'notification.reservationConfirmed': '¡Reserva confirmada en {restaurant}! 🎉',
        'notification.reservationCancelled': 'Reserva cancelada correctamente. Tu depósito será devuelto íntegramente.',
        'notification.processing': 'Procesando pago...',
        'notification.welcome': '¡Bienvenido, {name}! 👋',
        'notification.accountCreated': '¡Cuenta creada con éxito! Bienvenido, {name}! 🎉',

        // Common
        'common.close': 'Cerrar',
        'common.cancel': 'Cancelar',
        'common.confirm': 'Confirmar',
        'common.save': 'Guardar',
        'common.edit': 'Editar',
        'common.delete': 'Eliminar',
        'common.search': 'Buscar',
        'common.filter': 'Filtrar',
        'common.loading': 'Cargando...',
        'common.error': 'Error',
        'common.success': 'Éxito',
        'common.today': 'Hoy',
        'common.yesterday': 'Ayer',
        'common.tomorrow': 'Mañana',
        'common.supportNote': 'Soporte disponible sólo en español',
    },

    en: {
        // Brand
        'brand.name': 'MesaSegura',
        'brand.tagline': 'Your table, always secured',
        'brand.subtitle': 'Restaurant Booking Platform with Bill-Deductible Deposit',

        // Navigation
        'nav.features': 'Features',
        'nav.howItWorks': 'How It Works',
        'nav.pricing': 'Pricing',
        'nav.searchRestaurants': 'Search Restaurants',
        'nav.login': 'Sign In',
        'nav.signup': 'Sign Up',
        'nav.myAccount': 'My Account',
        'nav.bookNow': 'Book Now',

        // Hero Section
        'hero.badge': 'Revolutionizing Restaurant Reservations',
        'hero.title.1': 'Your Table,',
        'hero.title.2': 'Always',
        'hero.title.3': 'Secured',
        'hero.subtitle': 'Book with confidence. Financial commitment system that benefits both restaurants and diners.',
        'hero.cta.primary': 'Search Restaurants',
        'hero.cta.secondary': 'How It Works',
        'hero.stats.reduction': 'No-Show Reduction',
        'hero.stats.satisfaction': 'Client Satisfaction',
        'hero.stats.restaurants': 'Active Restaurants',

        // Booking Page
        'booking.title': 'Nearby Restaurants',
        'booking.search.placeholder': 'Search restaurants, cuisines or areas...',
        'booking.filter.popular': '🔥 Popular',
        'booking.filter.japanese': '🍣 Japanese',
        'booking.filter.italian': '🍝 Italian',
        'booking.filter.steakhouse': '🥩 Steakhouse',
        'booking.filter.vegan': '🌱 Vegan',
        'booking.filter.winery': '🍷 Winery',
        'booking.commitment': 'Commitment',
        'booking.perPerson': 'person',
        'booking.noResults.title': 'No restaurants found',
        'booking.noResults.subtitle': 'Try different filters or search terms',

        // Booking Modal
        'modal.booking.title': 'Complete Booking',
        'modal.booking.date': 'Date',
        'modal.booking.time': 'Time',
        'modal.booking.guests': 'Guests',
        'modal.booking.person': 'person',
        'modal.booking.people': 'people',
        'modal.booking.depositPerPerson': 'Deposit per person',
        'modal.booking.totalCommitment': 'Total commitment',
        'modal.booking.notice': 'The deposit will be automatically deducted from your final bill.',
        'modal.booking.warning': 'Only withheld if you don\'t show up or don\'t cancel at least 3 hours in advance.',
        'modal.booking.cta': 'Proceed to Payment',

        // Payment Modal
        'payment.title': 'Secure Payment',
        'payment.subtitle': 'Complete the deposit payment to confirm your reservation',
        'payment.summary': 'BOOKING SUMMARY',
        'payment.cardNumber': 'Card number',
        'payment.expiry': 'Expiry date',
        'payment.cvv': 'CVV',
        'payment.cardHolder': 'Cardholder name',
        'payment.cardHolderPlaceholder': 'As it appears on card',
        'payment.totalToPay': 'Total to pay',
        'payment.refundableDeposit': 'Bill-deductible deposit',
        'payment.cta': 'Pay',
        'payment.secure': '100% secure and encrypted payment',

        // Success Modal
        'success.title': 'Booking Confirmed!',
        'success.subtitle': 'Your table at {restaurant} is secured',
        'success.dateTime': 'Date and Time',
        'success.guests': 'Guests',
        'success.deposit': 'Deposit',
        'success.reminder': 'You will receive a reminder email 24h before your reservation',
        'success.close': 'Close',
        'success.viewReservation': 'View My Reservation',

        // User Dashboard
        'dashboard.greeting': 'Hello, {name}! 👋',
        'dashboard.upcomingReservations': 'You have {count} upcoming reservations',
        'dashboard.noReservations': 'No upcoming reservations',
        'dashboard.noReservationsSubtitle': 'Explore amazing restaurants and make your first booking!',
        'dashboard.title': 'My Dashboard',
        'dashboard.home': 'Home',
        'dashboard.myReservations': 'My Reservations',
        'dashboard.favorites': 'Favorites',
        'dashboard.settings': 'Settings',
        'dashboard.newReservation': '+ New Reservation',
        'dashboard.stats.totalReservations': 'Total Reservations',
        'dashboard.stats.thisYear': 'This year',
        'dashboard.stats.attendanceRate': 'Attendance Rate',
        'dashboard.stats.perfect': 'Perfect!',
        'dashboard.stats.depositsReturned': 'Deposits Deducted',
        'dashboard.stats.completedReservations': 'completed reservations',
        'dashboard.stats.favoriteRestaurants': 'Favorite Restaurants',
        'dashboard.stats.inYourList': 'In your list',
        'dashboard.upcomingReservations.title': 'Upcoming Reservations',
        'dashboard.allReservations.title': 'All My Reservations',
        'dashboard.favorites.title': 'My Favorite Restaurants',
        'dashboard.showQR': 'Show QR',
        'dashboard.modify': 'Modify',
        'dashboard.cancel': 'Cancel',
        'dashboard.confirmed': 'Confirmed',
        'dashboard.completed': 'Completed',

        // Restaurant Dashboard
        'restaurant.dashboard.title': 'Overview',
        'restaurant.dashboard.overview': 'Overview',
        'restaurant.dashboard.reservations': 'Reservations',
        'restaurant.dashboard.clients': 'Clients',
        'restaurant.dashboard.finance': 'Finance',
        'restaurant.dashboard.configuration': 'Settings',
        'restaurant.stats.todayReservations': 'Today\'s Reservations',
        'restaurant.stats.guaranteedIncome': 'Guaranteed Income',
        'restaurant.stats.guaranteed': 'guaranteed',
        'restaurant.stats.attendanceRate': 'Attendance Rate',
        'restaurant.stats.noShowsPrevented': 'No-Shows Prevented',
        'restaurant.stats.savings': 'Savings',
        'restaurant.upcomingReservations': 'Upcoming Reservations',
        'restaurant.viewAll': 'View all',
        'restaurant.quickActions': 'Quick Actions',
        'restaurant.blockTable': 'Block Table',
        'restaurant.createPromo': 'Create Promo',
        'restaurant.adjustSchedule': 'Adjust Schedule',
        'restaurant.viewTickets': 'View Tickets',

        // Auth
        'auth.login.title': 'Sign In',
        'auth.login.subtitle': 'Access your MesaSegura account',
        'auth.login.email': 'Email',
        'auth.login.password': 'Password',
        'auth.login.remember': 'Remember me',
        'auth.login.forgot': 'Forgot your password?',
        'auth.login.cta': 'Sign In',
        'auth.login.noAccount': 'Don\'t have an account?',
        'auth.login.signupLink': 'Sign up now',
        'auth.signup.title': 'Create Account',
        'auth.signup.subtitle': 'Join MesaSegura and start booking',
        'auth.signup.name': 'Full name',
        'auth.signup.phone': 'Phone',
        'auth.signup.confirmPassword': 'Confirm password',
        'auth.signup.accountType': 'Account type',
        'auth.signup.customer': 'Customer (book tables)',
        'auth.signup.restaurant': 'Restaurant (manage bookings)',
        'auth.signup.terms': 'I accept the terms and conditions and privacy policy',
        'auth.signup.cta': 'Create Account',
        'auth.signup.hasAccount': 'Already have an account?',
        'auth.signup.loginLink': 'Sign in',

        // Notifications
        'notification.reservationConfirmed': 'Booking confirmed at {restaurant}! 🎉',
        'notification.reservationCancelled': 'Reservation cancelled successfully. Your deposit will be fully refunded.',
        'notification.processing': 'Processing payment...',
        'notification.welcome': 'Welcome, {name}! 👋',
        'notification.accountCreated': 'Account created successfully! Welcome, {name}! 🎉',

        // Common
        'common.close': 'Close',
        'common.cancel': 'Cancel',
        'common.confirm': 'Confirm',
        'common.save': 'Save',
        'common.edit': 'Edit',
        'common.delete': 'Delete',
        'common.search': 'Search',
        'common.filter': 'Filter',
        'common.loading': 'Loading...',
        'common.error': 'Error',
        'common.success': 'Success',
        'common.today': 'Today',
        'common.yesterday': 'Yesterday',
        'common.tomorrow': 'Tomorrow',
        'common.supportNote': 'Official support available in Spanish only',
    },

    de: {
        // Brand
        'brand.name': 'MesaSegura',
        'brand.tagline': 'Ihr Tisch, immer gesichert',
        'brand.subtitle': 'Restaurant-Buchungsplattform mit von der Rechnung abziehbarer Anzahlung',

        // Navigation
        'nav.features': 'Funktionen',
        'nav.howItWorks': 'Wie es funktioniert',
        'nav.pricing': 'Preise',
        'nav.searchRestaurants': 'Restaurants suchen',
        'nav.login': 'Anmelden',
        'nav.signup': 'Registrieren',
        'nav.myAccount': 'Mein Konto',
        'nav.bookNow': 'Jetzt buchen',

        // Hero Section
        'hero.badge': 'Revolutionierung der Restaurantreservierungen',
        'hero.title.1': 'Ihr Tisch,',
        'hero.title.2': 'Immer',
        'hero.title.3': 'Gesichert',
        'hero.subtitle': 'Buchen Sie mit Vertrauen. Ein finanzielles Verpflichtungssystem, das sowohl Restaurants als auch Gästen zugute kommt.',
        'hero.cta.primary': 'Restaurants suchen',
        'hero.cta.secondary': 'Wie es funktioniert',
        'hero.stats.reduction': 'No-Show Reduzierung',
        'hero.stats.satisfaction': 'Kundenzufriedenheit',
        'hero.stats.restaurants': 'Aktive Restaurants',

        // Booking Page
        'booking.title': 'Restaurants in der Nähe',
        'booking.search.placeholder': 'Suche nach Restaurants, Küchen oder Gegenden...',
        'booking.filter.popular': '🔥 Beliebt',
        'booking.filter.japanese': '🍣 Japanisch',
        'booking.filter.italian': '🍝 Italienisch',
        'booking.filter.steakhouse': '🥩 Steakhouse',
        'booking.filter.vegan': '🌱 Vegan',
        'booking.filter.winery': '🍷 Weinbar',
        'booking.commitment': 'Verpflichtung',
        'booking.perPerson': 'Person',
        'booking.noResults.title': 'Keine Restaurants gefunden',
        'booking.noResults.subtitle': 'Versuchen Sie andere Filter oder Suchbegriffe',

        // Booking Modal
        'modal.booking.title': 'Buchung abschließen',
        'modal.booking.date': 'Datum',
        'modal.booking.time': 'Uhrzeit',
        'modal.booking.guests': 'Gäste',
        'modal.booking.person': 'Person',
        'modal.booking.people': 'Personen',
        'modal.booking.depositPerPerson': 'Anzahlung pro Person',
        'modal.booking.totalCommitment': 'Gesamtverpflichtung',
        'modal.booking.notice': 'Die Anzahlung wird automatisch von Ihrer Endabrechnung abgezogen.',
        'modal.booking.warning': 'Wird nur einbehalten, wenn Sie nicht erscheinen oder nicht mindestens 3 Stunden im Voraus absagen.',
        'modal.booking.cta': 'Zur Zahlung',

        // Notifications
        'notification.reservationConfirmed': 'Buchung bestätigt im {restaurant}! 🎉',
        'notification.reservationCancelled': 'Reservierung erfolgreich storniert. Ihre Anzahlung wird vollständig zurückerstattet.',
        'notification.processing': 'Zahlung wird verarbeitet...',
        'common.supportNote': 'Offizieller Support nur auf Spanisch verfügbar',
    },

    fr: {
        // Brand
        'brand.name': 'MesaSegura',
        'brand.tagline': 'Votre table, toujours sécurisée',
        'brand.subtitle': 'Plateforme de réservation de restaurants avec caution déductible de la facture',

        // Navigation
        'nav.features': 'Fonctionnalités',
        'nav.howItWorks': 'Comment ça marche',
        'nav.pricing': 'Tarifs',
        'nav.searchRestaurants': 'Chercher des restaurants',
        'nav.login': 'Connexion',
        'nav.signup': 'S\'inscrire',
        'nav.myAccount': 'Mon compte',
        'nav.bookNow': 'Réserver maintenant',

        // Hero Section
        'hero.badge': 'Révolutionner les réservations de restaurants',
        'hero.title.1': 'Votre Table,',
        'hero.title.2': 'Toujours',
        'hero.title.3': 'Sécurisée',
        'hero.subtitle': 'Réservez en toute confiance. Un système d\'engagement financier au bénéfice des restaurants et des convives.',
        'hero.cta.primary': 'Chercher des restaurants',
        'hero.cta.secondary': 'Comment ça marche',
        'hero.stats.reduction': 'Réduction des No-Shows',
        'hero.stats.satisfaction': 'Satisfaction client',
        'hero.stats.restaurants': 'Restaurants actifs',

        // Booking Page
        'booking.title': 'Restaurants à proximité',
        'booking.search.placeholder': 'Rechercher des restaurants, cuisines ou zones...',
        'booking.filter.popular': '🔥 Populaire',
        'booking.filter.japanese': '🍣 Japonais',
        'booking.filter.italian': '🍝 Italien',
        'booking.filter.steakhouse': '🥩 Grill',
        'booking.filter.vegan': '🌱 Végan',
        'booking.filter.winery': '🍷 Bar à vins',
        'booking.commitment': 'Engagement',
        'booking.perPerson': 'personne',
        'booking.noResults.title': 'Aucun restaurant trouvé',
        'booking.noResults.subtitle': 'Essayez d\'autres filtres ou termes de recherche',

        // Booking Modal
        'modal.booking.title': 'Compléter la réservation',
        'modal.booking.date': 'Date',
        'modal.booking.time': 'Heure',
        'modal.booking.guests': 'Personnes',
        'modal.booking.person': 'personne',
        'modal.booking.people': 'personnes',
        'modal.booking.depositPerPerson': 'Caution par personne',
        'modal.booking.totalCommitment': 'Engagement total',
        'modal.booking.notice': 'La caution sera automatiquement déduite de votre facture finale.',
        'modal.booking.warning': 'Retenue uniquement si vous ne vous présentez pas ou si vous n\'annulez pas au moins 3 heures à l\'avance.',
        'modal.booking.cta': 'Procéder au paiement',

        // Notifications
        'notification.reservationConfirmed': 'Réservation confirmée chez {restaurant} ! 🎉',
        'notification.reservationCancelled': 'Réservation annulée avec succès. Votre caution sera intégralement remboursée.',
        'notification.processing': 'Traitement du paiement...',
        'common.supportNote': 'Support officiel disponible en espagnol uniquement',
    }
};

// Function to detect browser language
function detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const shortLang = browserLang.split('-')[0].toLowerCase();

    // If browser matches supported languages, use it. Otherwise default to EN.
    if (Object.values(LANGUAGES).includes(shortLang)) return shortLang;
    return LANGUAGES.EN;
}

// Current language: Priority: 1. Previous selection (localStorage) 2. Browser detection
let currentLanguage = localStorage.getItem('language') || detectLanguage();

// Get translation
function t(key, replacements = {}) {
    let translation = TRANSLATIONS[currentLanguage][key] || key;

    // Replace placeholders like {name}, {restaurant}, etc.
    Object.keys(replacements).forEach(placeholder => {
        translation = translation.replace(`{${placeholder}}`, replacements[placeholder]);
    });

    return translation;
}

// Set language
function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) {
        console.error(`Language ${lang} not supported`);
        return;
    }

    currentLanguage = lang;
    localStorage.setItem('language', lang);

    // Update all translatable elements
    updatePageTranslations();

    // Dispatch event for other components to react
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));

    console.log(`✅ Language changed to: ${lang}`);
}

// Get current language
function getCurrentLanguage() {
    return currentLanguage;
}

// Update all elements with data-i18n attribute
function updatePageTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key);

        // Update based on element type
        if (element.tagName === 'INPUT' && element.placeholder !== undefined) {
            element.placeholder = translation;
        } else {
            element.textContent = translation;
        }
    });

    // Update brand name in logo
    document.querySelectorAll('.logo-text').forEach(element => {
        element.textContent = t('brand.name');
    });
}

// Create language switcher component
function createLanguageSwitcher() {
    const switcher = document.createElement('div');
    switcher.className = 'language-switcher';
    switcher.innerHTML = `
        <button class="lang-btn ${currentLanguage === LANGUAGES.ES ? 'active' : ''}" 
                onclick="setLanguage('${LANGUAGES.ES}')" 
                title="Español">
            🇪🇸
        </button>
        <button class="lang-btn ${currentLanguage === LANGUAGES.EN ? 'active' : ''}" 
                onclick="setLanguage('${LANGUAGES.EN}')" 
                title="English">
            🇬🇧
        </button>
        <button class="lang-btn ${currentLanguage === LANGUAGES.DE ? 'active' : ''}" 
                onclick="setLanguage('${LANGUAGES.DE}')" 
                title="Deutsch">
            🇩🇪
        </button>
        <button class="lang-btn ${currentLanguage === LANGUAGES.FR ? 'active' : ''}" 
                onclick="setLanguage('${LANGUAGES.FR}')" 
                title="Français">
            🇫🇷
        </button>
    `;

    return switcher;
}

// Add language switcher styles
function addLanguageSwitcherStyles() {
    if (document.getElementById('i18n-styles')) return;

    const style = document.createElement('style');
    style.id = 'i18n-styles';
    style.textContent = `
        .language-switcher {
            display: flex;
            gap: 0.5rem;
            align-items: center;
        }
        
        .lang-btn {
            background: var(--bg-card, #1a1a2e);
            border: 1px solid var(--border-color, #2a2a3e);
            color: var(--text-secondary, #9ca3af);
            padding: 0.5rem 0.75rem;
            border-radius: var(--radius-md, 8px);
            cursor: pointer;
            transition: all 0.2s;
            font-size: 0.875rem;
            font-weight: 500;
        }
        
        .lang-btn:hover {
            background: var(--bg-secondary, #16162a);
            color: var(--text-primary, #fff);
            border-color: var(--primary-500, #6366f1);
        }
        
        .lang-btn.active {
            background: var(--primary-500, #6366f1);
            color: white;
            border-color: var(--primary-500, #6366f1);
        }
        
        .lang-btn:active {
            transform: scale(0.95);
        }
    `;

    document.head.appendChild(style);
}

// Initialize i18n
function initI18n() {
    addLanguageSwitcherStyles();
    updatePageTranslations();

    // Add language switcher to desktop nav
    const navActions = document.querySelector('.nav-actions.desktop-only');
    if (navActions && !navActions.querySelector('.language-switcher')) {
        const switcher = createLanguageSwitcher();
        navActions.insertBefore(switcher, navActions.firstChild);
    }

    // Add language switcher to mobile menu
    const mobileLangSwitcher = document.getElementById('mobile-lang-switcher');
    if (mobileLangSwitcher && !mobileLangSwitcher.querySelector('.language-switcher')) {
        const switcher = createLanguageSwitcher();
        mobileLangSwitcher.appendChild(switcher);
    }

    // Add to dashboard top bar if exists
    const topActions = document.querySelector('.top-actions');
    if (topActions && !topActions.querySelector('.language-switcher')) {
        const switcher = createLanguageSwitcher();
        topActions.insertBefore(switcher, topActions.firstChild);
    }

    console.log('🌍 i18n initialized. Current language:', currentLanguage);
}

// Make functions globally available
window.t = t;
window.setLanguage = setLanguage;
window.getCurrentLanguage = getCurrentLanguage;
window.initI18n = initI18n;
window.LANGUAGES = LANGUAGES;

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
} else {
    initI18n();
}

console.log('🌍 i18n system loaded');
