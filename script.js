// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Таймер
    const weddingDate = new Date('2026-10-17T00:00:00');
    function updateCountdown() {
        const now = new Date();
        const diff = weddingDate - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('countdown').innerHTML = `${days} дней ${hours} ч ${minutes} мин`;
    }
    updateCountdown();
    setInterval(updateCountdown, 60000);

    // Жемчужины
    const pearlsContainer = document.querySelector('.pearls');
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const p = document.createElement('img');
            p.src = 'assets/pearl.png';
            p.classList.add('pearl');
            p.style.left = Math.random() * 100 + 'vw';
            p.style.animationDelay = Math.random() * 20 + 's';
            p.style.animationDuration = (20 + Math.random() * 20) + 's';
            pearlsContainer.appendChild(p);
        }, i * 2500);
    }

    // Анимация появления секций при скролле
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('section').forEach(sec => observer.observe(sec));

    // Модалка
    const modal = document.getElementById('invitationModal');
    document.getElementById('openInvitation').onclick = () => modal.style.display = 'flex';
    document.querySelector('.close').onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
});
