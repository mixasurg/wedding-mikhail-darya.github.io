"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

const RSVP_ENDPOINT =
  "https://script.google.com/macros/s/AKfycby4pCMXYpiwDpssPY1krmH58hIDRxIwF1DUFE7Ycs8sEpzocmaNTzIX4rIPRODjnYYO/exec";

const drinks = [
  "Белое полусладкое вино",
  "Белое сухое вино",
  "Белое полусухое вино",
  "Красное полусладкое вино",
  "Красное сухое вино",
  "Красное полусухое вино",
  "Розовое сухое вино",
  "Розовое полусухое вино",
  "Игристое брют",
  "Игристое полусладкое",
  "Коньяк",
  "Ром",
  "Водка",
  "Виски",
  "Джин",
];

const mealOptions = ["Мясо", "Птица", "Рыба"];

const formSteps = [
  { number: 1, label: "Вы" },
  { number: 2, label: "Меню" },
  { number: 3, label: "Финал" },
];

type Attendance = "" | "yes" | "no";

type FormState = {
  name: string;
  contact: string;
  attendance: Attendance;
  drinks: string[];
  mealMain: string;
  songs: string;
  wishes: string;
  website: string;
};

const initialForm: FormState = {
  name: "",
  contact: "",
  attendance: "",
  drinks: [],
  mealMain: "",
  songs: "",
  wishes: "",
  website: "",
};

export default function RsvpForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const submissionPending = useRef(false);
  const submissionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const attending = form.attendance === "yes";

  useEffect(() => {
    return () => {
      if (submissionTimeout.current) {
        clearTimeout(submissionTimeout.current);
      }
    };
  }, []);

  const setField = <K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
    setStatus((current) => (current === "error" ? "idle" : current));
  };

  const nextStep = () => {
    if (step === 1) {
      if (form.name.trim().length < 2) {
        setError("Пожалуйста, укажите имя и фамилию.");
        return;
      }
      if (form.contact.trim().length < 3) {
        setError("Оставьте телефон или email, чтобы мы могли связаться.");
        return;
      }
      if (!form.attendance) {
        setError("Выберите, сможете ли вы быть с нами.");
        return;
      }
      setStep(attending ? 2 : 3);
      setError("");
      return;
    }

    if (step === 2) {
      if (!form.mealMain) {
        setError("Выберите вариант горячего.");
        return;
      }
      setStep(3);
      setError("");
    }
  };

  const previousStep = () => {
    setStep(step === 3 && !attending ? 1 : Math.max(1, step - 1));
    setError("");
  };

  const toggleDrink = (drink: string) => {
    setField(
      "drinks",
      form.drinks.includes(drink)
        ? form.drinks.filter((item) => item !== drink)
        : [...form.drinks, drink],
    );
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    if (step !== 3 || status === "sending") {
      event.preventDefault();
      return;
    }

    setError("");

    if (attending && !form.mealMain) {
      event.preventDefault();
      setError("Выберите вариант горячего.");
      return;
    }

    if (form.website) {
      event.preventDefault();
      setStatus("success");
      return;
    }

    submissionPending.current = true;
    setStatus("sending");

    if (submissionTimeout.current) {
      clearTimeout(submissionTimeout.current);
    }
    submissionTimeout.current = setTimeout(() => {
      if (!submissionPending.current) return;
      submissionPending.current = false;
      setStatus("error");
      setError(
        "Не удалось подтвердить отправку. Проверьте интернет и попробуйте ещё раз.",
      );
    }, 12000);
  };

  const handleSubmissionLoad = () => {
    if (!submissionPending.current) return;
    submissionPending.current = false;
    if (submissionTimeout.current) {
      clearTimeout(submissionTimeout.current);
      submissionTimeout.current = null;
    }
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="rsvp-success" role="status">
        <div className="success-orbit" aria-hidden="true">
          <span>✓</span>
        </div>
        <p className="terminal-kicker">response.saved = true</p>
        <h2>Ответ записан</h2>
        <p>
          Спасибо, {form.name.split(" ")[0]}. Мы получили вашу анкету и очень
          ждём встречи.
        </p>
      </div>
    );
  }

  return (
    <>
      <form
        className="rsvp-wizard"
        action={RSVP_ENDPOINT}
        method="POST"
        target="rsvp-result"
        onSubmit={submitForm}
        noValidate
      >
        <div hidden aria-hidden="true">
          <input type="hidden" name="name" value={form.name} />
          <input type="hidden" name="contact" value={form.contact} />
          <input
            type="hidden"
            name="attendance"
            value={attending ? "Приду!" : "Не смогу"}
          />
          {attending &&
            form.drinks.map((drink) => (
              <input key={drink} type="hidden" name="drink" value={drink} />
            ))}
          <input
            type="hidden"
            name="meal_main"
            value={attending ? form.mealMain : ""}
          />
          <input type="hidden" name="meal_garnish" value="" />
          <input
            type="hidden"
            name="meal_choice"
            value={attending ? form.mealMain : ""}
          />
          <input
            type="hidden"
            name="songs"
            value={attending ? form.songs : ""}
          />
          <input type="hidden" name="wishes" value={form.wishes} />
          <input type="hidden" name="website" value={form.website} />
        </div>

      <ol className="form-progress" aria-label="Этапы анкеты">
        {formSteps.map(({ number, label }) => (
          <li
            className={
              step === number
                ? "is-current"
                : step > number
                  ? "is-complete"
                  : ""
            }
            key={number}
          >
            <span>{String(number).padStart(2, "0")}</span>
            {label}
          </li>
        ))}
      </ol>

      <div className="wizard-panel">
        {step === 1 && (
          <div className="wizard-step">
            <header className="wizard-heading">
              <p>Шаг 01 / знакомство</p>
              <h2>Расскажите, ждать ли вас</h2>
            </header>

            <div className="field-grid">
              <label className="text-field">
                <span>Имя и фамилия</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => setField("name", event.target.value)}
                  autoComplete="name"
                  placeholder="Как к вам обращаться?"
                  maxLength={120}
                />
              </label>
              <label className="text-field">
                <span>Телефон или email</span>
                <input
                  type="text"
                  value={form.contact}
                  onChange={(event) => setField("contact", event.target.value)}
                  autoComplete="email"
                  placeholder="Для связи"
                  maxLength={160}
                />
              </label>
            </div>

            <fieldset className="choice-section">
              <legend>Получится ли у вас быть с нами?</legend>
              <div className="binary-choice">
                {[
                  ["yes", "Да, буду", "Увидимся 17 октября"],
                  ["no", "Не смогу", "Буду мысленно рядом"],
                ].map(([value, title, caption]) => (
                  <label className="select-card" key={value}>
                    <input
                      type="radio"
                      name="attendance"
                      checked={form.attendance === value}
                      onChange={() =>
                        setField("attendance", value as Attendance)
                      }
                    />
                    <span className="select-indicator" />
                    <strong>{title}</strong>
                    <small>{caption}</small>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {step === 2 && (
          <div className="wizard-step">
            <header className="wizard-heading">
              <p>Шаг 02 / предпочтения</p>
              <h2>Расскажите о предпочтениях</h2>
            </header>

            <fieldset className="choice-section">
              <legend>Алкогольные предпочтения</legend>
              <p className="field-help">Можно выбрать несколько вариантов.</p>
              <div className="option-grid drinks-grid">
                {drinks.map((drink) => (
                  <label className="chip-choice" key={drink}>
                    <input
                      type="checkbox"
                      checked={form.drinks.includes(drink)}
                      onChange={() => toggleDrink(drink)}
                    />
                    <span>{drink}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="choice-section">
              <legend>Горячее</legend>
              <p className="field-help">Выберите один вариант.</p>
              <div className="binary-choice meal-type-choice">
                {mealOptions.map((meal) => (
                  <label className="select-card meal-type-card" key={meal}>
                    <input
                      type="radio"
                      name="meal-main"
                      checked={form.mealMain === meal}
                      onChange={() => setField("mealMain", meal)}
                    />
                    <span className="select-indicator" />
                    <strong>{meal}</strong>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {step === 3 && (
          <div className="wizard-step">
            <header className="wizard-heading">
              <p>Шаг 03 / последние штрихи</p>
              <h2>
                {attending
                  ? "Добавьте музыку и важные детали"
                  : "Спасибо, что дали нам знать"}
              </h2>
            </header>

            {attending ? (
              <div className="field-grid">
                <label className="text-field">
                  <span>Музыка</span>
                  <textarea
                    rows={6}
                    value={form.songs}
                    onChange={(event) => setField("songs", event.target.value)}
                    placeholder="Ваши 3–5 любимых песен"
                    maxLength={1000}
                  />
                </label>
                <label className="text-field">
                  <span>Пожелания</span>
                  <textarea
                    rows={6}
                    value={form.wishes}
                    onChange={(event) => setField("wishes", event.target.value)}
                    placeholder="Аллергии и всё, что хотите сказать"
                    maxLength={1500}
                  />
                </label>
              </div>
            ) : (
              <label className="text-field">
                <span>Пожелание молодожёнам — по желанию</span>
                <textarea
                  rows={6}
                  value={form.wishes}
                  onChange={(event) => setField("wishes", event.target.value)}
                  placeholder="Оставьте несколько тёплых слов"
                  maxLength={1500}
                />
              </label>
            )}

            <label className="honeypot" aria-hidden="true">
              Сайт
              <input
                type="text"
                value={form.website}
                onChange={(event) => setField("website", event.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>
        )}

        {error && (
          <p className="form-error" role="alert">
            <span aria-hidden="true">!</span>
            {error}
          </p>
        )}

        <div className="wizard-actions">
          {step > 1 && (
            <button
              className="button button-ghost"
              type="button"
              onClick={previousStep}
            >
              ← Назад
            </button>
          )}
          {step < 3 ? (
            <button
              key="next-step"
              className="button button-primary"
              type="button"
              onClick={(event) => {
                event.preventDefault();
                nextStep();
              }}
            >
              Продолжить <span aria-hidden="true">↗</span>
            </button>
          ) : (
            <button
              key="submit-response"
              className="button button-primary"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Сохраняем…" : "Отправить ответ"}
              <span aria-hidden="true">↗</span>
            </button>
          )}
        </div>
      </div>
      </form>
      <iframe
        name="rsvp-result"
        title="Отправка анкеты"
        onLoad={handleSubmissionLoad}
        hidden
      />
    </>
  );
}
