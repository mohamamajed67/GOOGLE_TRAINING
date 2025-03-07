// JavaScript para la sección de proceso (Slide 5)
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar cuando se carga el documento
    setTimeout(initProcessSection, 300);
});

// Función principal de inicialización
function initProcessSection() {
    console.log("Inicializando sección de proceso");
    
    // Obtener la sección de proceso
    const section = document.querySelector('.process-section');
    if (!section) {
        console.log("No se encontró la sección de proceso");
        return;
    }
    
    // Inicializar partículas
    createProcessParticles();
    
    // Inicializar navegación por pestañas
    initTabNavigation();
    
    // Inicializar controles de video
    initVideoControls();
    
    // Añadir efectos de hover a elementos interactivos
    addHoverEffects();
    
    // Inicializar efectos 3D para las tarjetas
    init3DEffects();
    
    // Añadir listener para cuando cambia la diapositiva actual
    addSlideChangeListener();
}

// Crear partículas para el fondo
function createProcessParticles() {
    const section = document.querySelector('.process-section');
    const particlesContainer = section.querySelector('.process-particles');
    
    if (!particlesContainer) {
        console.log("No se encontró el contenedor de partículas");
        return;
    }
    
    // Limpiar partículas existentes
    particlesContainer.innerHTML = '';
    
    // Colores que coinciden con el gradiente de fondo
    const particleColors = [
        'rgba(255, 255, 255, 0.5)',
        'rgba(150, 140, 190, 0.6)',
        'rgba(80, 120, 180, 0.5)',
        'rgba(100, 90, 150, 0.5)',
        'rgba(66, 133, 244, 0.6)',
        'rgba(52, 168, 83, 0.5)'
    ];
    
    // Crear partículas brillantes grandes (efecto estrella)
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle star';
        
        // Tamaño aleatorio
        const size = Math.random() * 4 + 2;
        
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
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle glow';
        
        // Tamaño aleatorio más grande
        const size = Math.random() * 30 + 20;
        
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
            opacity: ${Math.random() * 0.10 + 0.05};
            z-index: 0;
            transform: scale(${Math.random() * 0.5 + 0.8});
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Crear partículas normales (cantidad reducida)
    for (let i = 0; i < 20; i++) {
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
        const opacity = Math.random() * 0.2 + 0.1;
        
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
    if (!document.querySelector('#process-particle-animation')) {
        const style = document.createElement('style');
        style.id = 'process-particle-animation';
        style.textContent = `
            @keyframes particle-float {
                0% {
                    transform: translate(0, 0);
                }
                50% {
                    transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px);
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
                    transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(1.1);
                    filter: blur(${Math.random() * 20 + 15}px);
                }
            }
            
            @keyframes star-pulse {
                0%, 100% {
                    transform: scale(1);
                    opacity: ${Math.random() * 0.3 + 0.3};
                }
                50% {
                    transform: scale(1.3);
                    opacity: ${Math.random() * 0.5 + 0.5};
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Inicializar navegación por pestañas
function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase activa de todos los botones
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase activa al botón clickeado
            this.classList.add('active');
            
            // Obtener el tab a mostrar
            const tabId = this.getAttribute('data-tab');
            const tabContent = document.getElementById(`${tabId}-content`);
            
            // Ocultar todos los contenidos de pestañas
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Mostrar el contenido de la pestaña seleccionada
            if (tabContent) {
                tabContent.classList.add('active');
                
                // Reiniciar animaciones dentro de la pestaña
                resetTabAnimations(tabContent);
            }
        });
    });
}

// Reiniciar animaciones dentro de una pestaña
function resetTabAnimations(tabContent) {
    const animatedElements = tabContent.querySelectorAll('.float-in, .instruction-step, .role-card, .folder, .tip, .practice-card');
    
    animatedElements.forEach((element, index) => {
        // Guardar clases originales
        const originalClasses = element.className;
        
        // Quitar cualquier clase de animación
        element.className = originalClasses.replace(/float-in/g, '');
        element.style.opacity = '0';
        
        // Forzar reflow
        void element.offsetWidth;
        
        // Reintroducir animaciones con retardo escalonado
        setTimeout(() => {
            element.className = originalClasses;
            element.style.opacity = '';
            element.style.setProperty('--delay', `${0.1 + (index * 0.05)}s`);
        }, 50);
    });
}

// Inicializar controles de video
function initVideoControls() {
    const playBtn = document.querySelector('.play-btn');
    const pauseBtn = document.querySelector('.pause-btn');
    const restartBtn = document.querySelector('.restart-btn');
    const videoFallback = document.querySelector('.video-fallback');
    const videoElement = document.getElementById('demo-video');
    
    if (!playBtn || !pauseBtn || !restartBtn) return;
    
    // Ocultar botón de pausa inicialmente
    pauseBtn.style.display = 'none';
    
    // Play button
    playBtn.addEventListener('click', function() {
        if (videoElement) {
            videoElement.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'flex';
        }
        
        // Ocultar fallback si está presente
        if (videoFallback) {
            videoFallback.style.display = 'none';
        }
    });
    
    // Pause button
    pauseBtn.addEventListener('click', function() {
        if (videoElement) {
            videoElement.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            pauseBtn.style.display = 'none';
            playBtn.style.display = 'flex';
        }
    });
    
    // Restart button
    restartBtn.addEventListener('click', function() {
        if (videoElement) {
            videoElement.contentWindow.postMessage('{"event":"command","func":"seekTo","args":[0, true]}', '*');
            videoElement.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'flex';
        }
    });
    
    // Iniciar reproducción al hacer clic en la imagen de fallback
    if (videoFallback) {
        videoFallback.addEventListener('click', function() {
            if (videoElement) {
                videoElement.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                videoFallback.style.display = 'none';
                playBtn.style.display = 'none';
                pauseBtn.style.display = 'flex';
            }
        });
    }
}

// Añadir efectos de hover a elementos interactivos
function addHoverEffects() {
    // Efectos para los pasos de instrucción
    const steps = document.querySelectorAll('.instruction-step');
    steps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.background = 'rgba(255, 255, 255, 0.1)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.background = 'rgba(255, 255, 255, 0.05)';
        });
    });
    
    // Efectos para roles
    const roleCards = document.querySelectorAll('.role-card');
    roleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Efectos para carpetas
    const folders = document.querySelectorAll('.folder');
    folders.forEach(folder => {
        folder.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.1)';
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        folder.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
}

// Inicializar efectos 3D para las tarjetas
function init3DEffects() {
    const cards = document.querySelectorAll('.role-card, .practice-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            // Limitar rotación a ±5 grados
            const rotateX = deltaY * -3;
            const rotateY = deltaX * 3;
            
            // Aplicar transformación 3D
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
        });
        
        // Restablecer la transformación al salir
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Añadir listener para cuando cambia la diapositiva actual
function addSlideChangeListener() {
    if (typeof Reveal !== 'undefined') {
        const section = document.querySelector('.process-section');
        
        Reveal.addEventListener('slidechanged', function(event) {
            if (event.currentSlide === section) {
                console.log('Entrando a la sección de procesos - Reiniciando animaciones');
                
                // Reiniciar todo
                setTimeout(function() {
                    // Asegurarse de que la primera pestaña esté activa por defecto
                    const tabButtons = section.querySelectorAll('.tab-button');
                    const tabContents = section.querySelectorAll('.tab-content');
                    
                    tabButtons.forEach((btn, index) => {
                        if (index === 0) {
                            btn.classList.add('active');
                        } else {
                            btn.classList.remove('active');
                        }
                    });
                    
                    tabContents.forEach((content, index) => {
                        if (index === 0) {
                            content.classList.add('active');
                            resetTabAnimations(content);
                        } else {
                            content.classList.remove('active');
                        }
                    });
                    
                    // Recrear partículas
                    createProcessParticles();
                    
                }, 100);
            }
        });
    }
}

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', function() {
    // Recrear partículas cuando cambia el tamaño de la ventana
    setTimeout(createProcessParticles, 300);
}); 