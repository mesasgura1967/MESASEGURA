// User Dashboard Functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log('User Dashboard initialized');
    loadUpcomingReservations();
    loadFavorites();
    updateReservationCount();
    updateFinancialStats(); // Initial load

    // Listen for storage changes (real-time sync)
    window.addEventListener('storage', (e) => {
        if (e.key === 'mesasegura_reservations') {
            loadUpcomingReservations();
            loadAllReservations();
            updateReservationCount();
            updateFinancialStats(); // Sync update
        }
    });
});

function updateFinancialStats() {
    const reservations = getReservationsFromStorage();

    // Active: confirmed 
    const activeDeposit = reservations
        .filter(r => ['confirmed'].includes(r.status))
        .reduce((sum, r) => sum + (r.deposit || 0), 0);

    // Refunded: completed
    const refundedDeposit = reservations
        .filter(r => r.status === 'completed')
        .reduce((sum, r) => sum + (r.deposit || 0), 0);

    const activeEl = document.getElementById('stats-active-deposit');
    const refundedEl = document.getElementById('stats-refunded-text');

    if (activeEl) activeEl.textContent = '€' + activeDeposit;
    if (refundedEl) refundedEl.textContent = '€' + refundedDeposit + ' descontados de tus facturas';
}

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('[id$="-section"]').forEach(section => {
        section.style.display = 'none';
    });

    // Show selected section
    document.getElementById(`${sectionName}-section`).style.display = 'block';

    // Update active link
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.closest('.sidebar-link').classList.add('active');

    // Load content if needed
    if (sectionName === 'reservations') {
        loadAllReservations();
    }
}

function loadUpcomingReservations() {
    const container = document.getElementById('upcoming-reservations');
    const reservations = getReservationsFromStorage();

    // Filter upcoming reservations (mock logic - in real app would check actual dates)
    const upcoming = reservations.slice(0, 2);

    if (upcoming.length === 0) {
        container.innerHTML = `
            <div class="upcoming-reservation-card" style="text-align: center; padding: 3rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📅</div>
                <h3 style="color: var(--text-secondary);">No tienes reservas próximas</h3>
                <p style="color: var(--text-tertiary); margin-bottom: 1.5rem;">¡Explora restaurantes increíbles y haz tu primera reserva!</p>
                <button class="btn btn-primary" onclick="window.location.href='booking.html'">Buscar Restaurantes</button>
            </div>
        `;
        return;
    }

    container.innerHTML = upcoming.map(res => `
        <div class="upcoming-reservation-card">
            <div class="reservation-header">
                <div>
                    <div class="restaurant-name">${res.restaurant || 'Restaurante'}</div>
                    <div class="reservation-date">📅 Hoy, 30 Enero 2026</div>
                </div>
                <div class="res-status ${res.status === 'no-show' ? 'status-cancelled' : 'status-confirmed'}">
                    ${res.status === 'no-show' ? 'No Asistió' : (res.status === 'completed' ? 'Completada' : 'Confirmado')}
                </div>
            </div>

            <div class="reservation-details">
                <div class="detail-item">
                    <div class="detail-icon">🕐</div>
                    <div class="detail-text">
                        <span class="detail-label">Hora</span>
                        <span class="detail-value">${res.time || '20:00'}</span>
                    </div>
                </div>
                <div class="detail-item">
                    <div class="detail-icon">👥</div>
                    <div class="detail-text">
                        <span class="detail-label">Personas</span>
                        <span class="detail-value">${res.guests || 2} personas</span>
                    </div>
                </div>
                <div class="detail-item">
                    <div class="detail-icon">🪑</div>
                    <div class="detail-text">
                        <span class="detail-label">Mesa</span>
                        <span class="detail-value">${res.table || 'Asignada'}</span>
                    </div>
                </div>
                <div class="detail-item">
                    <div class="detail-icon">💳</div>
                    <div class="detail-text">
                        <span class="detail-label">Depósito</span>
                        <span class="detail-value" style="${res.status === 'no-show' ? 'color: var(--danger-500);' : ''}">
                            ${res.status === 'no-show' ? 'Retenido (No Show)' : '€' + (res.deposit || 20)}
                        </span>
                    </div>
                </div>
            </div>

            <div class="reservation-actions">
                <button class="qr-code-btn" onclick="showQRCode('${res.restaurant}')">
                    <span>📱</span>
                    <span>Ver QR</span>
                </button>
                <button class="btn btn-outline" onclick="modifyReservation(${res.id})">
                    ✏️ Modificar
                </button>
                <button class="btn btn-outline" style="color: var(--danger-500); border-color: var(--danger-500);" onclick="cancelReservation(${res.id})">
                    ❌ Cancelar
                </button>
            </div>
        </div>
    `).join('');
}

function loadAllReservations() {
    const container = document.getElementById('all-reservations');
    const reservations = getReservationsFromStorage();

    container.innerHTML = reservations.map(res => `
        <div class="upcoming-reservation-card">
            <div class="reservation-header">
                <div>
                    <div class="restaurant-name">${res.restaurant || 'Restaurante'}</div>
                    <div class="reservation-date">📅 30 Enero 2026 • ${res.time || '20:00'}</div>
                </div>
                <div class="res-status ${res.status === 'no-show' ? 'status-cancelled' : (res.status === 'completed' ? 'status-checked-in' : 'status-confirmed')}">
                    ${res.status === 'no-show' ? 'No Asistió' : (res.status === 'completed' ? 'Completada' : 'Confirmada')}
                </div>
            </div>
            <p style="color: var(--text-secondary); margin-top: 0.5rem;">
                ${res.guests || 2} personas • Mesa: ${res.table || 'Asignada'} • 
                <span style="${res.status === 'no-show' ? 'color: var(--danger-500); font-weight: bold;' : ''}">
                    ${res.status === 'no-show' ? 'Fianza Retenida' : 'Depósito: €' + (res.deposit || 20)}
                </span>
            </p>
        </div>
    `).join('');
}

function loadFavorites() {
    const grid = document.getElementById('favorites-grid');

    const favorites = [
        {
            id: 1,
            name: 'La Bella Vita',
            type: 'Italiana',
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop'
        },
        {
            id: 2,
            name: 'Sakura Sushi',
            type: 'Japonesa',
            image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=400&h=300&fit=crop'
        },
        {
            id: 3,
            name: 'El Asador de Juan',
            type: 'Carnes',
            image: 'https://images.unsplash.com/photo-1544025162-d76690b68606?w=400&h=300&fit=crop'
        },
        {
            id: 4,
            name: 'Green Garden',
            type: 'Vegano',
            image: 'https://images.unsplash.com/photo-1540914124281-342587941389?w=400&h=300&fit=crop'
        },
        {
            id: 5,
            name: 'Le Petit Paris',
            type: 'Francesa',
            image: 'https://images.unsplash.com/photo-1550966871-3ed3c6221741?w=400&h=300&fit=crop'
        }
    ];

    grid.innerHTML = favorites.map(fav => `
        <div class="favorite-card" onclick="window.location.href='booking.html'">
            <img src="${fav.image}" alt="${fav.name}" class="favorite-img">
            <div class="favorite-content">
                <div class="favorite-name">${fav.name}</div>
                <div class="favorite-type">${fav.type}</div>
            </div>
        </div>
    `).join('');
}

function getReservationsFromStorage() {
    const stored = JSON.parse(localStorage.getItem('mesasegura_reservations') || '[]');

    // If no reservations, create some mock ones
    if (stored.length === 0) {
        return [
            {
                id: 1,
                restaurant: 'La Bella Vita',
                time: '20:30',
                guests: 4,
                table: 'Terraza - T1',
                deposit: 80,
                status: 'confirmed'
            },
            {
                id: 2,
                restaurant: 'Sakura Sushi',
                time: '21:00',
                guests: 2,
                table: 'Barra - B1',
                deposit: 60,
                status: 'confirmed'
            }
        ];
    }

    return stored;
}

function updateReservationCount() {
    const count = getReservationsFromStorage().length;
    const badge = document.getElementById('reservations-count');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
}

function showQRCode(restaurantName) {
    const qrContent = `
        <div style="text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">
                <svg width="200" height="200" style="background: white; padding: 1rem; border-radius: var(--radius-lg);">
                    <rect width="200" height="200" fill="white"/>
                    <pattern id="qr-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <rect width="10" height="10" fill="black"/>
                    </pattern>
                    <rect width="200" height="200" fill="url(#qr-pattern)"/>
                    <text x="100" y="100" text-anchor="middle" fill="var(--primary-500)" font-size="16" font-weight="bold">QR</text>
                </svg>
            </div>
            <h3 style="margin-bottom: 0.5rem;">Código QR de Reserva</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
                Muestra este código al llegar a ${restaurantName}
            </p>
            <p style="font-size: 0.875rem; color: var(--text-tertiary);">
                Código: #${Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
        </div>
    `;

    createModal('Tu Código QR', qrContent);
}

function modifyReservation(id) {
    showNotification('Función de modificación próximamente disponible', 'info');
}

function cancelReservation(id) {
    const confirmCancel = confirm('¿Estás seguro de que quieres cancelar esta reserva? El depósito será devuelto.');

    if (confirmCancel) {
        const reservations = getReservationsFromStorage();
        const filteredReservations = reservations.filter(r => r.id !== id);
        localStorage.setItem('mesasegura_reservations', JSON.stringify(filteredReservations));

        showNotification('Reserva cancelada correctamente. Tu depósito será devuelto íntegramente.', 'success');
        loadUpcomingReservations();
        updateReservationCount();
    }
}
