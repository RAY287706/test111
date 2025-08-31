// Global variables
let currentPage = 1;
let candlesBlown = 0;
const totalCandles = 3;

// Scene management
const scenes = {
    scene1: document.getElementById('scene1'),
    scene2: document.getElementById('scene2'),
    scene3: document.getElementById('scene3')
};

function showScene(sceneId) {
    Object.values(scenes).forEach(scene => {
        scene.classList.remove('active');
    });
    scenes[sceneId].classList.add('active');
}

// Scene 1: Birthday Cake functionality
document.addEventListener('DOMContentLoaded', function() {
    const blowBtn = document.getElementById('blowBtn');
    const flames = document.querySelectorAll('.flame');
    
    blowBtn.addEventListener('click', function() {
        if (candlesBlown < totalCandles) {
            // Blow out random candle
            const availableFlames = Array.from(flames).filter(flame => !flame.classList.contains('blown'));
            if (availableFlames.length > 0) {
                const randomFlame = availableFlames[Math.floor(Math.random() * availableFlames.length)];
                randomFlame.classList.add('blown');
                candlesBlown++;
                
                // Play blow sound effect (if you want to add audio later)
                // const audio = new Audio('blow.mp3');
                // audio.play();
                
                // Update button text
                if (candlesBlown < totalCandles) {
                    blowBtn.textContent = `Tiup Lagi (${totalCandles - candlesBlown} lilin tersisa)`;
                } else {
                    blowBtn.textContent = 'Semua Lilin Padam! 🎉';
                    blowBtn.style.background = 'linear-gradient(45deg, #4ecdc4, #44a08d)';
                    
                    // Show confetti effect
                    createConfetti();
                    
                    // Move to next scene after 3 seconds
                    setTimeout(() => {
                        showScene('scene2');
                    }, 3000);
                }
            }
        }
    });
});

// Confetti effect
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.zIndex = '1000';
            confetti.style.animation = 'confettiFall 3s linear forwards';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 100);
    }
}

// Add confetti animation to CSS dynamically
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(confettiStyle);

// Scene 2: Album functionality
const albumPages = document.querySelectorAll('.album-page');
const currentPageSpan = document.getElementById('currentPage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const toGiftsBtn = document.getElementById('toGiftsBtn');

function updateAlbumPage() {
    albumPages.forEach((page, index) => {
        page.classList.remove('active');
        if (index === currentPage - 1) {
            page.classList.add('active');
        }
    });
    
    currentPageSpan.textContent = currentPage;
    
    // Update button states
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === albumPages.length;
    
    // Show continue button only on last page
    if (currentPage === albumPages.length) {
        toGiftsBtn.style.display = 'block';
    } else {
        toGiftsBtn.style.display = 'none';
    }
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updateAlbumPage();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < albumPages.length) {
        currentPage++;
        updateAlbumPage();
    }
});

toGiftsBtn.addEventListener('click', () => {
    showScene('scene3');
});

// Initialize album
updateAlbumPage();

// Scene 3: Gift selection functionality
const giftOptions = document.querySelectorAll('.gift-option');
const giftResult = document.getElementById('giftResult');
const selectedGiftText = document.getElementById('selectedGift');
const resetBtn = document.getElementById('resetBtn');

const giftMessages = {
    baju: {
        title: '👕 Baju & Celana',
        message: 'Pilihan yang bagus! Pakaian baru akan membuat Resanaeni tampil lebih cantik dan percaya diri. Fashion adalah cara terbaik untuk mengekspresikan kepribadian!'
    },
    sepatu: {
        title: '👠 Sepatu',
        message: 'Excellent choice! Sepatu yang bagus akan mendukung setiap langkah Resanaeni menuju impiannya. Comfort dan style dalam satu pilihan!'
    },
    uang: {
        title: '💰 Uang Cash',
        message: 'Very practical! Dengan uang cash, Resanaeni bisa membeli apa saja yang diinginkannya. Fleksibilitas adalah kunci kebahagiaan!'
    },
    other: {
        title: '🎁 Kejutan Spesial',
        message: 'Mysterious choice! Kejutan selalu membawa kegembiraan yang tak terduga. Resanaeni pasti akan senang dengan surprise ini!'
    }
};

giftOptions.forEach(option => {
    option.addEventListener('click', function() {
        // Remove selection from all options
        giftOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Add selection to clicked option
        this.classList.add('selected');
        
        // Get gift type
        const giftType = this.getAttribute('data-gift');
        const giftInfo = giftMessages[giftType];
        
        // Show result
        selectedGiftText.innerHTML = `
            <strong>${giftInfo.title}</strong><br>
            ${giftInfo.message}
        `;
        
        giftResult.classList.remove('hidden');
        
        // Scroll to result
        giftResult.scrollIntoView({ behavior: 'smooth' });
        
        // Add celebration effect
        setTimeout(() => {
            createMiniConfetti();
        }, 500);
    });
});

resetBtn.addEventListener('click', () => {
    giftOptions.forEach(opt => opt.classList.remove('selected'));
    giftResult.classList.add('hidden');
});

// Mini confetti for gift selection
function createMiniConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#f9ca24', '#f0932b'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '8px';
            confetti.style.height = '8px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.zIndex = '1000';
            confetti.style.animation = 'confettiFall 2s linear forwards';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 2000);
        }, i * 50);
    }
}

// Add some interactive sound effects (optional)
// You can add these later by including audio files
function playSound(soundName) {
    // Example implementation:
    // const audio = new Audio(`sounds/${soundName}.mp3`);
    // audio.play().catch(e => console.log('Sound not available'));
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    const activeScene = document.querySelector('.scene.active');
    
    if (activeScene.id === 'scene1') {
        if (e.code === 'Space') {
            e.preventDefault();
            document.getElementById('blowBtn').click();
        }
    } else if (activeScene.id === 'scene2') {
        if (e.code === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.code === 'ArrowRight') {
            nextBtn.click();
        }
    }
});

// Add smooth transitions between scenes
function addSceneTransition() {
    const style = document.createElement('style');
    style.textContent = `
        .scene {
            transition: opacity 0.5s ease-in-out;
        }
        .scene:not(.active) {
            opacity: 0;
        }
        .scene.active {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}
 
// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    addSceneTransition();
    console.log('🎂 Selamat Ulang Tahun sayangnyaaku! 🎂');
});

// Add special birthday message
setTimeout(() => {
    if (document.querySelector('.scene.active').id === 'scene1') {
        console.log('💖Ciee udh 23 thn lagiii 💖');
    }
}, 2000);