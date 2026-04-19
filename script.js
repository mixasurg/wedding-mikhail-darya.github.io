document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('invitationModal');
    const mainContent = document.getElementById('mainContent');
    const continueBtn = document.getElementById('continueBtn');

    const openModal = () => {
        if (!modal) return;
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        if (continueBtn) continueBtn.focus();
    };

    const closeModal = () => {
        if (!modal) return;
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    };

    // Кнопка «Продолжить» — закрываем модалку и показываем сайт
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            closeModal();
            if (mainContent) mainContent.classList.remove('js-hidden');
        });
    }

    openModal();

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
        el.textContent = `${days} дней • ${hours} ч • ${mins} мин`;
    };
    update();
    setInterval(update, 60000);

    // =========================
    // RSVP: отправка в Google Sheets через hidden iframe
    // =========================
    const form = document.getElementById('rsvpForm');
    const iframe = document.getElementById('hidden_iframe');
    const status = document.getElementById('rsvpStatus');

    if (form && iframe) {
        const mealMainInputs = form.querySelectorAll('input[name="meal_main"]');
        const mealGarnishInputs = form.querySelectorAll('input[name="meal_garnish"]');
        const mealChoiceCombined = document.getElementById('mealChoiceCombined');
        let submitted = false;
        let submitTimer = null;

        const updateMealChoiceCombined = () => {
            if (!mealChoiceCombined) return;
            const selectedMain = form.querySelector('input[name="meal_main"]:checked');
            const selectedGarnish = form.querySelector('input[name="meal_garnish"]:checked');
            const mainValue = selectedMain ? selectedMain.value : '';
            const garnishValue = selectedGarnish ? selectedGarnish.value : '';

            if (mainValue && garnishValue) {
                mealChoiceCombined.value = `${mainValue} | Гарнир: ${garnishValue}`;
                return;
            }

            mealChoiceCombined.value = mainValue || '';
        };

        mealMainInputs.forEach((input) => input.addEventListener('change', updateMealChoiceCombined));
        mealGarnishInputs.forEach((input) => input.addEventListener('change', updateMealChoiceCombined));

        form.addEventListener('submit', () => {
            updateMealChoiceCombined();
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
            updateMealChoiceCombined();
        });
    }
});
