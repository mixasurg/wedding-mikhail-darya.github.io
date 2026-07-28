import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-syntax" aria-hidden="true">
        <span>{"{"}</span>
        <span>couple: &quot;Михаил × Дарья&quot;,</span>
        <span>date: &quot;17.10.2026&quot;,</span>
        <span>status: &quot;forever&quot;</span>
        <span>{"}"}</span>
      </div>
      <div className="footer-copy">
        <p>До встречи в нашей новой реальности</p>
        <strong>Михаил × Дарья</strong>
        <address className="footer-organizer">
          <span>Организатор</span>
          <a href="https://t.me/saltwedding">@saltwedding</a>
          <a href="tel:+79200966068">+7 920 096 6068</a>
        </address>
      </div>
      <Link href="/rsvp">Подтвердить участие ↗</Link>
    </footer>
  );
}
