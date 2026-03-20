import type { Metadata } from 'next'
import styles from './privacy.module.css'

export const metadata: Metadata = {
  title: 'Integritetspolicy – Clario',
  description: 'Läs hur Clario samlar in, behandlar och skyddar dina personuppgifter i enlighet med GDPR.',
  robots: { index: true, follow: false },
}

export default function PrivacyPolicy() {
  const updated = '2024-01-01'

  return (
    <main className={styles.page}>
      <div className={`container ${styles.container}`}>
        <header className={styles.header}>
          <a href="/" className={styles.back} aria-label="Tillbaka till startsidan">
            ← {' '}Tillbaka
          </a>
          <p className={styles.updated}>Senast uppdaterad: {updated}</p>
          <h1>Integritetspolicy</h1>
          <p className={styles.intro}>
            Clario värnar om din personliga integritet. Denna policy beskriver hur vi samlar in,
            behandlar och skyddar dina personuppgifter i enlighet med EU:s dataskyddsförordning
            (GDPR, förordning 2016/679).
          </p>
        </header>

        <div className={styles.content}>

          <section aria-labelledby="section-1">
            <h2 id="section-1">1. Personuppgiftsansvarig</h2>
            <p>
              Personuppgiftsansvarig för behandlingen av dina personuppgifter är:
            </p>
            <address className={styles.address}>
              <strong>Clario AB</strong><br />
              Organisationsnummer: 556XXX-XXXX<br />
              Adress: [Gatuadress], [Postnummer] [Ort], Sverige<br />
              E-post: <a href="mailto:gdpr@clario.se">gdpr@clario.se</a><br />
              Telefon: [Telefonnummer]
            </address>
          </section>

          <section aria-labelledby="section-2">
            <h2 id="section-2">2. Vilka uppgifter vi samlar in</h2>
            <p>Vi samlar in minimalt med personuppgifter. Beroende på hur du interagerar med oss kan vi behandla:</p>
            <ul>
              <li><strong>Kontaktuppgifter</strong> – namn, e-postadress och telefonnummer när du bokar en demo eller kontaktar oss.</li>
              <li><strong>Bokningsdata</strong> – datum och tid för ditt bokade möte via Cal.com.</li>
              <li><strong>Tekniska uppgifter</strong> – IP-adress och webbläsartyp i serverloggar (automatiskt, korttidslagrat).</li>
              <li><strong>Cookie-preferenser</strong> – ditt val gällande cookies lagras lokalt i din webbläsare.</li>
            </ul>
            <p>Vi samlar <strong>aldrig</strong> in känsliga personuppgifter (t.ex. hälsa, politiska åsikter eller etnicitet).</p>
          </section>

          <section aria-labelledby="section-3">
            <h2 id="section-3">3. Ändamål och rättslig grund för behandlingen</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Ändamål</th>
                  <th scope="col">Rättslig grund (GDPR art. 6)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Hantera bokade demos och möten</td>
                  <td>Fullgörande av avtal (art. 6.1 b)</td>
                </tr>
                <tr>
                  <td>Svara på förfrågningar och supportärenden</td>
                  <td>Berättigat intresse (art. 6.1 f)</td>
                </tr>
                <tr>
                  <td>Förbättra vår tjänst (anonymiserad analys)</td>
                  <td>Samtycke (art. 6.1 a) – kräver ditt aktiva godkännande</td>
                </tr>
                <tr>
                  <td>Uppfylla rättsliga skyldigheter (t.ex. bokföring)</td>
                  <td>Rättslig förpliktelse (art. 6.1 c)</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section aria-labelledby="section-4">
            <h2 id="section-4">4. Lagringstider</h2>
            <p>Vi lagrar dina personuppgifter endast så länge som det är nödvändigt:</p>
            <ul>
              <li><strong>Bokningsdata</strong> – raderas 12 månader efter mötet om inget avtalsförhållande uppstått.</li>
              <li><strong>Kunddata (aktiva kunder)</strong> – lagras under avtalsperioden plus 36 månader därefter.</li>
              <li><strong>Serverloggar</strong> – automatiskt raderade efter 30 dagar.</li>
              <li><strong>Bokföringsmaterial</strong> – 7 år i enlighet med bokföringslagen (1999:1078).</li>
            </ul>
          </section>

          <section aria-labelledby="section-5">
            <h2 id="section-5">5. Delning med tredje part</h2>
            <p>
              Vi säljer aldrig dina personuppgifter. Vi kan dela uppgifter med följande kategorier av
              personuppgiftsbiträden, med vilka vi har tecknat databehandlingsavtal (DPA):
            </p>
            <ul>
              <li><strong>Cal.com</strong> – mötesbokning (servrar inom EU/EES).</li>
              <li><strong>Hetzner Online GmbH</strong> – serverinfrastruktur (datacenter i Tyskland).</li>
              <li><strong>360dialog</strong> – WhatsApp-meddelandetjänst (DPA på plats).</li>
            </ul>
            <p>
              Alla underleverantörer behandlar data inom EU/EES eller med lämpliga skyddsåtgärder
              (t.ex. standardavtalsklausuler enligt art. 46 GDPR).
            </p>
          </section>

          <section aria-labelledby="section-6">
            <h2 id="section-6">6. Dina rättigheter</h2>
            <p>Enligt GDPR har du följande rättigheter:</p>
            <ul>
              <li><strong>Rätt till tillgång</strong> – begära ett utdrag av de uppgifter vi behandlar om dig.</li>
              <li><strong>Rätt till rättelse</strong> – begära att felaktiga uppgifter korrigeras.</li>
              <li><strong>Rätt till radering</strong> – begära att vi raderar dina uppgifter ("rätten att bli glömd"), förutsatt att ingen rättslig förpliktelse kräver att vi behåller dem.</li>
              <li><strong>Rätt till begränsning</strong> – begära att vi begränsar behandlingen under utredning.</li>
              <li><strong>Rätt till dataportabilitet</strong> – begära att få ut dina uppgifter i ett strukturerat, maskinläsbart format.</li>
              <li><strong>Rätt att invända</strong> – invända mot behandling baserad på berättigat intresse.</li>
              <li><strong>Återkalla samtycke</strong> – när som helst utan att det påverkar lagligheten av tidigare behandling.</li>
            </ul>
            <p>
              Skicka din begäran till <a href="mailto:gdpr@clario.se">gdpr@clario.se</a>. Vi svarar
              inom 30 dagar. Du har även rätt att lämna klagomål till{' '}
              <a href="https://www.imy.se" target="_blank" rel="noopener noreferrer">
                Integritetsskyddsmyndigheten (IMY)
              </a>.
            </p>
          </section>

          <section aria-labelledby="section-7">
            <h2 id="section-7">7. Cookies</h2>
            <p>Vi använder följande kategorier av cookies:</p>
            <ul>
              <li>
                <strong>Nödvändiga cookies</strong> – krävs för att webbplatsen ska fungera korrekt.
                Kräver inte samtycke (GDPR skäl 47 och ePrivacy-direktivet art. 5.3).
              </li>
              <li>
                <strong>Analytiska cookies</strong> – används för att förstå hur besökare använder
                webbplatsen. Aktiveras <em>bara</em> om du ger ditt uttryckliga samtycke via
                cookie-bannern.
              </li>
            </ul>
            <p>Du kan när som helst ändra dina cookie-inställningar genom att rensa din webbläsares lokala lagring.</p>
          </section>

          <section aria-labelledby="section-8">
            <h2 id="section-8">8. Säkerhet</h2>
            <p>
              Vi vidtar lämpliga tekniska och organisatoriska åtgärder för att skydda dina
              personuppgifter mot obehörig åtkomst, förlust eller förstörelse. Exempel: krypterad
              kommunikation (TLS 1.3), begränsad åtkomst baserat på behov, och regelbundna
              säkerhetsgranskningar.
            </p>
          </section>

          <section aria-labelledby="section-9">
            <h2 id="section-9">9. Ändringar i denna policy</h2>
            <p>
              Vi kan uppdatera denna policy vid behov. Vid väsentliga förändringar informerar vi dig
              via e-post (om vi har din adress) eller via ett tydligt meddelande på webbplatsen.
              Senaste version finns alltid tillgänglig på denna sida.
            </p>
          </section>

          <section aria-labelledby="section-10">
            <h2 id="section-10">10. Kontakt</h2>
            <p>
              Har du frågor om hur vi behandlar dina personuppgifter? Kontakta oss:
            </p>
            <address className={styles.address}>
              E-post: <a href="mailto:gdpr@clario.se">gdpr@clario.se</a><br />
              Post: Clario AB, [Gatuadress], [Postnummer] [Ort]
            </address>
          </section>

        </div>
      </div>
    </main>
  )
}
