// عندما يتم تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تأثير الكتابة التلقائية
    const typingText = document.querySelector('.typing-text');
    const texts = ['مبتكرة', 'فريدة', 'استثنائية', 'عصرية'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 100 : 150);
        }
    }
    
    if (typingText) {
        setTimeout(typeEffect, 1000);
    }
    
    // عداد الإحصائيات
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.textContent;
            
            const increment = target / speed;
            
            if (count < target) {
                counter.textContent = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.textContent = target;
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                }
            });
        });
        
        observer.observe(counter);
    });
    
    // فلترة المنتجات
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة النشط من جميع الأزرار
            filterBtns.forEach(b => b.classList.remove('active'));
            // إضافة النشط للزر المحدد
            this.classList.add('active');
            
            const filter = this.textContent;
            
            productCards.forEach(card => {
                const category = card.querySelector('.product-category').textContent;
                
                if (filter === 'الكل' || category.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // إضافة المنتجات إلى السلة
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    const notification = document.querySelector('.notification');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            let currentCount = parseInt(cartCount.textContent);
            cartCount.textContent = currentCount + 1;
            
            // إظهار الإشعار
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
            
            // تأثير الاهتزاز على زر السلة
            const cartBtn = document.querySelector('.cart-btn');
            cartBtn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartBtn.style.transform = 'scale(1)';
            }, 300);
        });
    });
    
    // زر العودة للأعلى
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // تأثير الظهور عند التمرير
    const revealElements = document.querySelectorAll('.product-card, .feature-card, .category-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        revealObserver.observe(el);
    });
    
    // تحميل المزيد من المنتجات
    const loadMoreBtn = document.querySelector('.load-more-btn');
    let currentProducts = 4;
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // محاكاة تحميل منتجات جديدة
            const loadingText = this.querySelector('span');
            const originalText = loadingText.textContent;
            
            loadingText.textContent = 'جاري التحميل...';
            this.disabled = true;
            
            setTimeout(() => {
                // هنا يمكن إضافة منطق لتحميل منتجات حقيقية
                loadingText.textContent = originalText;
                this.disabled = false;
                
                // إظهار إشعار
                notification.querySelector('span').textContent = 'تم تحميل المزيد من المنتجات';
                notification.classList.add('show');
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 2000);
            }, 1500);
        });
    }
    
    // تفعيل القائمة المتنقلة على الجوال
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.right = '0';
            navMenu.style.background = 'rgba(15, 23, 42, 0.95)';
            navMenu.style.backdropFilter = 'blur(10px)';
            navMenu.style.padding = '20px';
            navMenu.style.borderRadius = '20px';
            navMenu.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            navMenu.style.zIndex = '1000';
            navMenu.style.width = '200px';
        });
        
        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.style.display = 'none';
            }
        });
    }
    
    // تأثيرات خاصة للمنتجات عند التمرير عليها
    productCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});