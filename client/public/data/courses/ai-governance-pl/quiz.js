// ==========================================================================
// QUIZ DATA — AI Governance (Polish version)
// ==========================================================================

export const QUIZ_META = {
    id: 'ai-governance-pl-quiz',
    courseId: 'ai-governance-pl',
    language: 'pl',
    title: 'Wyzwanie Zgodności AI w UniCredit',
    description: 'Przed wdrożeniem innowacji upewnij się, że posiadasz odpowiedni poziom kompetencji. Weź udział w interaktywnym teście 5 pytań sytuacyjnych opartym na unijnym Akcie o AI oraz wewnętrznych procedurach.',
    passingPercent: 80,
    // Certificate config
    certificate: {
        title: 'Certyfikat Zgodności AI',
        issuer: 'Biuro Governance AI, Polska',
        organization: 'Grupa UniCredit',
        courseName: 'Świadomość AI i Zgodność Regulacyjna w UniCredit',
        legalNote: 'Szkolenie w pełni zintegrowane z unijnym Aktem o Sztucznej Inteligencji (Rozporządzenie 2024/1689), Polityką AI v1.1 oraz Procesem AI v1.0 w zakresie bezpiecznych operacji w chmurze banku.',
        signerName: 'Sylwia Szuba',
        signerTitle: 'AI Governance Lead & Domain Owner',
        signerOrg: 'UniCredit Group IT Governance'
    }
};

export const QUESTIONS = [
    {
        id: 'q1',
        scenario: 'Twój kolega z działu kredytowego musi pilnie przetłumaczyć 10-stronicową umowę z klientem na język angielski. Proponuje wkleić cały tekst z danymi klienta do bezpłatnego ChatGPT, bo „to tylko chwila". Jak reagujesz?',
        options: [
            { id: 'a', text: 'Nie odzywasz się — skoro on bierze odpowiedzialność, to jego problem.' },
            { id: 'b', text: 'Pozwalasz mu, ale radzisz usunąć po pracy historię czatu.', isCorrect: false },
            { id: 'c', text: 'Kategorycznie odradzasz i wskazujesz na bezpieczny Gemini Enterprise zalogowany na @unicredit.pl jako właściwe narzędzie.', isCorrect: true },
            { id: 'd', text: 'Proponujesz użyć Google Translate, bo jest darmowy i bezpieczniejszy od ChatGPT.' }
        ],
        correctId: 'c',
        explanation: 'Wklejanie danych klientów (PII) do darmowych, publicznych czatów AI stanowi poważne naruszenie Polityki AI v1.1, a dane te mogą zostać użyte do trenowania modeli i przeglądane przez podwykonawców. Jedynym bezpiecznym, licencjonowanym rozwiązaniem jest Gemini Enterprise z kontem @unicredit.pl, który zapewnia pełną izolację danych.'
    },
    {
        id: 'q2',
        scenario: 'Przygotowujesz scoring kredytowy dla nowego korporacyjnego klienta. Twój przełożony sugeruje użycie nowego, zewnętrznego narzędzia AI znalezionego w internecie, bo jest darmowe i wystarczyłoby zarejestrować się prywatnym mailem.',
        options: [
            { id: 'a', text: 'Rejestrujesz się prywatnym e-mailem — skoro nikt nie widzi, to jest bezpieczne.', isCorrect: false },
            { id: 'b', text: 'Odmawiasz i przypominasz, że system oceny kredytowej jest systemem wysokiego ryzyka zgodnie z Aktem o AI, który wymaga kwalifikacji IT, rejestracji CMDB i zatwierdzenia przez ExCom przed wdrożeniem.', isCorrect: true },
            { id: 'c', text: 'Używasz narzędzia tylko do wstępnej analizy, a potem weryfikujesz wyniki ręcznie.' },
            { id: 'd', text: 'Informujesz prawnika banku, ale najpierw szybko testujesz na prawdziwych danych klienta.' }
        ],
        correctId: 'b',
        explanation: 'Systemy AI stosowane do oceny zdolności kredytowej są klasyfikowane jako systemy "wysokiego ryzyka" według Aktu o AI (Rozporządzenie 2024/1689). Ich wdrożenie wymaga: obowiązkowej kwalifikacji IT, wpisu do rejestru CMDB, wykonania DPIA, opinii CISO i zatwierdzenia przez Zarząd (ExCom). Korzystanie z niezarejestrowanych narzędzi zewnętrznych jest surowo zakazane.'
    },
    {
        id: 'q3',
        scenario: 'Pracujesz w HR i właśnie wdrożono nowy system AI do automatycznej filtracji nadesłanych aplikacji kandydatów. System generuje ranking nadesłanych CV bez ingerencji człowieka. Jaką podjąłbyś decyzję?',
        options: [
            { id: 'a', text: 'Akceptujesz wyniki bez pytań — AI jest obiektywna, więc wyeliminuje uprzedzenia człowieka.', isCorrect: false },
            { id: 'b', text: 'Weryfikujesz jedynie CV odrzucone — zatwierdzone przez AI nie wymagają przeglądu.', isCorrect: false },
            { id: 'c', text: 'Pytasz IT, czy system przeszedł przez pełny wewnętrzny Proces AI v1.0 (kwalifikacja, CMDB, DPIA, ExCom), bo systemy HR należą do systemów wysokiego ryzyka wymagających obowiązkowego nadzoru człowieka.', isCorrect: true },
            { id: 'd', text: 'Zgłaszasz pomysł, żeby CISO zablokował system i wdrożył bardziej zaawansowany.' }
        ],
        correctId: 'c',
        explanation: 'Systemy do automatycznej filtracji CV i rekrutacji są klasyfikowane jako "wysokiego ryzyka" według Aktu o AI (Załącznik III). Wymagają one pełnego cyklu weryfikacji (Proces AI v1.0), obowiązkowego nadzoru człowieka (human-in-the-loop) i rejestracji. Akceptowanie wyników bez weryfikacji jest niezgodne z przepisami i wewnętrznymi politykami UniCredit.'
    },
    {
        id: 'q4',
        scenario: 'Opracowałeś w NotebookLM fenomenalny sposób analizowania umów z dostawcami. Twoja metoda oszczędza Ci 6 godzin pracy tygodniowo. Chcesz się tym podzielić z całym oddziałem.',
        options: [
            { id: 'a', text: 'Wysyłasz swój NotebookLM wszystkim bezpośrednio mailem ze swoim prywatnym kontem Google.', isCorrect: false },
            { id: 'b', text: 'Tworzysz prywatny pokój na Teams z instrukcjami, żeby nikt oficjalnie o tym nie wiedział.', isCorrect: false },
            { id: 'c', text: 'Wysyłasz opis swojego rozwiązania na ai@unicredit.pl — zespół zarządzania AI przeprowadzi kwalifikację, DPIA, wpis CMDB i udostępni Twoje rozwiązanie całemu bankowi, wskazując Cię jako autora.', isCorrect: true },
            { id: 'd', text: 'Sprzedajesz pomysł zewnętrznej firmie konsultingowej, bo bank się nie zainteresuje.' }
        ],
        correctId: 'c',
        explanation: 'Korporacyjny Program Skalowania AI w UniCredit istnieje właśnie po to, aby bezpiecznie i oficjalnie wdrażać dobre pomysły pracowników. Wysyłając opis na ai@unicredit.pl, zyskujesz wsparcie prawne (DPIA, CMDB, Akt o AI) i możliwość wdrożenia rozwiązania w skali całego banku — z uznaniem autorstwa.'
    },
    {
        id: 'q5',
        scenario: 'Twój menadżer sugeruje wdrożenie systemu AI monitorującego w czasie rzeczywistym aktywność pracowników na komputerach (klawiatura, myszka, ekran), aby mierzyć ich zaangażowanie i wykrywać ewentualne bezczynności.',
        options: [
            { id: 'a', text: 'Oceniasz projekt jako innowację i rekomiendujesz szybkie wdrożenie, bo poprawi produktywność.', isCorrect: false },
            { id: 'b', text: 'Wdrażasz na próbę na wybranym dziale przez 3 miesiące bez powiadamiania pracowników.', isCorrect: false },
            { id: 'c', text: 'Informujesz, że ten typ systemu jest prawdopodobnie systemem rozpoznawania emocji/zaangażowania w miejscu pracy — co jest bezwzględnie zakazaną kategorią AI w Unii Europejskiej i przez Politykę AI v1.1 UniCredit. Zgłaszasz sprawę do CISO.', isCorrect: true },
            { id: 'd', text: 'Prosisz dział IT o ocenę kosztów — może to dobra inwestycja dla banku.' }
        ],
        correctId: 'c',
        explanation: 'Systemy monitorujące aktywność pracowników pod kątem zaangażowania, stresu lub emocji są kategorycznie zakazane przez Artykuł 5 Aktu o AI UE. Są to tzw. "Systemy Zabronione" — nie wymagają oceny ryzyka, bo są bezwzględnie niedopuszczalne. Właściwą odpowiedzią jest odmowa i niezwłoczne zgłoszenie do Biura CISO.'
    }
];
