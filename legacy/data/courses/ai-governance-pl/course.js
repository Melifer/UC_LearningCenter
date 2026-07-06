// ==========================================================================
// COURSE: AI Governance & Awareness — POLISH VERSION
// ID: ai-governance-pl
// ==========================================================================

export const COURSE_META = {
    id: 'ai-governance-pl',
    baseId: 'ai-governance',
    language: 'pl',
    title: 'Świadomość AI i Zarządzanie',
    subtitle: 'Masterclass UniCredit',
    description: 'Kompletne szkolenie z zakresu bezpiecznego korzystania ze sztucznej inteligencji, unijnego Aktu o AI oraz wewnętrznych procedur UniCredit.',
    coverIcon: '🧠',
    estimatedMinutes: 60,
    passingScore: 80,
    // Demo: how many slides visible in unlocked/demo mode (first N slides)
    demoSlides: 5,
    instructorName: 'Sylwia Szuba',
    instructorTitle: 'AI Governance Lead & Foundation Domain Owner',
    // Contact config (hidden from UI — used by contact/Q&A form)
    contactEmail: 'ai@unicredit.pl',
    contactName: 'Sylwia Szuba',
    modules: [
        {
            id: 'module-1',
            title: 'Czym jest AI i Generatywne AI?',
            icon: '🧠',
            slideIds: ['slide-1', 'slide-2', 'slide-3', 'slide-4', 'slide-5']
        },
        {
            id: 'module-2',
            title: 'Dlaczego AI? Codzienna Efektywność',
            icon: '🚀',
            slideIds: ['slide-6', 'slide-7', 'slide-8']
        },
        {
            id: 'module-3',
            title: 'Nasz Bezpieczny Pakiet AI',
            icon: '🛡️',
            slideIds: ['slide-9', 'slide-10', 'slide-11']
        },
        {
            id: 'module-4',
            title: 'Zarządzanie AI i Akt o AI',
            icon: '⚖️',
            slideIds: ['slide-12', 'slide-13', 'slide-14', 'slide-15']
        },
        {
            id: 'module-5',
            title: 'Złote Zasady i Skalowanie',
            icon: '📋',
            slideIds: ['slide-16', 'slide-17', 'slide-18', 'slide-19', 'slide-20', 'slide-21']
        }
    ]
};

export const SLIDES = [
    {
        id: 'slide-1',
        title: 'Slajd Tytułowy',
        notes: 'Serdecznie witam wszystkich na sesji szkoleniowej UniCredit poświęconej świadomości AI. Przedstaw się jako lider ds. zarządzania sztuczną inteligencją. Podkreśl, że UniCredit pragnie wspierać pracowników w codziennej pracy najnowocześniejszymi narzędziami, ale zawsze w sposób całkowicie bezpieczny i zgodny z regulacjami prawnymi.',
        html: `<div class="slide-container cover-layout">
                    <div class="cover-glow"></div>
                    <div class="cover-content">
                        <div class="cover-badge">KORPORACYJNY PROGRAM SZKOLENIOWY</div>
                        <h2 class="cover-title">Bezpieczna i Odpowiedzialna Nawigacja w Przyszłość Bankowości</h2>
                        <h3 class="cover-subtitle">Warsztaty z Zakresu Świadomości i Zarządzania AI</h3>
                        <div class="cover-footer">
                            <div class="presenter-card">
                                <strong>Sylwia Szuba</strong>
                                <span>AI Governance Lead &amp; Foundation Domain Owner</span>
                            </div>
                            <div class="bank-tag">
                                <span>Grupa UniCredit</span>
                                <small>Polska (ai@unicredit.pl)</small>
                            </div>
                        </div>
                    </div>
                </div>`
    },
    {
        id: 'slide-2',
        title: 'Agenda Warsztatów',
        notes: 'Krótko omów sześć części dzisiejszego spotkania. Zaznacz, że nie skupiamy się tylko na zakazach i przepisach, lecz pokażemy jak bezpiecznie podnosić wydajność i skalować własne, innowacyjne prompty do poziomu systemów bankowych.',
        html: `<div class="slide-container list-layout">
                    <div class="slide-header">
                        <span class="slide-number">02 / 21</span>
                        <h3 class="slide-title">Agenda Warsztatów</h3>
                        <p class="slide-tagline">Plan szkolenia z zakresu bezpiecznego stosowania sztucznej inteligencji</p>
                    </div>
                    <div class="slide-body grid-2">
                        <div class="agenda-column">
                            <div class="agenda-item"><div class="agenda-num">01</div><div class="agenda-desc"><h4>Czym jest AI i Generatywne AI?</h4><p>Demystyfikacja modeli LLM i autouzupełnianie tokenów</p></div></div>
                            <div class="agenda-item"><div class="agenda-num">02</div><div class="agenda-desc"><h4>Dlaczego AI? Efektywność w pracy</h4><p>Oszczędność czasu i kluczowe filary transformacji bankowości</p></div></div>
                            <div class="agenda-item"><div class="agenda-num">03</div><div class="agenda-desc"><h4>Nasz Bezpieczny Pakiet Narzędzi AI</h4><p>Wdrożenie Google Gemini Enterprise i NotebookLM</p></div></div>
                        </div>
                        <div class="agenda-column">
                            <div class="agenda-item"><div class="agenda-num">04</div><div class="agenda-desc"><h4>Zarządzanie AI i Unijny Akt o AI</h4><p>Zabronione praktyki, systemy wysokiego ryzyka i wymogi prawne</p></div></div>
                            <div class="agenda-item"><div class="agenda-num">05</div><div class="agenda-desc"><h4>Złote Zasady (Codzienna Praktyka)</h4><p>Praktyczne listy nakazów i zakazów (DOs &amp; DON'Ts)</p></div></div>
                            <div class="agenda-item"><div class="agenda-num">06</div><div class="agenda-desc"><h4>Od Iskry Innowacji do Skalowania</h4><p>Jak bezpłatnie i bezpiecznie wdrożyć Twój pomysł przez ai@unicredit.pl</p></div></div>
                        </div>
                    </div>
                </div>`
    },
    {
        id: 'slide-3',
        title: 'Część 1: Czym jest AI?',
        notes: 'Rozpoczynamy Część 1. Zróbmy krótki sondaż – jak często uczestnicy korzystają z narzędzi AI? Przejdźmy do wyjaśnienia jak faktycznie działają modele językowe.',
        html: `<div class="slide-container divider-layout">
                    <div class="divider-content">
                        <span class="divider-num">CZĘŚĆ 01</span>
                        <h2 class="divider-title">Czym jest AI i Generatywne AI?</h2>
                        <p class="divider-text">Zrozumienie podstaw: jak zaawansowane mechanizmy autouzupełniania tekstu tworzą naturalne, logiczne odpowiedzi.</p>
                        <div class="divider-graphic">
                            <span class="bubble">💡</span>
                            <span class="bubble active">🧠</span>
                            <span class="bubble">⚙️</span>
                        </div>
                    </div>
                </div>`
    },
    {
        id: 'slide-4',
        title: 'AI Tradycyjne vs Generatywne',
        notes: 'Porównaj tradycyjne i generatywne AI. Bank od lat stosuje AI (modele ryzyka kredytowego, wykrywanie oszustw). Generatywne AI to zupełnie nowa era tworzenia treści.',
        html: `<div class="slide-container list-layout">
                    <div class="slide-header">
                        <span class="slide-number">04 / 21</span>
                        <h3 class="slide-title">AI Tradycyjne vs. Generatywne</h3>
                        <p class="slide-tagline">Ewolucja sztucznej inteligencji w sektorze finansowym</p>
                    </div>
                    <div class="slide-body grid-2">
                        <div class="feature-card legacy">
                            <div class="card-head"><span class="card-icon">📊</span><h4>Tradycyjne (Predykcyjne) AI</h4></div>
                            <p class="card-intro">Analizuje cyfry, harmonogramy i ustrukturyzowane wzorce, by przewidywać precyzyjne prawdopodobieństwa.</p>
                            <ul class="feature-list">
                                <li><strong>Scoring Kredytowy:</strong> Ocena rzetelności finansowej</li>
                                <li><strong>Detektor Oszustw:</strong> Wykrywanie podejrzanych transakcji</li>
                                <li><strong>Rynki Finansowe:</strong> Algorytmiczne transakcje giełdowe</li>
                            </ul>
                            <div class="card-summary">Cel: Analiza i prognozowanie</div>
                        </div>
                        <div class="feature-card generative">
                            <div class="card-head"><span class="card-icon">✨</span><h4>Generatywne AI (GenAI)</h4></div>
                            <p class="card-intro">Przeszkolone na gigantycznych zbiorach tekstów, by tworzyć oryginalne, spójne wypowiedzi w języku naturalnym.</p>
                            <ul class="feature-list">
                                <li><strong>Wyszukiwanie wiedzy:</strong> Przeszukiwanie procedur bankowych</li>
                                <li><strong>Generowanie Kodu:</strong> Pisanie makr VBA, SQL, Python</li>
                                <li><strong>Synteza Informacji:</strong> Podsumowanie audytów i maili</li>
                            </ul>
                            <div class="card-summary highlight-border">Cel: Tworzenie i optymalizacja</div>
                        </div>
                    </div>
                </div>`
    },
    {
        id: 'slide-5',
        title: 'Jak działają modele LLM',
        notes: 'Wyjaśnij mechanizm przewidywania następnego tokenu i powstawanie halucynacji. Użyj analogii autouzupełniania w telefonie. Zawsze podkreślaj, że model nie zastępuje człowieka.',
        html: `<div class="slide-container list-layout">
                    <div class="slide-header">
                        <span class="slide-number">05 / 21</span>
                        <h3 class="slide-title">Jak działają modele językowe?</h3>
                        <p class="slide-tagline">Mechanizm przewidywania tokenów i rola okna kontekstowego</p>
                    </div>
                    <div class="slide-body grid-3">
                        <div class="info-box"><div class="box-icon">⚡</div><h4>Przewidywanie następnego słowa</h4><p>Modele LLM działają jak superzaawansowane mechanizmy autouzupełniania tekstu. Nie 'myślą' – obliczają statystyczne prawdopodobieństwo tego, jakie słowo (token) powinno nastąpić po wpisanym przez Ciebie zapytaniu.</p></div>
                        <div class="info-box"><div class="box-icon">📖</div><h4>Okno Kontekstowe</h4><p>To aktywna 'pamięć robocza' modelu w danej rozmowie. Nasze bezpieczne narzędzia korporacyjne mają ogromne okno kontekstowe, dzięki czemu możesz załączyć całą instrukcję lub regulamin i zadawać pytania.</p></div>
                        <div class="info-box warning-box"><div class="box-icon">⚠️</div><h4>Halucynacje i Odpowiedzialność</h4><p>Ponieważ model bazuje na statystyce, może wygenerować zmyślone fakty brzmiące bardzo wiarygodnie ('halucynacje'). <strong>Zawsze weryfikuj wyniki.</strong> Ty ponosisz pełną odpowiedzialność za ostateczną treść.</p></div>
                    </div>
                </div>`
    },
    {
        id: 'slide-6',
        title: 'Część 2: Korzyści',
        notes: 'Przejście do Części 2: Korzyści z wdrożenia AI. Sztuczna inteligencja nie odbiera pracy – eliminuje rutynowe, monotonne zadania biurowe.',
        html: `<div class="slide-container divider-layout">
                    <div class="divider-content">
                        <span class="divider-num">CZĘŚĆ 02</span>
                        <h2 class="divider-title">Dlaczego AI? Codzienna Efektywność</h2>
                        <p class="divider-text">Zwiększanie wydajności operacyjnej: wdrożenie AI jako zaufanego, błyskawicznego asystenta każdego pracownika.</p>
                        <div class="divider-graphic">
                            <span class="bubble">📈</span>
                            <span class="bubble active">🚀</span>
                            <span class="bubble">👥</span>
                        </div>
                    </div>
                </div>`
    },
    {
        id: 'slide-7',
        title: 'Codzienna wydajność pracy',
        notes: 'Opisz zadania dnia codziennego. Wyjaśnij, jak Gemini i NotebookLM potrafią oszczędzić godziny pracy. Przytocz przykłady.',
        html: `<div class="slide-container list-layout">
                    <div class="slide-header">
                        <span class="slide-number">07 / 21</span>
                        <h3 class="slide-title">Optymalizacja Codziennych Zadań</h3>
                        <p class="slide-tagline">Jak cyfrowy asystent wspiera Cię w rutynowych obowiązkach administracyjnych</p>
                    </div>
                    <div class="slide-body grid-4">
                        <div class="benefit-card"><div class="benefit-icon">📝</div><h4>Błyskawiczne Podsumowania</h4><p>Skróć 50-stronicowe raporty z audytów, regulaminy prawne lub długie wątki mailowe do najważniejszych punktów w kilka sekund.</p></div>
                        <div class="benefit-card"><div class="benefit-icon">🌐</div><h4>Spójne Tłumaczenia</h4><p>Tłumacz i harmonizuj dokumentację między naszymi europejskimi oddziałami (IT, DE, PL, BE) z zachowaniem bankowego kontekstu.</p></div>
                        <div class="benefit-card"><div class="benefit-icon">✉️</div><h4>Przygotowywanie Pism</h4><p>Szkicuj szablony e-maili, ramy raportów lub zmień ton wypowiedzi z technicznego żargonu na prosty, przyjazny dla klienta język.</p></div>
                        <div class="benefit-card"><div class="benefit-icon">💻</div><h4>Makra i Zapytania SQL</h4><p>Generuj zapytania do baz danych, pisz makra VBA w programie Excel lub debuguj błędy w kodzie z instrukcjami krok po kroku.</p></div>
                    </div>
                </div>`
    },
    {
        id: 'slide-8',
        title: 'Cztery Filary AI w Banku',
        notes: 'Przedstaw 4 kluczowe filary transformacji bankowości. Wyjaśnij, że te filary definiują kierunki, w których UniCredit rozwija bezpieczne innowacje.',
        html: `<div class="slide-container list-layout">
                    <div class="slide-header">
                        <span class="slide-number">08 / 21</span>
                        <h3 class="slide-title">Cztery Filary AI w Bankowości</h3>
                        <p class="slide-tagline">Systemowy wpływ sztucznej inteligencji na procesy instytucji finansowych</p>
                    </div>
                    <div class="slide-body table-layout">
                        <table class="presentation-table">
                            <thead><tr><th>Filar transformacji</th><th>Mandat Korporacyjny</th><th>Przykłady Wdrożeń</th></tr></thead>
                            <tbody>
                                <tr><td><strong>Personalizacja Obsługi</strong></td><td>Błyskawiczne, dopasowane odpowiedzi i kontekstowe wskazówki dla klientów.</td><td>Inteligentni asystenci rozwiązujący zgłoszenia 24/7; dedykowane skrypty doradcze.</td></tr>
                                <tr><td><strong>Inteligentna Tarcza Ryzyka</strong></td><td>Analiza transakcji w czasie rzeczywistym w celu przeciwdziałania przestępstwom.</td><td>Monitorowanie transakcji AML; zaawansowane, w pełni wyjaśnialne modele ryzyka kredytowego.</td></tr>
                                <tr><td><strong>Doskonałość Operacyjna</strong></td><td>Automatyzacja procesów opartych na pracy z dokumentami w back-office.</td><td>Automatyczny audyt dokumentacji kredytowej; szybka ekstrakcja warunków z umów dwustronnych.</td></tr>
                                <tr><td><strong>Wzmocnienie Pracowników</strong></td><td>Budowanie wewnętrznej wyszukiwarki semantycznej do szybkiego wyszukiwania wiedzy.</td><td>Umożliwienie doradcom natychmiastowego przeszukiwania wewnętrznych procedur kredytowych banku.</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>`
    },
    {
        id: 'slide-9',
        title: 'Część 3: Nasz Pakiet AI',
        notes: 'Przechodzimy do Części 3: Nasze narzędzia korporacyjne. Omówimy Gemini Enterprise i NotebookLM oraz udowodnimy, dlaczego logowanie służbowe w pełni chroni dane banku przed wyciekiem.',
        html: `<div class="slide-container divider-layout">
                    <div class="divider-content">
                        <span class="divider-num">CZĘŚĆ 03</span>
                        <h2 class="divider-title">Nasz Bezpieczny Pakiet AI: Gemini &amp; NotebookLM</h2>
                        <p class="divider-text">Zestaw licencjonowanych narzędzi w chmurze Google, gwarantujących bezwzględne bezpieczeństwo danych bankowych.</p>
                        <div class="divider-graphic">
                            <span class="bubble">🛡️</span>
                            <span class="bubble active">📥</span>
                            <span class="bubble">🤖</span>
                        </div>
                    </div>
                </div>`
    },
    {
        id: 'slide-10',
        title: 'Gemini vs NotebookLM',
        notes: 'Wyjaśnij różnice. Gemini to konwersacyjny asystent połączony z siecią. NotebookLM to badacz oparty wyłącznie o wgrane pliki bankowe, podający klikalne źródła i przypisy.',
        html: `<div class="slide-container list-layout">
                    <div class="slide-header">
                        <span class="slide-number">10 / 21</span>
                        <h3 class="slide-title">Poznaj Narzędzia UniCredit</h3>
                        <p class="slide-tagline">Dwa różne asystenty dedykowane do innych rodzajów zadań służbowych</p>
                    </div>
                    <div class="slide-body grid-2">
                        <div class="toolkit-panel gemini-style">
                            <div class="panel-badge">Partner Konwersacyjny</div>
                            <h4>Google Gemini Enterprise</h4>
                            <p class="panel-desc">Aktywny asystent ułatwiający burzę mózgów, redagowanie treści oraz pisanie kodu.</p>
                            <ul class="panel-list">
                                <li><strong>Szybkie Szkice:</strong> Strukturyzacja dokumentów, maili i agend</li>
                                <li><strong>Tłumaczenie Tekstów:</strong> Sprawne przetwarzanie treści wielojęzycznych</li>
                                <li><strong>Generowanie Kodu:</strong> Pisanie i wyjaśnianie makr SQL, VBA, Python</li>
                            </ul>
                            <div class="panel-use">Najlepszy do: kreatywnego pisania i zadań programistycznych</div>
                        </div>
                        <div class="toolkit-panel notebook-style">
                            <div class="panel-badge">Zweryfikowany Badacz</div>
                            <h4>Google NotebookLM</h4>
                            <p class="panel-desc">Zamknięty asystent analityczny, działający wyłącznie w oparciu o załączone pliki.</p>
                            <ul class="panel-list">
                                <li><strong>Brak Pamięci Zewnętrznej:</strong> Czerpie wiedzę tylko z wgranych plików</li>
                                <li><strong>Klikalne Przypisy:</strong> Każda odpowiedź ma link do konkretnego akapitu</li>
                                <li><strong>Synteza Źródeł:</strong> Szybkie zestawianie warunków z wielu procedur</li>
                            </ul>
                            <div class="panel-use">Najlepszy do: audytu umów i analizy wewnętrznych procedur</div>
                        </div>
                    </div>
                </div>`
    },
    {
        id: 'slide-11',
        title: 'Tarcza Bezpieczeństwa',
        notes: 'Niezwykle ważny slajd: Tarcza Bezpieczeństwa. Wykaż kolosalną różnicę pomiędzy logowaniem służbowym @unicredit.pl a kontami prywatnymi @gmail.com.',
        html: `<div class="slide-container list-layout">
                    <div class="slide-header">
                        <span class="slide-number">11 / 21</span>
                        <h3 class="slide-title">Tarcza Bezpieczeństwa UniCredit</h3>
                        <p class="slide-tagline">Dlaczego logowanie służbowym kontem @unicredit.pl gwarantuje 100% ochrony danych</p>
                    </div>
                    <div class="slide-body">
                        <div class="shield-comparison-grid">
                            <div class="shield-card secure-shield">
                                <div class="shield-indicator">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                    TARCZA BEZPIECZEŃSTWA AKTYWNA
                                </div>
                                <h4>Służbowe konto @unicredit.pl</h4>
                                <p class="shield-sub">Zabezpieczona, korporacyjna licencja Google Workspace</p>
                                <div class="shield-pillar"><span class="pillar-status success">✓</span><div><h5>Brak trenowania modeli publicznych</h5><p>Twoje zapytania i załączone pliki nigdy nie posłużą do szkolenia modeli Google.</p></div></div>
                                <div class="shield-pillar"><span class="pillar-status success">✓</span><div><h5>Brak wglądu ludzkiego</h5><p>Żaden pracownik Google nie ma fizycznego dostępu do historii Twoich czatów i plików.</p></div></div>
                                <div class="shield-pillar"><span class="pillar-status success">✓</span><div><h5>Bezwzględna izolacja danych</h5><p>Wszystkie operacje odbywają się w bezpiecznej domenie UniCredit. Dane są odcięte od innych klientów.</p></div></div>
                                <div class="shield-badge secure-badge">W pełni bezpieczne dla danych bankowych</div>
                            </div>
                            <div class="shield-card unsecure-shield">
                                <div class="shield-indicator alert">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="3"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                                    RYZYKO WYCIEKU DANYCH
                                </div>
                                <h4>Konta prywatne i darmowe czaty</h4>
                                <p class="shield-sub">Prywatne @gmail.com, darmowy ChatGPT, Claude, Copilot</p>
                                <div class="shield-pillar"><span class="pillar-status danger">✗</span><div><h5>Uczenie modeli publicznych</h5><p>Wpisywane treści są archiwizowane i aktywnie przetwarzane w celu trenowania modeli.</p></div></div>
                                <div class="shield-pillar"><span class="pillar-status danger">✗</span><div><h5>Weryfikacja przez ludzi</h5><p>Zewnętrzni audytorzy rutynowo przeglądają historię rozmów, by oceniać jakość odpowiedzi.</p></div></div>
                                <div class="shield-pillar"><span class="pillar-status danger">✗</span><div><h5>Brak ochrony prawnej banku</h5><p>Brak umów poufności i rejestrowania incydentów. Brak gwarancji zgodności z przepisami RODO.</p></div></div>
                                <div class="shield-badge dangerous-badge">Kategoryczny zakaz używania w pracy banku</div>
                            </div>
                        </div>
                    </div>
                </div>`
    },
    {
        id: 'slide-12',
        title: 'Część 4: Zarządzanie AI',
        notes: 'Przechodzimy do Części 4: Regulacje prawne i Unijny Akt o AI. Regulacje nie są barierą – są fundamentem zaufania w bankowości.',
        html: `<div class="slide-container divider-layout">
                    <div class="divider-content">
                        <span class="divider-num">CZĘŚĆ 04</span>
                        <h2 class="divider-title">Zarządzanie AI i Unijny Akt o AI</h2>
                        <p class="divider-text">Zgodność regulacyjna: dopasowanie wewnętrznych cykli życia systemów UniCredit do unijnego podejścia opartego na ryzyku.</p>
                        <div class="divider-graphic">
                            <span class="bubble">⚖️</span>
                            <span class="bubble active">🛡️</span>
                            <span class="bubble">📊</span>
                        </div>
                    </div>
                </div>`
    },
    {
        id: 'slide-13',
        title: 'Hierarchia Ryzyka Aktu AI',
        notes: 'Przedstaw piramidę ryzyka Aktu o AI. Zachęć do klikania poszczególnych szczebli. Wspomnij o Artykule 4 Aktu o AI, który nakłada obowiązek budowania kompetencji AI wśród pracowników.',
        html: `<div class="slide-container list-layout">
                    <div class="slide-header">
                        <span class="slide-number">13 / 21</span>
                        <h3 class="slide-title">Piramida Ryzyka Aktu o AI</h3>
                        <p class="slide-tagline">Rozporządzenie 2024/1689: Klasyfikacja systemów sztucznej inteligencji (Interaktywna Piramida)</p>
                    </div>
                    <div class="slide-body grid-2">
                        <div class="pyramid-wrapper">
                            <div class="pyramid-container">
                                <div class="pyramid-tier prohibited" data-tier="prohibited"><span>ZABRONIONE (Zakazane)</span></div>
                                <div class="pyramid-tier high-risk" data-tier="highrisk"><span>WYSOKIEGO RYZYKA (Ścisłe kontrole)</span></div>
                                <div class="pyramid-tier limited" data-tier="limited"><span>OGRANICZONE RYZYKO (Przejrzystość)</span></div>
                                <div class="pyramid-tier minimal" data-tier="minimal"><span>MINIMALNE RYZYKO (Bez ograniczeń)</span></div>
                            </div>
                            <p class="pyramid-tip">💡 Kliknij na szczebel piramidy, aby poznać wymogi prawne</p>
                        </div>
                        <div class="tier-detail-card" id="tier-detail-display">
                            <div class="detail-card-header">
                                <span class="tier-badge" id="tier-badge-type">ZABRONIONE</span>
                                <h4 id="tier-detail-title">Niedozwolony Poziom Ryzyka</h4>
                            </div>
                            <p class="tier-detail-desc" id="tier-detail-desc">Kliknij na dowolny poziom piramidy po lewej stronie, aby wyświetlić szczegółowe opisy prawne, obostrzenia oraz konkretne przykłady systemów w bankowości podlegające unijnym regulacjom.</p>
                            <div class="tier-examples-box" id="tier-examples-box">
                                <h5>Przykłady i Obostrzenia w Bankowości:</h5>
                                <ul id="tier-examples-list"><li>Wybierz poziom ryzyka z piramidy.</li></ul>
                            </div>
                        </div>
                    </div>
                </div>`
    },
    {
        id: 'slide-14',
        title: 'Klasyfikacje Wewnętrzne',
        notes: 'Omów wdrożenie regulacji w UniCredit. Podkreśl: Systemy Zabronione (detekcja emocji w pracy jest zakazana, social scoring jest zakazany). Systemy Wysokiego Ryzyka wymagają FRIAs, zatwierdzenia ExCom i opinii CISO.',
        html: `<div class="slide-container list-layout">
                    <div class="slide-header">
                        <span class="slide-number">14 / 21</span>
                        <h3 class="slide-title">Klasyfikacja AI w UniCredit</h3>
                        <p class="slide-tagline">Mapowanie unijnych poziomów ryzyka w strukturach bankowych</p>
                    </div>
                    <div class="slide-body grid-2">
                        <div class="risk-card prohibited-card">
                            <div class="risk-card-head">
                                <span class="badge prohibited-badge">Bezwzględny Zakaz</span>
                                <h4>Systemy Zabronione</h4>
                            </div>
                            <p>Systemy naruszające godność człowieka lub manipulujące zachowaniem. W UniCredit:</p>
                            <ul class="checklist">
                                <li><strong>Rozpoznawanie Emocji w Miejscu Pracy:</strong> Stosowanie AI do badania stresu lub uwagi pracowników jest surowo zakazane.</li>
                                <li><strong>Social Scoring:</strong> Segmentacja ludzi w oparciu o zachowania społeczne.</li>
                                <li><strong>Masowy Scraping Twarzy:</strong> Pobieranie zdjęć z kamer CCTV.</li>
                            </ul>
                        </div>
                        <div class="risk-card highrisk-card">
                            <div class="risk-card-head">
                                <span class="badge highrisk-badge">Zatwierdzenie Zarządu (ExCom)</span>
                                <h4>Systemy Wysokiego Ryzyka</h4>
                            </div>
                            <p>Aplikacje decydujące o prawach życiowych lub bezpieczeństwie klientów. W banku:</p>
                            <ul class="checklist">
                                <li><strong>Ocena Zdolności Kredytowej:</strong> Systemy decydujące o przyznaniu kredytu klientowi.</li>
                                <li><strong>Rekrutacja i HR:</strong> Automatyczna filtracja nadesłanych CV.</li>
                                <li><strong>Profilowanie AML:</strong> Klasyfikacja transakcji pod kątem prania pieniędzy.</li>
                                <li><strong>Wymogi:</strong> Obowiązkowa opinia techniczna CISO, DPIA oraz zatwierdzenie przez Zarząd (ExCom).</li>
                            </ul>
                        </div>
                    </div>
                </div>`
    },
    {
        id: 'slide-15',
        title: 'Wewnętrzny Proces 6 Kroków',
        notes: 'Przedstaw ścieżkę 6 kroków z dokumentu AI Process v1.0. Podkreśl, że \'dzikie\' wdrażanie AI bez kwalifikacji IT, wpisu do bazy CMDB i testów jest niedopuszczalne.',
        html: `<div class="slide-container list-layout">
                    <div class="slide-header">
                        <span class="slide-number">15 / 21</span>
                        <h3 class="slide-title">Wewnętrzny Proces Zgodności AI</h3>
                        <p class="slide-tagline">Proces AI v1.0: Sześć obowiązkowych kroków od pomysłu do wdrożenia narzędzia</p>
                    </div>
                    <div class="slide-body step-pipeline">
                        <div class="step-col"><div class="step-header-card"><span class="step-num">01</span><h5>Kwalifikacja</h5></div><p>Ryzyko IT ocenia na bazie kwestionariusza, czy dane oprogramowanie spełnia definicję systemów AI.</p></div>
                        <div class="step-col"><div class="step-header-card"><span class="step-num">02</span><h5>Klasyfikacja</h5></div><p>Określenie poziomu ryzyka (Zabroniony, Wysoki, Ograniczony, Minimalny) według Aktu o AI.</p></div>
                        <div class="step-col"><div class="step-header-card"><span class="step-num">03</span><h5>Rejestr CMDB</h5></div><p>Wpisanie oprogramowania do bazy aktywów IT z wyraźnym oznaczeniem jako 'AI System'.</p></div>
                        <div class="step-col"><div class="step-header-card"><span class="step-num">04</span><h5>Audyt i DPIA</h5></div><p>Szczegółowy audyt cyberbezpieczeństwa oraz formalna ocena skutków RODO (DPIA).</p></div>
                        <div class="step-col"><div class="step-header-card"><span class="step-num">05</span><h5>Zgody</h5></div><p>Niskie ryzyko zatwierdza CIO. Wysokie ryzyko wymaga wiążącej opinii CISO i zgody Zarządu (ExCom).</p></div>
                        <div class="step-col"><div class="step-header-card"><span class="step-num">06</span><h5>Monitoring</h5></div><p>Stały nadzór nad poprawnością działania modelu i coroczna recertyfikacja zgodności.</p></div>
                    </div>
                </div>`
    },
    {
        id: 'slide-16',
        title: 'Część 5: Złote Zasady',
        notes: 'Przejście do Części 5: Złote Zasady. Przygotuj uczestników na krótki interaktywny quiz z codziennych sytuacji w banku.',
        html: `<div class="slide-container divider-layout">
                    <div class="divider-content">
                        <span class="divider-num">CZĘŚĆ 05</span>
                        <h2 class="divider-title">Złote Zasady w Codziennej Pracy</h2>
                        <p class="divider-text">Lista dobrych praktyk: jak efektywnie wspierać się narzędziami AI bez narażania banku na sankcje i wycieki danych.</p>
                        <div class="divider-graphic">
                            <span class="bubble">✏️</span>
                            <span class="bubble active">📋</span>
                            <span class="bubble">💡</span>
                        </div>
                    </div>
                </div>`
    },
    {
        id: 'slide-17',
        title: "Lista DOs & DON'Ts",
        notes: 'Dokładnie przejdź przez listę nakazów i zakazów. Podkreśl: używaj tylko licencjonowanych systemów zalogowanych przez @unicredit.pl, sprawdzaj wyniki, usuwaj wrażliwe dane osobowe klientów.',
        html: `<div class="slide-container list-layout">
                    <div class="slide-header">
                        <span class="slide-number">17 / 21</span>
                        <h3 class="slide-title">Codzienna Lista Kontrolna</h3>
                        <p class="slide-tagline">Podstawowe zasady bezpiecznego i produktywnego korzystania ze sztucznej inteligencji</p>
                    </div>
                    <div class="slide-body grid-2">
                        <div class="rules-half dos-half">
                            <div class="rules-title"><span class="rules-icon">✓</span><h4>DO — Korzystaj Mądrze i Zgodnie z Prawem</h4></div>
                            <ul class="checklist-items">
                                <li><strong>Wybieraj bezpieczne narzędzia:</strong> Pracuj wyłącznie na Gemini i NotebookLM zalogowanych na konto @unicredit.pl.</li>
                                <li><strong>Weryfikuj wyniki (Human-in-the-loop):</strong> Zawsze sprawdzaj wygenerowany kod, kwoty i dane przed ich wykorzystaniem.</li>
                                <li><strong>Anonimizuj zapytania:</strong> Zastępuj nazwy klientów i dane poufne ogólnymi sformułowaniami (np. "Klient A").</li>
                                <li><strong>Dbaj o edukację:</strong> Bierz aktywny udział w obowiązkowych szkoleniach z zakresu kompetencji AI (AI Literacy).</li>
                            </ul>
                        </div>
                        <div class="rules-half donts-half">
                            <div class="rules-title"><span class="rules-icon">✗</span><h4>DON'T — Unikaj Ryzykownych Zachowań</h4></div>
                            <ul class="checklist-items">
                                <li><strong>Żadnych kont prywatnych:</strong> Nie loguj się na darmowe wersje ChatGPT, Claude czy prywatne adresy @gmail.com do zadań banku.</li>
                                <li><strong>Nie wgrywaj PII klientów:</strong> Zakaz przesyłania chronionych danych osobowych (RODO) bez dedykowanej analizy DPIA i rejestru.</li>
                                <li><strong>Brak 'Dzikich' Wdrożeń:</strong> Zakaz podłączania zewnętrznych API oraz pisania botów bez procedury IT i wpisu CMDB.</li>
                                <li><strong>Unikaj Zakazanych Praktyk:</strong> Nie wdrażaj ani nie szukaj narzędzi badających emocje i zaangażowanie pracowników.</li>
                            </ul>
                        </div>
                    </div>
                </div>`
    },
    {
        id: 'slide-18',
        title: 'Część 6: Skalowanie',
        notes: 'Przejście do Części 6: Jak możemy wspólnie rozwijać Twoje innowacje. Jeżeli wymyśliłeś świetny prompt, nie trzymaj go tylko na swoim pulpicie.',
        html: `<div class="slide-container divider-layout">
                    <div class="divider-content">
                        <span class="divider-num">CZĘŚĆ 06</span>
                        <h2 class="divider-title">Od Indywidualnej Iskry do Skali Banku</h2>
                        <p class="divider-text">Zgłaszanie innowacji: jak zespół zarządzania AI bierze na siebie audyt prawny, by wdrożyć Twój pomysł w całej instytucji.</p>
                        <div class="divider-graphic">
                            <span class="bubble">💡</span>
                            <span class="bubble active">📩</span>
                            <span class="bubble">🚀</span>
                        </div>
                    </div>
                </div>`
    },
    {
        id: 'slide-19',
        title: 'Ścieżka Wdrażania Innowacji',
        notes: 'Opisz ramy Programu Wdrażania Innowacji. Jeśli stworzyłeś świetne rozwiązanie, wyślij opis na adres ai@unicredit.pl. Skontaktujemy się z Tobą w ciągu 3 dni roboczych.',
        html: `<div class="slide-container list-layout">
                    <div class="slide-header">
                        <span class="slide-number">19 / 21</span>
                        <h3 class="slide-title">Korporacyjny Program Skalowania AI</h3>
                        <p class="slide-tagline">Jak przekształcamy oddolne innowacje pracowników w oficjalne, bezpieczne narzędzia bankowe</p>
                    </div>
                    <div class="slide-body">
                        <div class="adoption-pipeline-wrapper">
                            <div class="pipeline-progress-line">
                                <div class="pipeline-progress-fill" id="pipeline-progress-fill"></div>
                            </div>
                            <div class="pipeline-steps-grid">
                                <div class="pipeline-step active" data-step="1"><div class="pipeline-icon">💡</div><h5>1. Pomysł (Spark)</h5><p>Projektujesz skuteczny prompt lub zestaw źródeł w NotebookLM oszczędzający Twój czas.</p></div>
                                <div class="pipeline-step" data-step="2"><div class="pipeline-icon">📩</div><h5>2. Zgłoszenie (Share)</h5><p>Wysyłasz krótki opis, wzór promptu lub strukturę na dedykowany e-mail: <strong>ai@unicredit.pl</strong>.</p></div>
                                <div class="pipeline-step" data-step="3"><div class="pipeline-icon">⚖️</div><h5>3. Współpraca (Align)</h5><p>Nasz zespół bierze na siebie formalności: analizy DPIA, wpisy CMDB i dopasowanie do Aktu o AI.</p></div>
                                <div class="pipeline-step" data-step="4"><div class="pipeline-icon">🚀</div><h5>4. Skalowanie (Scale)</h5><p>Udostępniamy Twoje narzędzie w całym banku, wskazując Ciebie jako oficjalnego autora!</p></div>
                            </div>
                        </div>
                        <div class="pipeline-info-card" id="pipeline-info-display">
                            <h4>Kliknij na dowolny etap powyższej ścieżki, aby poznać szczegóły!</h4>
                            <p>Dowiedz się, jak nasz zespół zarządzania AI pomoże Ci przeistoczyć lokalne makra i prompty w bezpieczne systemy korporacyjne.</p>
                        </div>
                    </div>
                </div>`
    },
    {
        id: 'slide-20',
        title: 'Kontakty i Wsparcie',
        notes: 'Wyświetl najważniejsze skrzynki mailowe. Zapamiętajcie: ai@unicredit.pl do przesyłania pomysłów, cisooffice@unicredit.pl do zapytań o bezpieczeństwo, itgovernance@unicredit.be do rejestracji nowych zasobów IT.',
        html: `<div class="slide-container list-layout">
                    <div class="slide-header">
                        <span class="slide-number">20 / 21</span>
                        <h3 class="slide-title">Kanały Kontaktu i Pomocy</h3>
                        <p class="slide-tagline">Skontaktuj się z odpowiednim zespołem ekspertów</p>
                    </div>
                    <div class="slide-body grid-3">
                        <div class="contact-card scale-glow"><div class="contact-icon">🚀</div><h4>Innowacje i Skalowanie AI</h4><p class="contact-text">Przesyłaj udane szablony promptów, bazy NotebookLM oraz wszelkie pomysły automatyzacji pracy biurowej.</p><a href="mailto:ai@unicredit.pl" class="contact-email">ai@unicredit.pl</a></div>
                        <div class="contact-card"><div class="contact-icon">🛡️</div><h4>Biuro CISO</h4><p class="contact-text">Pytania o Politykę AI, zgłaszanie incydentów bezpieczeństwa, wycieku haseł lub naruszeń etycznych systemów AI.</p><a href="mailto:cisooffice@unicredit.pl" class="contact-email">cisooffice@unicredit.pl</a></div>
                        <div class="contact-card"><div class="contact-icon">⚙️</div><h4>Biuro Zarządzania IT</h4><p class="contact-text">Zgłoszenia oprogramowania do obowiązkowej kwalifikacji, rejestracja CMDB oraz audyt licencji dostawców.</p><a href="mailto:itgovernance@unicredit.be" class="contact-email">itgovernance@unicredit.be</a></div>
                    </div>
                </div>`
    },
    {
        id: 'slide-21',
        title: 'Klauzula Zgodności',
        notes: 'Wyświetl klauzulę prawną i otwórz dyskusję z publicznością. Podziękuj wszystkim serdecznie za obecność i aktywność!',
        html: `<div class="slide-container cover-layout disclaimer-layout">
                    <div class="cover-content text-center">
                        <div class="disclaimer-title">KLAUZULA ZGODNOŚCI PRAWNEJ</div>
                        <p class="disclaimer-text">
                            Treści przedstawione podczas dzisiejszego szkolenia mają charakter wyłącznie edukacyjny i informacyjny. Wszystkie aktywne modele i systemy sztucznej inteligencji w Grupie UniCredit podlegają stałemu nadzorowi, rygorystycznym audytom bezpieczeństwa CISO oraz wewnętrznym przepisom. Pracownicy zobowiązani są do przestrzegania Polityki AI v1.1 oraz Procesu AI v1.0 w każdym momencie.
                        </p>
                        <h2 class="qna-heading">Dziękuję za uwagę! Zapraszam do zadawania pytań</h2>
                        <p class="qna-subtitle">Kontakt do biura zarządzania: <strong>ai@unicredit.pl</strong> | <strong>cisooffice@unicredit.pl</strong></p>
                    </div>
                </div>`
    }
];
