// MesaSegura - Sistema de Reservas con Fianza Reembolsable
// Este archivo gestiona búsqueda, filtros y proceso de reserva

const restaurants = [
    {
        id: 1,
        name: "La Bella Vita",
        type: "Italiana • Centro",
        cuisine: "italiana",
        zone: "centro",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        deposit: 20,
        tags: ['popular', 'italiana'],
        tables: ["Terraza - T1", "Interior - M4", "Ventana - V2", "Privado - P1"]
    },
    {
        id: 2,
        name: "Sakura Sushi",
        type: "Japonesa • Norte",
        cuisine: "japonesa",
        zone: "norte",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        deposit: 30,
        tags: ['popular', 'japonesa'],
        tables: ["Barra - B1", "Barra - B2", "Mesa Tradicional - T1", "Mesa Tradicional - T2"]
    },
    {
        id: 3,
        name: "El Asador de Juan",
        type: "Carnes • Sur",
        cuisine: "asador",
        zone: "sur",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1544025162-d76690b68606?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        deposit: 25,
        tags: ['asador', 'carnes'],
        tables: ["Cerca de Brasa - B1", "Salón Principal - S5", "Salón Principal - S6"]
    },
    {
        id: 4,
        name: "Green Garden",
        type: "Vegano • Centro",
        cuisine: "vegano",
        zone: "centro",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1540914124281-342587941389?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        deposit: 15,
        tags: ['vegano', 'saludable'],
        tables: ["Jardín - J1", "Jardín - J2", "Interior - I1"]
    },
    {
        id: 5,
        name: "Le Petit Paris",
        type: "Francesa • Oeste",
        cuisine: "francesa",
        zone: "oeste",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1550966871-3ed3c6221741?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        deposit: 40,
        tags: ['popular', 'francesa', 'vinoteca'],
        tables: ["Bistró - B1", "Bistró - B2", "Zona Vinos - Z1"]
    },
    {
        id: 6,
        name: "Taco Loco",
        type: "Mexicana • Centro",
        cuisine: "mexicana",
        zone: "centro",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        deposit: 10,
        tags: ['mexicana'],
        tables: ["Mesa Alta - A1", "Mesa Alta - A2", "Interior - I5"]
    },
    {
        id: 7,
        name: "Vinoteca del Valle",
        type: "Vinoteca • Centro",
        cuisine: "vinoteca",
        zone: "centro",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        deposit: 35,
        tags: ['vinoteca', 'premium'],
        tables: ["Degustación - D1", "Degustación - D2", "Bodega - B1"]
    },
    {
        id: 8,
        name: "Pasta e Basta",
        type: "Italiana • Norte",
        cuisine: "italiana",
        zone: "norte",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        deposit: 18,
        tags: ['italiana'],
        tables: ["Interior - M1", "Interior - M2", "Terraza - T1"]
    },
    {
        id: 9,
        name: "El Rincón de la Abuela",
        type: "Española • Casco Antiguo",
        cuisine: "espanola",
        zone: "centro",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1515443961218-a51367888e4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        deposit: 25,
        tags: ['popular', 'espanola'],
        tables: ["Patio - P1", "Patio - P2", "Salón - S1", "Bodega - B1"]
    },
    {
        id: 10,
        name: "Gourmet Burger Lab",
        type: "Americana • Business District",
        cuisine: "americana",
        zone: "norte",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        deposit: 15,
        tags: ['americana', 'hamburguesas'],
        tables: ["Barra - B1", "Mesa Alta - A1", "Booth - B1", "Booth - B2"]
    },
    {
        id: 11,
        name: "Taj Mahal Spice",
        type: "India • Este",
        cuisine: "india",
        zone: "este",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1585937421612-70a008356f36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        deposit: 20,
        tags: ['india', 'exotica'],
        tables: ["Jardín - J1", "Interior - I1", "Interior - I2"]
    }
];

let currentFilter = 'popular';
let searchTerm = '';

document.addEventListener('DOMContentLoaded', () => {
    initializeBookingPage();
});

function initializeBookingPage() {
    // Render initial restaurants
    renderRestaurants(restaurants);

    // Setup search
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchTerm = e.target.value.toLowerCase();
            filterAndRenderRestaurants();
        });
    }

    // Setup filter tags
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Remove active from all
            filterTags.forEach(t => t.classList.remove('active'));
            // Add active to clicked
            tag.classList.add('active');

            // Get filter type from text
            const filterText = tag.textContent.toLowerCase();
            if (filterText.includes('popular')) currentFilter = 'popular';
            else if (filterText.includes('japonés') || filterText.includes('japones')) currentFilter = 'japonesa';
            else if (filterText.includes('italiano')) currentFilter = 'italiana';
            else if (filterText.includes('asador')) currentFilter = 'asador';
            else if (filterText.includes('vegano')) currentFilter = 'vegano';
            else if (filterText.includes('vinoteca')) currentFilter = 'vinoteca';

            filterAndRenderRestaurants();
        });
    });
}

function filterAndRenderRestaurants() {
    let filtered = restaurants;

    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(r =>
            r.name.toLowerCase().includes(searchTerm) ||
            r.type.toLowerCase().includes(searchTerm) ||
            r.cuisine.toLowerCase().includes(searchTerm)
        );
    }

    // Apply category filter
    if (currentFilter !== 'popular') {
        filtered = filtered.filter(r =>
            r.tags.includes(currentFilter) || r.cuisine === currentFilter
        );
    }

    renderRestaurants(filtered);
}

function renderRestaurants(restaurantList) {
    const grid = document.getElementById('restaurants-grid');

    if (restaurantList.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
                <h3 style="color: var(--text-secondary); margin-bottom: 0.5rem;">No se encontraron restaurantes</h3>
                <p style="color: var(--text-tertiary);">Intenta con otros filtros o términos de búsqueda</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = restaurantList.map(r => `
        <div class="restaurant-card" onclick="openBookingModal(${r.id})">
            <div class="res-img-container">
                <img src="${r.image}" alt="${r.name}" class="res-img" loading="lazy">
                <span class="res-badge">⭐ ${r.rating}</span>
            </div>
            <div class="res-content">
                <div class="res-header">
                    <h3 class="res-name">${r.name}</h3>
                </div>
                <div class="res-info">${r.type}</div>
                <div class="res-commitment">
                    <span>💳</span>
                    <span>Compromiso: <strong>€${r.deposit}/persona</strong></span>
                </div>
            </div>
        </div>
    `).join('');
}

window.openBookingModal = function (id) {
    const r = restaurants.find(x => x.id === id);
    const content = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <img src="${r.image}" style="width: 100%; height: 150px; object-fit: cover; border-radius: var(--radius-lg); margin-bottom: 1rem;">
            <h2 style="font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 0.5rem;">${r.name}</h2>
            <p style="color: var(--text-secondary);">${r.type} • ⭐ ${r.rating}</p>
        </div>
        
        <form onsubmit="handleBooking(event, ${r.id})" id="booking-form">
            <div class="form-group">
                <label class="form-label">Fecha</label>
                <input type="date" class="form-input" id="booking-date" required min="${getTodayDate()}">
            </div>
            <div class="form-group">
                <label class="form-label">Hora</label>
                <select class="form-input" id="booking-time" required>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00" selected>20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                    <option value="21:30">21:30</option>
                    <option value="22:00">22:00</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Personas</label>
                <select class="form-input" id="guests-${id}" onchange="updateTotal(${id}, ${r.deposit})" required>
                    <option value="1">1 persona</option>
                    <option value="2" selected>2 personas</option>
                    <option value="3">3 personas</option>
                    <option value="4">4 personas</option>
                    <option value="5">5 personas</option>
                    <option value="6">6 personas</option>
                    <option value="7">7 personas</option>
                    <option value="8">8 personas</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Elegir Mesa (Opcional)</label>
                <select class="form-input" id="table-selection">
                    <option value="">Cualquier mesa disponible</option>
                    ${r.tables.map(t => `<option value="${t}">${t}</option>`).join('')}
                </select>
            </div>

            <div style="background: var(--bg-card); padding: 1rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="color: var(--text-secondary);">Fianza por persona</span>
                    <span>€${r.deposit}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--text-primary); border-top: 1px solid var(--border-color); padding-top: 0.5rem; margin-bottom: 0.75rem;">
                    <span>Total fianza</span>
                    <span id="total-${id}">€${r.deposit * 2}</span>
                </div>
                <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); padding: 0.75rem; border-radius: var(--radius-md); margin-bottom: 0.5rem;">
                    <p style="font-size: 0.875rem; color: #22c55e; margin: 0; font-weight: 600;">
                        💰 La fianza se devuelve automáticamente después de tu comida
                    </p>
                </div>
                <p style="font-size: 0.75rem; color: var(--text-tertiary); margin: 0; text-align: center;">
                    Solo se retiene en caso de no asistencia sin cancelar con 24h de antelación
                </p>
            </div>

            <button type="submit" class="btn btn-primary btn-block btn-large">
                💳 Asegurar Mesa con Fianza
            </button>
        </form>
    `;
    createModal('Completar Reserva', content);
}

window.updateTotal = function (id, price) {
    const guests = document.getElementById(`guests-${id}`).value;
    document.getElementById(`total-${id}`).innerText = `€${guests * price}`;
}

window.handleBooking = function (e, restaurantId) {
    e.preventDefault();

    const restaurant = restaurants.find(r => r.id === restaurantId);
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;
    const guests = document.getElementById(`guests-${restaurantId}`).value;
    const totalDeposit = guests * restaurant.deposit;

    const table = document.getElementById('table-selection').value || 'Mesa asignada por local';

    closeModal();

    // Show payment modal
    showPaymentModal({
        restaurant: restaurant.name,
        date,
        time,
        guests,
        table,
        deposit: totalDeposit,
        restaurantId
    });
}

function showPaymentModal(bookingData) {
    const content = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, var(--primary-500), var(--primary-600)); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 1.5rem;">
                💳
            </div>
            <h2 style="font-family: var(--font-display); margin-bottom: 0.5rem;">Pago de Fianza</h2>
            <p style="color: var(--text-secondary);">La fianza se devolverá automáticamente después de tu comida</p>
        </div>

        <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
            <h3 style="font-size: 0.875rem; color: var(--text-tertiary); margin-bottom: 0.5rem;">RESUMEN DE RESERVA</h3>
            <div style="color: var(--text-primary); margin-bottom: 0.25rem;"><strong>${bookingData.restaurant}</strong></div>
            <div style="color: var(--text-secondary); font-size: 0.875rem;">
                📅 ${formatDate(bookingData.date)} • 🕐 ${bookingData.time} • 👥 ${bookingData.guests} personas<br>
                🪑 ${bookingData.table}
            </div>
        </div>

        <form onsubmit="processPayment(event, ${JSON.stringify(bookingData).replace(/"/g, '&quot;')})" id="payment-form">
            <div class="form-group">
                <label class="form-label">Número de tarjeta</label>
                <input type="text" class="form-input" placeholder="1234 5678 9012 3456" maxlength="19" 
                       oninput="formatCardNumber(this)" required>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                    <label class="form-label">Fecha exp.</label>
                    <input type="text" class="form-input" placeholder="MM/YY" maxlength="5" 
                           oninput="formatExpiry(this)" required>
                </div>
                <div class="form-group">
                    <label class="form-label">CVV</label>
                    <input type="text" class="form-input" placeholder="123" maxlength="3" 
                           pattern="[0-9]{3}" required>
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Nombre del titular</label>
                <input type="text" class="form-input" placeholder="Como aparece en la tarjeta" required>
            </div>

            <div style="background: linear-gradient(135deg, var(--primary-500), var(--primary-600)); color: white; padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1rem; text-align: center;">
                <div style="font-size: 0.875rem; opacity: 0.9; margin-bottom: 0.25rem;">Fianza temporal</div>
                <div style="font-size: 2rem; font-weight: 700;">€${bookingData.deposit}</div>
                <div style="font-size: 0.75rem; opacity: 0.9; margin-top: 0.25rem;">✅ Se devuelve después de comer</div>
            </div>

            <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); padding: 0.75rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
                <p style="font-size: 0.875rem; color: #22c55e; margin: 0; text-align: center;">
                    💰 <strong>100% reembolsable</strong> - El dinero vuelve a tu cuenta al finalizar
                </p>
            </div>

            <button type="submit" class="btn btn-primary btn-block btn-large">
                🔒 Pagar Fianza €${bookingData.deposit}
            </button>
            
            <p style="font-size: 0.75rem; color: var(--text-tertiary); text-align: center; margin-top: 1rem;">
                🔒 Pago 100% seguro y encriptado • Devolución automática
            </p>
        </form>
    `;

    createModal('Pago del Depósito', content);
}

window.processPayment = function (e, bookingDataStr) {
    e.preventDefault();

    // Parse booking data (it comes as string from HTML)
    const bookingData = typeof bookingDataStr === 'string' ?
        JSON.parse(bookingDataStr.replace(/&quot;/g, '"')) :
        bookingDataStr;

    // Simulate payment processing
    closeModal();
    showNotification('Procesando pago...', 'info');

    setTimeout(() => {
        // Save reservation
        const newRes = {
            id: Date.now(),
            name: 'Usuario Demo',
            restaurant: bookingData.restaurant,
            guests: parseInt(bookingData.guests),
            time: bookingData.time,
            date: bookingData.date,
            table: bookingData.table,
            deposit: bookingData.deposit,
            status: 'confirmed'
        };

        const existing = JSON.parse(localStorage.getItem('mesasegura_reservations') || '[]');
        existing.unshift(newRes);
        localStorage.setItem('mesasegura_reservations', JSON.stringify(existing));

        showNotification(`¡Reserva confirmada en ${bookingData.restaurant}! 🎉`, 'success');

        // Show success modal
        setTimeout(() => {
            showSuccessModal(newRes);
        }, 1500);

    }, 2000);
}

function showSuccessModal(reservation) {
    const content = `
        <div style="text-align: center;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2.5rem; animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                ✓
            </div>
            <h2 style="font-family: var(--font-display); margin-bottom: 0.5rem; color: var(--text-primary);">¡Reserva Confirmada!</h2>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                Tu mesa en <strong>${reservation.restaurant}</strong> está asegurada
            </p>

            <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem; text-align: left;">
                <div style="display: grid; grid-template-columns: auto 1fr; gap: 1rem; align-items: center;">
                    <div style="font-size: 1.5rem;">📅</div>
                    <div>
                        <div style="font-size: 0.75rem; color: var(--text-tertiary);">Fecha y Hora</div>
                        <div style="font-weight: 600; color: var(--text-primary);">${formatDate(reservation.date)} • ${reservation.time}</div>
                    </div>
                    
                    <div style="font-size: 1.5rem;">👥</div>
                    <div>
                        <div style="font-size: 0.75rem; color: var(--text-tertiary);">Personas</div>
                        <div style="font-weight: 600; color: var(--text-primary);">${reservation.guests} personas</div>
                    </div>
                    
                    <div style="font-size: 1.5rem;">🪑</div>
                    <div>
                        <div style="font-size: 0.75rem; color: var(--text-tertiary);">Mesa</div>
                        <div style="font-weight: 600; color: var(--text-primary);">${reservation.table}</div>
                    </div>
                    
                    <div style="font-size: 1.5rem;">💳</div>
                    <div>
                        <div style="font-size: 0.75rem; color: var(--text-tertiary);">Depósito</div>
                        <div style="font-weight: 600; color: var(--text-primary);">€${reservation.deposit}</div>
                    </div>
                </div>
            </div>

            <div style="background: rgba(99, 102, 241, 0.1); border: 1px solid var(--primary-500); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
                <p style="font-size: 0.875rem; color: var(--text-primary); margin: 0;">
                    💡 Recibirás un recordatorio por email 24h antes de tu reserva
                </p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                <button class="btn btn-outline" onclick="closeModal()">
                    Cerrar
                </button>
                <button class="btn btn-primary" onclick="window.location.href='user-dashboard.html'">
                    Ver Mi Reserva
                </button>
            </div>
        </div>
        
        <style>
            @keyframes scaleIn {
                from {
                    transform: scale(0);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }
        </style>
    `;

    createModal('', content);
}

// Helper functions
function formatCardNumber(input) {
    let value = input.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    input.value = formattedValue;
}

function formatExpiry(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    input.value = value;
}

function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return date.toLocaleDateString('es-ES', options);
}
