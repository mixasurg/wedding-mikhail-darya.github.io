document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('introScreen');
    const modal = document.getElementById('invitationModal');
    const mainContent = document.getElementById('mainContent');
    const openBtn = document.getElementById('openInvitation');
    const closeBtn = document.querySelector('.modal .close-btn');
    const continueBtn = document.getElementById('continueBtn');
    let lastFocusedElement = null;

    const handleKeydown = (e) => {
        if (e.key === 'Escape') closeModal();
    };

    const openModal = () => {
        if (!modal) return;
        lastFocusedElement = document.activeElement;
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        document.addEventListener('keydown', handleKeydown);
        if (closeBtn) closeBtn.focus();
    };

    // Открываем модалку
    if (openBtn && modal) openBtn.addEventListener('click', openModal);

    // Закрываем модалку
    const closeModal = () => {
        if (!modal) return;
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.removeEventListener('keydown', handleKeydown);
        if (lastFocusedElement && lastFocusedElement.focus) lastFocusedElement.focus();
    };
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Кнопка «Продолжить» — убираем intro и показываем сайт
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            closeModal();
            if (introScreen) introScreen.classList.add('fade-out');
            setTimeout(() => {
                if (introScreen) introScreen.style.display = 'none';
                if (mainContent) mainContent.classList.remove('js-hidden');
            }, 1400);
        });
    }

    // Таймер
    // 17 октября 2026, 00:00 по МСК (UTC+3)
    const weddingMs = Date.UTC(2026, 9, 17, 0, 0, 0) - (3 * 60 * 60 * 1000);
    const update = () => {
        const el = document.getElementById('countdown');
        if (!el) return;

        const diff = weddingMs - Date.now();
        if (diff <= 0) {
            el.textContent = 'Сегодня тот самый день!';
            return;
        }
        const days = Math.floor(diff / (1000*60*60*24));
        const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
        const mins = Math.floor((diff % (1000*60*60)) / (1000*60));
        el.textContent = `${days} дней ${hours} ч ${mins} мин`;
    };
    update();
    setInterval(update, 60000);

    // Жемчужины (20 шт.)
    const pearls = document.querySelector('.pearls');
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const p = document.createElement('img');
            p.src = 'assets/pearl.svg';
            p.alt = '';
            p.className = 'pearl';
            p.style.left = Math.random() * 100 + 'vw';
            p.style.animationDelay = Math.random() * 4 + 's';
            p.style.animationDuration = (18 + Math.random() * 10) + 's';
            if (pearls) pearls.appendChild(p);
        }, i * 250);
    }

    // =========================
    // RSVP: отправка в Google Sheets через hidden iframe
    // =========================
    const form = document.getElementById('rsvpForm');
    const iframe = document.getElementById('hidden_iframe');
    const status = document.getElementById('rsvpStatus');

    if (form && iframe) {
        let submitted = false;
        let submitTimer = null;

        form.addEventListener('submit', () => {
            submitted = true;
            if (status) status.textContent = 'Отправляем…';
            if (submitTimer) clearTimeout(submitTimer);
            submitTimer = setTimeout(() => {
                if (!submitted) return;
                submitted = false;
                if (status) status.textContent = 'Не удалось отправить. Попробуйте ещё раз позже.';
            }, 12000);
        });

        iframe.addEventListener('load', () => {
            if (!submitted) return;
            submitted = false;
            if (submitTimer) clearTimeout(submitTimer);

            if (status) status.textContent = 'Спасибо! Ответ записан ❤️';
            form.reset();
        });
    }
});
