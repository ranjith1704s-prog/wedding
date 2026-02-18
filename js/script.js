$(document).ready(function() {
    
    // ============================================
    // LOADING ANIMATION
    // ============================================
    setTimeout(function() {
        $('.loading-overlay').addClass('fade-out');
    }, 1500);

    // ============================================
    // SAKURA PETALS ANIMATION
    // ============================================
    function createSakuraPetals() {
        const container = $('#sakuraContainer');
        const petalCount = 40;
        
        container.empty();
        
        for (let i = 0; i < petalCount; i++) {
            const petal = $('<div class="petal"></div>');
            
            const size = Math.floor(Math.random() * 22) + 8;
            const left = Math.random() * 100;
            const animationDuration = (Math.random() * 7 + 5).toFixed(2);
            const animationDelay = (Math.random() * 4).toFixed(2);
            const rotateStart = Math.random() * 360;
            const opacity = (Math.random() * 0.5 + 0.2).toFixed(2);
            
            // Purple shades
            const hue = Math.floor(Math.random() * 60 + 260);
            const saturation = Math.floor(Math.random() * 30 + 60);
            const lightness = Math.floor(Math.random() * 30 + 60);
            
            petal.css({
                'width': size + 'px',
                'height': size * 0.8 + 'px',
                'left': left + '%',
                'animation-duration': animationDuration + 's',
                'animation-delay': animationDelay + 's',
                'transform': `rotate(${rotateStart}deg)`,
                'background': `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`,
                'box-shadow': `0 5px 10px rgba(94, 58, 107, 0.2)`
            });
            
            container.append(petal);
        }
    }
    
    createSakuraPetals();
    
    $(window).on('resize', function() {
        createSakuraPetals();
    });

    // ============================================
    // MUSIC PLAYER - AUTO PLAY ON PAGE LOAD
    // ============================================
    const music = document.getElementById('weddingMusic');
    const $musicToggle = $('#musicToggle');
    const $unmuteIcon = $('#unmuteIcon');
    const $muteIcon = $('#muteIcon');
    
    // Preload and attempt to autoplay
    music.load();
    
    // Function to play music
    function playMusic() {
        music.play()
            .then(() => {
                console.log("Music playing automatically");
                $unmuteIcon.hide();
                $muteIcon.show();
                $musicToggle.addClass('playing');
            })
            .catch(error => {
                console.log("Auto-play failed:", error);
                // If autoplay fails, show unmute icon and wait for user interaction
                $unmuteIcon.show();
                $muteIcon.hide();
            });
    }
    
    // Function to pause/mute music
    function pauseMusic() {
        music.pause();
        $unmuteIcon.show();
        $muteIcon.hide();
        $musicToggle.removeClass('playing');
    }
    
    // Attempt to autoplay when page loads
    $(window).on('load', function() {
        setTimeout(function() {
            playMusic();
        }, 1000); // Small delay to ensure DOM is ready
    });
    
    // Also try to play on first user interaction as fallback
    $(document).one('click touchstart', function() {
        if (music.paused) {
            playMusic();
        }
    });
    
    // Toggle music on button click
    $musicToggle.on('click', function(e) {
        e.stopPropagation();
        if (music.paused) {
            playMusic();
        } else {
            pauseMusic();
        }
    });
    
    // Handle music ended
    music.addEventListener('ended', function() {
        $unmuteIcon.show();
        $muteIcon.hide();
        $musicToggle.removeClass('playing');
    });

    // ============================================
    // COUNTDOWN TIMER
    // ============================================
    function updateCountdown() {
        const weddingDate = new Date('June 17, 2026 17:30:00').getTime();
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        const $days = $('#days');
        const $hours = $('#hours');
        const $minutes = $('#minutes');
        const $seconds = $('#seconds');
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            updateNumber($days, days);
            updateNumber($hours, hours);
            updateNumber($minutes, minutes);
            updateNumber($seconds, seconds);
        } else {
            $('.countdown-container').html(`
                <div class="wedding-day-message">
                    <i class="fas fa-heart"></i>
                    <h3>Today is the day!</h3>
                    <p>We can't wait to celebrate with you!</p>
                </div>
            `);
        }
    }
    
    function updateNumber($element, newValue) {
        const currentValue = parseInt($element.text());
        if (currentValue !== newValue) {
            $element.css('transform', 'scale(1.2)');
            setTimeout(() => {
                $element.text(newValue.toString().padStart(2, '0'));
                $element.css('transform', 'scale(1)');
            }, 150);
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ============================================
    // DOWNLOAD INVITATION
    // ============================================
    $('#downloadInvite').on('click', function(e) {
        e.preventDefault();
        
        const invitationHTML = `
            <html>
            <head>
                <title>Sarah & Michael Wedding Invitation</title>
                <style>
                    body { font-family: 'Georgia', serif; padding: 40px; background: #f5f0ff; }
                    .invitation { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(94,58,107,0.1); }
                    h1 { color: #9b6b9e; font-size: 36px; text-align: center; font-family: 'Great Vibes', cursive; }
                    .date { color: #5e3a6b; font-size: 24px; text-align: center; }
                    .venue { color: #4a4a4a; text-align: center; }
                </style>
            </head>
            <body>
                <div class="invitation">
                    <h1>Sarah & Michael</h1>
                    <p style="text-align: center; font-size: 18px;">are getting married!</p>
                    <div class="date">June 15, 2024 at 5:30 PM</div>
                    <div class="venue">Grand Garden, Chicago</div>
                    <p style="text-align: center; margin-top: 30px;">Dinner & Dancing to follow</p>
                    <p style="text-align: center; margin-top: 40px;">Kindly RSVP by May 15, 2024</p>
                    <p style="text-align: center;">+1 (555) 123-4567 | rsvp@sarahandmichael.com</p>
                    <div style="text-align: center; margin-top: 30px;">
                        <img src="https://maps.googleapis.com/maps/api/staticmap?center=Grand+Garden+Chicago&zoom=14&size=400x200&key=YOUR_API_KEY" alt="Map" style="max-width:100%; border-radius:10px;">
                    </div>
                </div>
            </body>
            </html>
        `;
        
        const blob = new Blob([invitationHTML], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Sarah_Michael_Wedding_Invitation.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        alert('✨ Invitation downloaded successfully! ✨');
    });

    // ============================================
    // ADD TO CALENDAR
    // ============================================
    $('#addToCalendar').on('click', function(e) {
        e.preventDefault();
        
        const event = {
            title: "Sarah & Michael's Wedding",
            description: "Join us in celebrating the wedding of Sarah and Michael! Dinner and dancing to follow.",
            location: "Grand Garden, Chicago, IL",
            startDate: "20240615T173000",
            endDate: "20240615T233000"
        };
        
        const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&dates=${event.startDate}/${event.endDate}`;
        
        window.open(googleCalendarUrl, '_blank');
    });

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    $('a[href*="#"]').on('click', function(e) {
        if (this.hash !== '' && this.hash !== '#') {
            e.preventDefault();
            
            const hash = this.hash;
            const target = $(hash);
            
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 50
                }, 800, 'swing');
            }
        }
    });

    // ============================================
    // CONSOLE WELCOME MESSAGE
    // ============================================
    console.log('%c💍 Sarah & Michael 💍', 'font-size: 24px; color: #9b6b9e; font-weight: bold; font-family: "Great Vibes", cursive;');
    console.log('%cJune 15, 2024 | 5:30 PM', 'font-size: 16px; color: #5e3a6b;');
    console.log('%cGrand Garden, Chicago', 'font-size: 14px; color: #7a6a7d;');
    console.log('%c🎵 Music is playing automatically!', 'font-size: 14px; color: #9b6b9e; font-style: italic;');

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    function checkScroll() {
        const windowHeight = $(window).height();
        const scrollTop = $(window).scrollTop();
        
        $('.countdown-item, .detail-item, .btn, .contact-card, .social-link, .map-container').each(function() {
            const elementTop = $(this).offset().top;
            
            if (scrollTop + windowHeight > elementTop + 100) {
                $(this).css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }
        });
    }
    
    $('.countdown-item, .detail-item, .btn, .contact-card, .social-link, .map-container').css({
        'opacity': '0',
        'transform': 'translateY(30px)',
        'transition': 'all 0.6s ease'
    });
    
    $(window).on('scroll', function() {
        checkScroll();
    });
    
    setTimeout(checkScroll, 500);

    // ============================================
    // TOUCH DEVICE HANDLING
    // ============================================
    if ('ontouchstart' in window) {
        $('.detail-item, .btn, .contact-card, .social-link').on('touchstart', function() {
            $(this).addClass('touch-active');
        }).on('touchend', function() {
            $(this).removeClass('touch-active');
        });
    }
});