document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('introScreen');
    const modal = document.getElementById('invitationModal');
    const mainContent = document.getElementById('mainContent');
    const openBtn = document.getElementById('openInvitation');
    const closeBtn = document.querySelector('.modal .close');
    const continueBtn = document.getElementById('continueBtn');

    // Открываем модалку
    openBtn.onclick = () => modal.style.display = 'flex';

    // Закрываем модалку
    const closeModal = () => modal.style.display = 'none';
    closeBtn.onclick = closeModal;
    window.onclick = (e) => { if (e.target === modal) closeModal(); };

    // Кнопка «Продолжить» — убираем intro и показываем сайт
    continueBtn.onclick = () => {
        closeModal();
        introScreen.classList.add('fade-out');
        setTimeout(() => {
            introScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
        }, 1200);
    };

    // Таймер
    const wedding = new Date('2026-10-17T00:00:00');
    const update = () => {
        const diff = wedding - new Date();
        const days = Math.floor(diff / (1000*60*60*24));
        const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
        const mins = Math.floor((diff % (1000*60*60)) / (1000*60));
        document.getElementById('countdown').textContent = `${days} дней ${hours} ч ${mins} мин`;
    };
    update();
    setInterval(update, 60000);

    // Жемчужины (12 шт.)
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const p = document.createElement('img');
            p.src = 'assets/pearl.png';
            p.className = 'pearl';
            p.style.left = Math.random() * 100 + 'vw';
            p.style.animationDelay = Math.random() * 20 + 's';
            p.style.animationDuration = (20 + Math.random() * 15) + 's';
            document.querySelector('.pearls').appendChild(p);
        }, i * 2000);
    }
});
