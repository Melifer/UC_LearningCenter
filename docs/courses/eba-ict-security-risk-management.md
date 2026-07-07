---
title: "EBA Guidelines on ICT and Security Risk Management"
description: "Szkolenie z wytycznych EBA/GL/2019/04. Obowiązkowe dla wszystkich pracowników UniCredit. Omawia wymagania regulacyjne w zakresie zarządzania ryzykiem ICT, bezpieczeństwa informacji i ciągłości działania banku."
level: "Intermediate"
duration: "3 hours"
language: "pl"
mandatory: true
deadline: "2026-12-31"
refresher_months: 12
passing_score: 100
---

# Module 1: Dlaczego wytyczne EBA ICT są ważne?

## Lesson 1.1: Kontekst regulacyjny i historia

W listopadzie 2019 roku Europejski Urząd Nadzoru Bankowego (EBA) opublikował Wytyczne w sprawie zarządzania ryzykiem ICT i bezpieczeństwa (EBA/GL/2019/04). Wytyczne obowiązują od 28 czerwca 2020 roku i stanowią odpowiedź regulatora na rosnącą falę cyberataków oraz awarii systemów informatycznych dotykających europejski sektor bankowy.

**Dlaczego regulatorzy musieli zareagować?**

W ciągu kilku lat poprzedzających publikację wytycznych Europa była świadkiem serii incydentów, które ujawniły słabości branży finansowej:

- **2017 — WannaCry**: globalny atak ransomware sparaliżował systemy kilkudziesięciu banków i instytucji finansowych. Niektóre oddziały bankowe musiały przez wiele godzin pracować ręcznie, bo systemy transakcyjne były niedostępne.
- **2018 — TSB Bank (UK)**: migracja systemu IT zakończyła się katastrofą. Przez prawie dwa tygodnie milion klientów nie mogło się zalogować do bankowości online. Koszty naprawy przekroczyły 300 milionów funtów, a prezes banku podał się do dymisji.
- **2019 — Capital One**: hakerzy uzyskali dostęp do danych ponad 100 milionów klientów banku w USA i Kanadzie. Luka wynikała ze źle skonfigurowanej usługi chmurowej.

W Polsce i Europie Środkowej regulatorzy obserwowali podobne trendy. Coraz więcej banków przenosi systemy do chmury, zleca usługi IT dostawcom zewnętrznym i korzysta z rozbudowanej infrastruktury cyfrowej — co tworzy nowe ryzyka.

**Podstawa prawna wytycznych**

Wytyczne EBA/GL/2019/04 zostały wydane na podstawie art. 74 i 85(2) Dyrektywy 2013/36/UE (Dyrektywa CRD IV). Oznacza to, że mają moc obowiązującą dla wszystkich instytucji kredytowych i firm inwestycyjnych w Unii Europejskiej. Polska Komisja Nadzoru Finansowego potwierdziła stosowanie tych wytycznych przez banki działające w Polsce.

**UniCredit w tym kontekście**

UniCredit jako europejska grupa bankowa działająca w 18 krajach podlega tym regulacjom bezpośrednio. Każdy pracownik, który korzysta z systemów informatycznych banku, zarządza danymi klientów lub uczestniczy w procesach opartych na technologii — jest elementem tego ekosystemu ryzyka ICT. Dlatego znajomość podstawowych wymagań regulacyjnych jest obowiązkiem każdego z nas.

## Lesson 1.2: Zakres wytycznych i objęte podmioty

Wytyczne EBA ICT określają minimalne standardy, które instytucje finansowe muszą spełnić w obszarze zarządzania ryzykiem technologicznym. Zrozumienie, kogo dotyczą i co obejmują, to pierwszy krok do świadomego compliance.

**Kto jest objęty wytycznymi?**

Wytyczne mają zastosowanie do:

- **Instytucji kredytowych** — banków komercyjnych i spółdzielczych, takich jak UniCredit
- **Firm inwestycyjnych** — podmiotów świadczących usługi inwestycyjne (maklerzy, domy maklerskie)
- **Instytucji płatniczych i instytucji pieniądza elektronicznego** — na podstawie analogicznych, równoległych regulacji EBA

W praktyce oznacza to, że obejmują całą grupę UniCredit: centralne struktury holdingowe, każdy bank operacyjny w poszczególnych krajach (w tym UniCredit Bank Polska S.A.) oraz podmioty świadczące usługi wspierające grupę.

**Zasada proporcjonalności**

EBA przewiduje zasadę proporcjonalności — oznacza to, że duże, kompleksowe grupy bankowe jak UniCredit muszą stosować pełen zakres wymagań, podczas gdy mniejsze, prostsze instytucje mogą stosować uproszczone podejście. UniCredit należy do kategorii instytucji znaczących (significant institution) nadzorowanych bezpośrednio przez Europejski Bank Centralny, co oznacza najwyższe standardy.

**Kluczowe definicje, które musisz znać**

Zanim przejdziemy do wymagań, warto upewnić się, że rozumiemy podstawowe pojęcia:

**Ryzyko ICT** to ryzyko strat wynikające z nieodpowiednich lub wadliwych wewnętrznych procesów ICT, zdarzeń zewnętrznych lub działania stron trzecich. Obejmuje zarówno awarie techniczne, jak i ataki cybernetyczne, błędy ludzkie w obszarze IT oraz nieudane projekty technologiczne.

**System ICT** to każda technologia wspierająca procesy biznesowe — od serwera przetwarzającego transakcje bankowe, przez aplikację mobilną, po prosty arkusz kalkulacyjny używany do raportowania.

**Ryzyko cyberbezpieczeństwa** jest szczególną kategorią ryzyka ICT — odnosi się do zagrożeń wynikających z celowych, złośliwych działań: ataków hakerskich, złośliwego oprogramowania, phishingu, kradzieży danych.

**RTO (Recovery Time Objective)** — maksymalny dopuszczalny czas, w którym system musi zostać przywrócony po awarii. Na przykład RTO dla systemu płatności może wynosić 4 godziny — oznacza to, że dłuższa przerwa jest niedopuszczalna.

**RPO (Recovery Point Objective)** — maksymalna akceptowalna utrata danych mierzona w czasie. RPO = 1 godzina oznacza, że backup danych musi być wykonywany co godzinę, bo utrata więcej niż godziny danych transakcyjnych byłaby nieakceptowalna.

## Lesson 1.3: Pięć filarów wytycznych EBA ICT

Wytyczne EBA ICT są zorganizowane wokół pięciu głównych obszarów. Każdy z nich stanowi integralną część zarządzania ryzykiem technologicznym banku. Razem tworzą kompleksową, wzajemnie powiązaną strukturę.

**Filar 1 — Ład korporacyjny ICT (Section 4.1)**

Odpowiada na pytanie: *kto odpowiada za ryzyko ICT?* Wymaga, aby zarząd banku przyjął na siebie ostateczną odpowiedzialność za strategie i polityki ICT. Bez silnego zaangażowania kierownictwa pozostałe filary są nieskuteczne.

**Filar 2 — Zarządzanie ryzykiem ICT (Section 4.2)**

Odpowiada na pytanie: *jak identyfikujemy i mitygujemy ryzyka?* Wymaga systematycznego podejścia do identyfikacji, oceny i monitorowania ryzyk technologicznych w całej organizacji.

**Filar 3 — Bezpieczeństwo informacji (Section 4.3)**

Odpowiada na pytanie: *jak chronimy dane i systemy?* Obejmuje polityki bezpieczeństwa, kontrolę dostępu, zarządzanie podatnościami, szyfrowanie i reagowanie na incydenty.

**Filar 4 — Operacje ICT (Section 4.4)**

Odpowiada na pytanie: *jak zapewniamy stabilne działanie systemów?* Obejmuje zarządzanie zmianami, zarządzanie konfiguracją, zarządzanie pojemnością i monitorowanie systemów.

**Filar 5 — Ciągłość działania ICT (Section 4.5)**

Odpowiada na pytanie: *co robimy, gdy coś pójdzie nie tak?* Wymaga opracowania, utrzymania i regularnego testowania planów ciągłości działania i disaster recovery.

Każdy z tych filarów wymaga zarówno odpowiednich polityk i procedur, jak i ich realnego stosowania w praktyce. Regulator podczas inspekcji ocenia nie tylko dokumentację, ale przede wszystkim dowody na faktyczne wdrożenie.

---

# Module 2: Ład korporacyjny ICT — rola kierownictwa

## Lesson 2.1: Odpowiedzialność zarządu i kadry zarządzającej

Jednym z fundamentalnych wymagań wytycznych EBA jest jasne przypisanie odpowiedzialności za ryzyko ICT na najwyższym szczeblu organizacji. Nie chodzi o delegowanie tego tematu wyłącznie do działu IT — wytyczne wymagają osobistego zaangażowania zarządu banku.

**Co konkretnie musi robić zarząd?**

EBA wymaga, aby organ zarządzający (Management Body) w skład którego wchodzi zarówno rada nadzorcza, jak i zarząd wykonawczy, wypełniał następujące obowiązki:

Po pierwsze, zarząd musi **zatwierdzać strategię ICT** spójną z ogólną strategią biznesową banku. Oznacza to, że technologia nie jest "sprawą IT" — jest elementem strategii całego banku. Decyzje o inwestycjach technologicznych, migracji do chmury, outsourcingu procesów IT muszą być podejmowane na poziomie zarządu, a nie tylko menedżerów technicznych.

Po drugie, zarząd określa **apetyt na ryzyko ICT** — formalne granice ryzyka technologicznego, które bank jest gotów zaakceptować. Przykładowo: ile godzin niedostępności kluczowego systemu rocznie jest akceptowalne? Jaki poziom wydatków na incydenty cyberbezpieczeństwa jest do zniesienia? Te decyzje muszą być udokumentowane i zatwierdzone przez zarząd.

Po trzecie, zarząd regularnie przegląda **raporty o stanie ryzyka ICT**. Przynajmniej raz w roku zarząd powinien być szczegółowo informowany o kluczowych ryzykach technologicznych, incydentach z minionego okresu, postępach w realizacji planu zarządzania ryzykiem ICT.

**Rola Komitetu ds. Ryzyka**

W praktyce zarządy dużych banków powołują wyspecjalizowane komitety, które na co dzień sprawują nadzór nad ryzykiem ICT. W UniCredit funkcję tę pełni Group Risk Committee, z dedykowaną ścieżką raportowania dla ryzyk operacyjnych i ICT. Lokalne komitety ryzyka w każdym kraju (w tym Risk Committee UniCredit Bank Polska) zapewniają nadzór na poziomie operacyjnym.

**CISO — kluczowa rola**

EBA jednoznacznie wymaga, aby instytucja wyznaczyła przynajmniej jednego członka kierownictwa wyższego szczebla z dedykowaną odpowiedzialnością za bezpieczeństwo informacji. W praktyce jest to **Chief Information Security Officer (CISO)** lub równoważna funkcja.

CISO w UniCredit jest odpowiedzialny za definiowanie polityki bezpieczeństwa informacji, nadzór nad incydentami bezpieczeństwa, raportowanie do zarządu o stanie cyberbezpieczeństwa i spełnieniu wymagań regulacyjnych. Co istotne, CISO musi mieć zapewnioną niezależność od działu operacji IT — nie może być jednocześnie odpowiedzialny za budowę systemów i za ich bezpieczeństwo.

## Lesson 2.2: Strategia ICT i apetyt na ryzyko

**Czym jest strategia ICT i co powinna zawierać?**

Strategia ICT to dokument, który opisuje jak technologia będzie wspierać realizację celów biznesowych banku w perspektywie wieloletniej (typowo 3-5 lat). EBA wymaga, żeby strategia ICT obejmowała kilka kluczowych elementów.

**Ocena obecnych możliwości technologicznych** — bank musi wiedzieć, w jakim stanie jest jego infrastruktura. Które systemy są nowoczesne i efektywne? Które są przestarzałe i stwarzają ryzyko (tzw. legacy systems)? Jaka jest architektura sieci, centrów danych, systemów backupu?

**Planowane inwestycje i roadmapa technologiczna** — dokąd bank zmierza? Jakie projekty technologiczne są planowane? Jak wygląda plan migracji do chmury, modernizacji systemów transakcyjnych, wdrożenia nowych produktów cyfrowych?

**Zarządzanie zależnościami od stron trzecich** — bank musi rozumieć, od których dostawców zewnętrznych jest zależny krytycznie. Atak na dostawcę lub jego awaria mogą sparaliżować działalność banku równie skutecznie, jak bezpośredni atak na bank. Strategia ICT musi opisywać podejście do zarządzania tym ryzykiem.

**Apetyt na ryzyko ICT — jak to działa w praktyce?**

Apetyt na ryzyko ICT to formalne określenie, ile ryzyka technologicznego bank jest gotów zaakceptować. Musi być spójny z ogólnym apetytem na ryzyko zatwierdzonym przez zarząd. 

W praktyce apetyt na ryzyko ICT definiuje się przez zestaw wskaźników z określonymi limitami. Przykładowo:

- Maksymalna niedostępność kluczowych systemów w ciągu roku: 8 godzin
- Maksymalna liczba poważnych incydentów bezpieczeństwa rocznie: 0
- Minimalny czas do wykrycia włamania: 48 godzin
- Minimalny pokrycie krytycznych systemów przez testy penetracyjne: 100%

Jeśli faktyczna sytuacja przekracza te limity, zarząd jest natychmiast informowany i podejmuje działania korygujące. Apetyt na ryzyko nie jest dokumentem, który odkłada się na półkę — jest żywym narzędziem zarządzania.

## Lesson 2.3: Model Trzech Linii Obrony w ICT

Model Trzech Linii Obrony (Three Lines of Defense) to powszechnie stosowany w branży finansowej schemat organizowania funkcji zarządzania ryzykiem. EBA wymaga jego stosowania także w obszarze ICT.

**Pierwsza Linia Obrony — właściciele procesów biznesowych**

Pierwsza linia to wszystkie jednostki biznesowe i operacyjne banku. Każdy menedżer, kierownik zespołu i pracownik odpowiada za zarządzanie ryzykiem ICT w obszarze swoich działań. Jeśli pracownik otrzymuje podejrzanego emaila i go otwiera — to on, jako pierwsza linia, nie spełnił swojej roli. Jeśli menedżer wyraża zgodę na użycie nieautoryzowanego, prywatnego oprogramowania do pracy z danymi banku — to on ponosi odpowiedzialność.

Pierwsza linia wdraża kontrole, dokumentuje procesy i na bieżąco identyfikuje ryzyka w swojej pracy. To nie jest "sprawa IT" — to odpowiedzialność każdego.

**Druga Linia Obrony — niezależna funkcja ryzyka i CISO**

Druga linia to niezależne funkcje zarządzania ryzykiem: Departament Zarządzania Ryzykiem Operacyjnym, CISO z podległym zespołem bezpieczeństwa informacji, Departament Compliance. Ich rolą jest projektowanie polityk i standardów, które pierwsza linia musi stosować, oraz monitorowanie ich przestrzegania.

Kluczowe słowo to *niezależność* — EBA wymaga, żeby funkcje drugiej linii nie podlegały tym samym menedżerom, co funkcje IT operacyjne. Inaczej pojawia się konflikt interesów: ten sam szef, który odpowiada za szybkie wdrożenie nowego systemu, nie może jednocześnie oceniać ryzyka tego wdrożenia.

**Trzecia Linia Obrony — Audyt Wewnętrzny**

Trzecia linia to Audyt Wewnętrzny. Jego rolą jest niezależna ocena, czy pierwsza i druga linia faktycznie działają zgodnie z wymaganiami. Audyt ICT sprawdza, czy polityki bezpieczeństwa są stosowane w praktyce, czy testy planów ciągłości działania są przeprowadzane, czy incydenty są właściwie raportowane.

Wyniki audytów ICT trafiają bezpośrednio do komitetu audytu zarządu — zapewnia to, że najwyższe kierownictwo jest informowane o ewentualnych lukach w zarządzaniu ryzykiem ICT.

---

# Module 3: Zarządzanie ryzykiem ICT — od teorii do praktyki

## Lesson 3.1: Inwentarz aktywów i klasyfikacja ryzyk

Zanim można zarządzać ryzykiem ICT, trzeba wiedzieć, co się posiada. EBA wymaga prowadzenia kompletnego, aktualnego inwentarza aktywów ICT. Brzmi prosto — w praktyce jest to jedno z największych wyzwań w dużych organizacjach.

**Czym są aktywa ICT i dlaczego ich inwentaryzacja jest trudna?**

Aktywa ICT to wszystko, co przetwarza, przechowuje lub przesyła informacje banku. Obejmuje:

- **Infrastrukturę fizyczną**: serwery w centrach danych, urządzenia sieciowe (routery, przełączniki, firewall), stacje robocze pracowników, laptopy, telefony służbowe
- **Oprogramowanie**: systemy operacyjne, systemy transakcyjne (np. system core banking), aplikacje biznesowe, narzędzia analityczne, oprogramowanie biurowe
- **Dane**: dane klientów, dane transakcyjne, dane pracownicze, dane regulacyjne
- **Usługi zewnętrzne**: chmura obliczeniowa, outsourcowane usługi IT, zewnętrzne platformy SaaS, API integracyjne

W dużej grupie bankowej takich aktywów mogą być tysiące. Wyzwaniem jest nie tylko ich zinwentaryzowanie, ale i utrzymywanie inwentarza w aktualnym stanie przy ciągłych zmianach — wdrożeniach nowych systemów, migracji do chmury, zmianach w umowach z dostawcami.

**Klasyfikacja aktywów według krytyczności**

Nie wszystkie aktywa są równie ważne. Inwentarz ICT powinien zawierać ocenę krytyczności każdego aktywa — im bardziej krytyczne dla działalności banku, tym wyższy poziom ochrony jest wymagany. Klasyfikacja typowo obejmuje:

**Krytyczne (Critical)**: systemy, których niedostępność powoduje natychmiastową niemożność prowadzenia podstawowej działalności bankowej. W UniCredit do tej kategorii należy system core banking, systemy płatności (SWIFT, SEPA, BLIK), system zarządzania ryzykiem kredytowym, systemy raportowania do regulatorów.

**Ważne (Important)**: systemy, których niedostępność powoduje poważne utrudnienia, ale bank może przez pewien czas funkcjonować w trybie awaryjnym. Przykład: systemy CRM, platformy e-learningowe (w tym ta, z której korzystasz), systemy kadrowe.

**Standardowe (Standard)**: pozostałe systemy, których niedostępność jest uciążliwa, ale nie ma natychmiastowego wpływu na działalność banku.

## Lesson 3.2: Cykl oceny i leczenia ryzyka ICT

Identyfikacja ryzyk to dopiero początek. EBA wymaga systematycznego podejścia do ich oceny i mitygacji. Poniżej opisany jest cykl, który bank musi stosować co najmniej raz w roku, a w przypadku istotnych zmian — na bieżąco.

**Etap 1: Identyfikacja zagrożeń i podatności**

Ryzyko ICT = zagrożenie × podatność × wpływ. Najpierw trzeba zidentyfikować:

*Zagrożenia zewnętrzne*: grupy hakerskie (w tym państwowe), dostawcy usług internetowych, których systemy mogą być przejęte, klęski żywiołowe zagrażające centrom danych, przerwy w dostawie energii, pandemia ograniczająca dostęp do personelu IT.

*Zagrożenia wewnętrzne*: błędy konfiguracyjne, nieaktualne oprogramowanie z niezałatanymi lukami, niedostateczne uprawnienia dostępowe (zbyt szerokie), brak szkoleń pracowników powodujący podatność na phishing.

*Podatności*: miejsca, w których zagrożenia mogą uderzyć. To może być niezaktualizowany system operacyjny na serwerze, brak wieloskładnikowego uwierzytelniania dla zdalnego dostępu, niewystarczająca segmentacja sieci.

**Etap 2: Analiza — ocena prawdopodobieństwa i wpływu**

Każde zidentyfikowane ryzyko jest oceniane pod kątem: jak prawdopodobne jest jego wystąpienie? Jaki byłby jego wpływ (finansowy, operacyjny, reputacyjny, prawny)? Wynik tej analizy to mapa ryzyk, która pozwala priorytetyzować działania.

**Etap 3: Ocena i porównanie z apetytem na ryzyko**

Ryzyka, których ocena przekracza zdefiniowany apetyt na ryzyko, wymagają natychmiastowych działań. Ryzyka w granicach apetytu są monitorowane i regularnie przeglądane.

**Etap 4: Leczenie ryzyk**

EBA wymaga formalnego decydowania o podejściu do każdego istotnego ryzyka:

**Unikanie** — eliminacja działalności lub systemu generującego ryzyko. Przykład: decyzja o rezygnacji z utrzymywania własnego centrum danych i migracja do certyfikowanego dostawcy chmury, jeśli własne centrum nie może być odpowiednio zabezpieczone.

**Redukcja** — wdrożenie kontroli zmniejszających prawdopodobieństwo lub wpływ. Przykład: wdrożenie wieloskładnikowego uwierzytelniania dla zdalnego dostępu znacząco redukuje ryzyko przejęcia konta pracownika.

**Transfer** — przesunięcie ryzyka na podmiot trzeci. Przykład: polisa ubezpieczeniowa od cyberataków pokrywa część finansowych kosztów incydentu.

**Akceptacja** — świadoma decyzja o przyjęciu ryzyka, gdy jego mitygacja jest zbyt kosztowna w stosunku do potencjalnych strat. Wymaga formalnego udokumentowania i zatwierdzenia przez odpowiedni poziom kierowniczy.

## Lesson 3.3: Kluczowe wskaźniki ryzyka i monitoring

Zarządzanie ryzykiem ICT to nie jednorazowy projekt — to ciągły proces monitorowania. EBA wymaga, żeby banki definiowały i śledzić Kluczowe Wskaźniki Ryzyka (Key Risk Indicators, KRI).

**Co to są KRI i jak działają?**

KRI to mierzalne wartości, które sygnalizują zmianę poziomu ryzyka. Dobry KRI spełnia kilka warunków: jest mierzalny obiektywnie, jest dostępny w wymaganej częstotliwości (np. codziennie lub tygodniowo) i ma określony próg alarmowy.

Gdy KRI przekracza próg, jest automatycznie raportowany do odpowiednich osób lub komitetów. Nie czekamy na coroczny przegląd — reagujemy na bieżąco.

**Przykładowe KRI stosowane w bankach:**

| Wskaźnik | Definicja | Cel | Próg alarmowy |
|----------|-----------|-----|---------------|
| Dostępność systemu core banking | % czasu działania w miesiącu | ≥ 99,95% | < 99,5% |
| Czas wykrycia incydentu bezpieczeństwa | Godziny od momentu incydentu | < 24 godziny | > 72 godziny |
| Pokrycie patchami krytycznymi | % systemów z aktualnym patchem | 100% | < 95% |
| Liczba kont uprzywilejowanych bez MFA | Bezwzględna liczba | 0 | > 0 |
| Wyniki testów BCP | % udanych testów rocznie | 100% | < 90% |
| Testy phishingowe pracowników | % klikających w fałszywe linki | < 5% | > 15% |

Dla UniCredit jako grupy systemowo ważnej (G-SIB) regulatorzy oczekują szczególnie restrykcyjnych limitów i pełnej przejrzystości w raportowaniu.

**Raportowanie do regulatorów**

Oprócz wewnętrznego raportowania, EBA nakłada obowiązek raportowania do zewnętrznych organów nadzorczych. Na podstawie Wytycznych EBA w sprawie raportowania poważnych incydentów (EBA/GL/2017/10), banki muszą zgłaszać poważne incydenty operacyjne (w tym ICT) do krajowego organu nadzorczego (w Polsce — KNF) i Europejskiego Banku Centralnego.

Pierwsze zgłoszenie musi być złożone w ciągu 4 godzin od sklasyfikowania incydentu jako "poważny". Kolejne aktualizacje — w ciągu 3 dni roboczych i po rozwiązaniu incydentu. Nieterminowe zgłoszenie może skutkować sankcją regulacyjną.

---

# Module 4: Bezpieczeństwo informacji w praktyce bankowej

## Lesson 4.1: Framework polityk bezpieczeństwa informacji

Bezpieczeństwo informacji w banku nie polega wyłącznie na technologii — polega przede wszystkim na systemie polityk, procedur i kontroli, które razem tworzą spójny framework. EBA wymaga, żeby ten framework był kompleksowy, zatwierdzony przez zarząd i regularnie aktualizowany.

**Hierarchia polityk bezpieczeństwa**

Na szczycie stoi **Polityka Bezpieczeństwa Informacji** — dokument zatwierdzany przez zarząd banku, który określa ogólne zasady, cele i odpowiedzialności. Jest krótki, zwięzły i skierowany do całej organizacji. Poniżej znajdują się szczegółowe polityki tematyczne, obejmujące m.in.:

**Polityka klasyfikacji informacji** określa, jak bank kategoryzuje swoje dane. UniCredit stosuje cztery poziomy klasyfikacji: Publiczne, Wewnętrzne, Poufne, Ściśle Tajne. Każda kategoria pociąga za sobą konkretne wymagania dotyczące przechowywania, przesyłania i niszczenia informacji. Dane klientów są co do zasady klasyfikowane jako Poufne lub wyżej.

**Polityka kontroli dostępu** precyzuje, jak przyznawane i weryfikowane są uprawnienia do systemów. Kluczowa zasada to Least Privilege (minimalne uprawnienia): każdy pracownik powinien mieć dostęp tylko do tych systemów i danych, które są niezbędne do wykonywania jego pracy. Nic więcej.

**Polityka zarządzania incydentami** definiuje, co uznajemy za incydent bezpieczeństwa, jak go klasyfikujemy, kogo powiadamiamy i jak dokumentujemy przebieg reagowania. Każdy pracownik musi wiedzieć, co zrobić, gdy coś podejrzanego się zdarzy.

**Dlaczego polityki muszą być żywe?**

Polityki bezpieczeństwa są skuteczne tylko wtedy, gdy są znane, rozumiane i przestrzegane przez wszystkich pracowników. EBA wymaga formalnego procesu komunikacji polityk do personelu oraz dowodów na to, że pracownicy się z nimi zapoznali (np. potwierdzenia odczytu, szkolenia, takie jak to które właśnie przerabiasz).

Polityki muszą też być regularnie aktualizowane — co najmniej raz w roku lub po znaczących incydentach lub zmianach w otoczeniu regulacyjnym. Polityka bezpieczeństwa z 2018 roku, która nie uwzględnia ryzyk związanych z chmurą obliczeniową czy pracą zdalną, jest nieadekwatna do obecnych realiów.

## Lesson 4.2: Zarządzanie dostępem i tożsamością

Zarządzanie tożsamością i dostępem (Identity and Access Management, IAM) to jeden z fundamentów bezpieczeństwa bankowego. Analiza incydentów bezpieczeństwa pokazuje, że nieodpowiednie zarządzanie dostępami jest jednym z najczęstszych czynników umożliwiających ataki.

**Zasada minimalnych uprawnień (Least Privilege) w codziennej pracy**

Każdy pracownik UniCredit ma przypisane konto w systemach banku z konkretnymi uprawnieniami. Uprawnienia te powinny być ściśle dopasowane do zakresu obowiązków. Pracownik obsługi klienta potrzebuje dostępu do systemu CRM i danych klientów obsługiwanego oddziału — ale nie potrzebuje dostępu do systemów transakcyjnych back-office, do danych klientów innych krajów czy do konfiguracji infrastruktury IT.

W praktyce naruszenia tej zasady zdarzają się często z powodów "wygody" (danie komuś szerszego dostępu, żeby nie blokować pracy) lub przez zaniedbanie (niedotrzymanie procedur odbioru dostępów gdy pracownik zmienia rolę lub odchodzi). EBA wymaga formalnego procesu zarządzania cyklem życia dostępów.

**Zarządzanie dostępami uprzywilejowanymi (Privileged Access Management, PAM)**

Szczególną uwagę EBA poświęca kontom uprzywilejowanym — administratorskim, z rozszerzonym dostępem do infrastruktury, baz danych i systemów bezpieczeństwa. Konto administratora systemu bankowego w niepowołanych rękach może dać hakerowi pełną kontrolę nad infrastrukturą banku.

EBA wymaga dla kont uprzywilejowanych:

- **Wieloskładnikowego uwierzytelniania (MFA)**: samo hasło, nawet silne, nie wystarczy. Dodatkowy czynnik (token, aplikacja, biometria) jest obowiązkowy.
- **Logowania i monitorowania**: każda sesja z użyciem konta uprzywilejowanego musi być rejestrowana. W przypadku incydentu musimy móc odtworzyć, kto, kiedy i co zrobił.
- **Ograniczenia czasowego**: model Just-In-Time Privileged Access — dostęp uprzywilejowany jest przyznawany tylko na czas konkretnego zadania, po którym automatycznie wygasa.

**Regularne przeglądy dostępów**

Uprawnienia pracowników muszą być regularnie przeglądane i weryfikowane. EBA wymaga przeglądów:

- Kont uprzywilejowanych: co najmniej co kwartał
- Wszystkich kont: co najmniej raz w roku
- Natychmiastowe wyłączenie dostępów: przy zakończeniu zatrudnienia, zmianie roli, długotrwałej nieobecności

Wyobraź sobie pracownika, który odszedł z banku 3 miesiące temu, ale jego konta w systemach są nadal aktywne. Stanowi to poważne naruszenie zarówno przepisów o ochronie danych, jak i wymagań EBA.

## Lesson 4.3: Cyberbezpieczeństwo i zarządzanie incydentami

**Cykl zarządzania podatnościami**

Systemy informatyczne banku zawierają błędy. Każdego miesiąca producenci oprogramowania (Microsoft, Oracle, Cisco, VMware i dziesiątki innych) publikują łatki bezpieczeństwa naprawiające odkryte luki. Zadaniem banku jest zainstalowanie tych łatek w określonym czasie, zanim zostaną one wykorzystane przez hakerów.

EBA wymaga formalnego programu zarządzania podatnościami:

**Regularne skanowanie** — przynajmniej miesięczne skanowanie krytycznych systemów narzędziami takimi jak Nessus, Qualys lub podobne. Skanowanie pozwala automatycznie wykrywać niezałatane podatności.

**Priorytetyzacja według CVSS** — Common Vulnerability Scoring System to standard oceniający podatności w skali 0-10. Podatności o CVSS ≥ 9.0 są traktowane jako krytyczne i wymagają pilnego działania (zazwyczaj w ciągu 72 godzin). Podatności o niższym CVSS mają dłuższy dopuszczalny czas naprawy — tydzień, miesiąc, lub kwartał w zależności od poziomu.

**Testy penetracyjne** — EBA wymaga regularnych (co najmniej rocznych) testów penetracyjnych dla krytycznych systemów. Testy penetracyjne (pentesty) to kontrolowane próby włamania do systemów banku przeprowadzane przez zewnętrznych specjalistów (tzw. ethical hackers). Ich celem jest znalezienie luk, zanim zrobią to prawdziwi atakujący.

**Reagowanie na incydenty — 5 kroków**

Gdy mimo wszystkich zabezpieczeń dojdzie do incydentu bezpieczeństwa, bank musi działać według określonego procesu. EBA wymaga posiadania i regularnego testowania Planu Reagowania na Incydenty (Incident Response Plan):

**Krok 1 — Identyfikacja i wstępna triage**: Wykrycie zdarzenia (przez monitoring, alert SIEM, zgłoszenie pracownika) i wstępna ocena: czy to faktyczny incydent? Jak poważny? Jaka kategoria (naruszenie danych, atak ransomware, awaria systemu, phishing)?

**Krok 2 — Powstrzymanie**: Izolacja zainfekowanych systemów, zablokowanie ruchu sieciowego prowadzącego do atakującego, zmiana skompromitowanych haseł. Cel: zapobiec dalszemu rozprzestrzenianiu się problemu.

**Krok 3 — Eradykacja**: Usunięcie źródła incydentu — złośliwego oprogramowania, nieuprawnionego konta, exploitu. Dokładna analiza techniczna, żeby upewnić się, że zagrożenie zostało całkowicie wyeliminowane.

**Krok 4 — Odtworzenie**: Przywrócenie systemów do normalnego działania. Jeśli dane zostały uszkodzone lub zaszyfrowane przez ransomware — odtworzenie z backupu. Weryfikacja, że systemy działają poprawnie.

**Krok 5 — Analiza post-incydentalna**: Najważniejszy, często pomijany krok. Dlaczego doszło do incydentu? Jakie kontrole zawiodły? Co można poprawić? Wyniki analizy przekładają się na konkretne usprawnienia polityk i zabezpieczeń.

---

# Module 5: Operacje ICT i ciągłość działania

## Lesson 5.1: Zarządzanie zmianami i konfiguracją

Statystyki branżowe wskazują, że większość poważnych awarii systemów IT nie jest spowodowana atakami hakerów — są spowodowane błędami podczas wprowadzania zmian. Nieudana aktualizacja systemu operacyjnego, błędna migracja bazy danych, niespójna konfiguracja sieci po modernizacji — to najczęstsze przyczyny przestojów.

**Zarządzanie zmianami (Change Management)**

EBA wymaga formalnego procesu zarządzania zmianami dla wszystkich istotnych modyfikacji środowisk produkcyjnych. Kluczowe elementy:

**Ocena ryzyka przed zmianą** — każda planowana zmiana musi być wcześniej oceniona pod kątem ryzyka. Jak duże jest prawdopodobieństwo, że zmiana spowoduje problemy? Jaki jest potencjalny wpływ na systemy produkcyjne? Czy dostępna jest procedura cofnięcia zmiany (rollback)?

**Testowanie w środowiskach nieprodukcyjnych** — zmiana musi być przetestowana na środowisku testowym/staging, zanim trafi na produkcję. Zasada brzmi: "never test in production". W banku naruszenie tej zasady może oznaczać przestój systemu płatności i straty finansowe dla klientów.

**Okna serwisowe** — większość zmian w systemach krytycznych jest wprowadzana w określonych "oknach serwisowych" — typowo w nocy lub w weekendy, gdy ruch transakcyjny jest najmniejszy. Każde okno serwisowe jest zaplanowane z wyprzedzeniem, a odpowiednie zespoły są powiadamiane.

**Zarządzanie konfiguracją (Configuration Management)**

Banki używają tysięcy serwerów, urządzeń sieciowych i aplikacji. Każde z nich ma setki parametrów konfiguracyjnych. Zarządzanie konfiguracją polega na utrzymywaniu kontroli nad tymi ustawieniami.

Configuration Management Database (CMDB) to centralny rejestr, w którym dokumentowane są konfiguracje wszystkich krytycznych aktywów ICT. CMDB pozwala szybko odpowiedzieć na pytania: "jak ten serwer był skonfigurowany przed awaria?", "które systemy korzystają z tego konkretnego certyfikatu SSL?", "jakie aplikacje mogą być dotknięte aktualizacją tej biblioteki?".

## Lesson 5.2: Zarządzanie ryzykiem dostawców zewnętrznych ICT

Kwestia outsourcingu i zarządzania dostawcami ICT zyskała kluczowe znaczenie w erze chmury obliczeniowej. Banki coraz częściej korzystają z usług takich firm jak Microsoft Azure, Amazon AWS, Google Cloud czy dziesiątek wyspecjalizowanych dostawców fintech. EBA podchodzi do tego tematu z dużą uwagą.

**Dlaczego ryzyko dostawców jest tak ważne?**

Wyobraź sobie, że główny system transakcyjny banku działa w chmurze. Jeśli dostawca chmury ma awarię, bank nie może procesować przelewów. Klienci nie mogą wypłacić pieniędzy, firmy nie mogą płacić pracownikom. Ryzyko dostawcy bezpośrednio przekłada się na ryzyko operacyjne banku.

Ponadto dane klientów często są przetwarzane przez dostawców zewnętrznych — firmy analityczne, platformy marketingowe, call centers. Jeśli dostawca ma słabe zabezpieczenia i doznaje wycieku danych, bank jest odpowiedzialny przed klientami i regulatorami, mimo że atak nie dotyczył bezpośrednio banku.

**Due diligence przed wyborem dostawcy**

EBA wymaga przeprowadzenia należytej staranności (due diligence) przed zawarciem umowy z dostawcą ICT. Obejmuje ona:

- Ocenę stabilności finansowej dostawcy — czy istnieje ryzyko, że firma zbankrutuje i nagle przestanie świadczyć usługi?
- Weryfikację certyfikatów bezpieczeństwa — ISO 27001, SOC 2 Type II, CSA STAR to standardowe certyfikaty potwierdzające dojrzałość procesów bezpieczeństwa
- Ocenę łańcucha poddostawców (sub-contractors) — dostawca może korzystać z innych dostawców, tworząc złożony łańcuch zależności. Każde ogniwo w tym łańcuchu stanowi potencjalne ryzyko
- Ocenę ryzyka jurysdykcyjnego — gdzie fizycznie są przechowywane dane? Czy kraj dostawcy ma umowę o transferze danych z UE? Czy organy tego kraju mogą żądać dostępu do danych bez wiedzy banku?

**Obowiązkowe klauzule w umowach z dostawcami**

EBA wymaga, żeby umowy z dostawcami ICT zawierały konkretne klauzule. Są one nienegocjowalne z perspektywy compliance:

Prawo do audytu — bank musi mieć umowne prawo do przeprowadzenia audytu bezpieczeństwa u dostawcy lub zlecenia go podmiotowi trzeciemu. Bez tego prawa bank nie może weryfikować, czy dostawca faktycznie spełnia deklarowane standardy.

Klauzule dotyczące poziomu usług (SLA) z penaltami za niedotrzymanie — umowa musi precyzować dostępność usługi, czas reakcji na awarie i sankcje za ich naruszenie.

Klauzula exit i plan przejścia — co się dzieje, gdy bank chce zmienić dostawcę? Jak dane są zwracane? Jaki jest czas przejścia? Brak takiej klauzuli może skutkować "vendor lock-in" — uzależnieniem od dostawcy bez możliwości wyjścia.

**Outsourcing funkcji krytycznych**

EBA wprowadza szczególne wymagania dla outsourcingu "funkcji krytycznych" — takich, które mają kluczowe znaczenie dla zdolności banku do prowadzenia działalności lub wypełniania obowiązków regulacyjnych. Outsourcing takich funkcji wymaga uprzedniego powiadomienia organu nadzorczego (KNF/ECB), a bank musi udowodnić, że posiada plany awaryjne na wypadek upadłości lub niezdolności dostawcy do świadczenia usług.

## Lesson 5.3: Ciągłość działania ICT — od teorii do gotowości

Ostatni filar wytycznych EBA dotyczy tego, co bank robi, gdy systemy przestają działać. Ciągłość działania ICT (ICT Business Continuity) to zdolność organizacji do utrzymania lub szybkiego przywrócenia krytycznych funkcji po zakłóceniu.

**Analiza wpływu na biznes (Business Impact Analysis, BIA)**

Podstawą planowania ciągłości jest BIA — systematyczna ocena, jak różne rodzaje zakłóceń wpłynęłyby na działalność banku. Dla każdej krytycznej funkcji biznesowej BIA określa:

- Maksymalny akceptowalny czas przestoju (Maximum Tolerable Downtime, MTD) — jak długo bank może funkcjonować bez danego systemu?
- RTO (Recovery Time Objective) — w jakim czasie system musi zostać przywrócony?
- RPO (Recovery Point Objective) — jak dużo danych możemy stracić? Jakie jest maksymalne okno, z którego można nie mieć backupu?

Dla systemu płatności SEPA MTD może wynosić 2 godziny, RTO = 1 godzina, RPO = 15 minut. Oznacza to, że backup musi być wykonywany co 15 minut, a system musi być przywrócony w ciągu godziny od decyzji o aktywacji planu ciągłości.

**Strategie odtworzenia**

W zależności od wymaganego RTO, banki stosują różne strategie odtworzenia:

**Hot Standby (aktywny-aktywny lub aktywny-pasywny)**: drugie centrum danych, które jest zawsze aktywne i synchronizowane z centrum głównym w czasie rzeczywistym. Przełączenie zajmuje sekundy lub minuty. Wymagany dla systemów z RTO < 15 minut. Najdroższe rozwiązanie.

**Warm Standby**: drugie centrum danych, które jest gotowe do uruchomienia, ale nie jest na bieżąco synchronizowane. Wymaga pewnego czasu (godziny) na przełączenie i aktualizację danych. Wymagany dla systemów z RTO kilku godzin.

**Cold Standby (backup i odtworzenie)**: dane są regularnie backupowane, a w razie awarii system jest odtwarzany od zera z backupu. Najdłuższy czas odtworzenia (może być wiele godzin lub dni). Akceptowalny tylko dla systemów niskiej krytyczności.

**Testowanie planów ciągłości działania**

EBA jednoznacznie wymaga regularnego testowania BCP ICT — co najmniej raz w roku. Testowanie to nie przeglądanie dokumentacji — to rzeczywiste ćwiczenie odtworzenia systemów. Formy testowania:

*Testy tabletop (desk-based)* — symulacja scenariusza kryzysowego w formie dyskusji. Zespół omawia, jak reagowałby na konkretną awarię. Szybkie i tanie, ale ograniczone — nie testuje faktycznej zdolności technicznej.

*Testy funkcjonalne* — rzeczywiste uruchomienie procedur odtworzenia dla wybranych systemów. Sprawdza, czy procesy działają w praktyce.

*Testy failover/przełączenia* — pełne przełączenie na zapasowe centrum danych i weryfikacja, że systemy działają poprawnie. Najbardziej wartościowe testy, ale też najbardziej ryzykowne i kosztowne.

Wyniki testów muszą być udokumentowane. Zidentyfikowane problemy przekładają się na plan korygujący. Jeśli test wykazał, że odtworzenie systemu zajmuje 6 godzin zamiast wymaganych 2 — to jest pilny problem do rozwiązania.

**Twoja rola jako pracownika UniCredit**

Nawet jeśli nie jesteś specjalistą IT, masz kluczową rolę w utrzymaniu bezpieczeństwa ICT banku:

Gdy zauważysz coś podejrzanego — nieznany email proszący o dane logowania, dziwne zachowanie komputera, próbę nieautoryzowanego dostępu do pomieszczeń serwerowni — zgłoś to natychmiast do helpdesku IT lub działu bezpieczeństwa.

Przestrzegaj polityki haseł i zasad pracy zdalnej — silne, unikalne hasła dla każdego systemu, blokowanie komputera przy każdym odejściu od biurka, niekorzystanie z publicznych sieci WiFi bez VPN.

Uważaj na phishing — większość ataków zaczyna się od fałszywego emaila. Weryfikuj nadawców podejrzanych wiadomości, nigdy nie klikaj w linki z nieznanych źródeł, nie pobieraj nieoczekiwanych załączników.

Bezpieczeństwo ICT banku nie jest odpowiedzialnością wyłącznie działu IT — jest wspólną odpowiedzialnością każdego pracownika.

---SLIDES---

## Slide 1
**Layout:** cover
**Title:** EBA ICT & Security Risk Management
**Content:**
Wytyczne EBA/GL/2019/04 — Obowiązkowe szkolenie regulacyjne UniCredit

Obowiązuje od: 28 czerwca 2020

Czas trwania: ~3 godziny | Próg zaliczenia: 100%

## Slide 2
**Layout:** default
**Title:** Po co nam te wytyczne? Trzy lekcje z rzeczywistości
**Content:**
**2017 — WannaCry ransomware:**
Kilkadziesiąt banków europejskich miało sparaliżowane systemy IT przez kilka godzin. Przelewy nie mogły być realizowane. Straty liczone w milionach euro.

**2018 — TSB Bank UK:**
Migracja systemu IT zakończyła się katastrofą. 1,9 miliona klientów bez dostępu do kont przez prawie 2 tygodnie. Koszty: ponad 300 mln funtów. Prezes banku musiał odejść.

**2019 — Capital One:**
Hakerzy ukradli dane 100 milionów klientów. Przyczyną była błędnie skonfigurowana usługa chmurowa. Kara regulacyjna: 80 milionów dolarów.

**Wniosek:** Słabe zarządzanie ICT = realne straty finansowe i reputacyjne.

## Slide 3
**Layout:** default
**Title:** Pięć filarów wytycznych EBA ICT
**Content:**
**Filar 1 — Ład korporacyjny ICT**
Zarząd odpowiada za strategię ICT i apetyt na ryzyko. CISO — obowiązkowa rola.

**Filar 2 — Zarządzanie ryzykiem ICT**
Identyfikuj → Oceń → Mityguj → Monitoruj. Cykl roczny + po każdej istotnej zmianie.

**Filar 3 — Bezpieczeństwo informacji**
Polityki, kontrola dostępu, szyfrowanie, reagowanie na incydenty.

**Filar 4 — Operacje ICT**
Zarządzanie zmianami, konfiguracją, pojemnością i monitorowanie systemów.

**Filar 5 — Ciągłość działania ICT**
BCP, plany disaster recovery, testowanie — co najmniej raz w roku.

## Slide 4
**Layout:** default
**Title:** Trzy Linie Obrony — wszyscy gramy rolę
**Content:**
**I Linia — Ty i Twój zespół:**
Na co dzień rozpoznajesz i zarządzasz ryzykiem ICT w swojej pracy. Zgłaszasz podejrzane zdarzenia. Przestrzegasz polityk bezpieczeństwa.

**II Linia — CISO i Departament Ryzyka:**
Projektują polityki i standardy. Monitorują ich przestrzeganie. Niezależni od operacji IT.

**III Linia — Audyt Wewnętrzny:**
Niezależnie weryfikują, czy I i II linia działają skutecznie. Raportują do Komitetu Audytu Zarządu.

**Klucz:** żadna z linii nie jest ważniejsza od pozostałych. System działa tylko wtedy, gdy wszystkie trzy funkcjonują prawidłowo.

## Slide 5
**Layout:** default
**Title:** Zasada Least Privilege — minimum potrzebne do pracy
**Content:**
**Definicja:**
Każdy pracownik powinien mieć dostęp TYLKO do tych systemów i danych, które są niezbędne do wykonywania jego obecnych obowiązków. Nic więcej.

**Dlaczego to ważne?**
Jeśli konto pracownika zostanie przejęte przez hakerów, zakres szkód jest ograniczony do obszaru, do którego miał dostęp. Szerokie uprawnienia = duże szkody.

**W praktyce oznacza to:**
- Zmiana roli → automatyczna aktualizacja uprawnień
- Odejście z banku → natychmiastowe wyłączenie wszystkich kont
- Konta uprzywilejowane → MFA + logowanie + audyt regularny

**Konta uprzywilejowane = konta administratorskie:**
Wymagają MFA (wieloskładnikowego uwierzytelniania) — zawsze, bez wyjątku.

## Slide 6
**Layout:** default
**Title:** Cykl zarządzania ryzykiem ICT
**Content:**
**1. Identyfikacja** — co posiadamy i jakie ryzyka niesie?

Inwentarz aktywów ICT: sprzęt, oprogramowanie, dane, usługi zewnętrzne
Identyfikacja zagrożeń: zewnętrznych (hakerzy, klęski żywiołowe) i wewnętrznych (błędy, podatności)

**2. Ocena** — jak poważne są ryzyka?

Prawdopodobieństwo × Wpływ = Poziom Ryzyka
Porównanie z apetytem na ryzyko zatwierdzonym przez Zarząd

**3. Leczenie** — co z nimi robimy?

Unikanie | Redukcja | Transfer (ubezpieczenie) | Akceptacja

**4. Monitoring** — czy kontrole działają?

KRI (Kluczowe Wskaźniki Ryzyka) śledzone na bieżąco, raporty do Zarządu min. raz w roku

## Slide 7
**Layout:** default
**Title:** Zarządzanie dostawcami zewnętrznymi ICT — nowe ryzyko ery chmury
**Content:**
**Dlaczego to krytyczne?**
UniCredit korzysta z zewnętrznych dostawców IT: chmury obliczeniowej, outsourcowanych platform, API integracyjnych. Awaria dostawcy = awaria banku.

**EBA wymaga przed podpisaniem umowy z dostawcą:**
- Due diligence: stabilność finansowa, certyfikaty bezpieczeństwa (ISO 27001, SOC 2)
- Ocena łańcucha poddostawców i ryzyka jurysdykcyjnego

**Obowiązkowe klauzule w umowie:**
- Prawo do audytu dostawcy przez bank lub podmiot zewnętrzny
- Zdefiniowane SLA z penaltami za niedotrzymanie
- Plan wyjścia i przejścia (exit plan) — jak zmieniamy dostawcę?

**Outsourcing funkcji krytycznych:**
Wymaga uprzedniego powiadomienia regulatora (KNF/ECB)

## Slide 8
**Layout:** default
**Title:** Reagowanie na incydenty — 5 kroków, które musisz znać
**Content:**
**Krok 1 — IDENTYFIKACJA**
Wykryj, czy to faktyczny incydent. Oceń powagę. Sklasyfikuj (P1/P2/P3/P4).

**Krok 2 — POWSTRZYMANIE**
Izoluj zainfekowane systemy. Zablokuj dalsze rozprzestrzenianie. Zabezpiecz dowody.

**Krok 3 — ERADYKACJA**
Usuń źródło problemu: złośliwe oprogramowanie, podatność, skompromitowane konto.

**Krok 4 — ODTWORZENIE**
Przywróć systemy z backupu. Zweryfikuj poprawność działania przed przywróceniem do produkcji.

**Krok 5 — ANALIZA POST-INCYDENTALNA**
Dlaczego doszło do incydentu? Co zawiodło? Jakie usprawnienia wdrożyć? Czy regulatorzy muszą być powiadomieni?

**P1 Eskalacja:** do Zarządu w 2h, do regulatora (KNF/ECB) w 4h od klasyfikacji

## Slide 9
**Layout:** default
**Title:** Ciągłość działania ICT — RTO i RPO
**Content:**
**Dwa kluczowe parametry każdego systemu:**

**RTO — Recovery Time Objective**
Jak długo może trwać przestój? Maksymalny dopuszczalny czas od awarii do pełnego przywrócenia.

**RPO — Recovery Point Objective**
Ile danych możemy stracić? Maksymalna dopuszczalna utrata danych (= jak często musi być backup).

**Przykłady dla UniCredit:**

| System | RTO | RPO |
|--------|-----|-----|
| Core banking (SWIFT/SEPA) | < 1 godzina | < 15 minut |
| Bankowość internetowa | < 2 godziny | < 1 godzina |
| Systemy backoffice | < 4 godziny | < 4 godziny |
| Systemy raportowe | < 24 godziny | < 24 godziny |

**EBA wymaga:** Plan BCP ICT musi być testowany co najmniej raz w roku!

## Slide 10
**Layout:** default
**Title:** Co musisz robić jako pracownik UniCredit?
**Content:**
Bezpieczeństwo ICT to odpowiedzialność każdego z nas — nie tylko działu IT.

**Zawsze:**
Używaj silnych, unikalnych haseł. Włącz MFA wszędzie, gdzie to możliwe. Blokuj komputer odchodząc od biurka (Win+L lub Cmd+Ctrl+Q). Pracujesz zdalnie? Używaj VPN firmowego.

**Uważaj na phishing:**
Zweryfikuj nadawcę przed kliknięciem linku. Podejrzany email z prośbą o dane logowania? Zgłoś do security@unicredit.pl. Bank NIGDY nie pyta o hasła mailem.

**Zgłaszaj incydenty:**
Coś podejrzanego? Nie zwlekaj. Wczesne zgłoszenie może zapobiec poważnej awarii. Incydenty zgłaszaj przez helpdesk IT lub portal bezpieczeństwa.

**Nie omijaj procedur bezpieczeństwa:**
Każda procedura istnieje z konkretnego powodu. Obejście jej "dla wygody" może być tym ogniwem, od którego zaczyna się poważny incydent.

## Slide 11
**Layout:** default
**Title:** Konsekwencje naruszenia wymagań EBA — dla banku i pracownika
**Content:**
**Konsekwencje dla UniCredit jako instytucji:**

Zalecenia nadzorcze i obowiązek wdrożenia planów naprawczych pod nadzorem KNF/ECB
Kary finansowe — EBA i KNF mogą nakładać kary proporcjonalne do naruszenia (potencjalnie miliony euro)
Zakaz prowadzenia określonych działalności do czasu naprawy
Konieczność publicznego ujawnienia incydentu — negatywny wpływ na reputację i kurs akcji

**Konsekwencje dla pracownika:**

Naruszenie polityk bezpieczeństwa ICT stanowi naruszenie regulaminu pracy i może skutkować dyscyplinarnym rozwiązaniem umowy o pracę.
W przypadku celowych działań (sabotaż, kradzież danych, udostępnienie poufnych informacji) — odpowiedzialność karna na podstawie kodeksu karnego.
Odpowiedzialność cywilna za szkody spowodowane zaniedbaniem.

**Pamiętaj:** Ignorancja przepisów nie jest usprawiedliwieniem.

## Slide 12
**Layout:** default
**Title:** Podsumowanie — 10 rzeczy, które musisz wiedzieć
**Content:**
1. EBA/GL/2019/04 obowiązuje od 28 czerwca 2020 i dotyczy całego UniCredit
2. Zarząd banku ponosi ostateczną odpowiedzialność za ład korporacyjny ICT
3. CISO jest obowiązkową rolą — odpowiada za bezpieczeństwo informacji
4. Model Trzech Linii Obrony — wszyscy mamy swoją rolę
5. Ocena ryzyka ICT musi być przeprowadzana co najmniej raz w roku
6. Least Privilege — dostęp tylko do tego, co niezbędne do pracy
7. MFA jest obowiązkowe dla dostępu zdalnego i kont uprzywilejowanych
8. P1 incydent: Zarząd w 2h, regulator w 4h od klasyfikacji
9. Plan BCP ICT musi być testowany co najmniej raz w roku
10. Każdy pracownik odpowiada za bezpieczeństwo ICT banku

---HANDBOOK---

## Chapter 1: Wprowadzenie do wytycznych EBA ICT — kontekst i podstawy prawne

Wytyczne EBA dotyczące zarządzania ryzykiem ICT i bezpieczeństwa (EBA/GL/2019/04) są dokumentem regulacyjnym o kluczowym znaczeniu dla europejskiego sektora bankowego. Zostały opublikowane przez Europejski Urząd Nadzoru Bankowego (EBA) 29 listopada 2019 roku i weszły w życie 28 czerwca 2020 roku.

**Geneza i kontekst**

Wytyczne powstały jako odpowiedź EBA na kilka równoległych trendów obserwowanych w sektorze finansowym. Po pierwsze, gwałtowny wzrost cyberataków wymierzonych w banki — w szczególności ataki ransomware WannaCry i NotPetya z 2017 roku ujawniły systemowe słabości infrastruktury IT wielu instytucji. Po drugie, narastające problemy z awariami systemów IT — spektakularny upadek migracji IT w TSB Bank w 2018 roku pokazał, co może pójść nie tak przy zarządzaniu zmianami w krytycznych systemach. Po trzecie, szybka digitalizacja usług bankowych i wzrost uzależnienia od zewnętrznych dostawców chmury i usług IT.

EBA zdecydowała, że istniejące wytyczne były zbyt fragmentaryczne. Nowe wytyczne EBA/GL/2019/04 zastąpiły wcześniejsze dokumenty (w tym wytyczne EBA z 2011 roku dotyczące bezpieczeństwa usług płatności internetowych) i stworzyły kompleksowy, spójny framework.

**Podstawa prawna**

Wytyczne zostały wydane na podstawie:
- Art. 74 Dyrektywy 2013/36/UE (CRD IV) — wymagania dotyczące ładu korporacyjnego i zarządzania ryzykiem
- Art. 85(2) Dyrektywy 2013/36/UE — uprawnienie EBA do wydawania wytycznych dotyczących ryzyka operacyjnego

Wytyczne nie są rozporządzeniem UE (bezpośrednio obowiązującym), lecz wytycznymi, które krajowe organy nadzorcze (jak KNF w Polsce) zobowiązały się stosować w swoim nadzorze — poprzez mechanizm "comply or explain". W praktyce oznacza to, że bank musi albo stosować wytyczne, albo wyjaśnić regulatorowi, dlaczego nie stosuje i jakimi alternatywnymi środkami osiąga ten sam cel. Dla instytucji systemowo istotnych, takich jak UniCredit, odejście od wytycznych bez bardzo przekonującego uzasadnienia jest niemożliwe.

**Relacja do innych regulacji**

EBA/GL/2019/04 nie funkcjonuje w próżni regulacyjnej. Musi być stosowana łącznie z:
- DORA (Digital Operational Resilience Act, Rozporządzenie UE 2022/2554) — od 17 stycznia 2025 roku bezpośrednio obowiązujące rozporządzenie UE w zakresie odporności cyfrowej sektora finansowego, które częściowo zastępuje wytyczne EBA
- RODO (GDPR) — wymagania dotyczące ochrony danych osobowych mają ścisły związek z zarządzaniem ryzykiem ICT
- Wytyczne EBA dotyczące outsourcingu (EBA/GL/2019/02) — szczegółowe wymagania dla outsourcingu funkcji istotnych
- Wytyczne EBA dotyczące raportowania poważnych incydentów (EBA/GL/2017/10)

## Chapter 2: Ład korporacyjny ICT — wymagania i implementacja w UniCredit

**Struktura odpowiedzialności**

EBA wymaga jasnej, udokumentowanej struktury odpowiedzialności za ryzyko ICT. W UniCredit wygląda to następująco:

Rada Nadzorcza i Zarząd Wykonawczy zatwierdzają strategię ICT i apetyt na ryzyko ICT co najmniej raz w roku. W razie istotnych zmian (nowych regulacji, poważnych incydentów, znaczących zmian technologicznych) — na bieżąco.

Group Risk Committee, jako delegat zarządu, sprawuje bieżący nadzór nad ryzykiem operacyjnym i ICT. Otrzymuje kwartalne raporty o stanie ryzyka ICT, wynikach testów BCP, istotnych incydentach.

Group CISO (Group Chief Information Security Officer) jest odpowiedzialny za Group-wide framework bezpieczeństwa informacji, polityki i standardy bezpieczeństwa, monitoring incydentów, raportowanie do zarządu. W każdym kraju działalności UniCredit funkcjonuje lokalny CISO odpowiadający za implementację grupy i lokalną specyfikę regulacyjną.

Departamenty biznesowe i IT są pierwszą linią zarządzania ryzykiem. Każdy właściciel procesu biznesowego jest odpowiedzialny za identyfikację i zarządzanie ryzykiem ICT w swoim obszarze.

**Strategia ICT UniCredit**

Strategia ICT UniCredit jest integralną częścią strategii grupy. Aktualna strategia koncentruje się na: migracji do chmury (głównie Microsoft Azure i AWS), modernizacji systemów core banking, wzmocnieniu zdolności cyberbezpieczeństwa oraz unifikacji platform technologicznych między krajami operacyjnymi.

Strategia jest przeglądana co roku i zaktualizowana w razie istotnych zmian. Każda znacząca inwestycja technologiczna przekraczająca określony próg wymaga zatwierdzenia przez zarząd.

**Polityki ICT — co musisz znać jako pracownik**

Polityki ICT UniCredit dostępne są w intranecie i obejmują m.in. Politykę Bezpieczeństwa Informacji, Politykę Dopuszczalnego Użytkowania (Acceptable Use Policy) zasobów IT, Politykę Zarządzania Incydentami, Politykę Zarządzania Dostępem.

Jako pracownik UniCredit jesteś zobowiązany do zapoznania się z tymi politykami i ich przestrzegania. Coroczne szkolenia (takie jak niniejsze) są częścią formalnego procesu upewnienia się, że wszyscy pracownicy rozumieją swoje obowiązki.

## Chapter 3: Zarządzanie ryzykiem ICT — framework operacyjny i narzędzia

**Inwentarz aktywów ICT**

UniCredit prowadzi centralny rejestr aktywów ICT obejmujący wszystkie kraje operacyjne. Każde aktywo jest opisane przez: właściciela (business owner i technical owner), klasę krytyczności, zależności od innych aktywów, dostawców zewnętrznych.

Rejestr jest utrzymywany w systemie CMDB (Configuration Management Database) i jest automatycznie aktualizowany w procesie zarządzania zmianami.

**Metodologia oceny ryzyka**

UniCredit stosuje ustandaryzowaną metodologię oceny ryzyka ICT opartą na:
- FAIR (Factor Analysis of Information Risk) — ilościowe podejście do analizy ryzyka
- NIST Cybersecurity Framework jako punkt odniesienia dla dojrzałości kontroli
- Threat Intelligence — dane o aktualnych zagrożeniach od komercyjnych i sektorowych (FS-ISAC) źródeł

Ocena ryzyka jest przeprowadzana przez specjalistyczne zespoły Risk Management i Security, przy aktywnym udziale właścicieli biznesowych poszczególnych systemów.

**Kluczowe Wskaźniki Ryzyka — pełna lista**

Poniżej lista głównych KRI monitorowanych przez UniCredit Group w obszarze ICT:

| Wskaźnik | Cel | Alert | Eskalacja |
|----------|-----|-------|-----------|
| Dostępność systemów krytycznych | ≥ 99,95% | < 99,9% | < 99,5% |
| Czas wykrycia incydentów bezpieczeństwa (MTTD) | < 24h | > 48h | > 72h |
| Czas reakcji na incydenty krytyczne (MTTR P1) | < 4h | > 6h | > 8h |
| Pokrycie krytycznych systemów patchami | 100% | < 98% | < 95% |
| Konta uprzywilejowane bez MFA | 0 | > 0 | > 5 |
| Wyniki testów BCP (% udanych) | 100% | < 95% | < 90% |
| Czas realizacji przeglądów dostępów | 100% w terminie | > 5% po terminie | > 10% po terminie |
| Skuteczność szkoleń security awareness | > 95% ukończyło | < 90% | < 80% |

## Chapter 4: Bezpieczeństwo informacji — polityki i standardy UniCredit

**Klasyfikacja informacji**

UniCredit stosuje czterpoziomową klasyfikację informacji:

**Public (Publiczne):** Informacje przeznaczone do publicznego udostępnienia, które nie wymagają specjalnej ochrony. Przykłady: raporty roczne, komunikaty prasowe, publiczne materiały marketingowe. Brak wymagań co do szyfrowania, ograniczonego dostępu.

**Internal (Wewnętrzne):** Informacje przeznaczone wyłącznie do użytku wewnętrznego UniCredit. Nieupublicznione procedury, wewnętrzne analizy, dane organizacyjne. Wymagane: uwierzytelnienie przed dostępem, zakaz wysyłania na prywatne skrzynki email.

**Confidential (Poufne):** Informacje wrażliwe, których nieuprawnione ujawnienie może spowodować szkodę dla banku lub klientów. Dane klientów, dane finansowe nieudostępnione publicznie, dane kadrowe, kluczowe dane techniczne systemów. Wymagane: szyfrowanie przy przesyłaniu i przechowywaniu, ograniczony dostęp według potrzeby wiedzy (need-to-know), zakaz przetwarzania na prywatnych urządzeniach.

**Secret (Ściśle Tajne):** Najwyższa kategoria — informacje, których ujawnienie mogłoby spowodować poważną szkodę dla banku, klientów lub systemu finansowego. Klucze kryptograficzne, dane uwierzytelniające do systemów krytycznych, wrażliwe dane strategiczne. Wymagane: ścisłe, szczegółowe zasady dostępu, specjalne środki ochrony, logowanie każdego dostępu.

**Kontrola dostępu — standardy UniCredit**

UniCredit stosuje standard dostępu oparty na rolach (Role-Based Access Control, RBAC). Każda rola w banku ma predefiniowany zestaw uprawnień dostosowany do zakresu obowiązków. Nowy pracownik automatycznie otrzymuje uprawnienia zgodne z rolą. Zmiana roli triggeruje przegląd i aktualizację uprawnień.

Dla systemów krytycznych i kont uprzywilejowanych UniCredit wymaga:
- MFA (aplikacja mobilna Authenticator lub token sprzętowy)
- Zasady minimalnego dostępu (Least Privilege)
- Regularnych przeglądów uprawnień (konta uprzywilejowane — kwartalnie, pozostałe — rocznie)
- Immediate Revocation — natychmiastowe wyłączenie dostępów przy zakończeniu zatrudnienia lub zmianie roli

**Szyfrowanie**

UniCredit stosuje szyfrowanie:
- Danych w tranzycie: TLS 1.2 lub wyższy dla wszystkich połączeń sieciowych, HTTPS dla aplikacji webowych
- Danych w spoczynku: AES-256 dla wrażliwych danych przechowywanych na serwerach i urządzeniach
- Urządzeń końcowych: pełne szyfrowanie dysków (BitLocker dla Windows, FileVault dla macOS) na wszystkich laptopach firmowych

## Chapter 5: Ciągłość działania ICT — plany, testowanie i zarządzanie kryzysowe

**Struktura planów ciągłości działania ICT w UniCredit**

UniCredit posiada wielopoziomową strukturę planów ciągłości działania:

**Group Business Continuity Policy** — polityka grupowa określająca minimalne standardy dla wszystkich jednostek grupy. Zatwierdzona przez zarząd UniCredit S.p.A.

**Country BCPs** — plany ciągłości dla każdego kraju, uwzględniające lokalne regulacje i specyfikę operacyjną. UniCredit Bank Polska S.A. posiada własny BCP zatwierdzony przez lokalne kierownictwo i zgodny z wymaganiami KNF.

**System-level Recovery Plans** — szczegółowe plany odtworzenia dla każdego systemu krytycznego, zawierające krok po kroku procedury odtworzenia, listę osób kontaktowych, checklisty weryfikacyjne.

**Poziomy aktywacji BCP**

UniCredit stosuje trzystopniową skalę aktywacji BCP:

**Poziom 1 — Monitorowanie wzmożone:** Identyfikacja potencjalnego zagrożenia. Zespoły IT w stanie podwyższonej gotowości. Regularne raportowanie statusu do kierownictwa. Przykład: ostrzeżenie meteorologiczne przed burzą zagrażającą centrum danych.

**Poziom 2 — Tryb awaryjny:** Aktywacja procedur awaryjnych dla konkretnych systemów. Uruchomienie zespołów kryzysowych. Komunikacja z kluczowymi interesariuszami. Przykład: awaria centrum danych, utrata połączenia internetowego.

**Poziom 3 — Pełna aktywacja BCP:** Przełączenie na zapasowe centrum danych. Aktywacja wszystkich planów odtworzenia. Zarządzanie kryzysowe na poziomie zarządu. Przykład: długotrwała awaria głównego centrum danych, cyberatak paraliżujący systemy produkcyjne.

**Testowanie BCP — wymagania i harmonogram**

EBA wymaga testowania BCP ICT co najmniej raz w roku. UniCredit stosuje rozbudowany program testów:

Testy tabletop przeprowadzane kwartalnie przez kluczowe zespoły IT i biznesowe — symulacja scenariuszy kryzysowych w formie ćwiczeń dyskusyjnych. Relatywnie niskie koszty, dobra wartość dla budowania świadomości i weryfikacji procedur.

Testy funkcjonalne przeprowadzane co pół roku — rzeczywiste uruchomienie procedur odtworzenia dla wybranych systemów niższej krytyczności. Weryfikacja technicznej wykonalności planów.

Testy failover przeprowadzane co roku — pełne przełączenie wybranych systemów krytycznych na zapasowe centrum danych. Weryfikacja RTO i RPO. Najbardziej wartościowe, ale też najbardziej ryzykowne i kosztowne testy.

Czerwone zespoły (Red Team exercises) — symulowane ataki na infrastrukturę przeprowadzane przez zewnętrznych specjalistów. Testowanie zdolności wykrywania i reagowania na incydenty w warunkach zbliżonych do rzeczywistego ataku.

**Raportowanie incydentów do regulatorów**

W przypadku poważnego incydentu operacyjnego (w tym incydentu ICT), UniCredit jest zobowiązany do raportowania do KNF (w Polsce) i/lub ECB w terminach określonych przez EBA/GL/2017/10 i DORA:

- **Wstępne powiadomienie** (Early Warning): w ciągu 4 godzin od sklasyfikowania incydentu jako "poważny"
- **Raport śródokresowy** (Intermediate Report): w ciągu 72 godzin od pierwszego powiadomienia
- **Raport końcowy** (Final Report): w ciągu 1 miesiąca od zakończenia incydentu

Klasyfikacja incydentu jako "poważny" wymaga spełnienia co najmniej jednego z następujących kryteriów: liczba dotkniętych transakcji lub klientów przekracza określone progi, incydent ma wpływ na systemy krytyczne, incydent powoduje lub może powodować straty finansowe przekraczające określone kwoty, incydent jest wynikiem celowego działania (atak).

---QUIZ---
**Passing Score:** 100

### Q1
**Question:** Jaka była główna przyczyna wprowadzenia wytycznych EBA/GL/2019/04 w 2019 roku?
**Options:**
A) Potrzeba ujednolicenia opłat bankowych w UE
B) Rosnąca fala cyberataków i awarii systemów IT w sektorze bankowym — m.in. WannaCry i TSB Bank
C) Wprowadzenie nowej waluty cyfrowej euro
D) Wymagania związane z wdrożeniem PSD2
**Correct:** B
**Explanation:** Wytyczne EBA/GL/2019/04 powstały jako bezpośrednia odpowiedź na serię poważnych incydentów ICT w europejskim sektorze bankowym: atak ransomware WannaCry w 2017 roku, który sparaliżował dziesiątki banków, oraz katastrofalna migracja IT w TSB Bank w 2018 roku, która kosztowała bank ponad 300 milionów funtów i spowodowała odejście prezesa.

### Q2
**Question:** Kto zgodnie z wytycznymi EBA ponosi OSTATECZNĄ odpowiedzialność za ład korporacyjny ICT w banku?
**Options:**
A) Dyrektor Departamentu IT
B) Chief Information Security Officer (CISO)
C) Departament Zarządzania Ryzykiem
D) Organ zarządzający (Zarząd i Rada Nadzorcza)
**Correct:** D
**Explanation:** Sekcja 4.1 wytycznych EBA jednoznacznie wskazuje, że organ zarządzający (Management Body), czyli zarząd i rada nadzorcza, ponosi ostateczną odpowiedzialność za ład korporacyjny ICT. Dotyczy to zatwierdzania strategii ICT, określania apetytu na ryzyko oraz zapewnienia odpowiednich zasobów. CISO zarządza operacyjnie, ale nie ponosi odpowiedzialności strategicznej.

### Q3
**Question:** Co oznacza zasada Least Privilege (minimalne uprawnienia) w kontekście dostępu do systemów bankowych?
**Options:**
A) Pracownicy powinni mieć dostęp do wszystkich systemów, żeby mogą pomagać sobie nawzajem
B) Każdy pracownik powinien mieć dostęp TYLKO do tych systemów i danych, które są niezbędne do wykonywania jego aktualnych obowiązków
C) Dostęp do systemów powinien być przyznawany wyłącznie pracownikom z wyższym wykształceniem
D) Uprawnienia powinny być minimalizowane wyłącznie dla kont zewnętrznych dostawców
**Correct:** B
**Explanation:** Least Privilege (zasada minimalnych uprawnień) to fundament zarządzania dostępem wymagany przez EBA. Oznacza, że każdy pracownik otrzymuje dokładnie tyle dostępu, ile potrzebuje do swojej pracy — nic więcej. Ogranicza to możliwe szkody w przypadku przejęcia konta przez hakera lub błędu pracownika.

### Q4
**Question:** Jak często EBA wymaga przeprowadzania formalnej oceny ryzyka ICT?
**Options:**
A) Raz na 5 lat, chyba że dojdzie do poważnego incydentu
B) Wyłącznie po poważnych zmianach w systemach IT
C) Co najmniej raz w roku oraz po każdej istotnej zmianie w infrastrukturze lub po poważnym incydencie
D) Wyłącznie gdy regulator zarządzi kontrolę
**Correct:** C
**Explanation:** EBA wymaga przeprowadzania formalnej oceny ryzyka ICT co najmniej raz w roku. Dodatkowo ocena powinna być przeprowadzana za każdym razem, gdy nastąpią istotne zmiany w infrastrukturze IT, po poważnych incydentach bezpieczeństwa lub gdy zmieni się znacząco krajobraz zagrożeń (np. nowy rodzaj ataku uderza w sektor bankowy).

### Q5
**Question:** Czym różni się RTO od RPO w kontekście ciągłości działania ICT?
**Options:**
A) RTO dotyczy redundancji sprzętu, RPO dotyczy redundancji sieci
B) RTO to maksymalny czas odtworzenia systemu, RPO to maksymalna dopuszczalna utrata danych (mierzona czasem)
C) RTO i RPO to dwie nazwy tego samego wskaźnika stosowane w różnych krajach UE
D) RTO dotyczy systemów back-office, RPO dotyczy systemów front-office
**Correct:** B
**Explanation:** RTO (Recovery Time Objective) określa maksymalny dopuszczalny czas od wystąpienia awarii do przywrócenia systemu do normalnego działania. RPO (Recovery Point Objective) określa maksymalną akceptowalną utratę danych — jeśli RPO = 1 godzina, backup musi być wykonywany co godzinę, bo dane z ostatniej godziny przed awarią mogą zostać utracone. Oba parametry muszą być zdefiniowane dla każdego systemu krytycznego w ramach BCP ICT.

### Q6
**Question:** Które z poniższych jest OBOWIĄZKOWE dla kont uprzywilejowanych (administratorskich) zgodnie z wymaganiami EBA?
**Options:**
A) Hasło musi być zmieniane co 90 dni — to jedyne wymaganie
B) Konta uprzywilejowane mogą być używane wyłącznie z biura
C) Wieloskładnikowe uwierzytelnianie (MFA), logowanie sesji i regularne przeglądy dostępów
D) Konta uprzywilejowane powinny być współdzielone przez kilku administratorów dla zwiększenia bezpieczeństwa
**Correct:** C
**Explanation:** EBA wymaga dla kont uprzywilejowanych: 1) wieloskładnikowego uwierzytelniania (MFA) — samo hasło nie wystarczy, 2) pełnego logowania i monitorowania każdej sesji uprzywilejowanej, 3) regularnych przeglądów (co najmniej kwartalnych) zasadności przyznanych uprawnień. Konta uprzywilejowane NIGDY nie powinny być współdzielone — każda osoba musi mieć własne, indywidualne konto.

### Q7
**Question:** Jaki jest wymagany przez wytyczne EBA minimalny zakres due diligence przed wyborem dostawcy usług ICT?
**Options:**
A) Wystarczy sprawdzić, czy dostawca ma ważne ubezpieczenie firmy
B) Wystarczy uzyskać referencje od innych klientów dostawcy
C) Ocena stabilności finansowej, certyfikatów bezpieczeństwa, łańcucha poddostawców i ryzyka jurysdykcyjnego
D) Wymagany jest tylko audyt techniczny systemów dostawcy
**Correct:** C
**Explanation:** EBA wymaga kompleksowego due diligence obejmującego: stabilność finansową dostawcy (ryzyko bankructwa i utraty usługi), certyfikaty bezpieczeństwa (ISO 27001, SOC 2 Type II), ocenę łańcucha poddostawców (każde ogniwo stanowi potencjalne ryzyko) i ocenę ryzyka jurysdykcyjnego (gdzie przechowywane są dane, prawo jakiego kraju ma zastosowanie, możliwość żądania dostępu przez organy państwowe).

### Q8
**Question:** Co oznacza Model Trzech Linii Obrony (Three Lines of Defense) w zarządzaniu ryzykiem ICT?
**Options:**
A) Trzy warstwy technicznych zabezpieczeń: firewall, antywirus i szyfrowanie
B) Podział odpowiedzialności: 1. właściciele procesów, 2. niezależna funkcja ryzyka/CISO, 3. Audyt Wewnętrzny
C) Trzy centra danych: główne, zapasowe i archiwalne
D) Trzy poziomy klasyfikacji incydentów: niski, średni, wysoki
**Correct:** B
**Explanation:** Model Trzech Linii Obrony to framework organizacyjny zarządzania ryzykiem wymagany przez EBA. I Linia: właściciele procesów biznesowych i IT, którzy na co dzień zarządzają ryzykiem i stosują kontrole. II Linia: niezależna funkcja zarządzania ryzykiem i CISO, która projektuje polityki i monitoruje ich przestrzeganie. III Linia: Audyt Wewnętrzny, który niezależnie ocenia skuteczność I i II Linii. Kluczowa jest NIEZALEŻNOŚĆ każdej linii.

### Q9
**Question:** W jakim czasie UniCredit jest zobowiązany do złożenia wstępnego powiadomienia do regulatora o poważnym incydencie ICT?
**Options:**
A) W ciągu 24 godzin od wykrycia incydentu
B) W ciągu 72 godzin — podobnie jak w przypadku naruszeń RODO
C) W ciągu 4 godzin od sklasyfikowania incydentu jako "poważny"
D) Powiadomienie jest wymagane dopiero po pełnym rozwiązaniu incydentu
**Correct:** C
**Explanation:** Zgodnie z EBA/GL/2017/10 (wytyczne EBA dotyczące raportowania poważnych incydentów) oraz DORA, pierwsze powiadomienie do regulatora (KNF w Polsce, ECB dla instytucji znaczących) musi być złożone w ciągu 4 godzin od sklasyfikowania zdarzenia jako poważny incydent. Następnie wymagane są: raport śródokresowy w ciągu 72 godzin i raport końcowy w ciągu miesiąca od rozwiązania incydentu.

### Q10
**Question:** Jak często plan ciągłości działania ICT (BCP ICT) musi być testowany zgodnie z wymaganiami EBA?
**Options:**
A) Co 3 lata — tak samo jak wymaga Bazylea III
B) Wyłącznie po poważnych awariach lub incydentach bezpieczeństwa
C) Co najmniej raz w roku, a wyniki testów muszą być udokumentowane z planem korygującym
D) Testowanie jest zalecane, ale nie jest formalnie wymagane przez EBA
**Correct:** C
**Explanation:** Sekcja 4.5 wytycznych EBA wymaga testowania BCP ICT co najmniej raz w roku. Co ważne — samo przeprowadzenie testu nie wystarczy. Wyniki muszą być udokumentowane, a wszystkie zidentyfikowane problemy i luki muszą być uwzględnione w formalnym planie korygującym (remediation plan) z wyznaczonymi terminami i odpowiedzialnościami. "Testowanie" obejmuje zarówno testy tabletop, jak i rzeczywiste testy techniczne (failover).
