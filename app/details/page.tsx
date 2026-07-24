import Image from "next/image";
import Link from "next/link";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const program = [
  ["15:00", "Велком и встреча с гостями", "arrival"],
  ["16:00", "Церемония", "ceremony"],
  ["17:00", "Свадебный ужин", "dinner"],
  ["21:30", "Подача тортика", "cake"],
  ["22:00", "Финальная точка программы", "finale"],
  ["23:00", "Финал танцев", "shutdown"],
];
const calendarDays = [["Пн", "12"], ["Вт", "13"], ["Ср", "14"], ["Чт", "15"], ["Пт", "16"], ["Сб", "17"], ["Вс", "18"]];

export default function DetailsPage() {
  return (
    <>
      <section className="page-hero details-hero">
        <div><p className="terminal-kicker">route / wedding.day</p><h1>Протокол<em>свадебного дня</em></h1></div>
        <p className="page-hero-note">Один день, шесть глав и бесконечное количество тёплых воспоминаний.</p>
      </section>
      <section className="content-section date-protocol">
        <div className="section-label"><span>01</span>date.locked</div>
        <div className="date-layout">
          <div className="date-display"><span>Октябрь</span><strong>17</strong><p>суббота · 2026</p></div>
          <div className="calendar-terminal">
            <div className="calendar-header"><span>calendar://october_2026</span><span>week_42</span></div>
            <div className="calendar-row">
              {calendarDays.map(([day, date]) => (
                <div className={date === "17" ? "is-selected" : ""} key={date}><span>{day}</span><strong>{date}</strong></div>
              ))}
            </div>
            <p className="calendar-command"><span aria-hidden="true">$</span> save_the_date --confirmed</p>
          </div>
        </div>
      </section>
      <section className="content-section timeline-section">
        <div className="section-label"><span>02</span>day.sequence</div>
        <header className="section-heading split-heading">
          <div><p>Программа</p><h2>Сценарий нашей новой реальности</h2></div>
          <p>Тайминг может немного меняться — просто будьте рядом и наслаждайтесь вечером.</p>
        </header>
        <div className="timeline">
          {program.map(([time, title, command], index) => (
            <article className="timeline-item" key={time}>
              <span className="timeline-number">{String(index + 1).padStart(2, "0")}</span>
              <time>{time}</time><div><p>event.{command}</p><h3>{title}</h3></div>
              <span className="timeline-pulse" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>
      <section className="content-section location-module">
        <div className="section-label"><span>03</span>location.resolve</div>
        <div className="location-layout">
          <figure className="venue-visual">
            <Image src={`${publicBasePath}/ambar.jpg`} alt="Амбар в Pine River Park Hotel" width={1280} height={853}
              sizes="(max-width: 900px) 100vw, 62vw" unoptimized />
            <figcaption><span>Pine River Park Hotel</span><span>54.959813° N · 36.766145° E</span></figcaption>
          </figure>
          <div className="location-info">
            <p className="terminal-kicker">destination.found</p><h2>Pine River · Амбар</h2>
            <p>Калужская область, Жуковский район, сельское поселение Трубино, территория Pine River Park Hotel.</p>
            <dl className="location-data">
              <div><dt>Сбор гостей</dt><dd>15:00</dd></div>
              <div><dt>Координаты</dt><dd>54.959813, 36.766145</dd></div>
            </dl>
            <a className="button button-primary" href="https://yandex.ru/maps/?ll=36.766145,54.959813&z=16"
              target="_blank" rel="noopener noreferrer">Проложить маршрут <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
      <section className="next-route"><p>Следующий модуль</p><Link href="/style">Дресс-код и детали <span aria-hidden="true">↗</span></Link></section>
    </>
  );
}
