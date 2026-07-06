const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./learning_center.db');

db.run('DELETE FROM quiz_questions WHERE quiz_id = 1', () => {
  const questions = [
    {
      scenario: 'Twoj kolega z dzialu kredytowego musi pilnie przetlumaczyc 10-stronicowa umowe z klientem na jezyk angielski. Proponuje wkleic caly tekst z danymi klienta do bezplatnego ChatGPT, bo "to tylko chwila". Jak reagujesz?',
      question: 'Co robisz gdy kolega chce uzyc darmowego ChatGPT do tlumaczenia dokumentow z danymi klientow?',
      options: JSON.stringify([
        'Nie odzywasz sie — skoro on bierze odpowiedzialnosc, to jego problem.',
        'Pozwalasz mu, ale radzisz usunac po pracy historie czatu.',
        'Kategorycznie odradzasz i wskazujesz na bezpieczny Gemini Enterprise zalogowany na @unicredit.pl jako wlasciwe narzedzie.',
        'Proponujesz uzyc Google Translate, bo jest darmowy i bezpieczniejszy od ChatGPT.'
      ]),
      correct_answer: 2,
      explanation: 'Wklejanie danych klientow (PII) do darmowych czatow AI stanowi powazne naruszenie Polityki AI v1.1. Jedynym bezpiecznym narzedziem jest Gemini Enterprise z kontem @unicredit.pl, ktory zapewnia pelna izolacje danych i nie trenuje na nich modeli publicznych.'
    },
    {
      scenario: 'Przygotowujesz scoring kredytowy dla nowego korporacyjnego klienta. Twoj przetozony sugeruje uzycie nowego, zewnetrznego narzedzia AI znalezionego w internecie, bo jest darmowe i wystarczyloby zarejestrowac sie prywatnym mailem.',
      question: 'Jak postąpisz gdy przelozony proponuje darmowe narzedzie AI do scoringu kredytowego bez rejestracji w IT?',
      options: JSON.stringify([
        'Rejestrujesz sie prywatnym e-mailem — skoro nikt nie widzi, to jest bezpieczne.',
        'Odmawiasz i przypominasz, ze system oceny kredytowej jest systemem wysokiego ryzyka wg Aktu o AI, wymagajacym kwalifikacji IT, CMDB i zatwierdzenia ExCom.',
        'Uzywasz narzedzia tylko do wstepnej analizy, a potem weryfikujesz wyniki recznie.',
        'Informujesz prawnika banku, ale najpierw szybko testujesz na prawdziwych danych klienta.'
      ]),
      correct_answer: 1,
      explanation: 'Systemy AI do oceny zdolnosci kredytowej sa klasyfikowane jako systemy wysokiego ryzyka wg Aktu o AI (Rozporzadzenie 2024/1689). Wymagaja: kwalifikacji IT, wpisu CMDB, DPIA, opinii CISO i zatwierdzenia przez Zarzad (ExCom). Korzystanie z niezarejestrowanych narzedzi zewnetrznych jest surowo zakazane.'
    },
    {
      scenario: 'Pracujesz w HR i wlasnie wdrozono nowy system AI do automatycznej filtracji nadesanych aplikacji kandydatow. System generuje ranking CV bez ingerencji czlowieka.',
      question: 'Co robisz gdy system HR AI filtruje CV bez udzialu czlowieka?',
      options: JSON.stringify([
        'Akceptujesz wyniki bez pytan — AI jest obiektywna, wiec wyeliminuje uprzedzenia czlowieka.',
        'Weryfikujesz jedynie CV odrzucone — zatwierdzone przez AI nie wymagaja przegladu.',
        'Pytasz IT, czy system przeszedl przez pelny Proces AI v1.0 (kwalifikacja, CMDB, DPIA, ExCom), bo systemy HR nalezo do wysokiego ryzyka i wymagaja nadzoru czlowieka.',
        'Zglaszasz pomysl, zeby CISO zablokowanie i wdrozyl bardziej zaawansowany.'
      ]),
      correct_answer: 2,
      explanation: 'Systemy do automatycznej filtracji CV sa klasyfikowane jako wysokiego ryzyka (Zalacznik III Aktu o AI). Wymagaja pelnego cyklu weryfikacji (Proces AI v1.0), obowiazkowego nadzoru czlowieka (human-in-the-loop) i rejestracji CMDB.'
    },
    {
      scenario: 'Opracowaies w NotebookLM fenomenalny sposob analizowania umow z dostawcami. Twoja metoda oszczedza Ci 6 godzin pracy tygodniowo. Chcesz sie tym podzielic z calym oddzialem.',
      question: 'Jak najlepiej udostepnic swoja metode analizy w NotebookLM calemu bankowi?',
      options: JSON.stringify([
        'Wysylasz swoj NotebookLM wszystkim bezposrednio mailem ze swoim prywatnym kontem Google.',
        'Tworzysz prywatny pokoj na Teams z instrukcjami, zeby nikt oficjalnie o tym nie wiedzial.',
        'Wysylasz opis swojego rozwiazania na ai@unicredit.pl — zespol AI przeprowadzi kwalifikacje, DPIA, wpis CMDB i udostepni rozwiazanie calemu bankowi, wskazujac Cie jako autora.',
        'Sprzedajesz pomysl zewnetrznej firmie konsultingowej, bo bank sie nie zainteresuje.'
      ]),
      correct_answer: 2,
      explanation: 'Korporacyjny Program Skalowania AI istnieje wlasnie po to, aby bezpiecznie wdrazac dobre pomysly pracownikow. Wysylajac opis na ai@unicredit.pl, zyskujesz wsparcie prawne (DPIA, CMDB, Akt o AI) i wdrozenie w skali calego banku z uznaniem autorstwa.'
    },
    {
      scenario: 'Twoj menedzer sugeruje wdrozenie systemu AI monitorujacego w czasie rzeczywistym aktywnosc pracownikow na komputerach (klawiatura, myszka, ekran), aby mierzyc ich zaangazowanie.',
      question: 'Jak reagujesz na propozycje wdrozenia systemu AI monitorujacego aktywnosc pracownikow?',
      options: JSON.stringify([
        'Oceniasz projekt jako innowacje i rekomendujesz szybkie wdrozenie, bo poprawi produktywnosc.',
        'Wdrazasz na probe na wybranym dziale przez 3 miesiace bez powiadamiania pracownikow.',
        'Informujesz, ze ten typ systemu jest bezwzglednie zakazana kategoria AI w UE (Art. 5 Aktu o AI) i przez Polityke AI v1.1. Zglaszasz sprawe do CISO.',
        'Prosisz dzial IT oocene kosztow — moze to dobra inwestycja dla banku.'
      ]),
      correct_answer: 2,
      explanation: 'Systemy monitorujace aktywnosc pracownikow pod katem zaangazowania sa kategorycznie zakazane przez Artykul 5 Aktu o AI UE (tzw. Systemy Zabronione). Wlasciwa odpowiedzia jest odmowa i niezwloczne zgloszenie do Biura CISO.'
    }
  ];

  let done = 0;
  const stmt = db.prepare('INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, scenario, explanation) VALUES (1, ?, ?, ?, ?, ?)');
  questions.forEach((q) => {
    stmt.run(q.question, q.options, q.correct_answer, q.scenario, q.explanation, (err) => {
      if (err) { console.error('Error:', err.message); }
      else { console.log('Inserted question', ++done); }
      if (done === questions.length) {
        db.close();
        console.log('Quiz migration done!');
      }
    });
  });
  stmt.finalize();
});
