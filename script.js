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

    // =========================
    // Программа: подгоняем овал и траекторию жемчужины под контент
    // =========================
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const fmt = (value) => Number(value).toFixed(1);
    let ornamentRafId = 0;

    const fitProgramOrnaments = () => {
        document.querySelectorAll('.program-frame').forEach((frame) => {
            const svg = frame.querySelector('.program-ornament');
            const oval = frame.querySelector('.program-oval');
            const pearl = frame.querySelector('.program-pearl');
            const motion = pearl ? pearl.querySelector('animateMotion') : null;
            const content = frame.querySelector('.program-content');
            if (!svg || !oval || !pearl || !motion || !content) return;

            const frameRect = frame.getBoundingClientRect();
            const contentRect = content.getBoundingClientRect();
            if (!frameRect.width || !frameRect.height || !contentRect.width || !contentRect.height) return;

            const isMobile = window.matchMedia('(max-width: 767px)').matches;
            const pearlSize = isMobile ? 25 : 25;
            const pearlRadius = pearlSize / 2;
            const paddingX = isMobile ? 16 : 56;
            const paddingY = isMobile ? 58 : 78;
            const edgeGap = 12;
            const orbitInset = edgeGap + pearlRadius + 10;

            const cx = (contentRect.left - frameRect.left) + (contentRect.width / 2);
            const cy = (contentRect.top - frameRect.top) + (contentRect.height / 2);

            const maxRxByCenter = Math.max(24, Math.min(cx - orbitInset, frameRect.width - cx - orbitInset));
            const maxRyByCenter = Math.max(24, Math.min(cy - orbitInset, frameRect.height - cy - orbitInset));

            const targetRx = (contentRect.width / 2) + paddingX;
            const targetRy = (contentRect.height / 2) + paddingY;
            const minSafeRx = Math.min(maxRxByCenter, (contentRect.width / 2) + (isMobile ? 8 : 20));
            const minRx = Math.min(maxRxByCenter, isMobile ? 90 : 125);
            const minRy = Math.min(maxRyByCenter, isMobile ? 145 : 210);
            let rx = clamp(targetRx, Math.max(minRx, minSafeRx), maxRxByCenter);
            const minAspect = isMobile ? 1.58 : 1.34;
            let ry = clamp(Math.max(targetRy, rx * minAspect), minRy, maxRyByCenter);

            // Если высоты не хватает для нужной "вертикальности", ужимаем радиус по X.
            if (ry / rx < minAspect) {
                const rxByAspect = ry / minAspect;
                rx = clamp(Math.min(rx, rxByAspect), Math.max(minRx, minSafeRx), maxRxByCenter);
                ry = clamp(Math.max(targetRy, rx * minAspect), minRy, maxRyByCenter);
            }

            svg.setAttribute('viewBox', `0 0 ${fmt(frameRect.width)} ${fmt(frameRect.height)}`);
            oval.setAttribute('cx', fmt(cx));
            oval.setAttribute('cy', fmt(cy));
            oval.setAttribute('rx', fmt(rx));
            oval.setAttribute('ry', fmt(ry));

            pearl.setAttribute('width', String(pearlSize));
            pearl.setAttribute('height', String(pearlSize));
            pearl.setAttribute('x', String(-pearlSize / 2));
            pearl.setAttribute('y', String(-pearlSize / 2));

            const path = [
                `M ${fmt(cx - rx)} ${fmt(cy)}`,
                `a ${fmt(rx)} ${fmt(ry)} 0 1 0 ${fmt(rx * 2)} 0`,
                `a ${fmt(rx)} ${fmt(ry)} 0 1 0 ${fmt(-rx * 2)} 0`
            ].join(' ');
            motion.setAttribute('path', path);
            motion.setAttribute('dur', isMobile ? '20s' : '18s');
        });
    };

    const scheduleProgramOrnamentsFit = () => {
        if (ornamentRafId) cancelAnimationFrame(ornamentRafId);
        ornamentRafId = requestAnimationFrame(() => {
            fitProgramOrnaments();
            ornamentRafId = 0;
        });
    };

    scheduleProgramOrnamentsFit();
    window.addEventListener('resize', scheduleProgramOrnamentsFit, { passive: true });

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(scheduleProgramOrnamentsFit).catch(() => {});
    }

    if ('ResizeObserver' in window) {
        const programResizeObserver = new ResizeObserver(scheduleProgramOrnamentsFit);
        document.querySelectorAll('.program-frame, .program-content').forEach((el) => {
            programResizeObserver.observe(el);
        });
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
