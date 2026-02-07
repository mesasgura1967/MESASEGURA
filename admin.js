// MesaSegura Admin Logic
document.addEventListener('DOMContentLoaded', () => {
    updateAdminStats();
    loadGlobalActivity();
    renderRawData();
    renderRestaurantsTable();
});

function showAdminSection(section) {
    // Hide all
    ['overview', 'godmode', 'restaurants', 'bookings'].forEach(s => {
        const el = document.getElementById(`${s}-section`);
        if (el) el.style.display = 'none';
    });

    // Show selected
    document.getElementById(`${section}-section`).style.display = 'block';

    // Update title
    const titles = {
        overview: 'Vista Global del Sistema',
        godmode: 'Panel de Control Maestro (God Mode)',
        restaurants: 'Directorio de Restaurantes',
        bookings: 'Todas las Reservas del Sistema'
    };
    document.getElementById('section-title').textContent = titles[section];

    // Update links
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    event.target.closest('.sidebar-link').classList.add('active');

    // Special loads
    if (section === 'bookings') loadAllBookings();
}

function updateAdminStats() {
    const reservations = JSON.parse(localStorage.getItem('mesasegura_reservations') || '[]');

    // Calculate global deposits (active confirmed)
    const totalDeposits = reservations
        .filter(r => r.status === 'confirmed')
        .reduce((sum, r) => sum + (r.deposit || 0), 0);

    // Get current fixed restaurants (from booking-app.js data)
    const totalRestos = restaurants.length;

    // Prevented no-shows (confirmed + completed effectively saved it)
    const prevented = reservations.filter(r => r.status === 'completed' || r.status === 'confirmed').length;

    document.getElementById('global-deposits').textContent = `€${totalDeposits}`;
    document.getElementById('global-restaurants').textContent = totalRestos;
    document.getElementById('global-bookings').textContent = reservations.length;
    document.getElementById('global-prevented').textContent = prevented;
}

function loadGlobalActivity() {
    const reservations = JSON.parse(localStorage.getItem('mesasegura_reservations') || '[]');
    const container = document.getElementById('global-activity-list');

    if (reservations.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-tertiary); padding: 2rem;">No hay actividad reciente</p>';
        return;
    }

    // Show last 5
    const recent = reservations.slice(0, 5);

    container.innerHTML = recent.map(res => `
        <div class="reservation-item" style="border-left: 3px solid ${res.status === 'no-show' ? '#ef4444' : '#10b981'};">
            <div class="res-time">${res.time}</div>
            <div class="res-info">
                <div class="res-name">${res.restaurant}</div>
                <div class="res-meta">${res.guests} personas • ${res.date}</div>
            </div>
            <div class="res-status ${res.status === 'no-show' ? 'status-no-show' : 'status-confirmed'}">
                ${res.status.toUpperCase()}
            </div>
            <div class="res-commitment">€${res.deposit}</div>
        </div>
    `).join('');
}

function loadAllBookings() {
    const reservations = JSON.parse(localStorage.getItem('mesasegura_reservations') || '[]');
    const container = document.getElementById('full-bookings-list');

    container.innerHTML = reservations.map(res => `
        <div class="reservation-item">
            <div class="res-time">${res.date}</div>
            <div class="res-info">
                <div class="res-name">${res.restaurant}</div>
                <div class="res-meta">Cliente: ${res.name || 'Demo User'} • 🕐 ${res.time} • 👥 ${res.guests} pers.</div>
            </div>
            <div class="res-status ${res.status === 'no-show' ? 'status-no-show' : (res.status === 'completed' ? 'status-checked-in' : 'status-confirmed')}">
                ${res.status}
            </div>
            <div class="res-commitment">€${res.deposit}</div>
            <button class="action-btn" onclick="deleteBooking(${res.id})">🗑️</button>
        </div>
    `).join('');
}

function renderRestaurantsTable() {
    const container = document.getElementById('restaurants-table-body');

    container.innerHTML = restaurants.map(r => `
        <tr style="border-bottom: 1px solid var(--border-color); color: var(--text-secondary);">
            <td style="padding: 1rem; color: var(--text-primary); font-weight: 600;">${r.name}</td>
            <td style="padding: 1rem;">${r.zone.toUpperCase()}</td>
            <td style="padding: 1rem;">€${r.deposit}/persona</td>
            <td style="padding: 1rem;"><span class="res-status status-confirmed">ACTIVO</span></td>
            <td style="padding: 1rem;">
                <button class="action-btn">👁️</button>
            </td>
        </tr>
    `).join('');
}

function renderRawData() {
    const viewer = document.getElementById('raw-data-viewer');
    const data = {
        reservations: JSON.parse(localStorage.getItem('mesasegura_reservations') || '[]'),
        user: JSON.parse(localStorage.getItem('mesasegura_user') || 'null'),
        settings: 'Admin Mode Enabled'
    };
    viewer.textContent = JSON.stringify(data, null, 2);
}

// God Mode actions
function seedData() {
    seedDemoData(); // Reuses function from script.js
}

function nukeData() {
    nukeAllData(); // Reuses function from script.js
}

function deleteBooking(id) {
    if (confirm('¿Eliminar esta reserva del sistema?')) {
        const reservations = JSON.parse(localStorage.getItem('mesasegura_reservations') || '[]');
        const updated = reservations.filter(r => r.id !== id);
        localStorage.setItem('mesasegura_reservations', JSON.stringify(updated));
        showNotification('Reserva eliminada.', 'info');
        loadAllBookings();
        updateAdminStats();
    }
}
