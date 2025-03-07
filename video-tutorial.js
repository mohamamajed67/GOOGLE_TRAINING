// JavaScript cho slide hướng dẫn video thêm thành viên và phân quyền

document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo hiệu ứng khi slide hiển thị
    initVideoTutorialSlide_v785();
    
    // Đảm bảo căn giữa trong reveal.js
    ensureTutorialCentering_v785();
});

// Khởi tạo các hiệu ứng và tính năng cho slide video tutorial
function initVideoTutorialSlide_v785() {
    // Sự kiện khi slide thay đổi trong reveal.js
    if (typeof Reveal !== 'undefined') {
        Reveal.addEventListener('slidechanged', function(event) {
            // Kiểm tra nếu là slide video tutorial
            if (event.currentSlide.classList.contains('video-tutorial-section_v785')) {
                // Đảm bảo slide được căn giữa
                ensureTutorialCentering_v785();
                
                // Kích hoạt hiệu ứng cho các phần tử
                animateNoteCards_v785();
                animatePlaceholder_v785();
                
                // Tự động phát video nếu đã có
                if (window.tutorialVideo_v785) {
                    setTimeout(function() {
                        playTutorialVideo_v785();
                    }, 1000);
                }
            }
        });
    }
}

// Đảm bảo căn giữa cho slide trong reveal.js
function ensureTutorialCentering_v785() {
    // Thêm lớp đặc biệt cho reveal container để đảm bảo căn giữa
    const revealEl = document.querySelector('.reveal');
    if (revealEl) {
        revealEl.style.display = 'flex';
        revealEl.style.alignItems = 'center';
        revealEl.style.justifyContent = 'center';
        
        // Đảm bảo các thẻ section nằm giữa
        const slides = document.querySelector('.reveal .slides');
        if (slides) {
            slides.style.width = '100%';
            slides.style.height = '100%';
            slides.style.display = 'flex';
            slides.style.alignItems = 'center';
            slides.style.justifyContent = 'center';
        }
    }
    
    // Đảm bảo video tutorial section được căn giữa
    const tutorialSection = document.querySelector('.video-tutorial-section_v785');
    if (tutorialSection) {
        tutorialSection.style.position = 'absolute';
        tutorialSection.style.left = '50%';
        tutorialSection.style.top = '50%';
        tutorialSection.style.transform = 'translate(-50%, -50%)';
        tutorialSection.style.margin = '0';
        tutorialSection.style.width = '100%';
        tutorialSection.style.height = '100%';
        tutorialSection.style.display = 'flex';
        tutorialSection.style.alignItems = 'center';
        tutorialSection.style.justifyContent = 'center';
    }
}

// Kích hoạt hiệu ứng cho các thẻ ghi chú
function animateNoteCards_v785() {
    const cards = document.querySelectorAll('.note-card_v785');
    cards.forEach((card, index) => {
        // Reset animation
        card.style.animation = 'none';
        card.offsetHeight; // Trigger reflow
        
        // Áp dụng lại animation với delay
        card.style.animation = 'fadeIn_v785 0.5s ease forwards';
        card.style.animationDelay = `${0.1 + index * 0.1}s`;
    });
}

// Hiệu ứng cho placeholder video
function animatePlaceholder_v785() {
    const placeholder = document.querySelector('.video-placeholder_v785');
    if (placeholder) {
        placeholder.style.opacity = '0';
        placeholder.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            placeholder.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
            placeholder.style.opacity = '1';
            placeholder.style.transform = 'scale(1)';
        }, 300);
    }
}

// Tạo hiệu ứng quét ánh sáng trên placeholder video
function createLightSweepEffect_v785() {
    const placeholder = document.querySelector('.video-placeholder_v785');
    if (placeholder) {
        // Tạo phần tử ánh sáng quét
        const lightSweep = document.createElement('div');
        lightSweep.className = 'light-sweep_v785';
        lightSweep.style.position = 'absolute';
        lightSweep.style.top = '0';
        lightSweep.style.left = '-100%';
        lightSweep.style.width = '50%';
        lightSweep.style.height = '100%';
        lightSweep.style.background = 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)';
        lightSweep.style.transform = 'skewX(-20deg)';
        lightSweep.style.zIndex = '1';
        lightSweep.style.animation = 'lightSweep_v785 5s infinite';
        
        // Thêm hiệu ứng ánh sáng quét vào placeholder
        placeholder.appendChild(lightSweep);
        
        // Thêm keyframe animation
        if (!document.querySelector('#lightSweepAnimation_v785')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'lightSweepAnimation_v785';
            styleSheet.textContent = `
                @keyframes lightSweep_v785 {
                    0% { left: -50%; }
                    100% { left: 150%; }
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }
}

// Hàm phát video tutorial
function playTutorialVideo_v785() {
    const video = window.tutorialVideo_v785;
    const placeholder = document.querySelector('.video-placeholder_v785');
    
    if (video && placeholder) {
        video.style.display = 'block';
        placeholder.style.display = 'none';
        
        // Nếu video đã được thêm vào, phát video
        if (video.play) {
            video.play().catch(error => {
                console.warn('Không thể tự động phát video:', error);
            });
        }
    }
}

// Hàm tạm dừng video tutorial
function pauseTutorialVideo_v785() {
    const video = window.tutorialVideo_v785;
    if (video && video.pause) {
        video.pause();
    }
}

// Hàm khởi chạy lại video tutorial
function restartTutorialVideo_v785() {
    const video = window.tutorialVideo_v785;
    if (video) {
        video.currentTime = 0;
        
        if (video.play) {
            video.play().catch(error => {
                console.warn('Không thể tự động phát video:', error);
            });
        }
        
        // Nếu video đang ẩn, hiển thị nó
        if (video.style.display === 'none') {
            video.style.display = 'block';
            document.querySelector('.video-placeholder_v785').style.display = 'none';
        }
    }
}

// Thiết lập video khi có sẵn hoặc được thêm vào sau
function setupTutorialVideo_v785(videoElement) {
    // Lưu tham chiếu toàn cục để các hàm khác có thể truy cập
    window.tutorialVideo_v785 = videoElement;
    
    // Hiển thị video và ẩn placeholder
    const placeholder = document.querySelector('.video-placeholder_v785');
    if (placeholder) {
        placeholder.style.display = 'none';
    }
    
    videoElement.style.display = 'block';
    videoElement.style.position = 'absolute';
    videoElement.style.top = '0';
    videoElement.style.left = '0';
    videoElement.style.width = '100%';
    videoElement.style.height = '100%';
    videoElement.style.borderRadius = '12px';
    
    // Sự kiện khi video kết thúc
    videoElement.addEventListener('ended', function() {
        // Hiển thị lại placeholder với nút restart
        if (placeholder) {
            placeholder.innerHTML = `
                <div class="placeholder-icon_v785">
                    <i class="fas fa-redo-alt"></i>
                </div>
                <p>Video đã kết thúc. Nhấp để xem lại.</p>
            `;
            placeholder.style.display = 'flex';
            placeholder.style.cursor = 'pointer';
            
            // Thêm sự kiện click để phát lại
            placeholder.addEventListener('click', function() {
                restartTutorialVideo_v785();
            });
        }
    });
    
    // Thêm vào container video
    const container = document.querySelector('.video-container_v785');
    if (container && !container.contains(videoElement)) {
        container.appendChild(videoElement);
    }
}

// Cách gắn video khi đã có (API sẽ được sử dụng bởi người dùng sau)
window.addTutorialVideo_v785 = function(videoUrl) {
    // Tạo phần tử video
    const videoElement = document.createElement('video');
    videoElement.id = 'member-permission-tutorial_v785';
    videoElement.controls = true;
    videoElement.innerHTML = `
        <source src="${videoUrl}" type="video/mp4">
        Trình duyệt của bạn không hỗ trợ thẻ video.
    `;
    
    // Thiết lập video
    setupTutorialVideo_v785(videoElement);
};

// Hoặc có thể sử dụng iframe từ YouTube/Vimeo
window.addTutorialIframe_v785 = function(embedUrl) {
    // Xóa placeholder
    const placeholder = document.querySelector('.video-placeholder_v785');
    if (placeholder) {
        placeholder.style.display = 'none';
    }
    
    // Tạo iframe
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.src = embedUrl;
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.borderRadius = '12px';
    
    // Thêm vào container
    const container = document.querySelector('.video-container_v785');
    if (container) {
        container.appendChild(iframe);
    }
};

// Khởi tạo hiệu ứng ánh sáng quét khi trang tải xong
document.addEventListener('DOMContentLoaded', function() {
    createLightSweepEffect_v785();
    
    // Xác định khi nào slide được hiển thị
    if (typeof Reveal !== 'undefined') {
        Reveal.addEventListener('ready', function(event) {
            if (event.currentSlide.classList.contains('video-tutorial-section_v785')) {
                initVideoTutorialSlide_v785();
                ensureTutorialCentering_v785();
            }
        });
    }
    
    // Thiết lập lại kích thước khi cửa sổ thay đổi
    window.addEventListener('resize', function() {
        const tutorialSection = document.querySelector('.video-tutorial-section_v785');
        if (tutorialSection && tutorialSection.classList.contains('present')) {
            ensureTutorialCentering_v785();
        }
    });
}); 