/* ==========================================================================
   PORTAL ŚWIADOMOŚCI I ZARZĄDZANIA AI UNICREDIT - LOGIKA APLIKACJI (PL)
   Funkcje: Nawigator Slajdów, Przeszukiwalny Podręcznik, Test Zgodności,
            Piaskownica Symulacyjna AI, Animacja Wysyłania Pomysłów.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // DEKLARACJE DANYCH: PODRĘCZNIK, QUIZ ORAZ SCENARIUSZE PIASKOWNICY
    // ==========================================================================

    const HANDBOOK_CHAPTERS = [
        {
            id: 'chapter-1',
            num: 1,
            title: 'Zrozumienie AI i Generatywnego AI',
            content: `
                <h3>Czym jest Sztuczna Inteligencja?</h3>
                <p>U podstaw, <strong>System Sztucznej Inteligencji (system AI)</strong> to system oparty na maszynach, zaprojektowany do działania z różnym poziomem autonomii. Zgodnie z definicją zawartą w unijnym Akcie o AI (Artykuł 3) oraz przyjętą przez UniCredit:</p>
                <blockquote>
                    „System AI” oznacza system oparty na maszynach, zaprojektowany do działania z różnym poziomem autonomii, który po wdrożeniu może wykazywać zdolność do adaptacji i który – na potrzeby wyraźnych lub dorozumianych celów – wnioskuje na podstawie otrzymanych danych wejściowych o sposobie generowania wyników, takich jak prognozy, treści, zalecenia lub decyzje, które mogą wpływać na środowisko fizyczne lub wirtualne.
                </blockquote>

                <h3>Tradycyjne AI vs. Generatywne AI</h3>
                <p>Od wielu lat banki wykorzystują <strong>Tradycyjne (Predykcyjne) AI</strong>. Systemy te analizują dane numeryczne i ustrukturyzowane w celu identyfikacji wzorców i prognozowania wyników – na przykład przy ocenie zdolności kredytowej (credit scoring), wykrywaniu oszukańczych transakcji kartowych (fraud detection) czy prowadzeniu algorytmicznych modeli handlowych.</p>
                <p><strong>Generatywne AI (GenAI)</strong> reprezentuje zmianę paradygmatu. Przeszkolone na ogromnych zbiorach ludzkiego języka, kodu i obrazów, GenAI nie tylko przewiduje, ale <em>tworzy</em> zupełnie nowe, spójne treści. Jest to możliwe dzięki wykorzystaniu <strong>Wielkich Modeli Językowych (LLM)</strong>.</p>

                <div class="static-svg-diagram">
                    <svg viewBox="0 0 600 240" width="100%" height="100%" style="background:#0e1017; border-radius:8px; padding:16px;">
                        <!-- Node Artificial Intelligence -->
                        <rect x="220" y="10" width="160" height="35" rx="5" fill="#cc0000" stroke="#ff4d4d" stroke-width="1"/>
                        <text x="300" y="32" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle">Sztuczna Inteligencja</text>
                        
                        <!-- Lines to Subcategories -->
                        <path d="M300 45 L300 70 M300 70 L130 70 L130 90 M300 70 L470 70 L470 90" stroke="#626880" stroke-width="1.5" fill="none"/>
                        
                        <!-- Node Traditional AI -->
                        <rect x="50" y="90" width="160" height="35" rx="5" fill="#1c1e2a" stroke="#626880" stroke-width="1"/>
                        <text x="130" y="112" fill="#ffffff" font-size="11" font-weight="600" text-anchor="middle">Tradycyjne / Predykcyjne AI</text>
                        
                        <!-- Node Generative AI -->
                        <rect x="390" y="90" width="160" height="35" rx="5" fill="#1c1e2a" stroke="#cc0000" stroke-width="1.5"/>
                        <text x="470" y="112" fill="#ffffff" font-size="11" font-weight="600" text-anchor="middle">Generatywne AI (GenAI)</text>
                        
                        <!-- Connecting traditional children -->
                        <path d="M130 125 L130 145 M130 145 L70 145 L70 165 M130 145 L190 145 L190 165" stroke="#626880" stroke-width="1" fill="none"/>
                        <rect x="10" y="165" width="110" height="25" rx="4" fill="#0c0d12" stroke="#626880" stroke-width="1"/>
                        <text x="65" y="181" fill="#949ab2" font-size="9" text-anchor="middle">Karty Scoringowe</text>
                        <rect x="135" y="165" width="110" height="25" rx="4" fill="#0c0d12" stroke="#626880" stroke-width="1"/>
                        <text x="190" y="181" fill="#949ab2" font-size="9" text-anchor="middle">Detekcja Nadużyć</text>
                        
                        <!-- Connecting GenAI children -->
                        <path d="M470 125 L470 145 M470 145 L410 145 L410 165 M470 145 L530 145 L530 165" stroke="#cc0000" stroke-width="1" fill="none"/>
                        <rect x="350" y="165" width="110" height="25" rx="4" fill="#1a1c27" stroke="#cc0000" stroke-width="1"/>
                        <text x="405" y="181" fill="#ffffff" font-size="9" text-anchor="middle">Google Gemini</text>
                        <rect x="475" y="165" width="110" height="25" rx="4" fill="#1a1c27" stroke="#cc0000" stroke-width="1"/>
                        <text x="530" y="181" fill="#ffffff" font-size="9" text-anchor="middle">Google NotebookLM</text>
                    </svg>
                </div>

                <h3>Jak Działają Wielkie Modele Językowe?</h3>
                <p>Modele LLM działają na zasadzie <strong>predykcji kolejnego tokenu (słowa)</strong>. Funkcjonują jak niezwykle zaawansowane systemy autouzupełniania, obliczając statystyczne prawdopodobieństwo pojawienia się kolejnego słowa na podstawie wprowadzonego przez użytkownika promptu.</p>
                <ul>
                    <li><strong>Brak ludzkiego rozumienia:</strong> LLM nie „myślą” ani nie rozumieją pojęć w ludzkim sensie. Rozpoznają jedynie struktury językowe i wzorce statystyczne.</li>
                    <li><strong>Okno kontekstowe:</strong> Pomyśl o tym jak o aktywnej, krótkotrwałej pamięci modelu. Jest to ilość tekstu, którą LLM potrafi przetworzyć w ramach jednej konwersacji. W najnowszych modelach Google okno to jest niezwykle duże, co umożliwia wgrywanie całych książek, instrukcji czy dokumentów kredytowych do natychmiastowej analizy.</li>
                </ul>
            `
        },
        {
            id: 'chapter-2',
            num: 2,
            title: 'Dlaczego AI? Transformacja usług finansowych',
            content: `
                <p>Sztuczna inteligencja zmienia oblicze sektora finansowego, podnosząc efektywność operacyjną, poprawiając jakość obsługi oraz uwalniając pracowników od powtarzalnych zadań administracyjnych.</p>
                
                <h3>Cztery Filary AI w Bankowości</h3>
                <p>Zgodnie z analizami transformacji cyfrowej bankowości, sztuczna inteligencja rozwija się w ramach czterech kluczowych filarów:</p>
                
                <table class="presentation-table mt-4" style="border: 1px solid var(--border-color);">
                    <thead>
                        <tr style="background: rgba(255,255,255,0.02);">
                            <th style="padding:12px;">Filar</th>
                            <th style="padding:12px;">Opis</th>
                            <th style="padding:12px;">Przykłady</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Hiper-personalizacja CX</strong></td>
                            <td>Dostarczanie natychmiastowych, skrojonych na miarę odpowiedzi i rekomendacji kontekstowych.</td>
                            <td>Inteligentni asystenci wirtualni (chatboty) obsługujący zgłoszenia klientów 24/7; doradztwo inwestycyjne.</td>
                        </tr>
                        <tr>
                            <td><strong>Tarcza Ryzyka i Bezpieczeństwa</strong></td>
                            <td>Identyfikacja anomalii i podejrzanych wzorców w czasie rzeczywistym w celu zwalczania przestępczości.</td>
                            <td>Profilowanie transakcji pod kątem przeciwdziałania praniu pieniędzy (AML); zaawansowane modele ryzyka kredytowego.</td>
                        </tr>
                        <tr>
                            <td><strong>Efektywność Operacyjna</strong></td>
                            <td>Automatyzacja procesów back-office i middle-office wymagających analizy wielu dokumentów.</td>
                            <td>Automatyzacja weryfikacji wniosków kredytowych; wyciąganie kluczowych limitów i warunków z umów ramowych.</td>
                        </tr>
                        <tr>
                            <td><strong>Wsparcie Pracowników</strong></td>
                            <td>Tworzenie korporacyjnego „wyszukiwania kognitywnego” do szybkiej agregacji wiedzy.</td>
                            <td>Doradcy klienta odpytujący wewnętrzne bazy wiedzy o szczegóły procedur produktowych lub regulacji kredytowych.</td>
                        </tr>
                    </tbody>
                </table>

                <h3 class="mt-4">Usprawnienie Twojej Codziennej Pracy</h3>
                <p>W Twojej codziennej pracy sztuczna inteligencja działa jak niestrudzony, osobisty asystent. Doskonale sprawdza się w:</p>
                <ul>
                    <li><strong>Błyskawicznym podsumowywaniu:</strong> Zamieniaj 50-stronicowe regulacje prawne, raporty z audytów czy transkrypcje ze spotkań w kluczowe wnioski w kilka sekund.</li>
                    <li><strong>Syntezie wiedzy:</strong> Identyfikuj wspólne mianowniki lub niespójności pomiędzy wieloma obszernymi dokumentami źródłowymi.</li>
                    <li><strong>Tworzeniu i korekcie tekstów:</strong> Generuj szablony odpowiedzi e-mailowych, twórz konspekty raportów, tłumacz dokumenty w ramach europejskiego perymetru grupy czy upraszczaj język techniczny na przyjazny dla klienta.</li>
                    <li><strong>Kodowaniu i pisaniu skryptów:</strong> Generuj powtarzalny kod (Python, SQL, VBA), debuguj błędy programistyczne i twórz dokumentację dla starszych systemów.</li>
                </ul>
            `
        },
        {
            id: 'chapter-3',
            num: 3,
            title: 'Nasz bezpieczny pakiet narzędzi AI: Gemini i NotebookLM',
            content: `
                <p>UniCredit udostępnia wszystkim pracownikom bezpieczny, profesjonalny pakiet narzędzi sztucznej inteligencji od Google. Korzystając z nich przy użyciu licencji korporacyjnej, masz pewność, że wszystkie dane banku są bezwzględnie chronione.</p>
                
                <h3>1. Google Gemini</h3>
                <p>Gemini to Twój główny asystent konwersacyjny. Jest zaprojektowany do interaktywnych zadań opartych na języku naturalnym.</p>
                <ul>
                    <li><strong>Najlepszy do:</strong> Burzy mózgów, redagowania treści, pisania i tłumaczenia kodu, podsumowywania wiadomości e-mail oraz prowadzenia badań rynkowych z wykorzystaniem bezpiecznego wyszukiwania w sieci w czasie rzeczywistym.</li>
                    <li><strong>Wielomodalność:</strong> Gemini potrafi przetwarzać i generować nie tylko tekst, ale również kod programistyczny, ustrukturyzowane tabele danych oraz obrazy.</li>
                </ul>

                <h3>2. Google NotebookLM</h3>
                <p>NotebookLM to Twój spersonalizowany asystent badawczy i analityczny. W przeciwieństwie do ogólnych czatów, NotebookLM działa w modelu <strong>pełnego ugruntowania (grounding)</strong> w dokumentach, które sam do niego wgrasz.</p>
                <ul>
                    <li><strong>Jak to działa:</strong> Tworzysz dedykowany „Notatnik” i wgrywasz dokumenty źródłowe (pliki PDF, Word, Dokumenty Google czy czysty tekst). Każde zadane pytanie otrzyma odpowiedź bazującą <em>wyłącznie</em> na treści tych plików.</li>
                    <li><strong>Kluczowa zaleta – Odnośniki (Cytowania):</strong> Każda wygenerowana odpowiedź zawiera klikalne, numerowane odnośniki prowadzące bezpośrednio do konkretnego zdania w Twoim dokumencie źródłowym. To praktycznie eliminuje zjawisko halucynacji AI!</li>
                    <li><strong>Najlepszy do:</strong> Analizowania procedur wewnętrznych, audytowania umów z dostawcami, syntezy wymagań szkoleniowych oraz porównywania wytycznych z różnych dokumentów polityk bankowych.</li>
                </ul>

                <div class="alert-box alert-important">
                    <div class="alert-icon">🛡️</div>
                    <div class="alert-text">
                        <strong>Gwarancje Ochrony Danych (W ramach Korporacyjnej Licencji Enterprise)</strong><br>
                        1. <strong>Brak trenowania modeli:</strong> Twoje prompty, zapytania i wgrane dokumenty <strong>nigdy</strong> nie są wykorzystywane przez firmę Google do trenowania publicznych modeli AI. Nasza poufna wiedza bankowa pozostaje wyłącznie naszą własnością.<br>
                        2. <strong>Brak weryfikacji przez ludzi:</strong> Żaden pracownik Google nie ma dostępu do Twoich konwersacji ani wgranych plików.<br>
                        3. <strong>Pełna izolacja danych:</strong> Twoje interakcje pozostają całkowicie odizolowane w bezpiecznej chmurze UniCredit. Żaden inny klient Google nie ma dostępu do Twoich danych.<br>
                        4. <strong>Zgodność z przepisami prawnymi:</strong> Nasz pakiet narzędzi jest objęty korporacyjnym aneksem o przetwarzaniu danych (CDPA) i w pełni spełnia rygorystyczne wymagania RODO.
                    </div>
                </div>

                <div class="alert-box alert-caution">
                    <div class="alert-icon">⚠️</div>
                    <div class="alert-text">
                        <strong>Zagrożenie związane z kontami prywatnymi</strong><br>
                        Opisane powyżej gwarancje bezpieczeństwa <strong>NIE OBOWIĄZUJĄ</strong>, jeśli korzystasz z prywatnego konta Google (@gmail.com) lub bezpłatnych publicznych usług AI (np. darmowego ChatGPT, Claude czy Copilot). Treści wprowadzane na kontach prywatnych podlegają analizie ludzkiej i są jawnie wykorzystywane do trenowania modeli publicznych. <strong>Nigdy</strong> nie wgrywaj danych UniCredit do publicznych narzędzi AI!
                    </div>
                </div>
            `
        },
        {
            id: 'chapter-4',
            num: 4,
            title: 'Zarządzanie AI i unijny Akt o AI',
            content: `
                <p>Aby promować podejście skoncentrowane na człowieku, Unia Europejska przyjęła <strong>Akt o Sztucznej Inteligencji (Rozporządzenie Parlamentu Europejskiego i Rady nr 2024/1689)</strong>. UniCredit w pełni dostosowuje swoje procesy do tych przełomowych przepisów, wdrażając oparty na ryzyku podział systemów do naszych procedur wewnętrznych.</p>
                
                <h3>Hierarchia Ryzyka Aktu o AI</h3>
                <p>Akt o AI klasyfikuje systemy sztucznej inteligencji na cztery poziomy ryzyka, przypisując im odpowiednie rygory zgodności:</p>
                <ul>
                    <li><strong>ZABRONIONE (Ryzyko nie do przyjęcia):</strong> Systemy manipulacyjne, podprogowe, rozpoznawanie emocji w miejscu pracy czy social scoring. <strong>Całkowity zakaz stosowania.</strong></li>
                    <li><strong>WYSOKIEGO RYZYKA:</strong> Modele oceny zdolności kredytowej, automatyczna filtracja CV w rekrutacji, profilowanie przestępstw finansowych. <strong>Ścisłe kontrole techniczne i prawne + zatwierdzenie przez Zarząd (ExCom).</strong></li>
                    <li><strong>OGRANICZONE RYZYKO:</strong> Generatywni asystenci konwersacyjni, chatboty obsługi klienta. <strong>Wymogi przejrzystości (użytkownik musi wiedzieć, że rozmawia z AI).</strong></li>
                    <li><strong>MINIMALNE RYZYKO:</strong> Filtry antyspamowe, proste algorytmy w grach. <strong>Brak dodatkowych obostrzeń prawnych.</strong></li>
                </ul>

                <h3>Niedozwolone Systemy AI (Bezwzględnie zakazane)</h3>
                <p>Systemy te stwarzają bezpośrednie zagrożenie dla praw człowieka i są surowo zabronione w UniCredit. Grupa nigdy nie będzie tworzyć, kupować ani wdrażać:</p>
                <ul>
                    <li>Technik podprogowych lub manipulacyjnych mających na celu zniekształcenie zachowań ludzi.</li>
                    <li>Systemów kategoryzacji biometrycznej wnioskujących o wrażliwych cechach (pochodzenie, religia, poglądy polityczne).</li>
                    <li><strong>Systemów rozpoznawania emocji stosowanych w miejscu pracy</strong> (z wyjątkiem bardzo nielicznych celów medycznych lub czysto bezpieczeństwa fizycznego).</li>
                    <li>Masowego, nieukierunkowanego scrapowania wizerunków twarzy z kamer monitoringu (CCTV) lub internetu w celu budowania baz danych.</li>
                    <li>Systemów oceny społecznej (social scoring) obywateli.</li>
                </ul>

                <h3>Systemy AI Wysokiego Ryzyka</h3>
                <p>Są to zaawansowane narzędzia o dużym wpływie na życie ludzi, które mogą być stosowane <em>wyłącznie</em> pod ścisłym nadzorem korporacyjnym. W bankowości zaliczamy do nich:</p>
                <ul>
                    <li><strong>Ocena zdolności kredytowej:</strong> Algorytmy oceniające wiarygodność finansową klientów indywidualnych oraz korporacyjnych ubiegających się o finansowanie.</li>
                    <li><strong>Rekrutacja i kadry (HR):</strong> Systemy służące do selekcji i filtrowania aplikacji kandydatów do pracy lub automatycznej oceny pracowników podczas awansów.</li>
                    <li><strong>Profilowanie transakcji (AML):</strong> Modele służące do automatycznego typowania i badania klientów pod kątem ryzyka prania pieniędzy i finansowania terroryzmu.</li>
                    <li><strong>Wymogi zgodności:</strong> Systemy te muszą posiadać dedykowany system zarządzania ryzykiem, najwyższą jakość danych uczących, szczegółowe logowanie techniczne operacji, mechanizmy nadzoru ludzkiego (human oversight) oraz przejść formalną <strong>ocenę wpływu na prawa podstawowe (FRIA)</strong>. Wymagają oficjalnej opinii Biura CISO oraz ostatecznej zgody <strong>Zarządu Banku (ExCom)</strong>.</li>
                </ul>
            `
        },
        {
            id: 'chapter-5',
            num: 5,
            title: 'Nasz wewnętrzny cykl życia i proces zarządzania AI',
            content: `
                <p>Zanim jakiekolwiek nowe narzędzie AI zostanie stworzone wewnętrznie, zakupione od zewnętrznego dostawcy lub uruchomione produkcyjnie, musi przejść przez obowiązkową ścieżkę opisaną w <strong>Procesie AI UniCredit v1.0</strong>:</p>
                
                <div class="static-svg-diagram">
                    <svg viewBox="0 0 600 320" width="100%" height="100%" style="background:#0e1017; border-radius:8px; padding:16px;">
                        <!-- Columns for Roles -->
                        <text x="60" y="20" fill="#cc0000" font-size="10" font-weight="700" text-anchor="middle">WŁAŚCICIEL AKTYWA</text>
                        <text x="220" y="20" fill="#949ab2" font-size="10" font-weight="700" text-anchor="middle">ZESPÓŁ RYZYKA IT</text>
                        <text x="380" y="20" fill="#949ab2" font-size="10" font-weight="700" text-anchor="middle">BIURO CISO</text>
                        <text x="540" y="20" fill="#cc0000" font-size="10" font-weight="700" text-anchor="middle">ZARZĄD BANKU</text>
                        
                        <!-- Partition Lines -->
                        <line x1="140" y1="10" x2="140" y2="300" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
                        <line x1="300" y1="10" x2="300" y2="300" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
                        <line x1="460" y1="10" x2="460" y2="300" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
                        
                        <!-- Flow Step 1 -->
                        <rect x="10" y="45" width="100" height="30" rx="3" fill="#1c1e2a" stroke="#626880" stroke-width="1"/>
                        <text x="60" y="63" fill="#ffffff" font-size="8" font-weight="600" text-anchor="middle">1. Pomysł / Koncepcja</text>
                        <path d="M110 60 L160 60" stroke="#cc0000" stroke-width="1" fill="none" marker-end="url(#arrow)"/>
                        
                        <!-- Flow Step 2 -->
                        <rect x="170" y="45" width="100" height="30" rx="3" fill="#1c1e2a" stroke="#cc0000" stroke-width="1"/>
                        <text x="220" y="63" fill="#ffffff" font-size="8" font-weight="600" text-anchor="middle">2. Kwalifikacja i Klasyfikacja</text>
                        
                        <path d="M220 75 L220 110 M220 110 L110 110" stroke="#626880" stroke-width="1" fill="none"/>
                        
                        <!-- Flow Step 3 -->
                        <rect x="10" y="125" width="100" height="30" rx="3" fill="#1c1e2a" stroke="#626880" stroke-width="1"/>
                        <text x="60" y="143" fill="#ffffff" font-size="8" font-weight="600" text-anchor="middle">3. Rejestracja CMDB</text>
                        
                        <path d="M60 155 L60 200 M60 200 L170 200" stroke="#cc0000" stroke-width="1" fill="none"/>
                        
                        <!-- Flow Step 4 -->
                        <rect x="170" y="185" width="100" height="30" rx="3" fill="#1c1e2a" stroke="#626880" stroke-width="1"/>
                        <text x="220" y="203" fill="#ffffff" font-size="8" font-weight="600" text-anchor="middle">4. Ocena Ryzyka i DPIA</text>
                        
                        <path d="M270 200 L330 200" stroke="#cc0000" stroke-width="1" fill="none"/>
                        
                        <!-- Flow Step 5 -->
                        <rect x="330" y="185" width="100" height="30" rx="3" fill="#1c1e2a" stroke="#cc0000" stroke-width="1"/>
                        <text x="380" y="203" fill="#ffffff" font-size="8" font-weight="600" text-anchor="middle">5. Opinia Techniczna CISO</text>
                        
                        <path d="M430 200 L490 200" stroke="#cc0000" stroke-width="1" fill="none"/>
                        
                        <!-- Flow Step 6 -->
                        <rect x="490" y="185" width="100" height="30" rx="3" fill="#1c1e2a" stroke="#cc0000" stroke-width="1"/>
                        <text x="540" y="203" fill="#ffffff" font-size="8" font-weight="600" text-anchor="middle">6. Decyzja Zarządu (ExCom)</text>
                        
                        <!-- Flow Step 7 -->
                        <path d="M540 215 L540 270 L60 270 L60 250" stroke="#626880" stroke-width="1" fill="none"/>
                        <rect x="10" y="220" width="100" height="30" rx="3" fill="#0f291b" stroke="#00c853" stroke-width="1"/>
                        <text x="60" y="238" fill="#ffffff" font-size="8" font-weight="600" text-anchor="middle">Monitorowanie / Audyt</text>
                    </svg>
                </div>

                <h3>Sześć Obowiązkowych Faz Procesu</h3>
                <ol>
                    <li><strong>Kwalifikacja (Qualification):</strong> Właściciel Aktywa zgłasza planowane narzędzie do pionu IT. Wspólnie z Zespołem Ryzyka IT wypełniają <em>Kwestionariusz Kwalifikacyjny AI UniCredit</em>, sprawdzając, czy dane oprogramowanie prawnie kwalifikuje się jako „System AI”.</li>
                    <li><strong>Klasyfikacja (Classification):</strong> Jeżeli oprogramowanie jest systemem AI, następuje określenie poziomu ryzyka (Zabronione, Wysokie, Ograniczone, Minimalne).</li>
                    <li><strong>Rejestracja CMDB:</strong> Narzędzie zostaje formalnie zarejestrowane w bazie konfiguracji IT (CMDB) ze specjalną flagą „System AI” oraz przypisaną oceną wpływu biznesowego (BIA).</li>
                    <li><strong>Ocena ryzyka i DPIA:</strong> Przeprowadzany jest szczegółowy audyt pod kątem bezpieczeństwa ICT, zgodności regulacyjnej, kwestii etycznych oraz ryzyka modelu. Jeśli system przetwarza dane osobowe, przeprowadzana jest formalna ocena skutków dla ochrony danych <strong>(DPIA)</strong> pod kątem RODO.</li>
                    <li><strong>Zatwierdzenie (Approvals):</strong>
                        <ul>
                            <li><em>Systemy ograniczonego ryzyka:</em> Wymagają akceptacji CIO / Dyrektora IT pionu.</li>
                            <li><em>Systemy wysokiego ryzyka:</em> Wymagają wiążącej opinii technicznej Biura CISO, pozytywnej rekomendacji CIO oraz ostatecznego, formalnego zatwierdzenia przez <strong>Zarząd Banku (ExCom)</strong>.</li>
                        </ul>
                    </li>
                    <li><strong>Stałe monitorowanie i recertyfikacja:</strong> Uruchomione systemy AI są stale monitorowane pod kątem dokładności działania, braku stronniczości i zjawiska dryfu modelu. Cała dokumentacja zgodności podlega obowiązkowej recertyfikacji <strong>raz w roku</strong>.</li>
                </ol>
            `
        },
        {
            id: 'chapter-6',
            num: 6,
            title: 'Złote zasady codziennego korzystania z AI (Co wolno, a czego nie)',
            content: `
                <p>Aby zachować maksymalną wydajność pracy przy jednoczesnym zachowaniu pełnego bezpieczeństwa i zgodności, przestrzegaj poniższej listy zasad:</p>
                
                <div class="alert-box alert-tip">
                    <div class="alert-icon">✓</div>
                    <div class="alert-text">
                        <strong>CO WOLNO — Działaj Mądrze i Bezpiecznie</strong><br>
                        <ul>
                            <li><strong>KORZYSTAJ wyłącznie z autoryzowanych narzędzi bankowych:</strong> Używaj Google Gemini i NotebookLM tylko po zalogowaniu się na swoje służbowe konto korporacyjne UniCredit. Te narzędzia są w pełni bezpieczne i licencjonowane dla banku.</li>
                            <li><strong>ZWSZE weryfikuj wyniki:</strong> Modele LLM generują odpowiedzi na bazie prawdopodobieństwa statystycznego, a nie zweryfikowanych faktów. <strong>Zawsze</strong> osobiście sprawdzaj liczby, odnośniki do procedur, wygenerowany kod oraz teksty przed ich wysłaniem do klienta lub przełożonego. To Ty ponosisz pełną odpowiedzialność za ostateczny efekt.</li>
                            <li><strong>ANONIMIZUJ i uogólniaj zapytania:</strong> Tworząc prompty lub wgrywając teksty, usuwaj z nich konkretne nazwiska klientów, numery kont, numery PESEL oraz unikalne tajemnice handlowe. Zastępuj je wartościami ogólnymi (np. „Klient A”, „Spółka X”).</li>
                            <li><strong>UTRZYMUJ nadzór ludzki (human-in-the-loop):</strong> Sztuczna inteligencja ma wspierać Twoją ocenę i wiedzę specjalistyczną, a nie całkowicie ją zastępować.</li>
                            <li><strong>REALIZUJ obowiązkowe szkolenia:</strong> Buduj swoje kompetencje cyfrowe zgodnie z wymaganiami Artykułu 4 Aktu o AI. Bądź na bieżąco z najnowszymi wytycznymi banku.</li>
                        </ul>
                    </div>
                </div>

                <div class="alert-box alert-warning">
                    <div class="alert-icon">✗</div>
                    <div class="alert-text">
                        <strong>CZEGO NIE WOLNO — Działania Zabronione stwarzające rygorystyczne ryzyko</strong><br>
                        <ul>
                            <li><strong>NIGDY nie używaj kont prywatnych ani darmowych narzędzi AI:</strong> Pod żadnym pozorem nie loguj się do Gemini przez prywatne konto @gmail.com i nie używaj publicznych, nielicencjonowanych narzędzi (np. darmowego ChatGPT, Midjourney itp.) do jakichkolwiek zadań służbowych.</li>
                            <li><strong>NIGDY nie wgrywaj danych osobowych klientów:</strong> Nie wprowadzaj wrażliwych informacji (PII) chronionych przez RODO do narzędzi AI, chyba że dany system przeszedł pełną ocenę DPIA i jest zarejestrowany w CMDB do takiego konkretnego celu.</li>
                            <li><strong>NIGDY nie wdrażaj nieautoryzowanych systemów AI:</strong> Nie podłączaj zewnętrznych kluczy API AI, nie uruchamiaj modeli open-source lokalnie na stacjach roboczych ani nie twórz własnych chatbotów bez przejścia obowiązkowego procesu IT Qualification i rejestracji CMDB.</li>
                            <li><strong>NIGDY nie stosuj praktyk niedozwolonych przez Akt o AI:</strong> Nie próbuj wdrażać ani testować rozwiązań służących do rozpoznawania emocji pracowników w miejscu pracy, profilowania biometrycznego czy oceny społecznej.</li>
                            <li><strong>NIGDY nie twórz treści wprowadzających w błąd:</strong> Nie wykorzystuj AI do generowania nieprawdziwych informacji lub syntetycznych materiałów, które mogą wprowadzić w błąd klientów lub współpracowników. Wszelkie interaktywne interfejsy oparte na AI muszą jasno deklarować swój charakter.</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: 'chapter-7',
            num: 7,
            title: 'Od indywidualnego pomysłu do skali korporacyjnej: Program wdrażania innowacji',
            content: `
                <p>Opracowałeś w Gemini świetny prompt, który automatyzuje pisanie cotygodniowych zestawień i oszczędza Twojemu zespołowi 10 godzin pracy? Masz przygotowany notatnik w NotebookLM idealnie analizujący skomplikowane warunki kredytowe i uważasz, że inne oddziały również mogłyby na tym skorzystać?</p>
                <p>Nie chcemy, aby Twoje innowacje pozostały w ukryciu! W UniCredit wierzymy w <strong>skalowanie oddolnych pomysłów pracowników do poziomu systemów korporacyjnych</strong>.</p>
                
                <h3>Jak Przekształcić Swój Pomysł w Oficjalne Narzędzie Banku</h3>
                <p>Jeśli stworzyłeś sprawdzony prompt, przepływ pracy lub unikalny zestaw dokumentów w NotebookLM, zgłoś go do naszego <strong>Programu Wdrażania Innowacji (Enterprise Adoption Program)</strong>:</p>
                
                <blockquote>
                    [Twój Pomysł] ──( E-mail: ai@unicredit.pl )──> [Weryfikacja Biura AI] ──> [Zabezpieczenia RODO & Audyt Aktu AI] ──> [Wdrożenie w Całym Banku]
                </blockquote>

                <ol>
                    <li><strong>Prześlij swoje zgłoszenie:</strong> Napisz e-mail na adres <strong>ai@unicredit.pl</strong>, załączając krótki opis swojego rozwiązania, promptu lub notatnika, wskazując jaki problem biznesowy rozwiązuje i jakie przynosi korzyści. (Możesz również skorzystać z wygodnego formularza w zakładce „Skaluj Pomysł” bezpośrednio w tym portalu!).</li>
                    <li><strong>Wspólne spotkanie robocze:</strong> Zespół ds. Zarządzania AI oraz Analytics Factory skontaktuje się z Tobą w ciągu 3 dni roboczych, aby umówić krótkie, 15-minutowe spotkanie w celu omówienia techniczych możliwości wdrożenia pomysłu w banku.</li>
                    <li><strong>Zarządzanie procesem zgodności:</strong> Nasz zespół bierze na siebie całą żmudną pracę formalną! Przeprowadzimy kwalifikację technologiczną, skoordynujemy analizę ryzyka bezpieczeństwa IT, uzyskamy opinie Compliance pod kątem RODO oraz zadbamy o zgodność z unijnym Aktem o AI.</li>
                    <li><strong>Oficjalne wdrożenie:</strong> Po pomyślnej weryfikacji zaadaptujemy Twoje rozwiązanie jako bezpieczny, zarejestrowany szablon lub samodzielną aplikację dostępną dla wszystkich uprawnionych pracowników w banku, a Ty zostaniesz oficjalnie wskazany jako jej autor!</li>
                </ol>
            `
        },
        {
            id: 'chapter-8',
            num: 8,
            title: 'Wsparcie i kontakty',
            content: `
                <p>Jeśli potrzebujesz porady, chcesz zgłosić potencjalny incydent lub masz innowacyjny pomysł do wdrożenia, skontaktuj się z odpowiednim zespołem:</p>
                
                <ul>
                    <li><strong>Innowacje AI, Skalowanie Prompów i Program Wdrażania:</strong><br>
                        📩 Służbowy e-mail: <strong>ai@unicredit.pl</strong><br>
                        <em>Kontakt w sprawie: Zgłaszania autorskich promptów, konfiguracji NotebookLM i pomysłów na narzędzia AI do wdrożenia korporacyjnego.</em>
                    </li>
                    <li class="mt-4"><strong>Biuro CISO (Polityka AI, Cyberbezpieczeństwo, Incydenty i Sygnaliści):</strong><br>
                        📩 Służbowy e-mail: <strong>cisooffice@unicredit.pl</strong><br>
                        <em>Kontakt w sprawie: Interpretacji Polityki AI, zgłaszania potencjalnych wycieków danych lub incydentów bezpieczeństwa, a także bezpiecznego raportowania naruszeń (Whistleblowing).</em>
                    </li>
                    <li class="mt-4"><strong>IT Governance (Proces AI, Kwalifikacja ICT i CMDB):</strong><br>
                        📩 Służbowy e-mail: <strong>itgovernance@unicredit.be</strong><br>
                        <em>Kontakt w sprawie: Rejestracji systemów w CMDB, przeprowadzania kwalifikacji nowych aktywów ICT oraz zarządzania cyklem życia zasobów IT.</em>
                    </li>
                </ul>

                <div class="alert-box alert-caution mt-4">
                    <div class="alert-icon">⚖️</div>
                    <div class="alert-text">
                        <strong>Zgłoszenia dla Sygnalistów (Whistleblowing)</strong><br>
                        W przypadku zidentyfikowania jakichkolwiek nadużyć związanych ze stosowaniem sztucznej inteligencji, naruszeń Kodeksu Postępowania, Polityki Integralności lub unijnego Aktu o AI, przysługuje Ci pełna ochrona prawna. Zachęcamy do natychmiastowego zgłoszenia incydentu. Zgodnie z oficjalną <strong>Polityką Sygnalistów</strong>, możesz złożyć w pełni poufny i bezpieczny raport bezpośrednio do biura CISO na adres cisooffice@unicredit.pl.
                    </div>
                </div>
            `
        }
    ];

    const COMPLIANCE_QUESTIONS = [
        {
            scenario: "„Zalogowałem się na moje służbowe konto korporacyjne Google Workspace w UniCredit. Chcę wgrać publiczny projekt unijnego Aktu o AI o objętości 40 stron do NotebookLM, aby podsumować kluczowe różnice. Czy jest to dozwolone?”",
            options: ["TAK, jest to dozwolone", "NIE, to naruszenie zasad"],
            correctIndex: 0,
            explanation: "Doskonale! To w pełni zgodne i bezpieczne użycie NotebookLM. Ponieważ logujesz się na konto korporacyjne, tarcza bezpieczeństwa Google zapewnia izolację Twoich danych. Ponadto projekt Aktu o AI jest dokumentem publicznym, więc nie występuje tu ryzyko wycieku tajemnicy bankowej."
        },
        {
            scenario: "„Pracuję z domu na moim prywatnym komputerze. Loguję się na prywatne konto ChatGPT i wklejam listę aktywnych klientów UniCredit wraz z saldami ich kont, aby asystent pomógł mi sformułować e-mail marketingowy. Czy jest to dozwolone?”",
            options: ["TAK, jest to dozwolone", "NIE, to naruszenie zasad"],
            correctIndex: 1,
            explanation: "Dokładnie! Wprowadzanie danych osobowych klientów (PII) do prywatnych/nielicencjonowanych narzędzi AI stanowi poważne naruszenie bezpieczeństwa i regulacji RODO. Pod publicznymi licencjami zapytania są rejestrowane i wykorzystywane do trenowania przyszłych modeli publicznych, co oznacza wyciek tajemnic banku na zewnątrz."
        },
        {
            scenario: "„Użyłem Gemini do wygenerowania skryptu w języku Python, który automatyzuje oczyszczanie danych. Kod wygląda bardzo profesjonalnie i poprawnie. Powinienem go natychmiast uruchomić na naszej produkcyjnej bazie danych z informacjami o klientach bez ręcznej weryfikacji.”",
            options: ["TAK, jest to dozwolone", "NIE, to naruszenie zasad"],
            correctIndex: 1,
            explanation: "Zgadza się! Wdrażanie niezweryfikowanego kodu wygenerowanego przez sztuczną inteligencję bezpośrednio na produkcji narusza wytyczne dotyczące nadzoru ludzkiego i bezpieczeństwa technicznego. Kod tworzony przez AI bazuje na prawdopodobieństwie i może zawierać błędy lub luki bezpieczeństwa. Zawsze najpierw testuj, audytuj i wdrażaj kod w środowisku testowym (staging)."
        },
        {
            scenario: "„Zewnętrzny dostawca oferuje system, który analizuje obraz z kamer CCTV w czasie rzeczywistym przy użyciu biometrycznego rozpoznawania emocji, aby monitorować zmęczenie i poziom stresu pracowników. Dyrektor oddziału chce go zainstalować. Czy jest to dozwolone?”",
            options: ["TAK, jest to dozwolone", "NIE, jest to zabronione"],
            correctIndex: 1,
            explanation: "Poprawnie! Zgodnie z unijnym Aktem o AI (oraz rygorystyczną Polityką AI v1.1 w UniCredit), stosowanie systemów biometrycznego rozpoznawania emocji w miejscu pracy jest bezwzględnie ZAKAZANE i nielegalne. UniCredit nigdy nie wdroży biometrycznego profilowania swoich pracowników."
        },
        {
            scenario: "„Spędziłem kilka godzin optymalizując zaawansowany prompt w Gemini, który automatyzuje analizę audytów kredytowych i oszczędza mojemu zespołowi 10 godzin tygodniowo. Chciałbym uczynić z tego oficjalne narzędzie banku. Czy powinienem napisać na adres ai@unicredit.pl?”",
            options: ["TAK, to jest właściwa ścieżka", "NIE, powinienem zachować to dla siebie"],
            correctIndex: 0,
            explanation: "Brawo! Zespół zarządzania AI Sylwii Szuby aktywnie prowadzi Program Wdrażania Innowacji (Enterprise Adoption Program). Kiedy zgłaszasz swoje prompty lub struktury NotebookLM na adres ai@unicredit.pl, nasz zespół wykonuje całą pracę związaną z analizą ryzyka, RODO oraz wdraża Twoje rozwiązanie w całym banku, oficjalnie uznając Ciebie za jego autora!"
        }
    ];

    const SIMULATOR_SCENARIOS = {
        gemini: [
            {
                title: "Szkic E-maila",
                prompt: "Napisz krótki, powitalny e-mail do nowego partnera biznesowego, wyjaśniający nasze cyfrowe i bezpieczne usługi bankowości.",
                response: `<p>Temat: Witamy w bezpiecznych usługach korporacyjnych UniCredit</p>
                           <p>Szanowny Partnerze,</p>
                           <p>Z ogromną przyjemnością witam Cię w gronie partnerów Grupy UniCredit. Z zaangażowaniem wspieramy rozwój Twojego przedsiębiorstwa poprzez dostarczanie pakietu bezpiecznych narzędzi cyfrowych. Nasze platformy działają w oparciu o surowe europejskie standardy bezpieczeństwa, gwarantując pełną poufność.</p>
                           <p>Cieszymy się na owocną współpracę.</p>
                           <p>Z wyrazami szacunku,<br>[Twoje Imię i Nazwisko]<br>Pion Bankowości Korporacyjnej UniCredit</p>`
            },
            {
                title: "Optymalizacja SQL",
                prompt: "Zoptymalizuj to zapytanie SQL, aby przefiltrować aktywne salda kredytów powyżej 50 000 PLN: SELECT * FROM loans WHERE bal > 50000",
                response: `<p>Aby zoptymalizować czas wykonywania zapytania i zachować optymalne indeksowanie, zastosuj filtrowanie według statusu aktywności oraz właściwej nazwy kolumn:</p>
                           <code>SELECT customer_id, loan_id, current_balance <br>FROM corporate_loans WITH (INDEX(idx_loan_status_bal)) <br>WHERE loan_status = 'ACTIVE' AND current_balance > 50000;</code>
                           <p>Uwaga: Zawsze uruchamiaj zapytania najpierw na bazie repliki testowej (staging), aby uniknąć blokowania wydajności produkcyjnej bazy danych.</p>`
            },
            {
                title: "Poufne Dane [ALERT]",
                prompt: "Zweryfikuj ten rekord z arkusza klienta: Nazwisko: Jan Kowalski, Konto: PL911240101, Saldo: 1 420 500 PLN.",
                response: `<blockquote style="border-left-color: var(--color-danger); background: var(--color-danger-bg); padding:10px; border-radius:4px; font-style:normal; margin-bottom:12px;">
                                <strong style="color:var(--color-danger); display:flex; align-items:center; gap:6px;">
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                    BLOKADA BEZPIECZEŃSTWA DANYCH OSOBOWYCH (PII)
                                </strong>
                                <span style="font-size:11px; display:block; margin-top:4px; color:var(--text-primary);">
                                    Wkleiłeś dane osobowe klientów banku chronione przez RODO (Nazwisko oraz numer konta).
                                    Nasza licencja korporacyjna odizolowała ten wątek od modeli publicznych, ale masz obowiązek uogólniać zapytania!
                                </span>
                           </blockquote>
                           <p><strong>Zanonimizowany Prompt Przesłany Dalej (Tryb Bezpieczny):</strong> Zweryfikuj rekord klienta: Nazwisko: <code>[Klient A]</code>, Konto: <code>[Zanonimizowano ID]</code>, Saldo: 1 420 500 PLN.</p>
                           <p><strong>Odpowiedź Asystenta:</strong><br>
                           Na podstawie polityki kredytowej UniCredit, saldo przekraczające 1M PLN kwalifikuje profil do segmentu Bankowości Prywatnej (Private Banking). Rekomendujemy przekazanie <code>[Klienta A]</code> do dedykowanego doradcy osobistego, dbając o to, aby żadne fizyczne dokumenty nie opuściły naszej bezpiecznej strefy.</p>`
            }
        ],
        notebook: [
            {
                title: "Rozpoznawanie emocji?",
                prompt: "Jakie są zasady dotyczące rozpoznawania emocji w miejscu pracy w UniCredit?",
                response: `<p>Zgodnie z <strong>Polityką AI v1.1 w UniCredit</strong>, systemy rozpoznawania emocji w miejscu pracy są bezwzględnie <strong>ZAKAZANE</strong> i zaklasyfikowane jako niedozwolony poziom ryzyka <span class="citation-mark" data-source="policy" data-line="chapter4">1</span>.</p>
                           <p>UniCredit zabrania tworzenia, zakupu lub wdrażania jakichkolwiek systemów AI próbujących wnioskować lub śledzić stany emocjonalne, poziom stresu czy skupienia uwagi pracowników podczas codziennej pracy, bez żadnych wyjątków <span class="citation-mark" data-source="policy" data-line="chapter4">2</span>.</p>`,
                highlightLine: "Systemy rozpoznawania emocji stosowane w miejscu pracy (z wyjątkiem ścisłych wskazań medycznych lub bezpieczeństwa) są bezwzględnie zabronione."
            },
            {
                title: "Zatwierdzenie wysokiego ryzyka?",
                prompt: "Jaka jest ścieżka zatwierdzania wdrożenia narzędzia AI wysokiego ryzyka, takiego jak ocena zdolności kredytowej?",
                response: `<p>Wdrożenie systemu AI wysokiego ryzyka (np. ocena zdolności kredytowej, selekcja aplikacji rekrutacyjnych HR, profilowanie AML) wymaga przejścia przez formalny proces opisany w <strong>Procesie AI v1.0</strong> <span class="citation-mark" data-source="process" data-line="chapter5">1</span>.</p>
                           <p>W szczególności Właściciel Aktywa ICT musi uzyskać: <br>
                           1. Formalną, wiążącą opinię techniczną od <strong>Biura CISO</strong> <span class="citation-mark" data-source="process" data-line="chapter5">2</span>. <br>
                           2. Szczegółową ocenę ryzyka oraz ocenę skutków dla ochrony danych (DPIA) pod kątem RODO <span class="citation-mark" data-source="process" data-line="chapter5">3</span>. <br>
                           3. Ostateczną, oficjalną akceptację i zatwierdzenie ze strony <strong>Zarządu Banku (ExCom)</strong> <span class="citation-mark" data-source="process" data-line="chapter5">4</span>.</p>`,
                highlightLine: "Systemy wysokiego ryzyka: Wymagają wiążącej opinii technicznej Biura CISO, weryfikacji dyrektora IT (CIO) oraz ostatecznego zatwierdzenia przez Zarząd Banku (ExCom)."
            }
        ]
    };


    // ==========================================================================
    // KONTROLER NAWIGACJI PO ZAKŁADKACH
    // ==========================================================================
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            navButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            
            btn.classList.add('active');
            const activeContent = document.getElementById(`${targetTab}-tab`);
            activeContent.classList.add('active');
            
            // Inicjalizacja specyficznych modułów
            if (targetTab === 'simulator') {
                initPlayground();
            } else if (targetTab === 'adoption') {
                initCanvasAnimation();
            }
        });
    });


    // ==========================================================================
    // KONTROLER MOTYWU (JASNY / CIEMNY)
    // ==========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');
        
        const isLight = document.body.classList.contains('light-theme');
        if (isLight) {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    });


    // ==========================================================================
    // KONTROLER SLAJDÓW PREZENTACJI
    // ==========================================================================
    const slides = document.querySelectorAll('.slide');
    const slideViewport = document.getElementById('slide-viewport');
    const slideIndexList = document.getElementById('slide-index-list');
    const prevBtn = document.getElementById('prev-slide-btn');
    const nextBtn = document.getElementById('next-slide-btn');
    const slideTrackerLabel = document.getElementById('slide-tracker-label');
    const slideProgressFill = document.getElementById('slide-progress-fill');
    const presenterNotesContent = document.getElementById('presenter-notes-content');
    const presenterNotesPanel = document.getElementById('presenter-notes-panel');
    const notesToggleBtn = document.getElementById('notes-toggle-btn');
    const playBtn = document.getElementById('play-slideshow-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const fsBtn = document.getElementById('fs-slide-btn');
    const restartSlidesBtn = document.getElementById('restart-slides-btn');

    let currentSlideIndex = 0;
    let autoPlayInterval = null;
    const AUTOPLAY_DELAY = 10000; // 10 sekund

    // Dynamiczne budowanie spisu treści agendy na panelu bocznym
    function buildSlideIndex() {
        slideIndexList.innerHTML = '';
        slides.forEach((slide, idx) => {
            const title = slide.getAttribute('data-title') || `Slajd ${idx + 1}`;
            const li = document.createElement('li');
            li.className = `slide-list-item ${idx === 0 ? 'active' : ''}`;
            li.innerHTML = `
                <span class="slide-item-num">${String(idx + 1).padStart(2, '0')}</span>
                <span>${title}</span>
            `;
            li.addEventListener('click', () => {
                goToSlide(idx);
                stopSlideshow();
            });
            slideIndexList.appendChild(li);
        });
    }

    function updateSlideUI() {
        slides.forEach((slide, idx) => {
            if (idx === currentSlideIndex) {
                slide.classList.add('active-slide');
            } else {
                slide.classList.remove('active-slide');
            }
        });

        // Aktualizacja aktywnych elementów na liście bocznej
        const items = slideIndexList.querySelectorAll('.slide-list-item');
        items.forEach((item, idx) => {
            if (idx === currentSlideIndex) {
                item.classList.add('active');
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                item.classList.remove('active');
            }
        });

        // Etykiety nawigacji slajdów
        slideTrackerLabel.textContent = `Slajd ${currentSlideIndex + 1} z ${slides.length}`;
        
        // Pasek postępu slajdów
        const percentage = ((currentSlideIndex + 1) / slides.length) * 100;
        slideProgressFill.style.width = `${percentage}%`;

        // Aktualizacja notatek prezentera
        const activeSlide = slides[currentSlideIndex];
        const notes = activeSlide.getAttribute('data-notes') || "Brak notatek prezentera dla tego układu slajdu.";
        presenterNotesContent.innerHTML = notes.replace(/\n/g, '<br>');
    }

    function goToSlide(index) {
        if (index < 0 || index >= slides.length) return;
        currentSlideIndex = index;
        updateSlideUI();
    }

    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlideIndex - 1);
        stopSlideshow();
    });

    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlideIndex + 1);
        stopSlideshow();
    });

    restartSlidesBtn.addEventListener('click', () => {
        goToSlide(0);
    });

    // Wsparcie klawiatury fizycznej
    document.addEventListener('keydown', (e) => {
        const presentationActive = document.getElementById('presentation-tab').classList.contains('active');
        if (!presentationActive) return;
        
        if (e.key === 'ArrowRight' || e.key === ' ') {
            goToSlide(currentSlideIndex + 1);
            stopSlideshow();
        } else if (e.key === 'ArrowLeft') {
            goToSlide(currentSlideIndex - 1);
            stopSlideshow();
        }
    });

    // Przełącznik widoczności notatek prezentera
    notesToggleBtn.addEventListener('click', () => {
        const isHidden = presenterNotesPanel.style.display === 'none' || presenterNotesPanel.style.display === '';
        presenterNotesPanel.style.display = isHidden ? 'flex' : 'none';
        notesToggleBtn.classList.toggle('active');
    });

    // Automatyczny odtwarzacz prezentacji
    function startSlideshow() {
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        playBtn.classList.add('btn-red');
        
        autoPlayInterval = setInterval(() => {
            if (currentSlideIndex === slides.length - 1) {
                goToSlide(0);
            } else {
                goToSlide(currentSlideIndex + 1);
            }
        }, AUTOPLAY_DELAY);
    }

    function stopSlideshow() {
        if (!autoPlayInterval) return;
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        playBtn.classList.remove('btn-red');
    }

    playBtn.addEventListener('click', () => {
        if (autoPlayInterval) {
            stopSlideshow();
        } else {
            startSlideshow();
        }
    });

    // Widok pełnoekranowy slajdów
    fsBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            slideViewport.requestFullscreen().catch(err => {
                console.error(`Błąd przełączania pełnego ekranu: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });

    buildSlideIndex();
    updateSlideUI();


    // ==========================================================================
    // INTERAKTYWNE ELEMENTY COMPONENTÓW SLAJDÓW
    // ==========================================================================
    
    // Slajd 13: Interaktywna Piramida Ryzyka
    const pyramidTiers = document.querySelectorAll('.pyramid-tier');
    const tierDisplayTitle = document.getElementById('tier-detail-title');
    const tierBadgeType = document.getElementById('tier-badge-type');
    const tierDetailDesc = document.getElementById('tier-detail-desc');
    const tierExamplesList = document.getElementById('tier-examples-list');

    const PYRAMID_DATA = {
        prohibited: {
            badge: "ZABRONIONE",
            badgeClass: "prohibited-badge",
            title: "Niedozwolony Poziom Ryzyka (Zakazane)",
            desc: "Systemy te stanowią bezpośrednie zagrożenie dla praw obywatelskich i bezpieczeństwa ludzi i są bezwzględnie zakazane na mocy Artykułu 5 Aktu o AI. UniCredit surowo zabrania ich rozwijania, zakupu czy wdrażania w jakiejkolwiek sferze operacyjnej banku bez żadnych wyjątków.",
            examples: [
                "<strong>Rozpoznawanie emocji w miejscu pracy:</strong> Systemy AI analizujące obraz twarzy, głos czy poziom skupienia uwagi u pracowników.",
                "<strong>Ocena społeczna (Social Scoring):</strong> Kategoryzacja obywateli na podstawie cech osobistych powiązanych z zachowaniami społecznymi.",
                "<strong>Scraping baz wizerunków twarzy:</strong> Masowe pobieranie obrazów z kamer CCTV lub internetu w celu tworzenia baz rozpoznawania biometrycznego."
            ]
        },
        highrisk: {
            badge: "WYSOKIE RYZYKO",
            badgeClass: "highrisk-badge",
            title: "Systemy Ścisłej Kontroli i Zgodności",
            desc: "Systemy mające bezpośredni wpływ na kluczowe decyzje życiowe jednostek lub infrastruktury krytycznej. Podlegają ścisłym regulacjom na mocy Tytułu III Aktu o AI. Mogą być wdrożone wyłącznie po przeprowadzeniu rygorystycznej oceny FRIA oraz uzyskaniu zgody Zarządu.",
            examples: [
                "<strong>Modele scoringu kredytowego:</strong> Główne algorytmy oceniające wiarygodność kredytową i ryzyko niewypłacalności klientów.",
                "<strong>Algorytmy rekrutacyjne HR:</strong> Systemy automatycznie oceniające lub odrzucające aplikacje CV kandydatów w procesach rekrutacji.",
                "<strong>Weryfikacje AML:</strong> Narzędzia profilowania zachowań transakcyjnych służące do wykrywania systemowej przestępczości finansowej."
            ]
        },
        limited: {
            badge: "OGRANICZONE RYZYKO",
            badgeClass: "limited-badge",
            title: "Systemy Skoncentrowane na Przejrzystości",
            desc: "Ogólne modele generatywne, chatboty czy deep-fakes. Podlegają lekkim wymaganiom przejrzystości na mocy Tytułu IV Aktu o AI. Użytkownik musi zostać wyraźnie poinformowany, że wchodzi w interakcję ze sztuczną inteligencją.",
            examples: [
                "<strong>Chatboty obsługi klienta:</strong> Wirtualni asystenci pomagający klientom w odzyskiwaniu haseł czy statusie kart.",
                "<strong>Asystenci generatywni:</strong> Licencjonowane, bezpieczne korporacyjne systemy Google Gemini oraz NotebookLM stosowane przez pracowników.",
                "<strong>Synteza i tłumaczenia:</strong> Narzędzia do automatycznego tłumaczenia pism proceduralnych w strukturach Grupy."
            ]
        },
        minimal: {
            badge: "MINIMALNE RYZYKO",
            badgeClass: "minimal-badge",
            title: "Nieregulowany Poziom Bezpieczeństwa",
            desc: "Ogromna większość powszechnie stosowanego oprogramowania biznesowego wykorzystująca proste, zautomatyzowane reguły logiczne. Nie podlegają regulacjom Aktu o AI ze względu na brak zagrożeń dla praw obywateli.",
            examples: [
                "<strong>Filtry antyspamowe:</strong> Klasyfikatory poczty elektronicznej filtrujące potencjalny phishing.",
                "<strong>Mechanika gier:</strong> Silniki logiki stosowane w grywalizacyjnych aplikacjach wdrożeniowych dla nowych klientów.",
                "<strong>Makra Excel VBA:</strong> Lokalne formuły ustrukturyzowane służące do szybkiego sortowania i filtrowania arkuszy danych."
            ]
        }
    };

    pyramidTiers.forEach(tier => {
        tier.addEventListener('click', () => {
            pyramidTiers.forEach(t => t.classList.remove('active-tier'));
            tier.classList.add('active-tier');
            
            const tierKey = tier.getAttribute('data-tier');
            const data = PYRAMID_DATA[tierKey];

            // Aktualizacja karty z efektem animacji
            const displayCard = document.getElementById('tier-detail-display');
            displayCard.style.opacity = '0';
            displayCard.style.transform = 'translateY(10px)';

            setTimeout(() => {
                tierBadgeType.textContent = data.badge;
                tierBadgeType.className = `tier-badge ${data.badgeClass}`;
                tierDisplayTitle.textContent = data.title;
                tierDetailDesc.innerHTML = data.desc;
                
                tierExamplesList.innerHTML = '';
                data.examples.forEach(ex => {
                    const li = document.createElement('li');
                    li.innerHTML = ex;
                    tierExamplesList.appendChild(li);
                });
                
                displayCard.style.opacity = '1';
                displayCard.style.transform = 'translateY(0)';
            }, 200);
        });
    });

    // Slajd 19: Interaktywna Ścieżka Wdrażania Innowacji AI
    const pipelineSteps = document.querySelectorAll('.pipeline-step');
    const pipelineFill = document.getElementById('pipeline-progress-fill');
    const pipelineInfoDisplay = document.getElementById('pipeline-info-display');

    const PIPELINE_INFO = {
        '1': {
            title: "Faza 1: Impuls (Lokalna Innowacja)",
            desc: "Wszystko zaczyna się od Twojej codziennej pracy. Piszesz genialny prompt, tworzysz bezpieczną makropłatność w Excelu lub przygotowujesz ustrukturyzowaną bazę wiedzy w NotebookLM, która oszczędza godziny ręcznej pracy."
        },
        '2': {
            title: "Faza 2: Dzielenie (ai@unicredit.pl)",
            desc: "Nie zatrzymuj sukcesu dla siebie! Prześlij swój pomysł na adres <strong>ai@unicredit.pl</strong>. W ciągu 3 dni roboczych nasz zespół ds. zarządzania AI zaplanuje krótkie, 15-minutowe spotkanie synchronizacyjne, aby ocenić potencjał wdrożenia rozwiązania w innych pionach banku."
        },
        '3': {
            title: "Faza 3: Zgodność (Audyt IT, Bezpieczeństwa i Prawa)",
            desc: "Nasz zespół przejmuje najtrudniejsze zadania! Rejestrujemy narzędzie w bazie konfiguracji IT CMDB, przeprowadzamy wymagane oceny ryzyka IT, analizujemy zgodność RODO (DPIA) i dbamy o zgodność z unijnym Aktem o AI."
        },
        '4': {
            title: "Faza 4: Skala (Wdrożenie w Banku)",
            desc: "Po pomyślnej weryfikacji wdrażamy Twój zestaw promptów lub bazę NotebookLM do bezpiecznego portalu korporacyjnego banku jako oficjalny, bezpieczny szablon. Twój pomysł staje się standardem, a Ty zyskujesz oficjalne uznanie jako autor!"
        }
    };

    pipelineSteps.forEach(step => {
        step.addEventListener('click', () => {
            pipelineSteps.forEach(s => s.classList.remove('active'));
            step.classList.add('active');
            
            const stepNum = step.getAttribute('data-step');
            const data = PIPELINE_INFO[stepNum];

            // Procentowa szerokość linii postępu
            const widthMap = { '1': '12%', '2': '38%', '3': '62%', '4': '100%' };
            pipelineFill.style.width = widthMap[stepNum];

            // Aktualizacja tekstu karty
            pipelineInfoDisplay.style.opacity = '0';
            setTimeout(() => {
                pipelineInfoDisplay.innerHTML = `
                    <h4>${data.title}</h4>
                    <p>${data.desc}</p>
                `;
                pipelineInfoDisplay.style.opacity = '1';
            }, 200);
        });
    });


    // ==========================================================================
    // DYNAMICZNY PODRĘCZNIK PRACOWNIKA Z WYSZUKIWARKĄ
    // ==========================================================================
    const handbookTOCList = document.getElementById('handbook-toc-list');
    const chaptersWrapper = document.getElementById('handbook-chapters-wrapper');
    const searchInput = document.getElementById('handbook-search');

    function buildHandbook() {
        handbookTOCList.innerHTML = '';
        chaptersWrapper.innerHTML = '';

        HANDBOOK_CHAPTERS.forEach((ch, idx) => {
            // Budowanie spisu treści
            const li = document.createElement('li');
            li.className = `toc-item ${idx === 0 ? 'active' : ''}`;
            li.textContent = `Rozdz. ${ch.num}: ${ch.title}`;
            li.addEventListener('click', () => {
                const activeItem = handbookTOCList.querySelector('.toc-item.active');
                if (activeItem) activeItem.classList.remove('active');
                li.classList.add('active');
                
                const chapterEl = document.getElementById(ch.id);
                chapterEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            handbookTOCList.appendChild(li);

            // Budowanie bloków treści
            const article = document.createElement('article');
            article.className = 'handbook-chapter';
            article.id = ch.id;
            article.innerHTML = `
                <h3>Rozdział ${ch.num}: ${ch.title}</h3>
                <div class="chapter-body">${ch.content}</div>
            `;
            chaptersWrapper.appendChild(article);
        });
    }

    // Filtrowanie wyszukiwania o wysokiej czułości z wyróżnianiem tekstu
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        const chapters = chaptersWrapper.querySelectorAll('.handbook-chapter');

        chapters.forEach(chapter => {
            const chId = chapter.id;
            const data = HANDBOOK_CHAPTERS.find(c => c.id === chId);
            const bodyEl = chapter.querySelector('.chapter-body');

            if (!query) {
                // Przywracanie domyślnych wartości
                bodyEl.innerHTML = data.content;
                chapter.style.display = 'block';
                return;
            }

            const rawText = bodyEl.textContent.toLowerCase();
            if (rawText.includes(query)) {
                chapter.style.display = 'block';
                
                // Wyróżnianie wystąpień słów
                const regex = new RegExp(`(${query})`, 'gi');
                let updatedContent = data.content;
                
                // Bezpieczne podstawianie znaczników Mark bez zaburzania struktury HTML
                updatedContent = updatedContent.replace(regex, '<mark style="background:#cc0000; color:#ffffff; padding:2px; border-radius:3px;">$1</mark>');
                bodyEl.innerHTML = updatedContent;
            } else {
                chapter.style.display = 'none';
            }
        });
    });

    buildHandbook();


    // ==========================================================================
    // GRA TESTOWA ZGODNOŚCI AI (COMPLIANCE CHALLENGE)
    // ==========================================================================
    const quizStartScreen = document.getElementById('quiz-start-screen');
    const quizPlayScreen = document.getElementById('quiz-play-screen');
    const quizResultScreen = document.getElementById('quiz-result-screen');
    const quizRegForm = document.getElementById('quiz-reg-form');
    const studentNameInput = document.getElementById('student-name');
    const studentDeptInput = document.getElementById('student-dept');

    const quizQCounter = document.getElementById('quiz-q-counter');
    const quizProgressFill = document.getElementById('quiz-progress-fill');
    const quizQuestionText = document.getElementById('quiz-question-text');
    const quizOptionsContainer = document.getElementById('quiz-options-container');
    const quizExplanationBox = document.getElementById('quiz-explanation-box');
    const expStatusIcon = document.getElementById('explanation-status-icon');
    const expStatusTitle = document.getElementById('explanation-status-title');
    const expText = document.getElementById('explanation-text');
    const quizNextBtn = document.getElementById('quiz-next-btn');

    const certEmployeeName = document.getElementById('cert-employee-name');
    const certCompletionDate = document.getElementById('cert-completion-date');
    const certScoreLabel = document.getElementById('cert-score-label');
    const printCertBtn = document.getElementById('print-certificate-btn');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');

    let activeQuestionIdx = 0;
    let quizScore = 0;
    let employeeName = "Sylwia Szuba";
    let employeeDept = "Pion Zarządzania AI";

    quizRegForm.addEventListener('submit', (e) => {
        e.preventDefault();
        employeeName = studentNameInput.value.trim() || "Pracownik UniCredit";
        employeeDept = studentDeptInput.value.trim() || "Bank UniCredit";
        
        quizStartScreen.classList.add('hidden');
        quizPlayScreen.classList.remove('hidden');
        
        activeQuestionIdx = 0;
        quizScore = 0;
        loadQuizQuestion();
    });

    function loadQuizQuestion() {
        quizExplanationBox.classList.add('hidden');
        
        const qData = COMPLIANCE_QUESTIONS[activeQuestionIdx];
        
        // Aktualizacja nagłówków
        quizQCounter.textContent = `Scenariusz ${activeQuestionIdx + 1} z ${COMPLIANCE_QUESTIONS.length}`;
        const pct = ((activeQuestionIdx + 1) / COMPLIANCE_QUESTIONS.length) * 100;
        quizProgressFill.style.width = `${pct}%`;
        
        quizQuestionText.textContent = qData.scenario;
        
        // Budowanie przycisków opcji
        quizOptionsContainer.innerHTML = '';
        qData.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-opt-btn';
            btn.textContent = opt;
            btn.addEventListener('click', () => handleQuizAnswer(idx, btn));
            quizOptionsContainer.appendChild(btn);
        });
    }

    function handleQuizAnswer(selectedIndex, selectedBtn) {
        const qData = COMPLIANCE_QUESTIONS[activeQuestionIdx];
        const buttons = quizOptionsContainer.querySelectorAll('.quiz-opt-btn');
        
        // Zablokowanie przycisków
        buttons.forEach(b => b.disabled = true);
        
        const isCorrect = selectedIndex === qData.correctIndex;
        if (isCorrect) {
            quizScore++;
            selectedBtn.classList.add('correct-choice');
            expStatusIcon.textContent = "✓";
            expStatusIcon.style.background = "var(--color-success-bg)";
            expStatusIcon.style.color = "var(--color-success)";
            expStatusTitle.textContent = "POPRAWNIE I ZGODNIE Z ZASADAMI!";
            quizExplanationBox.className = "quiz-explanation-box correct-explanation";
        } else {
            selectedBtn.classList.add('wrong-choice');
            // Podświetlenie prawidłowego wyboru
            buttons[qData.correctIndex].classList.add('correct-choice');
            
            expStatusIcon.textContent = "✗";
            expStatusIcon.style.background = "var(--color-danger-bg)";
            expStatusIcon.style.color = "var(--color-danger)";
            expStatusTitle.textContent = "NARUSZENIE ZGODNOŚCI!";
            quizExplanationBox.className = "quiz-explanation-box wrong-explanation";
        }
        
        expText.textContent = qData.explanation;
        quizExplanationBox.classList.remove('hidden');
    }

    quizNextBtn.addEventListener('click', () => {
        if (activeQuestionIdx === COMPLIANCE_QUESTIONS.length - 1) {
            // Koniec testu, pokazanie certyfikatu
            quizPlayScreen.classList.add('hidden');
            quizResultScreen.classList.remove('hidden');
            generateCertificate();
        } else {
            activeQuestionIdx++;
            loadQuizQuestion();
        }
    });

    function generateCertificate() {
        certEmployeeName.textContent = employeeName;
        certScoreLabel.textContent = `${quizScore} z ${COMPLIANCE_QUESTIONS.length}`;
        
        // Formatowanie aktualnej daty po polsku
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        certCompletionDate.textContent = today.toLocaleDateString('pl-PL', options);
    }

    printCertBtn.addEventListener('click', () => {
        window.print();
    });

    restartQuizBtn.addEventListener('click', () => {
        quizResultScreen.classList.add('hidden');
        quizStartScreen.classList.remove('hidden');
    });


    // ==========================================================================
    // BEZPIECZNY SYMULATOR / PIASKOWNICA AI
    // ==========================================================================
    const simToolButtons = document.querySelectorAll('.tool-btn');
    const simGeminiBox = document.getElementById('sim-gemini-box');
    const simNotebookBox = document.getElementById('sim-notebook-box');
    const playgroundScenariosBox = document.getElementById('playground-scenarios-box');

    const geminiChatViewport = document.getElementById('gemini-chat-viewport');
    const geminiChatInput = document.getElementById('gemini-chat-input');
    const geminiSendBtn = document.getElementById('gemini-send-btn');

    const notebookChatViewport = document.getElementById('notebook-chat-viewport');
    const notebookChatInput = document.getElementById('notebook-chat-input');
    const notebookSendBtn = document.getElementById('notebook-send-btn');
    const sourceSnippetText = document.getElementById('source-snippet-text');
    const sourceFileItems = document.querySelectorAll('.source-file-item');

    let activeTool = 'gemini'; // 'gemini' lub 'notebook'

    // Słownik procedur bankowych dla ugruntowania bazy NotebookLM
    const DOCUMENT_SNIPPETS = {
        policy: `[Polityka AI Grupy UniCredit v1.1 - SEKCJA 4.1]\nSystemy rozpoznawania emocji stosowane w miejscu pracy (z wyjątkiem ścisłych wskazań medycznych lub bezpieczeństwa) są bezwzględnie zabronione.\nWszelkie oprogramowanie wykorzystujące fizyczną kategoryzację biometryczną lub algorytmy scrapowania twarzy z kamer CCTV stanowi sztuczną inteligencję niedozwoloną (Zabronioną) i skutkuje natychmiastowym audytem zgodności.`,
        process: `[Proces AI w UniCredit v1.0 - SEKCJA 2.3]\nSystemy wysokiego ryzyka: Wymagają wiążącej opinii technicznej Biura CISO, weryfikacji dyrektora IT (CIO) oraz ostatecznego zatwierdzenia przez Zarząd Banku (ExCom).\nWszystkie aktywa wysokiego ryzyka muszą być zarejestrowane w bazie konfiguracji IT (CMDB), przejść pełny audyt DPIA pod kątem RODO oraz podlegać corocznej recertyfikacji.`
    };

    function initPlayground() {
        buildPlaygroundScenarios();
        
        // Domyślny snippet podglądu procedur
        sourceSnippetText.innerText = DOCUMENT_SNIPPETS.policy;
    }

    // Przełączanie narzędzi w piaskownicy (Gemini / NotebookLM)
    simToolButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            simToolButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            activeTool = btn.getAttribute('data-tool');
            if (activeTool === 'gemini') {
                simGeminiBox.classList.remove('hidden');
                simNotebookBox.classList.add('hidden');
            } else {
                simGeminiBox.classList.add('hidden');
                simNotebookBox.classList.remove('hidden');
            }
            buildPlaygroundScenarios();
        });
    });

    // Budowanie bocznych przycisków szybkich scenariuszy
    function buildPlaygroundScenarios() {
        playgroundScenariosBox.innerHTML = '';
        const list = SIMULATOR_SCENARIOS[activeTool];
        
        list.forEach(sc => {
            const btn = document.createElement('button');
            btn.className = 'scenario-p-btn';
            btn.textContent = sc.title;
            btn.addEventListener('click', () => {
                if (activeTool === 'gemini') {
                    geminiChatInput.value = sc.prompt;
                } else {
                    notebookChatInput.value = sc.prompt;
                }
            });
            playgroundScenariosBox.appendChild(btn);
        });
    }

    // Interaktywna zmiana aktywnego dokumentu źródłowego
    sourceFileItems.forEach(item => {
        item.addEventListener('click', () => {
            sourceFileItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const docKey = item.getAttribute('data-source');
            sourceSnippetText.innerText = DOCUMENT_SNIPPETS[docKey];
        });
    });

    // CHAT GEMINI - OBSŁUGA
    function sendGeminiMessage() {
        const query = geminiChatInput.value.trim();
        if (!query) return;

        // Wiadomość użytkownika
        appendChatBubble(geminiChatViewport, 'user-msg', '👤', `<p>${query}</p>`);
        geminiChatInput.value = '';

        // Animacja pisania
        const typingId = appendChatBubble(geminiChatViewport, 'bot-msg', '♊', `<p><i>Gemini przygotowuje odpowiedź...</i></p>`);
        geminiChatViewport.scrollTop = geminiChatViewport.scrollHeight;

        setTimeout(() => {
            // Sprawdzenie, czy zapytanie odpowiada szybkiemu szablonowi
            const matchedTemplate = SIMULATOR_SCENARIOS.gemini.find(s => s.prompt.toLowerCase() === query.toLowerCase());
            let botHTML = '';
            
            if (matchedTemplate) {
                botHTML = matchedTemplate.response;
            } else {
                // Bezpieczna blokada wycieku danych (PII)
                if (query.toLowerCase().includes('kowalski') || query.toLowerCase().includes('balance') || query.toLowerCase().includes('konto') || query.toLowerCase().includes('saldo') || query.toLowerCase().includes('pl91')) {
                    botHTML = SIMULATOR_SCENARIOS.gemini[2].response;
                } else {
                    botHTML = `<p>Przetworzyłam Twoje zapytanie w sposób całkowicie bezpieczny wewnątrz korporacyjnej domeny UniCredit. Zgodnie z naszą umową korporacyjną, Twoje dane wejściowe pozostają w pełni odizolowane i nie będą wykorzystywane do trenowania publicznych modeli sztucznej inteligencji.</p>
                               <p>Oto przygotowany szkic, który ułatwi Ci codzienne zadania. Pamiętaj o zastosowaniu nadzoru ludzkiego i weryfikacji szczegółów.</p>`;
                }
            }

            // Podmiana bąbelka pisania na odpowiedź
            const typingBubble = document.getElementById(typingId);
            if (typingBubble) {
                typingBubble.querySelector('.msg-content').innerHTML = botHTML;
            }
            geminiChatViewport.scrollTop = geminiChatViewport.scrollHeight;
        }, 1500);
    }

    // CHAT NOTEBOOKLM - OBSŁUGA
    function sendNotebookMessage() {
        const query = notebookChatInput.value.trim();
        if (!query) return;

        appendChatBubble(notebookChatViewport, 'user-msg', '👤', `<p>${query}</p>`);
        notebookChatInput.value = '';

        const typingId = appendChatBubble(notebookChatViewport, 'bot-msg', '📓', `<p><i>NotebookLM przeszukuje wgrane dokumenty...</i></p>`);
        notebookChatViewport.scrollTop = notebookChatViewport.scrollHeight;

        setTimeout(() => {
            const matchedTemplate = SIMULATOR_SCENARIOS.notebook.find(s => s.prompt.toLowerCase() === query.toLowerCase());
            let botHTML = '';
            
            if (matchedTemplate) {
                botHTML = matchedTemplate.response;
                
                // Automatyczne podświetlenie odpowiadającego zdania w panelu obok!
                const sourceKey = matchedTemplate.prompt.toLowerCase().includes('emocji') || matchedTemplate.prompt.toLowerCase().includes('emotion') ? 'policy' : 'process';
                const fileTab = document.querySelector(`.source-file-item[data-source="${sourceKey}"]`);
                if (fileTab) fileTab.click();
                
                const highlightText = matchedTemplate.highlightLine;
                const snippetText = DOCUMENT_SNIPPETS[sourceKey];
                const parts = snippetText.split(highlightText);
                if (parts.length === 2) {
                    sourceSnippetText.innerHTML = `${parts[0]}<mark style="background:rgba(212,175,55,0.4); border-radius:3px; border-bottom:1.5px solid var(--color-gold); padding:2px; color:#ffffff;">${highlightText}</mark>${parts[1]}`;
                }
            } else {
                botHTML = `<p>Twoje zapytanie nie pasuje do żadnych struktur opisanych we wgranych plikach polityk bankowych.</p>
                           <p>Ponieważ działam w modelu <strong>ściśle zamkniętej pętli (closed-loop)</strong>, odpowiadam wyłącznie w oparciu o treści zawarte w plikach <strong>AI_Policy_v1.1.pdf</strong> oraz <strong>AI_Process_v1.0.pdf</strong>, aby wyeliminować halucynacje.</p>`;
            }

            const typingBubble = document.getElementById(typingId);
            if (typingBubble) {
                typingBubble.querySelector('.msg-content').innerHTML = botHTML;
                
                // Dodanie interaktywnych nasłuchiwaczy dla numerów cytowań!
                const citationMarks = typingBubble.querySelectorAll('.citation-mark');
                citationMarks.forEach(cm => {
                    cm.addEventListener('click', () => {
                        const targetDoc = cm.getAttribute('data-source');
                        const fileBtn = document.querySelector(`.source-file-item[data-source="${targetDoc}"]`);
                        if (fileBtn) fileBtn.click();
                        
                        sourceSnippetText.style.background = 'var(--uc-red-glass)';
                        setTimeout(() => {
                            sourceSnippetText.style.background = 'rgba(0,0,0,0.15)';
                        }, 500);
                    });
                });
            }
            notebookChatViewport.scrollTop = notebookChatViewport.scrollHeight;
        }, 1500);
    }

    function appendChatBubble(viewport, typeClass, avatar, innerHTML) {
        const msgId = `msg-${Date.now()}`;
        const div = document.createElement('div');
        div.className = `chat-message ${typeClass}`;
        div.id = msgId;
        div.innerHTML = `
            <span class="chat-avatar">${avatar}</span>
            <div class="msg-content">${innerHTML}</div>
        `;
        viewport.appendChild(div);
        return msgId;
    }

    geminiSendBtn.addEventListener('click', sendGeminiMessage);
    geminiChatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendGeminiMessage(); });

    notebookSendBtn.addEventListener('click', sendNotebookMessage);
    notebookChatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendNotebookMessage(); });


    // ==========================================================================
    // FLIGHT CANVAS - ANIMACJA CZĄSTECZKOWA I KOLEJKA WNIOSKÓW
    // ==========================================================================
    const canvas = document.getElementById('email-flight-canvas');
    const ctx = canvas.getContext('2d');
    const submissionForm = document.getElementById('adoption-submission-form');
    const localSubList = document.getElementById('local-submissions-list');

    let animationId = null;
    let particles = [];
    let state = 'idle'; // 'idle', 'flight', 'success'

    const MOCK_SUBMISSIONS = [
        {
            title: "Zautomatyzowany Analizator Umów Kredytowych w NotebookLM",
            desc: "Zweryfikowana i bezpieczna biblioteka plików w NotebookLM przechowująca ogólne warunki kredytowe, umożliwiająca błyskawiczny audyt zapisów pod kątem zgodności z politykami banku.",
            weeklySaved: "Oszczędza ok. 8 godzin tygodniowo na jednego analityka.",
            date: "10 czerwca 2026",
            status: "ZATWIERDZONE I WDROŻONE 🚀"
        },
        {
            title: "Generator Zapytiań SQL w Gemini",
            desc: "Ustrukturyzowany szablon promptu dla Google Gemini, który przekłada pytania biznesowe sformułowane w języku polskim na zoptymalizowane pod kątem indeksów zapytania SQL.",
            weeklySaved: "Oszczędza ok. 4 godziny tygodniowo na analityka ryzyka.",
            date: "14 czerwca 2026",
            status: "W TRAKCIE AUDYTU ZGODNOŚCI"
        }
    ];

    function renderLocalQueue() {
        localSubList.innerHTML = '';
        MOCK_SUBMISSIONS.forEach(sub => {
            const div = document.createElement('div');
            div.className = 'submission-item';
            
            const isApproved = sub.status.includes('APPROVED') || sub.status.includes('ZATWIERDZONE');
            const statusClass = isApproved ? 'approved' : 'review';
            
            div.innerHTML = `
                <div class="sub-header-row">
                    <h4>${sub.title}</h4>
                    <span class="sub-status-badge ${statusClass}">${sub.status}</span>
                </div>
                <div class="sub-meta-row">
                    <span>Data: ${sub.date}</span>
                    <span>Korzyść: ${sub.weeklySaved}</span>
                </div>
                <p class="sub-desc-snippet">${sub.desc}</p>
            `;
            localSubList.appendChild(div);
        });
    }

    function initCanvasAnimation() {
        resizeCanvas();
        state = 'idle';
        particles = [];
        drawIdleState();
    }

    function resizeCanvas() {
        const rect = canvas.parentNode.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }

    window.addEventListener('resize', () => {
        if (document.getElementById('adoption-tab').classList.contains('active')) {
            resizeCanvas();
            drawIdleState();
        }
    });

    function drawIdleState() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        
        // Gradient tła
        const grad = ctx.createLinearGradient(0,0,canvas.width, canvas.height);
        grad.addColorStop(0, '#0c0d12');
        grad.addColorStop(1, '#14161f');
        ctx.fillStyle = grad;
        ctx.fillRect(0,0,canvas.width, canvas.height);

        // Ramka węzła bazy danych
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

        ctx.fillStyle = 'var(--text-secondary)';
        ctx.font = 'bold 11px Montserrat';
        ctx.textAlign = 'center';
        ctx.fillText('PROCES WDRAŻANIA INNOWACJI NA AI@UNICREDIT.PL', canvas.width/2, canvas.height/2 + 5);
    }

    function runFlightAnimation(onComplete) {
        state = 'flight';
        particles = [];
        const startX = 40;
        const startY = canvas.height / 2;
        const endX = canvas.width - 80;
        const endY = canvas.height / 2;

        // Generowanie strumieni pakietów binarnych
        for (let i = 0; i < 40; i++) {
            particles.push({
                x: startX + Math.random() * 20,
                y: startY + (Math.random() - 0.5) * 30,
                vx: 3 + Math.random() * 5,
                vy: (Math.random() - 0.5) * 2,
                char: Math.random() > 0.5 ? '1' : '0',
                color: Math.random() > 0.4 ? 'var(--uc-red)' : 'var(--color-gold)',
                size: 8 + Math.random() * 4,
                alpha: 0.5 + Math.random() * 0.5
            });
        }

        let planeX = startX;
        let planeY = startY;

        function animate() {
            if (state !== 'flight') return;
            ctx.clearRect(0,0,canvas.width, canvas.height);
            
            const grad = ctx.createLinearGradient(0,0,canvas.width, canvas.height);
            grad.addColorStop(0, '#0c0d12');
            grad.addColorStop(1, '#14161f');
            ctx.fillStyle = grad;
            ctx.fillRect(0,0,canvas.width, canvas.height);

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.strokeRect(40, 20, canvas.width - 80, canvas.height - 40);

            // Aktualizacja cząsteczek
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= 0.003;
                if (p.x > endX) {
                    p.x = startX;
                    p.alpha = 1;
                }
                ctx.fillStyle = p.color;
                ctx.globalAlpha = Math.max(0, p.alpha);
                ctx.font = `${p.size}px monospace`;
                ctx.fillText(p.char, p.x, p.y);
            });
            ctx.globalAlpha = 1.0;

            // Aktualizacja samolotu papierowego
            planeX += 4.5;
            planeY = startY + Math.sin(planeX * 0.04) * 15;

            // Rysowanie samolotu papierowego wektorowo
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.moveTo(planeX, planeY);
            ctx.lineTo(planeX - 18, planeY - 6);
            ctx.lineTo(planeX - 12, planeY + 2);
            ctx.closePath();
            ctx.fill();

            ctx.strokeStyle = 'rgba(255,255,255,0.7)';
            ctx.beginPath();
            ctx.moveTo(planeX, planeY);
            ctx.lineTo(planeX - 16, planeY + 5);
            ctx.lineTo(planeX - 12, planeY + 2);
            ctx.stroke();

            // Rysowanie ikony docelowej skrzynki pocztowej
            ctx.fillStyle = 'var(--uc-red)';
            ctx.beginPath();
            ctx.arc(endX + 30, endY, 20, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 9px Montserrat';
            ctx.fillText('E-MAIL', endX + 30, endY + 3);

            if (planeX > endX + 15) {
                state = 'success';
                drawSuccessState(onComplete);
            } else {
                animationId = requestAnimationFrame(animate);
            }
        }
        animate();
    }

    function drawSuccessState(onComplete) {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        
        ctx.fillStyle = '#0c0d12';
        ctx.fillRect(0,0,canvas.width, canvas.height);

        ctx.fillStyle = 'var(--color-success)';
        ctx.font = 'bold 15px Montserrat';
        ctx.textAlign = 'center';
        ctx.fillText('POMYŚLNIE WYSŁANO ZGŁOSZENIE! ✓', canvas.width/2, canvas.height/2 - 5);
        
        ctx.fillStyle = 'var(--text-secondary)';
        ctx.font = '11px Inter';
        ctx.fillText('Monitoruj status weryfikacji w panelu poniżej.', canvas.width/2, canvas.height/2 + 15);

        onComplete();
        setTimeout(() => {
            initCanvasAnimation();
        }, 3000);
    }

    submissionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const subBtn = document.getElementById('submit-innovation-btn');
        subBtn.disabled = true;
        subBtn.innerText = "Przesyłanie wniosku na ai@unicredit.pl...";

        const ideaTitle = document.getElementById('sub-title').value;
        const ideaDesc = document.getElementById('sub-desc').value;
        const ideaBenefits = document.getElementById('sub-benefits').value;

        runFlightAnimation(() => {
            const today = new Date();
            const dateStr = today.toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' });
            
            MOCK_SUBMISSIONS.unshift({
                title: ideaTitle,
                desc: ideaDesc,
                weeklySaved: ideaBenefits,
                date: dateStr,
                status: "W TRAKCIE AUDYTU ZGODNOŚCI"
            });
            renderLocalQueue();
            
            // Czyszczenie pól formularza
            document.getElementById('sub-title').value = '';
            document.getElementById('sub-desc').value = '';
            document.getElementById('sub-benefits').value = '';
            
            subBtn.disabled = false;
            subBtn.innerText = "Prześlij Pomysł na ai@unicredit.pl 🚀";
        });
    });

    renderLocalQueue();

});
