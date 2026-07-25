import Image from "next/image";
import Link from "next/link";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const dressColors = [
  { name: "Сливочный", code: "#CEB493" }, { name: "Тёплый тауп", code: "#A77863" },
  { name: "Шоколадный", code: "#5B382E" }, { name: "Винный", code: "#82102C" },
  { name: "Сливовый", code: "#512735" }, { name: "Аметистовый", code: "#674E6D" },
];

export default function StylePage() {
  return (
    <>
      <section className="page-hero style-hero">
        <div><p className="terminal-kicker">route / visual.protocol</p><h1>Палитра<em>этого вечера</em></h1></div>
        <p className="page-hero-note">Палитра — лишь идея для вдохновения. Главное, чтобы вам было комфортно.</p>
      </section>
      <aside className="dress-optional-banner" aria-label="Важно: дресс-код не обязателен">
        <span className="dress-optional-tag">Важно</span>
        <div className="dress-optional-copy">
          <p>choice.mode = optional</p>
          <strong>Дресс-код не обязателен</strong>
          <span>Только по вашему желанию — приходите в том, в чём вам комфортно.</span>
          <span className="dress-white-note">Единственная просьба: оставьте белый для невесты</span>
        </div>
        <span className="dress-optional-mark" aria-hidden="true">✓</span>
      </aside>
      <section className="content-section dress-module">
        <div className="section-label"><span>01</span>dress.code</div>
        <header className="section-heading split-heading">
          <div><p>По желанию / evening inspiration</p><h2>Палитра для вдохновения</h2></div>
          <p>Если захотите поддержать визуальный код свадьбы, нам будет особенно приятно увидеть винные, шоколадные, сливочные и сложные лиловые оттенки. Но это не требование.</p>
        </header>
        <figure className="dress-visual">
          <div
            className="dress-board-scroll"
            role="region"
            aria-label="Галерея примеров образов. На телефоне проведите в сторону, чтобы рассмотреть все варианты."
            tabIndex={0}
          >
            <Image src={`${publicBasePath}/dress-code.png`} alt="Примеры женских и мужских образов для дресс-кода свадьбы"
              width={1415} height={811} sizes="(max-width: 600px) 760px, 1200px" unoptimized />
          </div>
          <figcaption>
            <span>reference.board / soft violet edition</span>
            <span className="dress-frame-index">01—06</span>
            <span className="dress-scroll-hint">Листайте, чтобы рассмотреть →</span>
          </figcaption>
        </figure>
        <div className="palette-grid" aria-label="Палитра дресс-кода">
          {dressColors.map((color, index) => (
            <div className="palette-item" key={color.name}>
              <span className="palette-color" style={{ backgroundColor: color.code }} />
              <span className="palette-index">{String(index + 1).padStart(2, "0")}</span>
              <div><strong>{color.name}</strong><small>{color.code}</small></div>
            </div>
          ))}
        </div>
      </section>
      <section className="content-section request-module">
        <div className="section-label"><span>02</span>important.note</div>
        <div className="request-layout">
          <div><p className="terminal-kicker">flowers.safe_mode = true</p><h2>Букеты, безопасные для наших кошек</h2></div>
          <div className="request-note">
            <span className="request-symbol" aria-hidden="true">✦</span>
            <p>Если захотите порадовать нас цветами, пожалуйста, выбирайте растения, безопасные для домашних питомцев.</p>
            <p>Будем благодарны, если в букете не будет лилий и тюльпанов.</p>
          </div>
        </div>
      </section>
      <section className="next-route"><p>Последний шаг</p><Link href="/rsvp">Подтвердить участие <span aria-hidden="true">↗</span></Link></section>
    </>
  );
}
