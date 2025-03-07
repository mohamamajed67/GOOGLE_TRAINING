// JavaScript para la sección de ventajas (Slide 4)
document.addEventListener('DOMContentLoaded', function() {
    // Ejecutar inicialización inmediatamente
    setTimeout(initAdvantagesSection, 300);
});

// Función principal de inicialización
function initAdvantagesSection() {
    console.log("Inicializando sección de ventajas");
    
    // Obtener la sección de ventajas
    const section = document.querySelector('.advantages-section');
    if (!section) {
        console.log("No se encontró la sección de ventajas");
        return;
    }
    
    // Asegurar que todas las tarjetas estén visibles
    const cards = section.querySelectorAll('.advantage-card');
    cards.forEach((card, index) => {
        card.style.opacity = '1';
        
        // Efecto de entrada escalonada
        setTimeout(() => {
            card.classList.add('visible');
        }, 100 * (index + 1));
    });
    
    // Asegurar que el resumen sea visible
    const summary = section.querySelector('.advantages-summary');
    if (summary) {
        summary.style.opacity = '1';
        setTimeout(() => {
            summary.classList.add('visible');
        }, 100 * (cards.length + 1));
    }
    
    // Título con efecto de entrada
    const title = section.querySelector('.section-title');
    if (title) {
        setTimeout(() => {
            title.classList.add('visible');
        }, 100);
    }
    
    // Inicializar partículas
    createParticles();
    
    // Añadir efecto de movimiento 3D a las tarjetas
    addCard3DEffect();
    
    // Añadir efecto de seguimiento del cursor a las tarjetas
    addCardHoverEffects();
    
    // Añadir listener para reiniciar animaciones cuando se cambia de diapositiva
    addSlideChangeListener();
    
    // Añadir efecto de parallax al fondo
    addParallaxEffect();
    
    // Manejar cambios de tamaño de ventana
    handleResize();
}

function createParticles() {
    const section = document.querySelector('.advantages-section');
    const particlesContainer = section.querySelector('.advantages-particles');
    
    if (!particlesContainer) {
        console.log("No se encontró el contenedor de partículas");
        return;
    }
    
    // Limpiar partículas existentes si las hay
    particlesContainer.innerHTML = '';
    
    // Colores que coinciden con el gradiente de fondo
    const particleColors = [
        'rgba(255, 255, 255, 0.7)',
        'rgba(150, 140, 190, 0.6)',
        'rgba(80, 120, 180, 0.5)',
        'rgba(100, 90, 150, 0.5)',
        'rgba(66, 133, 244, 0.6)',
        'rgba(52, 168, 83, 0.5)'
    ];
    
    // Crear partículas brillantes grandes (efecto estrella)
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle star';
        
        // Tamaño aleatorio
        const size = Math.random() * 6 + 3;
        
        // Posición aleatoria
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Duración aleatoria
        const duration = Math.random() * 30 + 20;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            top: ${posY}%;
            left: ${posX}%;
            filter: blur(0.5px) drop-shadow(0 0 8px white);
            animation: star-pulse ${duration}s ease-in-out infinite;
            opacity: ${Math.random() * 0.3 + 0.5};
            z-index: 1;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Crear partículas brillantes (efecto nebulosa)
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle glow';
        
        // Tamaño aleatorio más grande
        const size = Math.random() * 40 + 20;
        
        // Posición aleatoria
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Duración aleatoria
        const duration = Math.random() * 50 + 30;
        
        // Color aleatorio
        const colorIndex = Math.floor(Math.random() * particleColors.length);
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${particleColors[colorIndex]};
            border-radius: 50%;
            top: ${posY}%;
            left: ${posX}%;
            filter: blur(${Math.random() * 15 + 10}px);
            animation: nebula-float ${duration}s ease-in-out infinite;
            opacity: ${Math.random() * 0.15 + 0.05};
            z-index: 0;
            transform: scale(${Math.random() * 0.5 + 0.8});
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Crear partículas normales (cantidad media)
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Tamaño aleatorio
        const size = Math.random() * 3 + 1;
        
        // Posición aleatoria
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Duración aleatoria
        const duration = Math.random() * 20 + 10;
        
        // Opacidad aleatoria
        const opacity = Math.random() * 0.3 + 0.2;
        
        // Color aleatorio
        const colorIndex = Math.floor(Math.random() * particleColors.length);
        const color = particleColors[colorIndex] || `rgba(255, 255, 255, ${opacity})`;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            top: ${posY}%;
            left: ${posX}%;
            animation: particle-float ${duration}s ease-in-out infinite;
            opacity: ${opacity};
            z-index: 1;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Añadir keyframes para la animación de las partículas
    if (!document.querySelector('#particle-animation')) {
        const style = document.createElement('style');
        style.id = 'particle-animation';
        style.textContent = `
            @keyframes particle-float {
                0% {
                    transform: translate(0, 0);
                }
                50% {
                    transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px);
                }
                100% {
                    transform: translate(0, 0);
                }
            }
            
            @keyframes nebula-float {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    filter: blur(${Math.random() * 15 + 10}px);
                }
                50% {
                    transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) scale(1.2);
                    filter: blur(${Math.random() * 20 + 15}px);
                }
            }
            
            @keyframes star-pulse {
                0%, 100% {
                    transform: scale(1);
                    opacity: ${Math.random() * 0.3 + 0.5};
                }
                50% {
                    transform: scale(1.5);
                    opacity: ${Math.random() * 0.5 + 0.7};
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function addCard3DEffect() {
    const cards = document.querySelectorAll('.advantage-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            // Calcular grados de rotación (limitado a ±10 grados)
            const rotateX = deltaY * -8;
            const rotateY = deltaX * 8;
            
            // Aplicar transformación 3D
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            
            // Ajustar la iluminación basada en la posición del ratón
            const shadowX = deltaX * 10;
            const shadowY = deltaY * 10;
            this.style.boxShadow = `
                ${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.2),
                0 10px 30px rgba(0, 0, 0, 0.15)
            `;
            
            // Mover el icono para un efecto de profundidad
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = `translateX(${deltaX * 10}px) translateY(${deltaY * 10}px) rotateY(${rotateY * 1.5}deg) rotateX(${rotateX * 1.5}deg)`;
            }
        });
        
        // Restablecer la transformación al salir
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'translateX(0) translateY(0) rotateY(0) rotateX(0)';
            }
        });
    });
}

function addCardHoverEffects() {
    const cards = document.querySelectorAll('.advantage-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            this.style.setProperty('--x', x + '%');
            this.style.setProperty('--y', y + '%');
        });
    });
}

function addParallaxEffect() {
    const section = document.querySelector('.advantages-section');
    const particles = section.querySelector('.advantages-particles');
    
    section.addEventListener('mousemove', function(e) {
        const speed = 0.05;
        const x = (window.innerWidth / 2 - e.pageX) * speed;
        const y = (window.innerHeight / 2 - e.pageY) * speed;
        
        particles.style.transform = `translate(${x}px, ${y}px)`;
    });
}

function addSlideChangeListener() {
    if (typeof Reveal !== 'undefined') {
        const section = document.querySelector('.advantages-section');
        
        Reveal.addEventListener('slidechanged', function(event) {
            if (event.currentSlide === section) {
                console.log('Entering Advantages Slide - Restarting animations');
                // Forzar reinicio completo
                setTimeout(function() {
                    resetAnimations();
                    createParticles();
                    // Asegurar visibilidad
                    const cards = section.querySelectorAll('.advantage-card');
                    cards.forEach(card => {
                        card.style.opacity = '1';
                    });
                    const summary = section.querySelector('.advantages-summary');
                    if (summary) {
                        summary.style.opacity = '1';
                    }
                }, 100);
            }
        });
    }
}

function resetAnimations() {
    const section = document.querySelector('.advantages-section');
    const animatedElements = section.querySelectorAll('.float-in');
    
    animatedElements.forEach(function(element) {
        // Guardar la animación original
        const originalAnimation = element.style.animation;
        
        // Resetear la animación
        element.style.animation = 'none';
        element.style.opacity = '0';
        
        // Forzar reflow
        void element.offsetWidth;
        
        // Reiniciar la animación
        setTimeout(function() {
            element.style.animation = originalAnimation || 'float-in 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards';
        }, 50);
        
        // Garantizar que el elemento sea visible después de la animación
        setTimeout(function() {
            element.style.opacity = '1';
        }, 1200);
    });
}

function handleResize() {
    window.addEventListener('resize', function() {
        // Re-crear partículas cuando cambia el tamaño de la ventana
        setTimeout(createParticles, 300);
    });
} 