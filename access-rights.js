// JavaScript cho bảng phân cấp quyền truy cập
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo hiệu ứng khi slide hiển thị
    initAccessRightsTable();
    
    // Gọi trực tiếp hàm khởi tạo tab ngay khi trang tải
    initTabSystem();
    
    // Xử lý tình huống đặc biệt cho reveal.js
    ensureProperCentering();
});

// Đảm bảo căn giữa cho reveal.js
function ensureProperCentering() {
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
    
    // Đảm bảo access-rights-section được căn giữa
    const accessSection = document.querySelector('.access-rights-section');
    if (accessSection) {
        accessSection.style.position = 'absolute';
        accessSection.style.left = '50%';
        accessSection.style.top = '50%';
        accessSection.style.transform = 'translate(-50%, -50%)';
        accessSection.style.margin = '0';
        accessSection.style.width = '100%';
        accessSection.style.height = '100%';
        accessSection.style.display = 'flex';
        accessSection.style.alignItems = 'center';
        accessSection.style.justifyContent = 'center';
    }
}

// Khởi tạo hiệu ứng cho bảng quyền truy cập
function initAccessRightsTable() {
    // Sự kiện khi slide thay đổi
    Reveal.addEventListener('slidechanged', function(event) {
        // Kiểm tra nếu là slide quyền truy cập
        if (event.currentSlide.classList.contains('access-rights-section')) {
            // Đảm bảo slide được căn giữa
            ensureProperCentering();
            
            // Tạo hiệu ứng sao lấp lánh cho background
            createStarryEffect();
            
            // Khởi tạo hệ thống tab
            initTabSystem();
            
            // Kích hoạt hiệu ứng xuất hiện cho các thẻ vai trò
            animateRoleCards();
            
            // Kích hoạt hiệu ứng xuất hiện cho hàng
            animateTableRows();
            
            // Khởi tạo tooltips
            initTooltips();
            
            // Thêm hiệu ứng khi hover qua các hàng
            initTableRowHover();
            
            // Highlight các checkmark
            highlightCheckmarks();
        }
    });
}

// Tạo hiệu ứng ngẫu nhiên cho background sao
function createStarryEffect() {
    const starryBg = document.querySelector('.starry-bg');
    if (starryBg) {
        // Xóa các sao đã tạo trước đó để tránh trùng lặp
        const existingStars = starryBg.querySelectorAll('.random-star');
        existingStars.forEach(star => star.remove());
        
        // Tạo các ngôi sao ngẫu nhiên và thêm vào background
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'random-star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.width = `${Math.random() * 2 + 1}px`;
            star.style.height = star.style.width;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            star.style.animationDelay = `${Math.random() * 2}s`;
            star.style.position = 'absolute';
            star.style.backgroundColor = 'white';
            star.style.borderRadius = '50%';
            star.style.opacity = '0.7';
            star.style.animation = 'twinkling 3s infinite alternate';
            starryBg.appendChild(star);
        }
    }
}

// Khởi tạo hệ thống tab
function initTabSystem() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Mặc định hiển thị tab đầu tiên
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons[0].classList.add('active');
        tabContents[0].classList.add('active');
    }
    
    // Thêm event listener cho các tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class từ tất cả buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Thêm active class cho button được nhấp
            this.classList.add('active');
            
            // Lấy id của tab content cần hiển thị
            const tabId = this.getAttribute('data-tab');
            
            // Ẩn tất cả tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.animation = 'none';
                content.offsetHeight; // Trigger reflow
            });
            
            // Hiển thị tab content được chọn với hiệu ứng
            const selectedTab = document.getElementById(tabId);
            if (selectedTab) {
                selectedTab.classList.add('active');
                selectedTab.style.animation = 'fadeIn 0.5s ease forwards';
                
                // Kích hoạt lại các hiệu ứng cho tab mới hiển thị nếu các hàm tồn tại
                setTimeout(() => {
                    if (typeof animateTableRows === 'function') {
                        animateTableRows(selectedTab);
                    }
                    if (typeof highlightCheckmarks === 'function') {
                        highlightCheckmarks(selectedTab);
                    }
                }, 100);
            }
        });
    });
}

// Kích hoạt hiệu ứng xuất hiện cho các thẻ vai trò
function animateRoleCards() {
    const cards = document.querySelectorAll('.role-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + index * 150);
    });
}

// Kích hoạt hiệu ứng xuất hiện cho các hàng trong bảng
function animateTableRows(container = document) {
    const rows = container.querySelectorAll('.fade-in-row');
    rows.forEach((row, index) => {
        // Reset animation
        row.style.animation = 'none';
        row.offsetHeight; // Trigger reflow
        
        // Apply animation with delay
        row.style.animation = null;
        row.classList.add('fade-in-row');
    });
}

// Khởi tạo tooltips cho các chú thích
function initTooltips() {
    const tooltips = document.querySelectorAll('.permission-note');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            this.querySelector('.tooltip-text').style.visibility = 'visible';
            this.querySelector('.tooltip-text').style.opacity = '1';
            this.querySelector('.tooltip-text').style.transform = 'translateX(-50%) translateY(0)';
        });
        
        tooltip.addEventListener('mouseleave', function() {
            this.querySelector('.tooltip-text').style.visibility = 'hidden';
            this.querySelector('.tooltip-text').style.opacity = '0';
            this.querySelector('.tooltip-text').style.transform = 'translateX(-50%) translateY(10px)';
        });
    });
}

// Thêm hiệu ứng khi hover qua các hàng trong bảng
function initTableRowHover() {
    const rows = document.querySelectorAll('.access-rights-table tbody tr');
    rows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(66, 133, 244, 0.1)';
            this.style.transition = 'background-color 0.3s ease, transform 0.3s ease';
            this.style.transform = 'translateX(5px)';
            
            // Làm nổi bật các check mark trong hàng
            const checkmarks = this.querySelectorAll('.checkmark');
            checkmarks.forEach(check => {
                check.style.transform = 'scale(1.2)';
                check.style.transition = 'transform 0.3s ease';
            });
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.transform = 'translateX(0)';
            
            // Khôi phục các check mark
            const checkmarks = this.querySelectorAll('.checkmark');
            checkmarks.forEach(check => {
                check.style.transform = 'scale(1)';
            });
        });
    });
}

// Thêm hiệu ứng highlight cho các check mark
function highlightCheckmarks(container = document) {
    const checkmarks = container.querySelectorAll('.checkmark:not(.partial)');
    checkmarks.forEach(checkmark => {
        // Tạo hiệu ứng nhấp nháy nhẹ
        const glow = [
            { textShadow: '0 0 5px rgba(52, 168, 83, 0.5)' },
            { textShadow: '0 0 15px rgba(52, 168, 83, 0.8)' },
            { textShadow: '0 0 5px rgba(52, 168, 83, 0.5)' }
        ];
        
        const timing = {
            duration: 2000,
            iterations: Infinity
        };
        
        if (checkmark.animate) {
            checkmark.animate(glow, timing);
        }
    });
    
    // Hiệu ứng đặc biệt cho checkmark partial
    const partialCheckmarks = container.querySelectorAll('.checkmark.partial');
    partialCheckmarks.forEach(checkmark => {
        const partialGlow = [
            { textShadow: '0 0 5px rgba(251, 188, 5, 0.5)' },
            { textShadow: '0 0 15px rgba(251, 188, 5, 0.8)' },
            { textShadow: '0 0 5px rgba(251, 188, 5, 0.5)' }
        ];
        
        const timing = {
            duration: 2000,
            iterations: Infinity
        };
        
        if (checkmark.animate) {
            checkmark.animate(partialGlow, timing);
        }
    });
}

// Tạo hiệu ứng chuyển động cho các legend icons
function animateLegendItems() {
    const legendItems = document.querySelectorAll('.legend-item');
    legendItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 1000 + index * 100);
    });
}

// Gọi hàm khởi tạo khi slide quyền truy cập xuất hiện
Reveal.addEventListener('ready', function(event) {
    if (event.currentSlide.classList.contains('access-rights-section')) {
        initAccessRightsTable();
        ensureProperCentering();
    }
});

// Thêm xử lý khi thay đổi kích thước trình duyệt để đảm bảo vẫn căn giữa đúng
window.addEventListener('resize', function() {
    const accessSection = document.querySelector('.access-rights-section');
    if (accessSection && accessSection.classList.contains('present')) {
        ensureProperCentering();
    }
}); 