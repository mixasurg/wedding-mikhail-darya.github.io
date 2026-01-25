document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('introScreen');
    const modal = document.getElementById('invitationModal');
    const mainContent = document.getElementById('mainContent');
    const openBtn = document.getElementById('openInvitation');
    const closeBtn = document.querySelector('.modal .close');
    const continueBtn = document.getElementById('continueBtn');

    // Открываем модалку
    if (openBtn && modal) openBtn.onclick = () => modal.style.display = 'flex';

    // Закрываем модалку
    const closeModal = () => { if (modal) modal.style.display = 'none'; };
    if (closeBtn) closeBtn.onclick = closeModal;

    window.onclick = (e) => { if (modal && e.target === modal) closeModal(); };

    // Кнопка «Продолжить» — убираем intro и показываем сайт
    if (continueBtn) {
        continueBtn.onclick = () => {
            closeModal();
            if (introScreen) introScreen.classList.add('fade-out');
            setTimeout(() => {
                if (introScreen) introScreen.style.display = 'none';
                if (mainContent) mainContent.classList.remove('hidden');
            }, 1200);
        };
    }

    // Таймер
    const wedding = new Date('2026-10-17T00:00:00');
    const update = () => {
        const el = document.getElementById('countdown');
        if (!el) return;

        const diff = wedding - new Date();
        if (diff <= 0) {
            el.textContent = 'Сегодня тот самый день! ✨';
            return;
        }
        const days = Math.floor(diff / (1000*60*60*24));
        const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
        const mins = Math.floor((diff % (1000*60*60)) / (1000*60));
        el.textContent = `${days} дней ${hours} ч ${mins} мин`;
    };
    update();
    setInterval(update, 60000);

    // Жемчужины (12 шт.)
    const pearls = document.querySelector('.pearls');
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const p = document.createElement('img');
            p.src = 'assets/pearl.png';
            p.className = 'pearl';
            p.style.left = Math.random() * 100 + 'vw';
            p.style.animationDelay = Math.random() * 20 + 's';
            p.style.animationDuration = (20 + Math.random() * 15) + 's';
            if (pearls) pearls.appendChild(p);
        }, i * 2000);
    }

    // =========================
    // RSVP: отправка в Google Sheets через hidden iframe
    // =========================
    const form = document.getElementById('rsvpForm');
    const iframe = document.getElementById('hidden_iframe');
    const status = document.getElementById('rsvpStatus');

    if (form && iframe) {
        let submitted = false;

        form.addEventListener('submit', () => {
            submitted = true;
            if (status) status.textContent = 'Отправляем…';
        });

        iframe.addEventListener('load', () => {
            if (!submitted) return;
            submitted = false;

            if (status) status.textContent = 'Спасибо! Ответ записан ❤️';
            form.reset();
        });
    }
});
