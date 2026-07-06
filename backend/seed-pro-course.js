// Seed professional course: "Sztuka Promptowania AI: Gemini Masterclass"
// Run: node seed-pro-course.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./learning_center.db');

const COURSE = {
  title: 'AI Prompt Engineering: Gemini Masterclass',
  description: 'Opanuj sztuke promptowania AI od podstaw do zaawansowanych technik. Nauczysz sie tworzyc prompty, ktore daja profesjonalne wyniki w Gemini, NotebookLM i innych narzedzia AI. Kurs z prawdziwymi przykladami z bankowosci i finansow.',
  level: 'Intermediate',
  duration: '6 hours',
  price: 0,
  is_free: 1,
  thumbnail: '/images/prompt-engineering.jpg',
};

const MODULES = [
  {
    title: 'Fundamenty AI i Generatywne Modele',
    description: 'Zrozum jak dzialaja LLM i dlaczego prompt ma kluczowe znaczenie',
    lessons: [
      { title: 'Czym jest Large Language Model (LLM)?', video_url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g', content: '<h3>Jak dziala model jezykowy?</h3><p>Duzy model jezykowy (LLM) to system AI wytrenowany na gigantycznych zbiorach tekstow. Nie "mysli" — przewiduje statystycznie nastepne slowo (token) na podstawie kontekstu.</p><ul><li><strong>Tokenizacja:</strong> Tekst dzielony jest na tokeny (srednia slowa)</li><li><strong>Uwaga (Attention):</strong> Model "uwaza" na powiazan kontekst</li><li><strong>Temperature:</strong> Kontroluje kreatywnosc vs determinizm odpowiedzi</li></ul><h3>Kluczowe wnioski</h3><p>Model nie rozumie — pattern-matchuje. Dlatego <strong>jak pytasz</strong> jest rownie wazne jak <strong>co pytasz</strong>.</p>', duration: 20 },
      { title: 'Anatomia idealnego promptu', video_url: '', content: '<h3>5 elementow skutecznego promptu</h3><ol><li><strong>Kontekst (Context)</strong> — kim jestes, w jakiej sytuacji</li><li><strong>Rola (Persona)</strong> — w jakiej roli ma sie zachowac AI</li><li><strong>Zadanie (Task)</strong> — co ma zostac zrobione</li><li><strong>Format (Format)</strong> — jak ma wygladac output</li><li><strong>Ograniczenia (Constraints)</strong> — czego unikac</li></ol><div class="alert-box alert-tip"><div class="alert-icon">💡</div><div class="alert-text">Przyklad: "Jestes doswiadczonym analitykiem bankowym. Przygotuj 5-punktowe streszczenie ponizszego raportu kredytowego w formacie bulletow, skupiajac sie na ryzykach. Unikaj zargonu technicznego."</div></div>', duration: 25 },
      { title: 'Rozne modele AI — kiedy uzyc ktorego', video_url: '', content: '<h3>Gemini vs ChatGPT vs Claude</h3><table class="presentation-table"><thead><tr><th>Narzedzie</th><th>Mocne strony</th><th>Najlepsza aplikacja</th></tr></thead><tbody><tr><td>Google Gemini</td><td>Integracja z Google Workspace, duze okno kontekstu</td><td>Analiza dokumentow, email, prezentacje</td></tr><tr><td>NotebookLM</td><td>Grounding w plikach, cytowania</td><td>Research, analiza umow, procedury</td></tr><tr><td>ChatGPT</td><td>Wszechstronnosc, wtyczki</td><td>Kodowanie, kreatywne zadania</td></tr></tbody></table>', duration: 15 },
    ]
  },
  {
    title: 'Zaawansowane Techniki Promptowania',
    description: 'Opanuj profesjonalne metody: Chain-of-Thought, Few-Shot i frameworki promptow',
    lessons: [
      { title: 'Zero-Shot, One-Shot i Few-Shot Prompting', video_url: 'https://www.youtube.com/watch?v=v2gD8BHOaX4', content: '<h3>Typy promptow wg ilosci przykladow</h3><p><strong>Zero-Shot</strong> — Bez przykladow. Model korzysta z treningu.<br>Przyklad: "Przetlumacz: Hello World" → "Czesc Swiat"</p><p><strong>One-Shot</strong> — Jeden przyklad jako wzorzec.<br>Przyklad: "Styl: Profesjonalny. Wiadomosc: Dziekuje za spotkanie. Przeformuluj: Fajnie bylo pogadac."</p><p><strong>Few-Shot</strong> — Kilka przykladow. Najskuteczniejsze dla specjalistycznych stylow.<br>Uzywaj gdy chcesz konkretnego formatu lub jezyka specjalistycznego.</p>', duration: 20 },
      { title: 'Chain-of-Thought — wymus rozumowanie krok po kroku', video_url: '', content: '<h3>Chain-of-Thought Prompting</h3><p>Zamiast prosic o odpowiedz, kaz modelowi myslec na glos. Dramatycznie zwieksza jakosc odpowiedzi na zlozonych problemach.</p><div class="feature-card"><h4>Przyklad bez CoT</h4><p>Pytanie: "Czy firma powinna zaciagnac kredyt na 5M PLN?" → Model odpowiada ogolnikowo</p></div><div class="feature-card"><h4>Przyklad z CoT</h4><p>Pytanie: "Firma rozwaza kredyt 5M PLN. Krok 1: oceń zdolnosc kredytowa. Krok 2: Oblicz wskaznik DTI. Krok 3: Sprawdz cashflow. Krok 4: Rekomenduj."</p></div>', duration: 25 },
      { title: 'Framework RICE i RTF dla promptow bankowych', video_url: '', content: '<h3>RICE Framework</h3><ul><li><strong>R — Role:</strong> Jestes glownym analitykiem ryzyka w banku</li><li><strong>I — Input:</strong> Oto raport finansowy klienta: [dane]</li><li><strong>C — Context:</strong> Klient ubiega sie o kredyt obrotowy 500k PLN</li><li><strong>E — Expected Output:</strong> Lista 5 kluczowych ryzyk w formacie tabeli z oceną 1-5</li></ul><h3>RTF Framework</h3><p><strong>R</strong>ola + <strong>T</strong>ask + <strong>F</strong>ormat = spójny, powtarzalny wynik</p>', duration: 20 },
    ]
  },
  {
    title: 'Gemini w Praktyce Bankowej',
    description: 'Realne przypadki uzycia AI w codziennej pracy analityka i doradcy',
    lessons: [
      { title: 'Analiza i streszczanie dokumentow finansowych', video_url: 'https://www.youtube.com/watch?v=KYwzYNI9fmk', content: '<h3>Szybka analiza dokumentow</h3><p>Gemini moze przeanalizowac caly raport roczny (100+ stron) w kilka sekund. Klucz to odpowiedni prompt.</p><div class="alert-box alert-tip"><div class="alert-icon">📋</div><div class="alert-text"><strong>Wzorcowy prompt do analizy raportu:</strong><br>"Jestes analitykiem finansowym. Przeczytaj ponizszy raport roczny i: 1) Podaj 5 kluczowych wskaznikow finansowych z wartosciami, 2) Zidentyfikuj 3 glowne ryzyka, 3) Oceń trend roku r/r. Format: markdown z tabelami."</div></div>', duration: 20 },
      { title: 'Automatyczne generowanie raportow i podsumowania email', video_url: '', content: '<h3>Template dla raportow</h3><p>Stwórz raz, uzywaj wielokrotnie. Przyklad szablonu dla tygodniowego raportu zespolu:</p><div class="feature-card"><p>System Prompt: "Jestes asystentem raportowym. Na podstawie danych ktore wkleje, generuj raport wg schematu: Tydzien X / Kluczowe osiagniecia / Blokery / Plan na nastepny tydzien / Metryki. Styl: profesjonalny, zwiezly, bulletowy."</p></div>', duration: 15 },
      { title: 'Generowanie i debugowanie kodu SQL/Python/VBA', video_url: '', content: '<h3>AI jako partner programistyczny</h3><p>Nawet bez znajomosci programowania mozesz generowalc skrypty do automatyzacji pracy.</p><ul><li><strong>SQL:</strong> "Napisz zapytanie SQL ktore liczy srednie saldo kont dla klientow premium w Q4 2024"</li><li><strong>Excel VBA:</strong> "Napisz makro VBA ktore automatycznie formatuje raport w arkuszu \'Dane\' — nagłówki czerwone, liczby z separatorem tysiecy"</li><li><strong>Python:</strong> "Napisz skrypt Python ktory czyta CSV z transakcjami i generuje wykres slupkowy miesiecznych sum"</li></ul>', duration: 20 },
    ]
  },
  {
    title: 'NotebookLM — Twój AI Research Assistant',
    description: 'Mastery NotebookLM do analizy dokumentow firmowych i procedur',
    lessons: [
      { title: 'Konfiguracja Notebooka i upload dokumentow', video_url: 'https://www.youtube.com/watch?v=hhgy9PBW3ss', content: '<h3>Pierwsze kroki w NotebookLM</h3><ol><li>Zaloguj sie na konto sluzbowe @twojafirma.com</li><li>Kliknij "New Notebook"</li><li>Kliknij "+" aby dodac zrodla: PDF, Word, Google Docs, URL, wklejony tekst</li><li>Zaczekaj na indexowanie (kilka sekund)</li><li>Zacznij zadawac pytania!</li></ol><div class="alert-box alert-important"><div class="alert-icon">🛡️</div><div class="alert-text">NotebookLM odpowiada TYLKO na podstawie wgranych dokumentow. Zero halucynacji dotyczacych zewnetrznych zrodel. Kazda odpowiedz ma numerowany przypis do zrodla.</div></div>', duration: 20 },
      { title: 'Analiza umow i wyciaganie kluczowych klauzul', video_url: '', content: '<h3>Analiza prawna z NotebookLM</h3><p>Przyklad: Wgrywasz 10 umow leasingowych i pytasz:</p><ul><li>"Porownaj warunki wczesnego wyplacenia z umow 1-10 w tabeli"</li><li>"W ktorej umowie sa najwyzsze kary za opoznienie? Podaj paragraf."</li><li>"Zrob liste wszystkich klauzul dotyczacych force majeure"</li></ul><p>Kazda odpowiedz zawiera klikalne cytaty — mozesz natychmiast zweryfikowac zrodlo.</p>', duration: 25 },
    ]
  },
  {
    title: 'Bezpieczenstwo i Etyka AI',
    description: 'Odpowiedzialne korzystanie z AI — co wolno, czego nie, i dlaczego',
    lessons: [
      { title: 'Ochrona danych osobowych (RODO) w pracy z AI', video_url: '', content: '<h3>Dane osobowe a AI</h3><p>RODO i wewnetrzne polityki AI jednoznacznie okreslaja zasady:</p><div class="alert-box alert-caution"><div class="alert-icon">⚠️</div><div class="alert-text"><strong>Kategorycznie zakazane:</strong><br>- Wklejanie danych klientow (imie, PESEL, numer konta) do publicznych chatow AI<br>- Uzywanie prywatnych kont Gmail/ChatGPT do pracy z danymi firmowymi<br>- Przesylanie danych poufnych przez zewnetrzne API bez DPIA</div></div><div class="alert-box alert-tip"><div class="alert-icon">✓</div><div class="alert-text"><strong>Bezpieczne praktyki:</strong><br>- Anonimizuj dane: "Klient A" zamiast imienia, "Konto X" zamiast numeru<br>- Uzywaj tylko licencjonowanych korporacyjnych narzedzi<br>- Dla kluczowych analize — sprawdz czy jest DPIA i wpis CMDB</div></div>', duration: 20 },
      { title: 'Halucynacje AI — jak wykrywac i weryfikowac', video_url: '', content: '<h3>Czym jest halucynacja AI?</h3><p>Model jezykowy moze generowac odpowiedzi brzmiace pewnie i profesjonalnie, ktore sa… calkowicie zmyslone. Zjawisko to zwane jest halucynacja.</p><h3>Jak sie chronic?</h3><ul><li><strong>Zawsze pytaj o zrodlo:</strong> "Na jakiej podstawie twierdzisz X? Podaj konkretny przepis."</li><li><strong>Uzywaj NotebookLM</strong> dla odpowiedzi opartych na dokumentach — ma cytowania</li><li><strong>Cross-check kluczowych danych</strong> z oficjalnymi zrodlami</li><li><strong>Nigdy nie wysylaj bez weryfikacji</strong> — Ty jestes odpowiedzialny za output</li></ul>', duration: 15 },
    ]
  }
];

const QUIZ_QUESTIONS = [
  {
    scenario: 'Masz do przetlumaczenia 15-stronicowy kontrakt z klientem. Kolega sugeruje uzylcie darmowego ChatGPT — "bedzie szybciej". Kontrakt zawiera imiona stron, numery kont i kwoty transakcji.',
    question: 'Co jest najwlasciwszym postepowaniem?',
    options: ['Uzywasz darmowego ChatGPT — wystarczy ze usuniesz potem historie', 'Korzystasz z Gemini Enterprise zalogowanego na konto sluzbowe po anonimizacji danych klientow', 'Odmawiasz — AI nie moze tlumaczyl dokumentow prawnych', 'Prosisz o pomoc kolege, ktory uzyje swojego prywatnego konta'],
    correct_answer: 1,
    explanation: 'Jedynym bezpiecznym podejsciem jest uzycie korporacyjnego Gemini Enterprise z kontem sluzbowym. Wazne jest rowniez anonimizowanie danych osobowych przed wklejeniem — zamieniamy "Jan Kowalski, PESEL 80010112345" na "Klient A".'
  },
  {
    scenario: 'Tworzysz prompt do analizy ryzyka kredytowego. Zastanawiasz sie, jak sformulowac pytanie zeby uzyskac jak najlepsza jakosc odpowiedzi.',
    question: 'Ktory prompt wykorzystuje techniki Chain-of-Thought i RICE?',
    options: ['Czy ten klient jest ryzykowny?', 'Przeanalizuj ryzyko kredytowe klienta', 'Jestes glownym analitykiem ryzyka. Na podstawie ponizszych danych: Krok 1 - oceń wskaznik DTI, Krok 2 - sprawdz historię kredytowa, Krok 3 - oszacuj zdolnosc splatowa. Format: tabela z ocena 1-5 i uzasadnieniem.', 'Daj mi ocene ryzyka w jednym zdaniu'],
    correct_answer: 2,
    explanation: 'Prompt C zawiera Role (glowny analityk ryzyka), Chain-of-Thought (3 kroki analizy), Format (tabela z ocena i uzasadnieniem). To klasyczna technika RICE ktora daje powtarzalne, wysokojakosciowe wyniki.'
  },
  {
    scenario: 'Uzywasz NotebookLM do analizy 20 umow leasingowych. Chcesz znalezc umowe z najwyzszymi karami za opoznienie.',
    question: 'Jakie jest kluczowe zaleta NotebookLM w tym zastosowaniu?',
    options: ['Moze szukac w internecie dodatkowych umow', 'Odpowiedzi sa oparte TYLKO na wgranych dokumentach i zawieraja klikalne cytaty do konkretnych fragmentow', 'Automatycznie tlumacza umowy na inne jezyki', 'Zapisuje umowy w bazie danych banku'],
    correct_answer: 1,
    explanation: 'Kluczowa przewaga NotebookLM nad zwyklym chatbotem to tzw. grounding — odpowiada wylacznie na podstawie wgranych przez nas dokumentow. Kazda odpowiedz zawiera numerowany przypis do konkretnego fragmentu zrodla, co eliminuje halucynacje i umozliwia natychmiastowa weryfikacje.'
  },
  {
    scenario: 'Twoj manager prosi Cie o stworzenie raportu tygodniowego dla zarządu. Chcesz uzyc AI aby automatyzowac ten proces.',
    question: 'Jaka technika promptowania jest najlepsza dla powtarzalnych raportow?',
    options: ['Zero-shot — za kazdym razem pisz nowy prompt od zera', 'Few-shot z szablonem — stworz wzorcowy przyklad raportu i uzyj go jako modelu', 'Zawsze proś AI o generowanie nowego formatu', 'Uzywaj tylko jednoslownych polecen'],
    correct_answer: 1,
    explanation: 'Few-shot prompting z szablonem to najlepsza technika dla powtarzalnych zadan. Tworzysz raz wzorcowy przyklad (jak wyglada dobry raport), a nastepnie za kazdym razem model odtwarza ten format z nowymi danymi. Oszczedza to czas i zapewnia spojnosc.'
  },
  {
    scenario: 'Po uzyciu Gemini do analizy finansowej otrzymujesz szczegolowy raport z konkretna liczba i procentem. Zamierzasz wyslac te wyniki bezposrednio do klienta.',
    question: 'Jakie jest kluczowe dzialanie przed wysaniem?',
    options: ['Wyslij natychmiast — Gemini jest wiarygodny', 'Sprawdz wyniki w oryginalnych zrodlach danych przed wyslaniem — AI moze halucynowac liczby', 'Dodaj disclaimer "wygenerowane przez AI" i wyslij', 'Poproś AI o powierdzenie wlasnych wynikow'],
    correct_answer: 1,
    explanation: 'Zawsze weryfikuj kluczowe dane (liczby, procenty, daty, paragrafy prawne) ze zrodlem przed uzyciem ich oficjalnie. Modele jezykowe moga halucynowac — generowac przekonujaco brzmiace ale bledne dane. Ty, jako autor raportu, ponosisz pelna odpowiedzialnosc za jego tresc.'
  }
];

const SLIDES = [
  { num: 1, layout: 'cover', title: 'AI Prompt Engineering: Gemini Masterclass', content: '<div class="cover-layout" style="text-align:center;padding:60px 40px"><div class="cover-badge">PROFESSIONAL TRAINING</div><h2 class="cover-title">AI Prompt Engineering</h2><h3 class="cover-subtitle">Gemini Masterclass — od podstaw do eksperta</h3><div class="cover-footer"><div class="presenter-card"><strong>Learning Center</strong><span>Professional Training Platform</span></div></div></div>', notes: 'Witaj uczestnikow. Ten kurs da Ci praktyczne narzedzia do pracy z AI na poziomie profesjonalnym.' },
  { num: 2, layout: 'list', title: 'Agenda kursu', content: '<div class="slide-header"><h3 class="slide-title">Agenda kursu</h3><p class="slide-tagline">Co osiagniesz po ukonczeniu?</p></div><div class="slide-body grid-2"><div><div class="agenda-item"><div class="agenda-num">01</div><div><h4>Fundamenty LLM</h4><p>Jak dzialaja modele jezykowe i dlaczego prompt ma znaczenie</p></div></div><div class="agenda-item"><div class="agenda-num">02</div><div><h4>Techniki zaawansowane</h4><p>Chain-of-Thought, Few-Shot, RICE Framework</p></div></div><div class="agenda-item"><div class="agenda-num">03</div><div><h4>Gemini w praktyce</h4><p>Realne przypadki uzycia w bankowosci i finansach</p></div></div></div><div><div class="agenda-item"><div class="agenda-num">04</div><div><h4>NotebookLM Mastery</h4><p>Analiza dokumentow z AI-powered research assistant</p></div></div><div class="agenda-item"><div class="agenda-num">05</div><div><h4>Bezpieczenstwo AI</h4><p>RODO, halucynacje, odpowiedzialne uzycie</p></div></div></div></div>', notes: 'Omow krotko kazdy modul. Kurs ma 5 modulow i ok. 6 godzin materialu.' },
  { num: 3, layout: 'list', title: 'Jak dziala LLM — mechanizm tokenow', content: '<div class="slide-header"><h3 class="slide-title">Next Token Prediction</h3><p class="slide-tagline">Jak naprawde dziala model jezykowy</p></div><div class="slide-body grid-3"><div class="info-box"><div class="box-icon">⚡</div><h4>Tokenizacja</h4><p>Kazde slowo dzielone jest na tokeny. Srednie slowo = 1.3 tokena. Model operuje na tokenach, nie slowach.</p></div><div class="info-box"><div class="box-icon">📊</div><h4>Prawdopodobienstwo</h4><p>Model oblicza P(nastepny_token | wszystkie_poprzednie_tokeny). Nie "myśli" — pattern-matchuje na bilionach danych.</p></div><div class="info-box warning-box"><div class="box-icon">⚠️</div><h4>Halucynacje</h4><p>Ponieważ model przewiduje "co powinno nastapic", moze generowac przekonujace ale bledne odpowiedzi. Zawsze weryfikuj!</p></div></div>', notes: 'Dobra analogia: superzaawansowane autouzupelnianie w telefonie.' },
  { num: 4, layout: 'list', title: 'Anatomia idealnego promptu', content: '<div class="slide-header"><h3 class="slide-title">5 elementow skutecznego promptu</h3><p class="slide-tagline">Struktura ktora daje przewidywalne, profesjonalne wyniki</p></div><div class="slide-body grid-2"><div><div class="feature-card"><div class="card-head"><span class="card-icon">🎭</span><h4>1. Rola (Persona)</h4></div><p>Powiedz AI kim ma byc. "Jestes doswiadczonym analitykiem bankowym z 10-letnim doswiadczeniem..."</p></div><div class="feature-card"><div class="card-head"><span class="card-icon">📋</span><h4>2. Zadanie (Task)</h4></div><p>Konkretne, jednoznaczne polecenie. Co ma zostac zrobione? Jakie kroki?</p></div><div class="feature-card"><div class="card-head"><span class="card-icon">🌍</span><h4>3. Kontekst (Context)</h4></div><p>Tlo sytuacji. Dla kogo, w jakim celu, jakie ograniczenia.</p></div></div><div><div class="feature-card"><div class="card-head"><span class="card-icon">📐</span><h4>4. Format (Format)</h4></div><p>Jak ma wygladac output? Tabela, bullety, akapity, JSON, markdown...</p></div><div class="feature-card"><div class="card-head"><span class="card-icon">🚫</span><h4>5. Ograniczenia (Constraints)</h4></div><p>Czego unikac? Maksymalna dlugosc, jezyk, styl, co pominac.</p></div></div></div>', notes: 'Omow kazdy element z przykladem z bankowosci.' },
  { num: 5, layout: 'list', title: 'RICE Framework — profesjonalne prompty', content: '<div class="slide-header"><h3 class="slide-title">RICE Framework</h3><p class="slide-tagline">Powtarzalna struktura dla profesjonalnych wynikow</p></div><div class="slide-body"><div class="shield-comparison-grid"><div class="shield-card secure-shield"><h4>Bez RICE</h4><p>"Oceń ryzyko kredytowe tego klienta"</p><p style="color:#ef4444;margin-top:12px">❌ Wynik: Ogolna, powierzchowna odpowiedz</p></div><div class="shield-card"><h4>Z RICE</h4><p><strong>R — Role:</strong> Jestes glownym analitykiem ryzyka kredytowego<br><strong>I — Input:</strong> [wklejasz dane klienta]<br><strong>C — Context:</strong> Klient ubiega sie o kredyt 500k PLN, historia 2 lata<br><strong>E — Expected Output:</strong> Tabela z 5 czynnikami ryzyka, ocena 1-5, rekomendacja</p><p style="color:#22c55e;margin-top:12px">✓ Wynik: Strukturyzowana, powtarzalna analiza</p></div></div></div>', notes: 'Pokaz na zywo roznice w jakosci odpowiedzi.' }
];

const HANDBOOK = [
  { num: 1, title: 'Fundamenty AI Prompt Engineering', content: '<h3>Czym jest Prompt Engineering?</h3><p>Prompt Engineering to sztuka projektowania zapytan (promptow) do modeli jezykowych w sposob maksymalizujacy jakosc i uzytecznosc odpowiedzi. W srodowisku korporacyjnym, dobrze zaprojektowany prompt moze roznicy miedzy odpowiedzia ogolnikowa a konkretna, dzialajaca analiza.</p><h3>Dlaczego to wazne?</h3><p>Modele jezykowe jak Gemini sa deterministyczne w tym sensie, ze ta sama jakosc inputu daje ta sama jakosc outputu. Jesli pytasz nieprecyzyjnie — dostaniesz nieprecyzyjna odpowiedz. Jesli pytasz jak ekspert — dostaniesz ekspercka odpowiedz.</p><h3>Kluczowe zasady</h3><ul><li><strong>Specificity:</strong> Im bardziej konkretny prompt, tym bardziej konkretna odpowiedz</li><li><strong>Context:</strong> Zawsze podawaj kontekst sytuacji i oczekiwany rezultat</li><li><strong>Iteration:</strong> Prompty udoskonala sie iteracyjnie — pierwsze podejscie rzadko jest najlepsze</li><li><strong>Verification:</strong> Zawsze weryfikuj wyniki, szczegolnie liczby i fakty</li></ul>' },
  { num: 2, title: 'Chain-of-Thought i zaawansowane techniki', content: '<h3>Chain-of-Thought Prompting (CoT)</h3><p>Technika polegajaca na proszeniu modelu o "myslenie na glos" — opisanie kroku po kroku procesu dojscia do odpowiedzi. Dramatycznie poprawia jakosc przy zlozonych zadaniach analitycznych.</p><h3>Kiedy uzyc CoT?</h3><ul><li>Analiza finansowa wymagajaca wielostopniowych obliczen</li><li>Ocena ryzyka z wieloma czynnikami</li><li>Pisanie raportow z uzasadnieniami</li><li>Debugowanie problemow technicznych</li></ul><h3>Przyklad CoT dla analizy kredytowej</h3><p>Zamiast: "Oceń zdolnosc kredytowa"<br>Uzywaj: "Przeanalizuj zdolnosc kredytowa krok po kroku: 1) Oblicz wskaznik DTI (dług/dochod), 2) Oceń stabilnosc dochodu (forma zatrudnienia, staz), 3) Sprawdz historię kredytowa (terminowosc, liczba zobowiazan), 4) Oceń zabezpieczenia, 5) Wydaj rekomendacje z uzasadnieniem"</p>' },
  { num: 3, title: 'Gemini Enterprise — przewodnik korporacyjny', content: '<h3>Gemini Enterprise vs Gemini Free</h3><p>Korporacyjna wersja Gemini dziala w ramach Google Workspace Twojej organizacji i ma kluczowe gwarancje bezpieczenstwa:</p><div class="alert-box alert-important"><div class="alert-icon">🛡️</div><div class="alert-text"><strong>Gwarancje Enterprise:</strong><br>1. Twoje prompty i odpowiedzi NIE SA uzywane do trenowania modeli publicznych<br>2. Zaden pracownik Google NIE MA wgladu w Twoje rozmowy<br>3. Dane sa izolowane w domenie Twojej organizacji<br>4. Zgodnosc z RODO i standardami bankowymi</div></div><h3>Najlepsze zastosowania w bankowosci</h3><ul><li>Streszczanie raportow i dokumentow (ROI: 10x szybciej niz recznie)</li><li>Tlumaczenie dokumentow miedzy jezykami europejskimi</li><li>Generowanie szkicow emaili i prezentacji</li><li>Pisanie zapytan SQL i makr Excel</li></ul>' },
  { num: 4, title: 'NotebookLM — AI Research Assistant', content: '<h3>Czym jest NotebookLM?</h3><p>NotebookLM to narzedzie AI stworzone specjalnie do analizy dokumentow. W odroznieniu od Gemini, ktory moze odpowiadac na podstawie swojego treningu, NotebookLM odpowiada WYLACZNIE na podstawie dokumentow ktore sam wgrales.</p><h3>Kluczowe funkcje</h3><ul><li><strong>Source Grounding:</strong> Kazda odpowiedz oparta na Twoich dokumentach</li><li><strong>Cytowania:</strong> Klikalne linki do konkretnych fragmentow zrodel</li><li><strong>Multi-source synthesis:</strong> Moze laczyc informacje z wielu dokumentow jednoczesnie</li><li><strong>Zero halucynacji zewnetrznych:</strong> Nie dodaje informacji spoza Twoich plikow</li></ul><h3>Idealne zastosowania</h3><ul><li>Analiza umow i wyciaganie klauzul</li><li>Research przez wiele raportow naraz</li><li>Wyszukiwanie w procedurach wewnetrznych</li><li>Synteza rocznych raportow finansowych</li></ul>' },
];

async function run() {
  console.log('Seeding professional course...');

  // Check if already exists
  const existing = await new Promise(r => db.get("SELECT id FROM courses WHERE title = ?", [COURSE.title], (e, row) => r(row)));
  if (existing) {
    console.log('Course already exists, deleting and recreating...');
    await new Promise(r => db.run('DELETE FROM slides WHERE course_id=?', [existing.id], r));
    await new Promise(r => db.run('DELETE FROM handbook WHERE course_id=?', [existing.id], r));
    await new Promise(r => db.run('DELETE FROM quiz_questions WHERE quiz_id IN (SELECT id FROM quizzes WHERE course_id=?)', [existing.id], r));
    await new Promise(r => db.run('DELETE FROM quizzes WHERE course_id=?', [existing.id], r));
    await new Promise(r => db.run('DELETE FROM lessons WHERE module_id IN (SELECT id FROM modules WHERE course_id=?)', [existing.id], r));
    await new Promise(r => db.run('DELETE FROM modules WHERE course_id=?', [existing.id], r));
    await new Promise(r => db.run('DELETE FROM enrollments WHERE course_id=?', [existing.id], r));
    await new Promise(r => db.run('DELETE FROM courses WHERE id=?', [existing.id], r));
  }

  // Create course
  const courseId = await new Promise((resolve, reject) => {
    db.run('INSERT INTO courses (title, description, level, duration, price, is_free, thumbnail, is_published) VALUES (?,?,?,?,?,?,?,1)',
      [COURSE.title, COURSE.description, COURSE.level, COURSE.duration, COURSE.price, COURSE.is_free, COURSE.thumbnail],
      function(err) { if (err) reject(err); else resolve(this.lastID); }
    );
  });
  console.log('Course created:', courseId);

  // Modules & Lessons
  for (const [mi, mod] of MODULES.entries()) {
    const moduleId = await new Promise((resolve, reject) => {
      db.run('INSERT INTO modules (course_id, title, description, order_index) VALUES (?,?,?,?)',
        [courseId, mod.title, mod.description, mi + 1],
        function(err) { if (err) reject(err); else resolve(this.lastID); }
      );
    });
    for (const [li, lesson] of mod.lessons.entries()) {
      await new Promise((resolve, reject) => {
        db.run('INSERT INTO lessons (module_id, title, content, video_url, duration, order_index) VALUES (?,?,?,?,?,?)',
          [moduleId, lesson.title, lesson.content, lesson.video_url || null, lesson.duration, li + 1],
          function(err) { if (err) reject(err); else resolve(); }
        );
      });
    }
  }
  console.log('Modules & lessons created');

  // Quiz
  const quizId = await new Promise((resolve, reject) => {
    db.run('INSERT INTO quizzes (course_id, title, passing_score) VALUES (?,?,?)',
      [courseId, 'AI Prompt Engineering — Test Wiedzy', 80],
      function(err) { if (err) reject(err); else resolve(this.lastID); }
    );
  });
  for (const q of QUIZ_QUESTIONS) {
    await new Promise((resolve, reject) => {
      db.run('INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, scenario, explanation) VALUES (?,?,?,?,?,?)',
        [quizId, q.question, JSON.stringify(q.options), q.correct_answer, q.scenario, q.explanation],
        function(err) { if (err) reject(err); else resolve(); }
      );
    });
  }
  console.log('Quiz created');

  // Slides
  for (const s of SLIDES) {
    await new Promise((resolve, reject) => {
      db.run('INSERT INTO slides (course_id, slide_number, title, content, notes, order_index) VALUES (?,?,?,?,?,?)',
        [courseId, s.num, s.title, s.content, s.notes, s.num],
        function(err) { if (err) reject(err); else resolve(); }
      );
    });
  }
  console.log('Slides created');

  // Handbook
  for (const c of HANDBOOK) {
    await new Promise((resolve, reject) => {
      db.run('INSERT INTO handbook (course_id, chapter_number, title, content, order_index) VALUES (?,?,?,?,?)',
        [courseId, c.num, c.title, c.content, c.num],
        function(err) { if (err) reject(err); else resolve(); }
      );
    });
  }
  console.log('Handbook created');

  // Auto-enroll user@test.com
  const user = await new Promise(r => db.get("SELECT id FROM users WHERE email=?", ['user@test.com'], (e, row) => r(row)));
  if (user) {
    await new Promise(r => db.run('INSERT OR IGNORE INTO enrollments (user_id, course_id, payment_status) VALUES (?,?,?)', [user.id, courseId, 'completed'], r));
  }

  console.log('\n✅ Professional course seeded successfully!');
  console.log('Course ID:', courseId);
  console.log('Title:', COURSE.title);
  console.log('Modules:', MODULES.length);
  console.log('Slides:', SLIDES.length);
  console.log('Handbook chapters:', HANDBOOK.length);
  console.log('Quiz questions:', QUIZ_QUESTIONS.length);
  db.close();
}

run().catch(err => { console.error(err); db.close(); });
