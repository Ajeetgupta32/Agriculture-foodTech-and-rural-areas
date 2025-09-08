// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initTabs();
    initWeather();
    initCalculators();
    initContactForm();
    initScrollEffects();
    initEquipmentRental();
    initStore();
    initOrganicFood();
    initExpertConsultation();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#fff';
            navbar.style.backdropFilter = 'none';
        }
    });
}

// Tab functionality for solutions section
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Weather functionality
function initWeather() {
    // Simulate weather data (in a real app, this would come from a weather API)
    const weatherData = {
        current: {
            temperature: 24,
            humidity: 65,
            wind: 12,
            rainfall: 0
        },
        forecast: [
            { day: 'Today', temp: 24, desc: 'Sunny', icon: 'fas fa-sun' },
            { day: 'Tomorrow', temp: 22, desc: 'Partly Cloudy', icon: 'fas fa-cloud-sun' },
            { day: 'Wed', temp: 20, desc: 'Rainy', icon: 'fas fa-cloud-rain' },
            { day: 'Thu', temp: 18, desc: 'Cloudy', icon: 'fas fa-cloud' },
            { day: 'Fri', temp: 25, desc: 'Sunny', icon: 'fas fa-sun' },
            { day: 'Sat', temp: 27, desc: 'Hot', icon: 'fas fa-thermometer-full' },
            { day: 'Sun', temp: 26, desc: 'Sunny', icon: 'fas fa-sun' }
        ]
    };

    // Update current weather
    document.getElementById('current-temp').textContent = weatherData.current.temperature + '°C';
    document.getElementById('current-humidity').textContent = weatherData.current.humidity + '%';
    document.getElementById('current-wind').textContent = weatherData.current.wind + ' km/h';
    document.getElementById('current-rain').textContent = weatherData.current.rainfall + ' mm';

    // Update forecast
    const forecastGrid = document.getElementById('forecast-grid');
    forecastGrid.innerHTML = '';
    
    weatherData.forecast.forEach(day => {
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="forecast-day">${day.day}</div>
            <i class="${day.icon}"></i>
            <div class="forecast-temp">${day.temp}°C</div>
            <div class="forecast-desc">${day.desc}</div>
        `;
        forecastGrid.appendChild(forecastItem);
    });
}

// Calculator functionality
function initCalculators() {
    const modal = document.getElementById('calculator-modal');
    const closeBtn = document.querySelector('.close');
    const calculatorContent = document.getElementById('calculator-content');

    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Calculator templates
    const calculators = {
        fertilizer: {
            title: 'Fertilizer Calculator',
            fields: [
                { name: 'fieldArea', label: 'Field Area (acres)', type: 'number', required: true },
                { name: 'soilType', label: 'Soil Type', type: 'select', options: ['Clay', 'Sandy', 'Loamy', 'Silty'], required: true },
                { name: 'cropType', label: 'Crop Type', type: 'select', options: ['Wheat', 'Corn', 'Rice', 'Soybean', 'Potato'], required: true },
                { name: 'currentNPK', label: 'Current N-P-K Level', type: 'text', placeholder: 'e.g., 10-10-10', required: true },
                { name: 'targetYield', label: 'Target Yield (tons/acre)', type: 'number', required: true }
            ],
            calculate: function(data) {
                const area = parseFloat(data.fieldArea) || 0;
                const yield = parseFloat(data.targetYield) || 0;
                const baseRate = 150; // kg per acre base rate
                const yieldMultiplier = yield * 20; // Additional based on target yield
                const totalFertilizer = (baseRate + yieldMultiplier) * area;
                
                return {
                    totalFertilizer: totalFertilizer.toFixed(2),
                    cost: (totalFertilizer * 0.8).toFixed(2), // $0.8 per kg
                    applicationRate: (totalFertilizer / area).toFixed(2)
                };
            }
        },
        irrigation: {
            title: 'Irrigation Planner',
            fields: [
                { name: 'fieldArea', label: 'Field Area (acres)', type: 'number', required: true },
                { name: 'cropType', label: 'Crop Type', type: 'select', options: ['Wheat', 'Corn', 'Rice', 'Soybean', 'Potato'], required: true },
                { name: 'growthStage', label: 'Growth Stage', type: 'select', options: ['Germination', 'Vegetative', 'Flowering', 'Fruiting', 'Maturity'], required: true },
                { name: 'soilMoisture', label: 'Current Soil Moisture (%)', type: 'number', required: true },
                { name: 'weatherCondition', label: 'Weather Condition', type: 'select', options: ['Hot & Dry', 'Moderate', 'Cool & Humid'], required: true }
            ],
            calculate: function(data) {
                const area = parseFloat(data.fieldArea) || 0;
                const moisture = parseFloat(data.soilMoisture) || 0;
                const baseWater = 0.5; // inches per acre
                const moistureFactor = Math.max(0, (50 - moisture) / 50); // More water if soil is dry
                const totalWater = baseWater * (1 + moistureFactor) * area;
                
                return {
                    totalWater: totalWater.toFixed(2),
                    frequency: moisture < 30 ? 'Daily' : moisture < 50 ? 'Every 2 days' : 'Every 3 days',
                    duration: Math.ceil(totalWater * 2).toString() + ' hours'
                };
            }
        },
        yield: {
            title: 'Yield Estimator',
            fields: [
                { name: 'fieldArea', label: 'Field Area (acres)', type: 'number', required: true },
                { name: 'cropType', label: 'Crop Type', type: 'select', options: ['Wheat', 'Corn', 'Rice', 'Soybean', 'Potato'], required: true },
                { name: 'plantingDate', label: 'Planting Date', type: 'date', required: true },
                { name: 'seedVariety', label: 'Seed Variety', type: 'select', options: ['High Yield', 'Drought Resistant', 'Disease Resistant', 'Standard'], required: true },
                { name: 'fertilizerApplied', label: 'Fertilizer Applied (kg)', type: 'number', required: true },
                { name: 'irrigationDays', label: 'Irrigation Days', type: 'number', required: true }
            ],
            calculate: function(data) {
                const area = parseFloat(data.fieldArea) || 0;
                const fertilizer = parseFloat(data.fertilizerApplied) || 0;
                const irrigation = parseFloat(data.irrigationDays) || 0;
                
                // Base yield per acre
                const baseYield = 2.5; // tons per acre
                const fertilizerBonus = (fertilizer / area) * 0.1; // Bonus based on fertilizer
                const irrigationBonus = (irrigation / 30) * 0.2; // Bonus based on irrigation
                const totalYield = (baseYield + fertilizerBonus + irrigationBonus) * area;
                
                return {
                    totalYield: totalYield.toFixed(2),
                    yieldPerAcre: (totalYield / area).toFixed(2),
                    estimatedRevenue: (totalYield * 200).toFixed(2) // $200 per ton
                };
            }
        },
        profit: {
            title: 'Profit Calculator',
            fields: [
                { name: 'fieldArea', label: 'Field Area (acres)', type: 'number', required: true },
                { name: 'cropType', label: 'Crop Type', type: 'select', options: ['Wheat', 'Corn', 'Rice', 'Soybean', 'Potato'], required: true },
                { name: 'expectedYield', label: 'Expected Yield (tons)', type: 'number', required: true },
                { name: 'marketPrice', label: 'Market Price ($/ton)', type: 'number', required: true },
                { name: 'seedCost', label: 'Seed Cost ($)', type: 'number', required: true },
                { name: 'fertilizerCost', label: 'Fertilizer Cost ($)', type: 'number', required: true },
                { name: 'laborCost', label: 'Labor Cost ($)', type: 'number', required: true },
                { name: 'equipmentCost', label: 'Equipment Cost ($)', type: 'number', required: true }
            ],
            calculate: function(data) {
                const yield = parseFloat(data.expectedYield) || 0;
                const price = parseFloat(data.marketPrice) || 0;
                const seedCost = parseFloat(data.seedCost) || 0;
                const fertilizerCost = parseFloat(data.fertilizerCost) || 0;
                const laborCost = parseFloat(data.laborCost) || 0;
                const equipmentCost = parseFloat(data.equipmentCost) || 0;
                
                const revenue = yield * price;
                const totalCosts = seedCost + fertilizerCost + laborCost + equipmentCost;
                const profit = revenue - totalCosts;
                const profitMargin = (profit / revenue) * 100;
                
                return {
                    revenue: revenue.toFixed(2),
                    totalCosts: totalCosts.toFixed(2),
                    profit: profit.toFixed(2),
                    profitMargin: profitMargin.toFixed(1)
                };
            }
        }
    };

    // Open calculator function
    window.openCalculator = function(calculatorType) {
        const calculator = calculators[calculatorType];
        if (!calculator) return;

        // Generate form HTML
        let formHTML = `
            <div class="calculator-form">
                <h3>${calculator.title}</h3>
                <form id="calculator-form">
        `;

        calculator.fields.forEach(field => {
            formHTML += `
                <div class="form-group">
                    <label for="${field.name}">${field.label}${field.required ? ' *' : ''}</label>
            `;
            
            if (field.type === 'select') {
                formHTML += `<select id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>`;
                formHTML += '<option value="">Select ' + field.label + '</option>';
                field.options.forEach(option => {
                    formHTML += `<option value="${option}">${option}</option>`;
                });
                formHTML += '</select>';
            } else {
                formHTML += `<input type="${field.type}" id="${field.name}" name="${field.name}" 
                    ${field.placeholder ? 'placeholder="' + field.placeholder + '"' : ''} 
                    ${field.required ? 'required' : ''}>`;
            }
            
            formHTML += '</div>';
        });

        formHTML += `
                    <button type="submit" class="btn btn-primary">Calculate</button>
                </form>
                <div id="calculator-result" class="calculator-result" style="display: none;"></div>
            </div>
        `;

        calculatorContent.innerHTML = formHTML;
        modal.style.display = 'block';

        // Add form submit event
        document.getElementById('calculator-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            const result = calculator.calculate(data);
            const resultDiv = document.getElementById('calculator-result');
            
            let resultHTML = '<h4>Calculation Results:</h4>';
            Object.entries(result).forEach(([key, value]) => {
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                resultHTML += `<p><strong>${label}:</strong> ${value}</p>`;
            });
            
            resultDiv.innerHTML = resultHTML;
            resultDiv.style.display = 'block';
        });
    };
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Scroll effects
function initScrollEffects() {
    // Smooth scroll for hero buttons
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.problem-card, .solution-item, .tool-card, .weather-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Utility functions
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.problem-card, .tool-card, .weather-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Equipment Rental functionality
function initEquipmentRental() {
    // Equipment search functionality
    window.searchEquipment = function() {
        const category = document.getElementById('equipment-category').value;
        const duration = document.getElementById('equipment-duration').value;
        const location = document.getElementById('equipment-location').value;
        
        // Filter equipment based on search criteria
        const equipmentCards = document.querySelectorAll('.equipment-card');
        equipmentCards.forEach(card => {
            let show = true;
            
            if (category && !card.querySelector('.equipment-category').textContent.toLowerCase().includes(category.toLowerCase())) {
                show = false;
            }
            
            if (show) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show search results message
        const visibleCards = document.querySelectorAll('.equipment-card[style*="block"]');
        if (visibleCards.length === 0) {
            alert('No equipment found matching your criteria. Please try different filters.');
        } else {
            alert(`Found ${visibleCards.length} equipment items matching your search.`);
        }
    };
    
    // Equipment rental booking
    window.rentEquipment = function(equipmentId) {
        const equipmentData = {
            'tractor-1': { name: 'John Deere 6120M Tractor', dailyRate: 150, weeklyRate: 800 },
            'planter-1': { name: 'Precision Planter 12-Row', dailyRate: 200, weeklyRate: 1000 },
            'harvester-1': { name: 'Combine Harvester', dailyRate: 300, weeklyRate: 1500 },
            'irrigation-1': { name: 'Center Pivot Irrigation', monthlyRate: 2000, seasonalRate: 5000 },
            'tiller-1': { name: 'Rotary Tiller', dailyRate: 80, weeklyRate: 400 },
            'sprayer-1': { name: 'Sprayer Boom', dailyRate: 120, weeklyRate: 600 }
        };
        
        const equipment = equipmentData[equipmentId];
        if (equipment) {
            const duration = prompt(`Select rental duration for ${equipment.name}:\n1. Daily\n2. Weekly\n3. Monthly\n4. Seasonal\n\nEnter your choice (1-4):`);
            
            let rate = 0;
            let period = '';
            
            switch(duration) {
                case '1':
                    rate = equipment.dailyRate;
                    period = 'Daily';
                    break;
                case '2':
                    rate = equipment.weeklyRate;
                    period = 'Weekly';
                    break;
                case '3':
                    rate = equipment.monthlyRate || equipment.dailyRate * 20;
                    period = 'Monthly';
                    break;
                case '4':
                    rate = equipment.seasonalRate || equipment.dailyRate * 60;
                    period = 'Seasonal';
                    break;
                default:
                    alert('Invalid selection. Please try again.');
                    return;
            }
            
            const days = prompt(`How many ${period.toLowerCase()} periods do you need?`);
            if (days && !isNaN(days) && days > 0) {
                const totalCost = rate * parseInt(days);
                const confirmBooking = confirm(`Booking Summary:\n\nEquipment: ${equipment.name}\nDuration: ${days} ${period.toLowerCase()} periods\nRate: $${rate}/${period.toLowerCase()}\nTotal Cost: $${totalCost}\n\nConfirm booking?`);
                
                if (confirmBooking) {
                    alert('Booking confirmed! You will receive a confirmation email shortly.');
                }
            }
        }
    };
}

// Store functionality
function initStore() {
    // Store category filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Add to cart functionality
    window.addToCart = function(productId) {
        const productData = {
            'fertilizer-1': { name: 'NPK 20-20-20 Fertilizer', price: 45.00 },
            'seeds-1': { name: 'Hybrid Corn Seeds', price: 120.00 },
            'pesticide-1': { name: 'Organic Pesticide', price: 25.00 },
            'tools-1': { name: 'Garden Tool Set', price: 85.00 },
            'compost-1': { name: 'Compost Organic', price: 35.00 },
            'irrigation-1': { name: 'Drip Irrigation Kit', price: 150.00 }
        };
        
        const product = productData[productId];
        if (product) {
            const quantity = prompt(`How many units of ${product.name} would you like to add to cart?\nPrice: $${product.price} each`);
            
            if (quantity && !isNaN(quantity) && quantity > 0) {
                const totalPrice = product.price * parseInt(quantity);
                const confirmAdd = confirm(`Add to Cart:\n\nProduct: ${product.name}\nQuantity: ${quantity}\nUnit Price: $${product.price}\nTotal: $${totalPrice.toFixed(2)}\n\nAdd to cart?`);
                
                if (confirmAdd) {
                    alert('Product added to cart successfully!');
                }
            }
        }
    };
}

// Organic Food functionality
function initOrganicFood() {
    // View category functionality
    window.viewCategory = function(category) {
        const categoryNames = {
            'vegetables': 'Organic Vegetables',
            'fruits': 'Organic Fruits',
            'grains': 'Organic Grains',
            'dairy': 'Organic Dairy & Eggs'
        };
        
        alert(`Browse ${categoryNames[category]} - This would open a detailed product listing page with filtering options.`);
    };
    
    // View producer functionality
    window.viewProducer = function(producerId) {
        const producerData = {
            'green-valley': { name: 'Green Valley Farm', specialty: 'Organic vegetables and herbs' },
            'sunrise-orchard': { name: 'Sunrise Orchard', specialty: 'Premium organic fruits and berries' },
            'meadow-dairy': { name: 'Meadow Dairy', specialty: 'Organic dairy products and free-range eggs' }
        };
        
        const producer = producerData[producerId];
        if (producer) {
            alert(`Viewing products from ${producer.name}\nSpecialty: ${producer.specialty}\n\nThis would open the producer's product catalog.`);
        }
    };
}

// Expert Consultation functionality
function initExpertConsultation() {
    // Book expert by category
    window.bookExpert = function(category) {
        const categoryNames = {
            'crop-science': 'Crop Science',
            'pest-management': 'Pest Management',
            'irrigation': 'Irrigation',
            'business': 'Business Planning'
        };
        
        alert(`Book ${categoryNames[category]} Consultation\n\nThis would open a booking form to schedule a consultation with an expert in this field.`);
    };
    
    // Book specific expert profile
    window.bookExpertProfile = function(expertId) {
        const expertData = {
            'sarah-johnson': { name: 'Dr. Sarah Johnson', specialty: 'Crop Science Specialist' },
            'michael-chen': { name: 'Michael Chen', specialty: 'Pest Management Expert' },
            'emily-rodriguez': { name: 'Dr. Emily Rodriguez', specialty: 'Irrigation Specialist' },
            'james-wilson': { name: 'James Wilson', specialty: 'Agricultural Business Consultant' }
        };
        
        const expert = expertData[expertId];
        if (expert) {
            const consultationType = prompt(`Book consultation with ${expert.name}\n${expert.specialty}\n\nSelect consultation type:\n1. Video Call ($75/hour)\n2. Phone Call ($50/hour)\n3. Farm Visit ($150/visit)\n4. Chat Support ($25/session)\n\nEnter your choice (1-4):`);
            
            if (consultationType && ['1', '2', '3', '4'].includes(consultationType)) {
                const types = ['Video Call', 'Phone Call', 'Farm Visit', 'Chat Support'];
                const prices = ['$75/hour', '$50/hour', '$150/visit', '$25/session'];
                
                alert(`Booking confirmed!\n\nExpert: ${expert.name}\nType: ${types[consultationType - 1]}\nRate: ${prices[consultationType - 1]}\n\nYou will receive a confirmation email with scheduling details.`);
            }
        }
    };
    
    // Book consultation by type
    window.bookConsultation = function(type) {
        const typeNames = {
            'video': 'Video Call',
            'phone': 'Phone Call',
            'visit': 'Farm Visit',
            'chat': 'Chat Support'
        };
        
        alert(`Book ${typeNames[type]} Consultation\n\nThis would open a form to select an available expert and schedule your ${typeNames[type].toLowerCase()}.`);
    };
}

// Add CSS animation for fade in effect
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(fadeInStyle);
