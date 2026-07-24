import Link from "next/link";
import Countdown from "@/components/Countdown";

const gateways = [
  { index: "01", href: "/details", label: "День свадьбы", detail: "Дата, программа и маршрут" },
  {
    index: "02",
    href: "/style",
    label: "Дресс-код",
    detail: "Палитра для вдохновения, а не требование",
    badge: "Необязательно · только по желанию",
  },
  { index: "03", href: "/rsvp", label: "Подтвердить участие", detail: "Анкета гостя" },
];

export default function Home() {
  return (
    <>
      <section className="hero-screen">
        <div className="hero-signal" aria-hidden="true">
          <span className="orbit orbit-one" /><span className="orbit orbit-two" />
          <span className="orbit orbit-three" /><span className="signal-core">M×D</span>
        </div>
        <div className="hero-copy">
          <p className="terminal-kicker"><span className="live-dot" aria-hidden="true" />connection.established / 17.10.2026</p>
          <h1><span>Любовь</span><em>как код</em><span>от реальности</span></h1>
          <p className="hero-intro">Михаил и Дарья приглашают вас стать частью дня, с которого начинается их общая реальность.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/details">Открыть приглашение<span aria-hidden="true">↗</span></Link>
            <Link className="text-link" href="/rsvp">Я буду с вами <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <aside className="event-manifest">
          <div className="manifest-topline"><span>event.manifest</span><span>v17.10.26</span></div>
          <dl>
            <div><dt>Дата</dt><dd>17 октября 2026</dd></div>
            <div><dt>Сбор гостей</dt><dd>15:00</dd></div>
            <div><dt>Локация</dt><dd>Pine River · Амбар</dd></div>
            <div><dt>Статус</dt><dd className="manifest-status">confirmed</dd></div>
          </dl>
          <div className="manifest-code" aria-hidden="true">
            <span>{"{"}</span><span>reality: &quot;ours&quot;,</span><span>love: Infinity</span><span>{"}"}</span>
          </div>
        </aside>
        <a className="scroll-cue" href="#invitation"><span>scroll.to(invitation)</span><i aria-hidden="true">↓</i></a>
      </section>

      <section className="content-section invitation-section" id="invitation">
        <div className="section-label"><span>01</span>invitation.message</div>
        <div className="invitation-copy">
          <p className="oversized-quote" aria-hidden="true">“</p>
          <h2>Дорогие наши гости!</h2>
          <p>В этот день мы говорим друг другу «да» навсегда. И хотим, чтобы рядом были именно вы — самые близкие и любимые.</p>
          <p>С радостью приглашаем вас на нашу свадьбу.</p>
          <strong>Михаил × Дарья</strong>
        </div>
      </section>

      <section className="content-section countdown-section">
        <div className="section-label"><span>02</span>time.until_rewrite</div>
        <header className="section-heading split-heading">
          <div><p>Сохраняйте дату</p><h2>17 октября 2026</h2></div>
          <p>До момента, когда две истории станут одной, осталось:</p>
        </header>
        <Countdown />
      </section>

      <section className="content-section gateways-section">
        <div className="section-label"><span>03</span>select.route</div>
        <header className="section-heading"><p>Навигация по событию</p><h2>Всё важное — в отдельных модулях</h2></header>
        <div className="gateway-grid">
          {gateways.map((gateway) => (
            <Link className="gateway-card" href={gateway.href} key={gateway.href}>
              <span className="gateway-index">{gateway.index}</span>
              <div>
                {gateway.badge && <span className="gateway-badge">{gateway.badge}</span>}
                <h3>{gateway.label}</h3>
                <p>{gateway.detail}</p>
              </div>
              <span className="gateway-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
