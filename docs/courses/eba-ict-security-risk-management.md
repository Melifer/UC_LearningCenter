---
title: "EBA Guidelines on ICT and Security Risk Management"
description: "Training based on EBA/GL/2019/04. Mandatory for all UniCredit employees. Covers ICT risk management, information security, operational resilience, and business continuity as required by the European Banking Authority."
level: "Intermediate"
duration: "3 hours"
language: "en"
mandatory: true
deadline: "2026-12-31"
refresher_months: 12
passing_score: 100
---

# Module 1: Introduction to EBA ICT Guidelines

## Lesson 1.1: Why These Guidelines Exist

In November 2019, the European Banking Authority published its Guidelines on ICT and Security Risk Management (EBA/GL/2019/04), with mandatory application from 28 June 2020. Understanding why these guidelines were created is essential to appreciating their importance in your daily work at UniCredit.

**The events that triggered regulatory action**

The banking sector in the years preceding these guidelines witnessed a series of significant technology failures that exposed deep vulnerabilities in how financial institutions managed their IT systems. These incidents were not theoretical scenarios — they caused real harm to customers, generated enormous costs, and in some cases threatened financial stability.

In May 2017, the WannaCry ransomware attack swept across the globe, infecting hundreds of thousands of computers in over 150 countries. Several European banks found their systems locked or disrupted, with branches forced to revert to manual processes for hours while IT teams scrambled to restore operations. The attack exploited a known vulnerability in Microsoft Windows for which a patch had been available for months — the banks had simply failed to apply it in time.

In April 2018, TSB Bank in the United Kingdom attempted to migrate its customer data from a legacy system to a new platform. The migration failed catastrophically. Nearly two million customers were locked out of their online banking accounts for up to two weeks. Fraudsters exploited the chaos to steal millions. The total cost of the disaster exceeded £300 million, the bank's CEO resigned, and the UK regulator conducted a formal enforcement investigation. The root causes included inadequate testing, poor change management, and insufficient contingency planning.

In 2019, Capital One, a major US bank, suffered a data breach that exposed the personal information of over 100 million customers. The cause was a misconfigured cloud firewall — a preventable error in a cloud service that the bank had not properly secured. The regulatory fine was $80 million.

These events shared a common thread: each was preventable through better ICT governance, more rigorous risk management, and stronger security controls. The EBA guidelines were designed to ensure that European banks learn from these failures and establish the robust practices that can prevent them.

**UniCredit's obligation**

UniCredit Group, as a systemically important bank (G-SII) supervised directly by the European Central Bank, is subject to the full scope of these guidelines across all 18 countries where it operates, including UniCredit Bank Poland. Every employee who uses bank systems, handles customer data, or participates in any IT-related process has a role in the bank's compliance with these requirements.

Non-compliance is not merely a technical matter. The EBA guidelines have direct legal backing through Directive 2013/36/EU (CRD IV), and national supervisory authorities — including the Polish Financial Supervision Authority (KNF) — are expected to enforce them. Breaches can result in supervisory actions, financial penalties, and reputational damage.

## Lesson 1.2: Scope, Definitions and Legal Basis

Before examining the requirements in detail, it is important to understand the precise scope of these guidelines and the key terms used throughout them.

**Who is covered?**

The guidelines apply to all EU credit institutions (banks), investment firms, payment institutions, and electronic money institutions. For UniCredit, this means every legal entity within the group that holds a banking or investment licence — from the Italian parent company to UniCredit Bank Poland S.A. and all other operating subsidiaries.

The EBA also introduced the principle of **proportionality**: smaller and less complex institutions may apply simplified arrangements, provided they achieve the same risk management outcomes. As a Group of Significant Importance, UniCredit is expected to apply the guidelines in full, without simplification.

**Essential definitions**

Understanding the language of the guidelines is fundamental to working with them effectively:

**ICT risk** is broadly defined as the risk of loss resulting from inadequate or failed internal ICT processes, people, systems, or from external events. This is intentionally wide — it encompasses everything from a server crash and a ransomware attack to a software developer's error that causes incorrect financial calculations.

**ICT system** means any form of technology used to collect, process, store, or transmit information in support of business processes. A core banking system, a customer-facing mobile app, a spreadsheet used to manage reporting data, and a cloud-based collaboration tool are all ICT systems under this definition.

**ICT third-party risk** refers to the risk arising when the bank relies on external providers for ICT services. Cloud providers, software vendors, data centre operators, and outsourced IT service providers all create third-party ICT risk. The bank remains responsible for managing this risk even when its systems are operated by others.

**RTO — Recovery Time Objective** is the maximum amount of time that a system can be unavailable before the impact becomes unacceptable. For a payment processing system, the RTO might be one hour; for an internal reporting system, it might be 24 hours. RTOs must be formally defined, documented, and tested.

**RPO — Recovery Point Objective** is the maximum amount of data loss (measured in time) that is acceptable in the event of a failure. An RPO of 15 minutes means that backups must be taken every 15 minutes — losing more than 15 minutes of data would be unacceptable. Like RTOs, RPOs must be defined for all critical systems.

## Lesson 1.3: The Five Pillars of EBA ICT Compliance

The EBA guidelines are structured around five interconnected areas of ICT governance and risk management. These five pillars form a coherent framework: each builds upon the others, and a weakness in any one of them undermines the whole.

**Pillar 1 — ICT Governance (Section 4.1)**

This pillar establishes who is responsible for ICT risk and how accountability is structured. It requires the management body (board of directors) to take direct ownership of ICT strategy and risk appetite — not to delegate it entirely to the IT department. It requires the appointment of a designated senior executive with responsibility for information security (the CISO or equivalent).

**Pillar 2 — ICT Risk Management Framework (Section 4.2)**

This pillar defines how the bank identifies, assesses, and manages ICT risks. It requires a systematic, documented approach covering all ICT assets — hardware, software, data, and services. The risk management framework must be reviewed at least annually.

**Pillar 3 — ICT Security (Section 4.3)**

This pillar covers the specific security controls the bank must have in place to protect its systems and data. It encompasses access control, data classification, encryption, vulnerability management, penetration testing, and incident response. For employees, this is the pillar most relevant to day-to-day behaviour.

**Pillar 4 — ICT Operations Management (Section 4.4)**

This pillar governs how the bank runs its technology operations reliably and securely. It covers change management (how systems are modified), configuration management (how systems are configured and documented), capacity management (ensuring systems can handle demand), and problem management (how recurring issues are identified and resolved).

**Pillar 5 — ICT Business Continuity (Section 4.5)**

This pillar requires the bank to be prepared for disruptions and to recover from them quickly. It requires formal Business Continuity Plans (BCPs) with tested RTOs and RPOs, disaster recovery capabilities, and annual testing of the plans. The goal is resilience: the ability to absorb a shock and continue operating.

---

# Module 2: ICT Governance — Leadership and Accountability

## Lesson 2.1: Board and Senior Management Responsibilities

One of the most significant aspects of the EBA guidelines is their insistence that ICT risk management starts at the very top of the organisation. The guidelines deliberately prevent banks from treating technology risk as a purely technical matter, handled below board level.

**What the management body must do**

The management body — which in UniCredit's case includes both the supervisory board and the executive management board — must:

**Approve the ICT strategy** as part of the overall business strategy. This means that technology direction is a board-level decision, not just a CTO's decision. When UniCredit decides to migrate its core banking platform, move workloads to the cloud, or acquire a fintech company, these are strategic decisions that must be reviewed and endorsed at board level for their technology risk implications.

**Define the ICT risk appetite**: the board must formally determine how much technology risk UniCredit is willing to accept. This is expressed as quantitative and qualitative limits — for example, the maximum number of hours per year that critical systems can be unavailable, or the maximum exposure to a single third-party provider. The risk appetite is the benchmark against which actual risk levels are measured.

**Receive regular reporting**: the board must receive at least annual reports on the state of ICT risks, major incidents from the preceding period, the results of BCP tests, and progress on technology risk management initiatives.

**Approve material ICT changes**: significant changes to critical technology infrastructure — a major system upgrade, a new cloud deployment, a significant outsourcing arrangement — require board-level approval.

**The CISO requirement**

The guidelines explicitly require institutions to designate at least one senior management member with specific responsibility for information security. In practice, this is the Chief Information Security Officer (CISO). This role must be sufficiently independent — the CISO must not report to the CTO or the head of IT operations, as this would create a conflict of interest between building systems and securing them. At UniCredit Group, the Group CISO has direct reporting lines to the Group CRO and the Board, with local CISOs in each operating country reporting similarly.

## Lesson 2.2: ICT Strategy and Risk Appetite

The ICT strategy and the ICT risk appetite are not static documents prepared once and filed away. They are living governance instruments that drive technology decision-making across the organisation.

**What belongs in the ICT strategy**

An EBA-compliant ICT strategy must contain several key elements. It must include an honest assessment of the bank's current technology capabilities and infrastructure — including an acknowledgement of known weaknesses, legacy systems that pose operational risks, and areas where investment is needed.

It must also include a technology roadmap covering at least three to five years: planned system upgrades, migration projects, cloud adoption plans, and technology investments. For UniCredit, this includes ongoing modernisation of core banking platforms, expansion of digital banking capabilities, and the group-wide shift to multi-cloud architectures.

The strategy must address third-party dependencies — the bank must understand and document its reliance on external ICT providers, particularly for critical functions, and demonstrate that this reliance is actively managed.

Finally, the strategy must be periodically reviewed and updated. A strategy prepared in 2023 that has not been revisited is unlikely to adequately address the threat landscape of 2026.

**Defining risk appetite in practice**

The ICT risk appetite translates abstract risk tolerances into operational metrics. In practice, it looks like a set of threshold limits for key risk indicators. For each threshold, there is a defined escalation path: when the threshold is breached, who must be informed, and what actions must be taken.

Consider a few examples: UniCredit might define its risk appetite for system availability as "no critical system may be unavailable for more than four cumulative hours in any calendar month." If actual downtime approaches this limit, it triggers an escalation and a requirement for remediation. Or it might define that "no more than 5% of employees may fail a simulated phishing test in any given quarter." If the failure rate exceeds this, the security awareness programme is intensified.

## Lesson 2.3: The Three Lines of Defence Model

The Three Lines of Defence (3LoD) model is the standard governance framework for risk management in banking. The EBA guidelines require its application to ICT risk management specifically, ensuring that accountability is clearly defined at each level of the organisation.

**First Line — Business and IT operations**

The first line of defence consists of all the business and operational units that own and manage ICT risks as part of their daily activities. This includes every employee who uses a computer, every team that runs business processes supported by technology, and every IT operations team that builds and maintains systems.

As a first-line employee, your responsibilities include: following all security policies and procedures, reporting suspicious activity or potential security incidents to the IT helpdesk or security team, and not circumventing IT controls for the sake of convenience. When you receive a suspicious email, when you notice an unusual system behaviour, when a colleague asks you to share your login credentials "just this once" — your response is the first line of defence.

**Second Line — Risk management and CISO function**

The second line consists of the independent risk management function and the CISO's organisation. Their role is not to manage ICT risks directly, but to design the policies and controls that the first line must follow, and to monitor whether those controls are being observed.

The key characteristic of the second line is **independence**: it must be separated from the IT operations function. The same manager cannot be responsible both for building a system quickly and for objectively assessing whether that system is being built securely. Where these responsibilities conflict, corners get cut — which is precisely what the 3LoD model is designed to prevent.

**Third Line — Internal Audit**

The third line is Internal Audit. Its role is to independently verify that both the first and second lines are functioning as designed. ICT audits examine whether security policies are being followed in practice, whether BCP tests are conducted and documented as required, whether access controls are operating as intended, and whether risk reporting to the board is accurate and complete.

ICT audit findings report directly to the Board Audit Committee, ensuring that the highest level of governance is informed of any failures in the risk management framework. In UniCredit, the Group Internal Audit function conducts ICT-specific reviews on an annual cycle, with country-level audits supplementing the group programme.

---

# Module 3: ICT Risk Management Framework

## Lesson 3.1: ICT Asset Inventory and Risk Classification

Effective risk management is impossible without a comprehensive understanding of what you are trying to protect. The EBA guidelines require institutions to maintain a complete, accurate, and current inventory of ICT assets — and this is, in practice, one of the most challenging requirements to fulfil well.

**What counts as an ICT asset?**

The scope of ICT assets is broad. It includes **hardware**: servers, workstations, laptops, mobile devices, network equipment, storage arrays, and physical security infrastructure. It includes **software**: operating systems, core banking applications, business applications, databases, development tools, and middleware. It includes **data**: customer records, transaction data, employee data, regulatory reporting data — everything the bank processes, stores, or transmits. And it includes **services**: cloud platforms, outsourced IT services, software-as-a-service applications, and third-party APIs.

In a bank the size of UniCredit, this inventory runs to tens of thousands of items across 18 countries. Keeping it accurate as systems are deployed, upgraded, retired, and migrated requires disciplined processes and strong governance.

**Criticality classification**

Once assets are inventoried, they must be classified by their criticality to the business. The EBA does not prescribe a specific classification scheme, but the typical approach uses three or four tiers:

**Critical assets** are those whose failure or compromise would immediately impair the bank's ability to conduct essential operations or meet regulatory requirements. At UniCredit, this category includes the core banking system, SWIFT and SEPA payment processing, real-time risk management systems, and regulatory reporting infrastructure.

**Important assets** are those that support significant business functions but where a short-term interruption can be managed through manual workarounds or alternative processes. Customer relationship management systems, internal communication platforms, and human resources systems typically fall into this category.

**Standard assets** are those where interruption would be inconvenient but would not materially affect the bank's operations or its customers. Internal intranet sites, archive systems, and minor reporting tools are examples.

The criticality classification drives the level of security controls, the RTO and RPO targets, and the frequency of risk assessments that apply to each asset.

## Lesson 3.2: The Risk Assessment and Treatment Cycle

The EBA guidelines require a structured, documented approach to assessing and treating ICT risks. This must be performed at least annually as a formal review exercise, and additionally whenever significant changes occur — a major system upgrade, the adoption of a new technology platform, or a significant change in the threat landscape.

**Step 1: Identify threats and vulnerabilities**

Risk assessment begins with identifying the threats that could harm the bank's ICT assets, and the vulnerabilities that those threats could exploit. External threats include organised cybercrime groups targeting financial institutions, nation-state actors seeking intelligence or economic disruption, natural events such as floods or fires affecting data centres, and supply chain attacks targeting third-party software providers.

Internal threats include misconfigurations made by IT staff, vulnerabilities introduced by developers, and the risk of insider threats — deliberate or accidental actions by employees that harm systems or expose data.

Vulnerabilities are the weaknesses that threats can exploit: unpatched software, overly permissive access controls, inadequate network segmentation, insufficient encryption, poorly designed authentication mechanisms.

**Step 2: Analyse likelihood and impact**

Each identified risk scenario is evaluated on two dimensions: how likely is it to occur, and what would be the impact if it did? Impact is assessed across multiple dimensions: financial loss, operational disruption, regulatory exposure, and reputational damage.

This analysis produces a risk matrix — typically a heat map showing risks plotted against likelihood and impact — which allows the organisation to prioritise its risk treatment activities.

**Step 3: Evaluate against risk appetite**

Risks that exceed the defined risk appetite require treatment. Risks that fall within appetite are accepted and monitored. The output of this step is a formal risk register, documenting each assessed risk, its rating, and the assigned risk owner.

**Step 4: Select and implement treatment**

For each risk that exceeds the risk appetite, the bank must select an appropriate treatment strategy. The EBA guidelines recognise four options: **avoidance** (eliminating the activity that generates the risk), **reduction** (implementing controls to reduce likelihood or impact), **transfer** (shifting the financial impact through insurance or contractual arrangements), and **acceptance** (consciously accepting the risk where treatment is not cost-effective, subject to formal approval).

## Lesson 3.3: Key Risk Indicators and Reporting

Managing ICT risk is not a one-time exercise — it is a continuous process of monitoring, measurement, and reporting. The EBA guidelines require institutions to define and track Key Risk Indicators (KRIs) that provide early warning of deteriorating risk conditions.

**What makes a good KRI?**

A good KRI is measurable (it can be calculated from available data), meaningful (changes in the metric correspond to actual changes in risk level), and actionable (when the KRI breaches a threshold, there is a defined response). KRIs must have clearly defined thresholds: a target level (where the metric should be), an alert level (where enhanced monitoring is triggered), and an escalation level (where immediate action is required).

**Examples of ICT KRIs in banking practice**

The availability of critical systems is one of the most fundamental KRIs. For a bank like UniCredit, the target for core banking availability might be 99.95% — meaning no more than approximately four hours of unplanned downtime per year. A breach of the 99.9% threshold would trigger an alert; a breach of 99.5% would trigger immediate escalation to the executive management board.

The mean time to detect a security incident (MTTD) measures how quickly the bank discovers when something has gone wrong. Industry research consistently shows that attackers who gain access to a network may remain undetected for weeks or months. A target MTTD of under 24 hours is ambitious but achievable with modern security operations tooling.

Patch compliance rate measures the proportion of systems that are running current, patched software. A target of 100% for critical patches within 72 hours of release is a demanding but necessary standard for a banking institution.

**Regulatory reporting obligations**

Beyond internal monitoring, the EBA guidelines require institutions to report significant ICT-related operational incidents to their competent supervisory authority. Under the EBA Guidelines on major incident reporting (EBA/GL/2017/10), as extended by DORA (Digital Operational Resilience Act, effective January 2025), the requirements are:

An **initial notification** must be filed within 4 hours of classifying an event as a major incident. An **intermediate report** must follow within 72 hours. A **final report** must be submitted within one month of the incident being resolved. In Poland, these reports go to the KNF; UniCredit Group also reports to the ECB as a significant institution.

---

# Module 4: Information Security Requirements

## Lesson 4.1: Information Security Policy Framework

The EBA guidelines require institutions to establish and maintain a comprehensive information security policy framework — not merely a single policy document, but an interconnected set of policies, standards, and procedures that together govern how the bank protects its information assets.

**The policy hierarchy**

At the apex of the framework is the **Information Security Policy** — a board-approved document that sets out the institution's philosophy and commitment to information security, assigns top-level responsibilities, and establishes the principles that all more specific policies must follow. This document is intentionally brief and strategic.

Beneath it sit a set of topic-specific policies and standards that provide the detailed guidance for specific domains:

The **Data Classification Policy** defines how information must be categorised according to its sensitivity and the level of protection it requires. UniCredit uses a four-level classification: Public (information that can be freely shared), Internal (information restricted to UniCredit employees), Confidential (sensitive information requiring specific controls), and Secret (the most sensitive information, subject to the strictest access restrictions). Customer financial data is classified as at least Confidential; cryptographic keys and board-level strategic data are Secret.

The **Access Control Policy** governs how access to systems and data is granted, managed, and revoked. The fundamental principle is least privilege: employees are given access only to what they need to perform their current role — nothing more. This policy drives the formal process for access requests, approvals, and regular reviews.

The **Incident Response Policy** defines what constitutes an information security incident, how incidents are classified, who must be notified and when, what containment and investigation steps must be followed, and how the post-incident review is conducted.

The **Change Management Policy** governs how modifications to ICT systems are assessed for risk, tested, approved, and implemented — with the goal of preventing the kind of catastrophic failure that befell TSB Bank.

**Keeping policies alive**

Policies are only effective if they are known, understood, and followed. The EBA guidelines require formal processes for communicating security policies to all relevant staff (which is why you are completing this training) and for updating policies at least annually or whenever significant changes in the environment, technology, or threat landscape make revision necessary.

## Lesson 4.2: Access Control and Identity Management

Identity and Access Management (IAM) is one of the most direct intersections between information security policy and individual employee behaviour. The vast majority of security breaches involve compromised or misused access credentials, making this one of the highest-value areas for security investment.

**Least Privilege in everyday banking**

The principle of least privilege is not a technical control alone — it is a governance principle that shapes how access is managed throughout the employee lifecycle. When a new employee joins UniCredit, their access is provisioned based on their role, following a formal approval process. When they change roles — a promotion, a transfer, a project assignment — their access must be reviewed and adjusted. When they leave the bank, their access must be revoked immediately, not when the IT team gets around to it.

In practice, failures in this area are common: an employee transfers to a new department but retains their old access; a temporary project team member's permissions remain active for months after the project ends; an executive's accounts remain open for weeks after their departure. Each of these situations represents an active security risk and a direct violation of the EBA guidelines.

**Privileged Access Management (PAM)**

Privileged accounts — administrator accounts, root accounts, and accounts with elevated access to critical systems — represent the highest security risk in any organisation. If a standard user account is compromised, the attacker can access that user's data and systems. If a privileged account is compromised, the attacker can potentially access, modify, or destroy any system the administrator manages.

The EBA guidelines therefore impose significantly stricter controls on privileged accounts:

**Multi-factor authentication (MFA)** is mandatory for all privileged access. A password alone, however strong, is not sufficient. The second factor (a hardware token, an authenticator app, a biometric) ensures that even if the password is compromised, the account cannot be accessed without the additional authentication element.

**Session logging** must be comprehensive: every action taken with a privileged account must be recorded in tamper-proof logs. These logs are essential both for detecting anomalous behaviour and for forensic investigation following an incident.

**Just-in-time access** is the practice of granting elevated permissions only for the duration of a specific, authorised task, after which they are automatically revoked. This limits the window of exposure should a privileged account be compromised.

**Regular access reviews** are required: privileged access must be reviewed at least quarterly, with any access that is no longer required being revoked immediately.

## Lesson 4.3: Cyber Security Controls and Incident Response

**Vulnerability management — the patch problem**

Every piece of software contains bugs, and some of those bugs are security vulnerabilities. When a vulnerability is discovered and made public, a race begins: security teams race to patch their systems before attackers race to exploit the vulnerability. In a banking environment, the stakes of losing this race are particularly high.

The EBA guidelines require a formal vulnerability management programme. This includes regular **vulnerability scanning** of all ICT systems — at minimum monthly for critical systems, using recognised scanning tools that check against known vulnerability databases. It includes a **prioritisation process** that classifies vulnerabilities by severity (typically using the CVSS scoring system, where scores range from 0 to 10), with critical vulnerabilities (CVSS ≥ 9.0) requiring remediation within 72 hours, high vulnerabilities within one week, and medium vulnerabilities within one month.

It also includes **penetration testing** — controlled, authorised attempts to compromise systems, conducted by qualified security professionals. The EBA requires penetration tests at least annually for critical systems. Penetration tests reveal vulnerabilities that automated scanning may miss, and they validate whether existing security controls would actually prevent a determined attacker from achieving their objectives.

**The incident response process**

Despite all preventive controls, security incidents will occur. The EBA guidelines require institutions to have a formally documented Incident Response Plan that is tested and updated regularly. The plan must address the full lifecycle of an incident:

**Detection and identification**: Security monitoring tools (SIEM — Security Information and Event Management systems, IDS/IPS — Intrusion Detection/Prevention Systems) must be in place to detect anomalous activity. The bank must also have processes for accepting incident reports from employees, customers, and external sources.

**Triage and classification**: Not every security event is an incident. Triage involves determining whether an event represents an actual security incident and, if so, classifying its severity. UniCredit uses a four-tier classification: P1 (critical — immediate threat to customer services or regulatory reporting), P2 (high — significant operational impact), P3 (medium — limited impact, manageable through normal processes), P4 (low — minor event).

**Containment**: Once an incident is confirmed, the priority is to limit its spread. For a ransomware infection, this means isolating affected systems from the network. For a compromised account, this means revoking the account's access credentials. Speed is critical — every minute that passes before containment allows the incident to potentially spread further.

**Eradication**: After containment, the root cause must be identified and removed. For malware, this means cleaning infected systems. For a compromised application, this means patching the vulnerability. Eradication must be thorough — incomplete removal often leads to re-infection.

**Recovery**: Systems must be restored to full operation from known-clean backups or rebuilt from scratch. Before production systems are restored, they must be verified clean and fully tested.

**Post-incident review**: This is the most important stage and the one most often neglected. A thorough post-incident review asks: why did this happen, what controls failed, how can we prevent recurrence? The findings drive concrete improvements to the bank's security posture.

---

# Module 5: ICT Operations and Business Continuity

## Lesson 5.1: Change Management and ICT Operations

Operational risk analysis consistently shows that a significant proportion of serious ICT incidents are caused not by external attacks but by errors made during the process of changing systems. The TSB Bank disaster described in Module 1 is perhaps the most dramatic banking example, but similar incidents occur regularly across the industry.

**Why change management matters**

When a system change fails in production, the consequences can be severe: the system becomes unavailable, data may be corrupted, customers cannot access services, and transactions may fail. In a banking context, even a few hours of core system unavailability can cost millions in direct losses and reputational damage.

The EBA guidelines require a formal, documented change management process for all significant changes to production ICT systems. The key elements are:

**Risk assessment before every change**: Before any significant change is implemented, it must be assessed for risk. How complex is the change? What systems could be affected? What is the probability that the change will cause problems? What is the recovery plan (rollback procedure) if problems occur? Changes are classified — typically as standard (low-risk, routine), normal (requires review and approval), or emergency (required urgently due to an incident, but must be reviewed retrospectively).

**Testing in non-production environments**: The fundamental rule is that changes should never be tested in production. Every bank maintains test and staging environments that replicate the production environment closely enough for changes to be validated before they go live. The more closely these environments mirror production, the more reliable the testing.

**Defined maintenance windows**: Changes to production systems are typically restricted to defined maintenance windows — periods of low transaction volume (usually overnight or at weekends) when the impact of disruption is minimised. All affected teams must be notified in advance.

**Rollback procedures**: Every change must have a documented, tested rollback procedure that can restore the system to its previous state if the change causes unexpected problems.

**Change Advisory Board (CAB)**: For significant changes, formal review and approval by a Change Advisory Board — comprising IT operations, security, risk, and business representatives — is required.

## Lesson 5.2: ICT Third-Party Risk Management

The growing reliance of banks on external ICT service providers represents one of the most significant risk management challenges of the current decade. UniCredit, like all major banks, uses cloud computing platforms, outsourced application development, specialist data processing services, and dozens of other third-party ICT services. Each of these relationships creates risk — and the EBA guidelines hold the bank responsible for managing that risk, regardless of whether its systems are operated in-house or by a provider.

**Why third-party ICT risk is different**

When the bank operates its own systems, it has direct control over the people, processes, and technology. It can inspect its own data centres, audit its own configurations, and enforce its own policies. When it relies on a third party, this direct control is lost. The bank must instead rely on contractual rights, auditing mechanisms, and the provider's own governance — all of which may be imperfect.

Moreover, if a critical third-party provider fails — whether due to a cyberattack, a natural disaster, a financial collapse, or simply a catastrophic operational failure — the bank's customers will not care that the failure was the provider's fault. They will hold the bank responsible. This is why the EBA requires banks to manage third-party ICT risk with the same rigour as they manage their own ICT risk.

**Due diligence requirements**

Before engaging any third-party ICT service provider for a significant service, the EBA guidelines require the bank to conduct thorough due diligence. This must cover:

**Financial stability**: Is the provider financially sound? A provider that goes bankrupt will disrupt services suddenly and without warning, potentially leaving the bank without a critical system.

**Security certifications and practices**: Does the provider hold recognised security certifications such as ISO 27001 or SOC 2 Type II? What are their actual security practices — not just what they claim in their marketing materials, but what they can demonstrate through documented evidence and independent audits?

**Sub-contractor chains**: Many ICT providers rely on other providers for parts of their service. A cloud provider may use hardware from one manufacturer, networking from another, and may sub-contract certain services to others. Each link in this chain represents a potential risk that the bank must understand.

**Jurisdictional risk**: Where are the data physically processed and stored? Does the jurisdiction impose any obligations on the provider to disclose data to government authorities? Is the jurisdiction covered by an EU adequacy decision for data protection purposes?

**Mandatory contractual clauses**

The EBA guidelines specify certain provisions that must be included in contracts with ICT third-party providers. These are not optional — they are minimum requirements. They include:

The **right to audit**: the bank must have the contractual right to audit the provider's security practices and compliance, either directly or through a nominated third party. Without this right, the bank cannot verify that the provider's commitments are being honoured.

**Service level agreements with penalties**: contracts must define clear, measurable service levels (availability, response times, etc.) and must include financial consequences for failing to meet them.

**Exit planning**: what happens when the bank needs to change providers? How will data be returned? How long will transition assistance be provided? Without a clear exit plan, the bank may find itself locked into a provider relationship even when it wants to leave — a situation that compromises both resilience and competitive dynamics.

**Outsourcing critical functions**

When a bank wishes to outsource functions that are deemed "critical or important" — those whose failure would materially impair the bank's ability to operate or meet its regulatory obligations — additional requirements apply. The bank must notify its competent supervisory authority (KNF in Poland) before proceeding. It must maintain comprehensive documentation of the arrangement. It must have tested contingency plans in case the provider is unable to continue the service.

## Lesson 5.3: ICT Business Continuity and Recovery Planning

The final pillar of the EBA guidelines addresses the bank's ability to withstand and recover from disruptions. No matter how strong the preventive controls, no organisation can guarantee that its ICT systems will never fail. The question is not whether a failure will occur, but how quickly and completely the bank can recover when one does.

**Business Impact Analysis**

Business continuity planning begins with a Business Impact Analysis (BIA) — a systematic assessment of how different types of disruptions would affect the bank's operations. For each critical business function, the BIA determines:

**Maximum Tolerable Downtime (MTD)**: How long can this function be unavailable before the impact becomes unacceptable? For payment processing, this might be measured in hours; for some back-office functions, it might be days.

**Recovery Time Objective (RTO)**: The target time within which the function must be restored after a disruption occurs. The RTO must be shorter than the MTD.

**Recovery Point Objective (RPO)**: The maximum amount of data loss that is acceptable. An RPO of 15 minutes means that backup systems must be synchronised at least every 15 minutes — no more than 15 minutes of transactions can be lost in a recovery scenario.

These parameters then drive the design of recovery strategies and the investment required in backup and disaster recovery infrastructure.

**Recovery strategies**

Different recovery scenarios require different recovery strategies, and the appropriate strategy depends on the RTO and RPO requirements:

**Hot standby (active-active or active-passive)** maintains a second, fully synchronised instance of the system in a separate location. Switchover takes seconds to minutes. This is required for systems with very short RTOs (under 15 minutes) such as core payment systems. It is the most expensive strategy but provides the fastest recovery.

**Warm standby** maintains a second instance that is regularly synchronised but not continuously. Switchover takes minutes to hours, as data must be synchronised and some system configuration may need to be completed. Appropriate for systems where RTOs of a few hours are acceptable.

**Cold standby (backup and restore)** relies on regular data backups that are restored to fresh infrastructure in the event of a failure. Recovery times are measured in hours to days, making this approach appropriate only for systems of lower criticality.

**Testing requirements — why testing is non-negotiable**

The EBA guidelines state unambiguously that BCP ICT must be **tested at least once per year**. This is not optional, and "testing" is not reviewing documentation — it means actually executing the recovery procedures and demonstrating that systems can be restored within the defined RTO and RPO.

UniCredit conducts a tiered testing programme: quarterly tabletop exercises (where teams work through disaster scenarios in discussion, without actually failing over systems), semi-annual functional tests (where specific recovery procedures are executed in test environments), and annual failover tests (where selected critical systems are actually switched to their backup environments and the bank verifies that normal operations can continue).

The results of every test must be documented, and any deficiencies identified must be addressed through a formal remediation plan. If a failover test reveals that the actual recovery time is six hours when the RTO is two hours, that is a critical finding that must be resolved — not papered over.

**Your role as a UniCredit employee**

ICT security and business continuity are not solely the responsibility of the IT department. As a UniCredit employee, you play an important role in both preventing incidents and helping the bank respond effectively when they occur.

Report suspicious events immediately: if you receive an unexpected email asking for login credentials, if you notice unusual behaviour on your computer, if you witness someone attempting to access IT rooms or equipment without authorisation — report it without delay to the IT helpdesk or security team. Early reporting can prevent a minor security event from escalating into a major incident.

Follow the security policies: the policies exist for reasons grounded in real-world incidents. Circumventing them for convenience — sharing passwords, using personal devices for work data, connecting to public WiFi without VPN — introduces genuine risk. If a policy is preventing you from doing your job effectively, raise the issue through the proper channels, do not work around it.

Complete your security training: annual security awareness training, including this programme, is a regulatory requirement and an important component of the bank's first line of defence. An employee who understands the threats and knows how to respond is significantly more valuable to the bank's security posture than all the technology in the world.

---QUIZ---
**Passing Score:** 100

### Q1
**Question:** What significant real-world incident, which occurred in 2018 at a UK bank, demonstrated the catastrophic consequences of inadequate ICT change management?
**Options:**
A) The WannaCry ransomware attack that locked thousands of banking terminals
B) The Capital One data breach caused by a misconfigured cloud firewall
C) The TSB Bank IT migration failure that locked 1.9 million customers out of their accounts for up to two weeks
D) The collapse of a major cryptocurrency exchange due to poor custody procedures
**Correct:** C
**Explanation:** The TSB Bank IT migration failure of April 2018 is one of the most consequential ICT failures in UK banking history. A failed system migration locked nearly 1.9 million customers out of their online banking accounts for up to two weeks. The total cost exceeded £300 million, the bank's CEO resigned, and the regulator launched a formal enforcement investigation. It demonstrated precisely why the EBA guidelines require rigorous change management, testing, and rollback planning. This incident, along with the WannaCry attack of 2017 and the Capital One breach of 2019, directly influenced the development of EBA/GL/2019/04.

### Q2
**Question:** The EBA/GL/2019/04 guidelines were issued under which legal framework, giving them binding force for EU banks?
**Options:**
A) Directive 2015/2366/EU (PSD2) — the Payment Services Directive
B) Articles 74 and 85(2) of Directive 2013/36/EU (Capital Requirements Directive IV, CRD IV)
C) Regulation 2022/2554/EU (DORA) — the Digital Operational Resilience Act
D) Directive 2016/1148/EU (NIS Directive) on network and information systems security
**Correct:** B
**Explanation:** EBA/GL/2019/04 was issued under Articles 74 and 85(2) of Directive 2013/36/EU (CRD IV). These articles empower the EBA to develop guidelines on ICT risk management and internal governance for credit institutions and investment firms. Note that DORA (answer C), while related, is a subsequent regulation that entered into force in January 2025 and extends and partially replaces these guidelines; it was not the basis for the original 2019 guidelines.

### Q3
**Question:** According to the EBA guidelines' Three Lines of Defence (3LoD) model, which line is responsible for designing information security policies and independently monitoring their compliance?
**Options:**
A) The First Line (business and IT operations units)
B) The Second Line (risk management function and CISO organisation)
C) The Third Line (Internal Audit)
D) The Executive Management Board
**Correct:** B
**Explanation:** The Second Line of Defence — comprising the risk management function and the CISO's organisation — is responsible for designing the policies, standards, and controls that govern ICT risk management, and for independently monitoring whether the first line is complying with them. The key characteristic of the second line is independence from IT operations (the first line). The First Line owns and manages risks day-to-day; the Third Line (Internal Audit) independently validates that both first and second lines are working effectively.

### Q4
**Question:** What does the principle of Least Privilege require in the context of ICT access management?
**Options:**
A) All employees should have full access to all systems to maximise operational flexibility and enable peer support
B) Each employee should be granted access only to the systems and data strictly necessary for their current role — nothing more
C) Privileged accounts should be shared among team members to reduce the number of accounts requiring MFA
D) Access rights should be reviewed once every five years during formal performance reviews
**Correct:** B
**Explanation:** Least Privilege is a fundamental security principle explicitly required by the EBA guidelines. It means that every employee's access rights must be limited to exactly what is needed to perform their current job — nothing more. This principle applies throughout the entire employee lifecycle: new starters receive role-appropriate access from day one; when someone changes roles, their access is immediately adjusted; when someone leaves, all access is immediately revoked. The principle limits the damage that can be caused by a compromised account, an error, or a deliberate insider action.

### Q5
**Question:** For a critical production system at UniCredit, within what maximum timeframe should a critical security vulnerability (CVSS score ≥ 9.0) be remediated according to sound vulnerability management practice?
**Options:**
A) Within 30 days — standard monthly patching cycle
B) Within 7 days — as part of the next scheduled maintenance window
C) Within 72 hours — critical vulnerabilities require near-immediate remediation
D) When convenient — patch timing should be balanced against operational requirements
**Correct:** C
**Explanation:** Critical vulnerabilities (CVSS ≥ 9.0) represent severe security risks that are typically actively exploited in the wild by attackers. The EBA guidelines' requirement for robust vulnerability management, combined with industry best practice, calls for remediation within 72 hours for critical vulnerabilities in critical systems. This reflects the reality that attackers actively scan for unpatched critical vulnerabilities and can begin exploiting them very quickly after public disclosure. High vulnerabilities (CVSS 7.0–8.9) typically require remediation within 7 days; medium vulnerabilities (CVSS 4.0–6.9) within 30 days.

### Q6
**Question:** What is the Recovery Time Objective (RTO), and how does it differ from the Recovery Point Objective (RPO)?
**Options:**
A) RTO measures data backup frequency; RPO measures system failover speed — they are equivalent but used in different technical contexts
B) RTO is the maximum acceptable time to restore a system to operation; RPO is the maximum acceptable data loss measured in time
C) RTO applies to hardware failures only; RPO applies to cyberattack scenarios only
D) RTO and RPO are alternative names for the same concept under different EBA regional guidelines
**Correct:** B
**Explanation:** RTO (Recovery Time Objective) and RPO (Recovery Point Objective) are two distinct but complementary parameters. RTO defines how quickly a system must be restored after an incident — if the RTO for the core banking system is 1 hour, the system must be back in operation within 1 hour of the decision to activate recovery. RPO defines how much data loss is acceptable — if the RPO is 15 minutes, backups must be taken at least every 15 minutes, because losing more than 15 minutes of transaction data is unacceptable. Both must be formally defined, documented, and validated through testing for all critical systems.

### Q7
**Question:** What is UniCredit's obligation when planning to outsource a "critical or important" ICT function to an external provider?
**Options:**
A) No special obligations beyond standard procurement procedures apply
B) The outsourcing must be approved by all country management boards before proceeding
C) Prior notification to the competent supervisory authority (KNF in Poland / ECB for the group) is required, along with tested contingency plans
D) The bank must obtain certification from the provider but does not need to inform regulators
**Correct:** C
**Explanation:** The EBA guidelines, reinforced by the EBA Guidelines on Outsourcing (EBA/GL/2019/02) and DORA, impose specific requirements when banks outsource critical or important functions. Prior notification to the competent supervisory authority — the KNF in Poland and the ECB for UniCredit as a significant institution — is required before the outsourcing arrangement begins. Additionally, the bank must maintain comprehensive documentation, must have tested contingency plans in case the provider cannot continue service, and must include specific mandatory clauses in the contract (right to audit, exit plan, SLAs with penalties). The bank's board-level approval is also required.

### Q8
**Question:** What are the three reporting deadlines that UniCredit must meet when a major ICT incident occurs, as required by EBA incident reporting guidelines?
**Options:**
A) 24 hours for initial report; 5 days for intermediate report; 3 months for final report
B) 4 hours for initial notification; 72 hours for intermediate report; 1 month for final report
C) 1 hour for initial notification; 48 hours for intermediate report; 2 weeks for final report
D) Only one comprehensive report is required, submitted within 30 days of incident resolution
**Correct:** B
**Explanation:** EBA/GL/2017/10 and DORA establish a three-stage incident reporting obligation. An initial notification (Early Warning) must reach the competent supervisory authority within 4 hours of classifying the event as a major incident — even if full details are not yet available. An intermediate report must follow within 72 hours. A comprehensive final report must be submitted within 1 month of incident resolution. In Poland, reports go to the KNF; UniCredit also reports to the ECB as a Group of Significant Importance. Failure to meet these deadlines can itself result in regulatory sanctions.

### Q9
**Question:** How frequently must the ICT Business Continuity Plan (BCP) be tested under EBA guidelines, and what must happen with the test results?
**Options:**
A) Testing is recommended best practice but not a formal EBA requirement
B) The BCP must be tested every 3 years; results may be kept internally without formal documentation
C) The BCP must be tested at least annually; results must be documented and identified deficiencies must be addressed through a formal remediation plan
D) The BCP must be tested monthly for critical systems and annually for others; negative results are acceptable if resources are constrained
**Correct:** C
**Explanation:** Section 4.5 of EBA/GL/2019/04 is unambiguous: the ICT Business Continuity Plan must be tested at least once per year. "Testing" means actually executing recovery procedures and demonstrating that systems can be restored within defined RTO and RPO targets — not merely reviewing documentation. Test results must be formally documented. Any deficiencies identified must be addressed through a formal remediation plan with assigned responsibilities and deadlines. Repeated failure to conduct or document BCP tests is a finding that supervisory authorities take seriously during ICT inspections.

### Q10
**Question:** Which of the following employee actions best demonstrates compliance with the EBA ICT guidelines' requirements for information security?
**Options:**
A) Using your standard email password for the core banking system to reduce the number of passwords you need to remember
B) Sharing login credentials with a trusted colleague during their leave to ensure business continuity
C) Reporting a suspicious phishing email to the IT security team immediately, even if you're unsure whether it is actually malicious
D) Delaying the reporting of an unusual system behaviour until you can fully understand and diagnose it yourself
**Correct:** C
**Explanation:** Promptly reporting suspicious activity — even when uncertain — is exactly the behaviour the EBA guidelines require from all employees as part of the First Line of Defence. Security teams need early warning to investigate and contain potential incidents before they escalate. Waiting until you are certain, or trying to diagnose the issue yourself, allows threats to spread. The other options all represent serious security violations: reusing passwords across systems weakens authentication security significantly; sharing credentials is prohibited under virtually every bank's access control policy (and violates the principle of individual accountability); delaying incident reports can cause preventable harm.
