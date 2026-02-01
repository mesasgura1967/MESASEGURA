// Dashboard Interactions
document.addEventListener('DOMContentLoaded', () => {
    console.log('Dashboard initialized');

    // Load reservations
    loadReservations();

    // Listen for storage changes (real-time sync)
    window.addEventListener('storage', (e) => {
        if (e.key === 'mesasegura_reservations') {
            loadReservations();
        }
    });

    // Animate stats numbers
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        stat.style.transform = 'scale(0.5)';
        stat.style.opacity = '0';
        stat.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

        setTimeout(() => {
            stat.style.transform = 'scale(1)';
            stat.style.opacity = '1';
        }, 300);
    });

    // Delegate event listeners for dynamically added buttons
    document.querySelector('.reservation-list').addEventListener('click', function (e) {
        if (e.target.closest('.check-in')) {
            const btn = e.target.closest('.check-in');
            const row = btn.closest('.reservation-item');
            const status = row.querySelector('.res-status');
            const resId = row.getAttribute('data-id');

            // Toggle check-in status
            if (status.classList.contains('status-confirmed')) {
                confirmRefund(resId, row, status, btn);
            }
        } else if (e.target.closest('.no-show')) {
            const btn = e.target.closest('.no-show');
            const row = btn.closest('.reservation-item');
            const resId = row.getAttribute('data-id');
            markAsNoShow(resId, row);
        }
    });
});

function loadReservations() {
    const listContainer = document.querySelector('.reservation-list');

    // Default mock data
    const defaultReservations = [
        { time: '19:30', name: 'Familia García', meta: '4 personas · Mesa 5', status: 'confirmed', deposit: '€40', id: 1 },
        { time: '20:00', name: 'Carlos Rodriguez', meta: '2 personas · Mesa 2', status: 'confirmed', deposit: '€20', id: 2 },
        { time: '20:30', name: 'Marta & Amigos', meta: '6 personas · Mesa 8', status: 'pending', deposit: 'Esperando pago', id: 3 },
    ];

    // Get new reservations from local storage (added via booking.html)
    const storedReservations = JSON.parse(localStorage.getItem('mesasegura_reservations') || '[]');

    // Combine and sort (newest first for demo purposes)
    const allReservations = [...storedReservations, ...defaultReservations];

    listContainer.innerHTML = allReservations.map(res => {
        // Handle different data structures between mock and stored
        const time = res.time || '20:00';
        const name = res.name || 'Cliente';
        const meta = res.meta || `${res.guests || 2} personas · ${res.table || 'Mesa X'}`;
        const deposit = res.deposit || '€20'; // Handle number or string

        let statusClass = 'status-confirmed';
        let statusText = 'Confirmado';
        let rowStyle = '';
        let btnIcon = '✅';

        if (res.status === 'completed' || res.status === 'checked-in') {
            statusClass = 'status-checked-in';
            statusText = 'Completado';
            rowStyle = 'background: rgba(16, 185, 129, 0.05);';
            btnIcon = '↩️';
        } else if (res.status === 'no-show') {
            statusClass = 'status-no-show';
            statusText = 'No Show';
            rowStyle = 'background: rgba(239, 68, 68, 0.05);';
            btnIcon = '🚫';
        } else if (res.status === 'pending') {
            statusClass = 'status-pending';
            statusText = 'Pendiente';
        }

        const displayDeposit = typeof deposit === 'number' ? `€${deposit}` : deposit;

        return `
        <div class="reservation-item" data-id="${res.id}" style="${rowStyle}">
            <div class="res-time">${time}</div>
            <div class="res-info">
                <div class="res-name">${name}</div>
                <div class="res-meta">${meta}</div>
            </div>
            <div class="res-status ${statusClass}">${statusText}</div>
            <div class="res-commitment">${displayDeposit}</div>
            <div class="res-actions">
                ${res.status === 'confirmed' ? `
                    <button class="action-btn check-in" title="Confirmar Asistencia (Descontar de Factura)">✅</button>
                    <button class="action-btn no-show" title="Marcar No-Show (Retener Fianza)">🚫</button>
                ` : ''}
                ${res.status === 'completed' ? `<span style="color: var(--success-500);">Descontado de Factura</span>` : ''}
                ${res.status === 'no-show' ? `<span style="color: var(--danger-500);">Fianza Retenida</span>` : ''}
            </div>
        </div>
        `;
    }).join('');
}

function createNewReservation() {
    // A simple prompt-based creation for now to keep it working without complex modals
    const name = prompt("Nombre del cliente:");
    if (!name) return;

    const guests = prompt("Número de personas:", "2");

    const newRes = {
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        name: name,
        meta: `${guests} personas · Mesa Asignada`,
        status: 'confirmed',
        deposit: `€${guests * 10} dep.`
    };

    // Add to DOM
    loadReservations(); // Re-render logic would need state management, but let's just append for simplicity in this step or reload

    // Better: Update localStorage and reload
    const stored = JSON.parse(localStorage.getItem('mesasegura_reservations') || '[]');
    stored.unshift(newRes);
    localStorage.setItem('mesasegura_reservations', JSON.stringify(stored));
    loadReservations();
}

function confirmRefund(id, row, statusEl, btn) {
    // In a real app, this would call an API (Stripe, etc.)
    showNotification('Confirmando asistencia para descuento en factura...', 'info');

    setTimeout(() => {
        // Update local state
        const stored = JSON.parse(localStorage.getItem('mesasegura_reservations') || '[]');
        const updated = stored.map(res => {
            if (res.id.toString() === id.toString()) {
                return { ...res, status: 'completed' };
            }
            return res;
        });
        localStorage.setItem('mesasegura_reservations', JSON.stringify(updated));

        // Update UI
        statusEl.classList.remove('status-confirmed');
        statusEl.classList.add('status-checked-in');
        statusEl.style.background = 'rgba(16, 185, 129, 0.1)';
        statusEl.style.color = '#10b981';
        statusEl.textContent = 'Completado';
        btn.innerHTML = '↩️';
        btn.title = 'Deshacer';
        row.style.background = 'rgba(16, 185, 129, 0.05)';

        showNotification('✅ Asistencia confirmada. La fianza debe descontarse de la factura.', 'success');
        showNotification('✅ Asistencia confirmada. Fianza devuelta al cliente.', 'success');
    }, 1500);
}

function markAsNoShow(id, row) {
    if (!confirm('¿Marcar como No-Show? Se retendrá la fianza al cliente.')) return;

    showNotification('Procesando No-Show...', 'info');

    setTimeout(() => {
        // Update local state
        const stored = JSON.parse(localStorage.getItem('mesasegura_reservations') || '[]');
        const updated = stored.map(res => {
            if (res.id.toString() === id.toString()) {
                return { ...res, status: 'no-show' };
            }
            return res;
        });
        localStorage.setItem('mesasegura_reservations', JSON.stringify(updated));

        loadReservations(); // Re-render to update UI

        showNotification('🚫 Cliente marcado como No-Show. Fianza retenida.', 'warning');
    }, 1000);
}
