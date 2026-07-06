/* ==========================================================================
   UNICREDIT AI GOVERNANCE & AWARENESS HUB - APPLICATION LOGIC
   Features: Slide Navigator, Searchable Handbook, Compliance Quiz Game,
             Playground Simulator, Bottom-Up submission canvas animation.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // DATA DECLARATIONS: HANDBOOK, QUIZ, AND PLAYGROUND SCENARIOS
    // ==========================================================================

    const HANDBOOK_CHAPTERS = [
        {
            id: 'chapter-1',
            num: 1,
            title: 'Understanding AI & Generative AI',
            content: `
                <h3>What is Artificial Intelligence?</h3>
                <p>At its core, an <strong>Artificial Intelligence System (AIS)</strong> is a machine-based system designed to operate with varying levels of autonomy. As defined by the EU AI Act (Article 3) and adopted by UniCredit:</p>
                <blockquote>
                    "AI system" means a machine-based system that is designed to operate with varying levels of autonomy and that may exhibit adaptiveness after deployment, and that, for explicit or implicit objectives, infers, from the input it receives, how to generate outputs such as predictions, content, recommendations, or decisions that can influence physical or virtual environments.
                </blockquote>

                <h3>Traditional AI vs. Generative AI</h3>
                <p>For years, banks have used <strong>Traditional (Predictive) AI</strong>. These systems analyze numerical and structured data to identify patterns and predict outcomes—such as evaluating credit scoring, detecting fraudulent card transactions, or running algorithmic trading models.</p>
                <p><strong>Generative AI (GenAI)</strong> represents a paradigm shift. Trained on vast corpuses of human language, code, and images, GenAI does not just predict; it <em>creates</em> entirely new, coherent content. This is made possible by <strong>Large Language Models (LLMs)</strong>.</p>

                <div class="static-svg-diagram">
                    <svg viewBox="0 0 600 240" width="100%" height="100%" style="background:#0e1017; border-radius:8px; padding:16px;">
                        <!-- Node Artificial Intelligence -->
                        <rect x="220" y="10" width="160" height="35" rx="5" fill="#cc0000" stroke="#ff4d4d" stroke-width="1"/>
                        <text x="300" y="32" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle">Artificial Intelligence</text>
                        
                        <!-- Lines to Subcategories -->
                        <path d="M300 45 L300 70 M300 70 L130 70 L130 90 M300 70 L470 70 L470 90" stroke="#626880" stroke-width="1.5" fill="none"/>
                        
                        <!-- Node Traditional AI -->
                        <rect x="50" y="90" width="160" height="35" rx="5" fill="#1c1e2a" stroke="#626880" stroke-width="1"/>
                        <text x="130" y="112" fill="#ffffff" font-size="11" font-weight="600" text-anchor="middle">Traditional / Predictive AI</text>
                        
                        <!-- Node Generative AI -->
                        <rect x="390" y="90" width="160" height="35" rx="5" fill="#1c1e2a" stroke="#cc0000" stroke-width="1.5"/>
                        <text x="470" y="112" fill="#ffffff" font-size="11" font-weight="600" text-anchor="middle">Generative AI (GenAI)</text>
                        
                        <!-- Connecting traditional children -->
                        <path d="M130 125 L130 145 M130 145 L70 145 L70 165 M130 145 L190 145 L190 165" stroke="#626880" stroke-width="1" fill="none"/>
                        <rect x="10" y="165" width="110" height="25" rx="4" fill="#0c0d12" stroke="#626880" stroke-width="1"/>
                        <text x="65" y="181" fill="#949ab2" font-size="9" text-anchor="middle">Credit Score Cards</text>
                        <rect x="135" y="165" width="110" height="25" rx="4" fill="#0c0d12" stroke="#626880" stroke-width="1"/>
                        <text x="190" y="181" fill="#949ab2" font-size="9" text-anchor="middle">Fraud Analytics</text>
                        
                        <!-- Connecting GenAI children -->
                        <path d="M470 125 L470 145 M470 145 L410 145 L410 165 M470 145 L530 145 L530 165" stroke="#cc0000" stroke-width="1" fill="none"/>
                        <rect x="350" y="165" width="110" height="25" rx="4" fill="#1a1c27" stroke="#cc0000" stroke-width="1"/>
                        <text x="405" y="181" fill="#ffffff" font-size="9" text-anchor="middle">Google Gemini</text>
                        <rect x="475" y="165" width="110" height="25" rx="4" fill="#1a1c27" stroke="#cc0000" stroke-width="1"/>
                        <text x="530" y="181" fill="#ffffff" font-size="9" text-anchor="middle">Google NotebookLM</text>
                    </svg>
                </div>

                <h3>How Do Large Language Models Work?</h3>
                <p>LLMs operate on the principle of <strong>next-token prediction</strong>. They act as highly advanced autocomplete systems, calculating the statistical probability of the next word (or "token") based on the text prompt you provide.</p>
                <ul>
                    <li><strong>No Human Understanding:</strong> LLMs do not "think" or understand concepts in the human sense. They recognize linguistic and structural patterns.</li>
                    <li><strong>The Context Window:</strong> Think of this as the AI's active, short-term memory. It is the volume of text the LLM can process in a single conversation. In Google's latest models, this context window is extremely large, allowing you to upload entire books, manuals, or financial portfolios for active analysis in one go.</li>
                </ul>
            `
        },
        {
            id: 'chapter-2',
            num: 2,
            title: 'Why AI? Transforming Financial Services',
            content: `
                <p>Artificial Intelligence is reshaping the financial services industry, driving efficiency, enhancing quality, and freeing employees from repetitive administrative tasks.</p>
                
                <h3>The Four Pillars of AI in Banking</h3>
                <p>According to Google’s analysis of AI in Banking, financial institutions are transforming across four core pillars:</p>
                
                <table class="presentation-table mt-4" style="border: 1px solid var(--border-color);">
                    <thead>
                        <tr style="background: rgba(255,255,255,0.02);">
                            <th style="padding:12px;">Pillar</th>
                            <th style="padding:12px;">Description</th>
                            <th style="padding:12px;">Examples</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Hyper-Personalized CX</strong></td>
                            <td>Delivering immediate, tailored answers and contextual recommendations.</td>
                            <td>Smart virtual assistants (chatbots) resolving 24/7 client inquiries; wealth management advice.</td>
                        </tr>
                        <tr>
                            <td><strong>Intelligent Risk Shield</strong></td>
                            <td>Identifying anomalies in real-time transaction streams to combat crime.</td>
                            <td>Anti-Money Laundering (AML) transaction profiling; advanced credit risk modeling.</td>
                        </tr>
                        <tr>
                            <td><strong>Operational Efficiency</strong></td>
                            <td>Automating document-heavy back-office and middle-office processes.</td>
                            <td>Automating loan file audits; extracting key terms from complex derivative agreements.</td>
                        </tr>
                        <tr>
                            <td><strong>Employee Empowerment</strong></td>
                            <td>Creating an institutional "cognitive search" for knowledge retrieval.</td>
                            <td>Relationship managers querying internal databases for product rules or credit policies.</td>
                        </tr>
                    </tbody>
                </table>

                <h3 class="mt-4">Enhancing Your Daily Work</h3>
                <p>In your daily role, AI is your personal, tireless assistant. It Excel-s at:</p>
                <ul>
                    <li><strong>Rapid Summarization:</strong> Turn 50-page regulatory files, audit reports, or meeting transcripts into high-impact bullet points in seconds.</li>
                    <li><strong>Synthesis:</strong> Identify common themes or discrepancies across multiple extensive text sources.</li>
                    <li><strong>Drafting & Refinement:</strong> Generate boilerplate email responses, write report structures, translate materials across our European perimeter, or adjust tone from technical jargon to client-friendly text.</li>
                    <li><strong>Coding & Scripting:</strong> Generate boilerplate code (Python, SQL, VBA), debug software errors, and write documentation for legacy code.</li>
                </ul>
            `
        },
        {
            id: 'chapter-3',
            num: 3,
            title: 'Our Secure AI Toolkit: Gemini & NotebookLM',
            content: `
                <p>UniCredit provides employees with a secure, enterprise-grade AI toolkit powered by Google. By utilizing these tools under our corporate license, your data is completely protected.</p>
                
                <h3>1. Google Gemini</h3>
                <p>Gemini is your primary conversational AI. It is designed for interactive, natural language tasks.</p>
                <ul>
                    <li><strong>Best For:</strong> Brainstorming, drafting content, writing and explaining code, summarizing emails, and conducting market research via real-time web search integrations.</li>
                    <li><strong>Multimodal Capabilities:</strong> Gemini can process and generate not just text, but code, structured data tables, and images.</li>
                </ul>

                <h3>2. Google NotebookLM</h3>
                <p>NotebookLM is your personalized research assistant. Unlike general chat assistants, NotebookLM is <strong>completely grounded</strong> in the specific files you upload.</p>
                <ul>
                    <li><strong>How it Works:</strong> You create a "Notebook" and upload source documents (PDFs, word files, Google Docs, Slides, or pasted text). Any query you run is answered <em>only</em> using the information in those uploaded files.</li>
                    <li><strong>Key Advantage - Citations:</strong> Every response includes clickable, numbered citations linking directly back to the exact passage in your source documents. This virtually eliminates hallucinations!</li>
                    <li><strong>Best For:</strong> Analyzing internal procedures, auditing third-party contracts, summarizing lengthy training manuals, and synthesizing information across multiple separate policy documents.</li>
                </ul>

                <div class="alert-box alert-important">
                    <div class="alert-icon">🛡️</div>
                    <div class="alert-text">
                        <strong>Our Data Protection Guarantees (Under Corporate Enterprise License)</strong><br>
                        1. <strong>No Model Training:</strong> Your prompts, queries, and uploaded documents are <strong>never</strong> used by Google to train its public AI models. Our proprietary bank knowledge remains ours alone.<br>
                        2. <strong>No Human Review:</strong> No human at Google has access to, or can read, your conversations or uploaded files.<br>
                        3. <strong>Strict Data Isolation:</strong> Your interactions stay fully isolated within the UniCredit secure domain. Other Google customers cannot access or benefit from your data.<br>
                        4. <strong>Contractual Compliance:</strong> Our toolkit is covered by Google's Cloud Data Processing Addendum (CDPA) and complies fully with GDPR privacy standards.
                    </div>
                </div>

                <div class="alert-box alert-caution">
                    <div class="alert-icon">⚠️</div>
                    <div class="alert-text">
                        <strong>The Danger of Personal Accounts</strong><br>
                        These enterprise protections <strong>DO NOT APPLY</strong> if you use a personal Google account (@gmail.com) or free public AI services (e.g., public ChatGPT, Claude, or Copilot). Inputs on personal accounts are subject to human review and are actively used to train public models. <strong>Never</strong> upload UniCredit data to personal or public AI tools!
                    </div>
                </div>
            `
        },
        {
            id: 'chapter-4',
            num: 4,
            title: 'AI Governance & The EU AI Act',
            content: `
                <p>To promote a "human-centric" approach, the European Union has enacted the <strong>EU Artificial Intelligence Act (Regulation No. 2024/1689)</strong>. UniCredit is fully aligned with this legislation, adopting its risk-based framework in our internal regulations.</p>
                
                <h3>The Risk-Based Hierarchy</h3>
                <p>The AI Act classifies AI systems into four tiers based on their potential risk to individual rights and safety:</p>
                <ul>
                    <li><strong>PROHIBITED (Unacceptable Risk):</strong> Manipulative, subliminal systems, emotion recognition in workplace, or social scoring. <strong>Strictly Banned.</strong></li>
                    <li><strong>HIGH-RISK:</strong> Credit scoring evaluation, recruitment resume filtering, and money laundering profiling. <strong>Rigorous controls + ExCom approval.</strong></li>
                    <li><strong>LIMITED RISK:</strong> Generative conversational tools, chatbots. <strong>Transparency requirements only (inform users they talk to AI).</strong></li>
                    <li><strong>MINIMAL RISK:</strong> Spam filters, gaming algorithms. <strong>Unregulated.</strong></li>
                </ul>

                <h3>Prohibited AI Systems (Strictly Banned)</h3>
                <p>These systems present a severe threat to human rights and are strictly banned from UniCredit. We will never develop, purchase, or implement:</p>
                <ul>
                    <li>Subliminal or manipulative techniques designed to distort behavior.</li>
                    <li>Biometric categorization systems that infer ethnicity, religion, or sexual orientation.</li>
                    <li><strong>Emotion recognition systems used in the workplace</strong> (except for strict medical or safety reasons).</li>
                    <li>Untargeted scraping of facial images from CCTV or the internet to expand databases.</li>
                    <li>Social scoring systems.</li>
                </ul>

                <h3>High-Risk AI Systems</h3>
                <p>These are critical systems that can be used <em>only</em> under rigorous governance. In banking, High-Risk systems include:</p>
                <ul>
                    <li><strong>Creditworthiness Evaluations:</strong> Systems used to assess an individual's creditworthiness or financial risk.</li>
                    <li><strong>Employment & Recruitment:</strong> Systems used to publish targeted job ads, filter job applications, or assess candidates.</li>
                    <li><strong>AML Profiling:</strong> Systems used to identify, investigate, or profile individuals for money laundering.</li>
                    <li><strong>Governance Requirements:</strong> Must have a dedicated risk management system, high data governance, comprehensive technical logs, human oversight mechanisms, and must undergo a <strong>Fundamental Rights Impact Assessment (FRIA)</strong>. They require a CISO opinion and formal <strong>Executive Committee (ExCom)</strong> approval.</li>
                </ul>
            `
        },
        {
            id: 'chapter-5',
            num: 5,
            title: 'Our Internal AI Lifecycle & Governance Process',
            content: `
                <p>Before any AI tool is developed, purchased from a vendor, or deployed into production, it must follow the mandatory <strong>UniCredit AI Process v1.0</strong>:</p>
                
                <div class="static-svg-diagram">
                    <svg viewBox="0 0 600 320" width="100%" height="100%" style="background:#0e1017; border-radius:8px; padding:16px;">
                        <!-- Columns for Roles -->
                        <text x="60" y="20" fill="#cc0000" font-size="10" font-weight="700" text-anchor="middle">ICT ASSET OWNER</text>
                        <text x="220" y="20" fill="#949ab2" font-size="10" font-weight="700" text-anchor="middle">IT RISK TEAM</text>
                        <text x="380" y="20" fill="#949ab2" font-size="10" font-weight="700" text-anchor="middle">CISO OFFICE</text>
                        <text x="540" y="20" fill="#cc0000" font-size="10" font-weight="700" text-anchor="middle">EXECUTIVE COMM</text>
                        
                        <!-- Partition Lines -->
                        <line x1="140" y1="10" x2="140" y2="300" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
                        <line x1="300" y1="10" x2="300" y2="300" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
                        <line x1="460" y1="10" x2="460" y2="300" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
                        
                        <!-- Flow Step 1 -->
                        <rect x="10" y="45" width="100" height="30" rx="3" fill="#1c1e2a" stroke="#626880" stroke-width="1"/>
                        <text x="60" y="63" fill="#ffffff" font-size="8" font-weight="600" text-anchor="middle">1. Concept Idea</text>
                        <path d="M110 60 L160 60" stroke="#cc0000" stroke-width="1" fill="none" marker-end="url(#arrow)"/>
                        
                        <!-- Flow Step 2 -->
                        <rect x="170" y="45" width="100" height="30" rx="3" fill="#1c1e2a" stroke="#cc0000" stroke-width="1"/>
                        <text x="220" y="63" fill="#ffffff" font-size="8" font-weight="600" text-anchor="middle">2. Classification</text>
                        
                        <path d="M220 75 L220 110 M220 110 L110 110" stroke="#626880" stroke-width="1" fill="none"/>
                        
                        <!-- Flow Step 3 -->
                        <rect x="10" y="125" width="100" height="30" rx="3" fill="#1c1e2a" stroke="#626880" stroke-width="1"/>
                        <text x="60" y="143" fill="#ffffff" font-size="8" font-weight="600" text-anchor="middle">3. CMDB Registration</text>
                        
                        <path d="M60 155 L60 200 M60 200 L170 200" stroke="#cc0000" stroke-width="1" fill="none"/>
                        
                        <!-- Flow Step 4 -->
                        <rect x="170" y="185" width="100" height="30" rx="3" fill="#1c1e2a" stroke="#626880" stroke-width="1"/>
                        <text x="220" y="203" fill="#ffffff" font-size="8" font-weight="600" text-anchor="middle">4. Risk & DPIA Audit</text>
                        
                        <path d="M270 200 L330 200" stroke="#cc0000" stroke-width="1" fill="none"/>
                        
                        <!-- Flow Step 5 -->
                        <rect x="330" y="185" width="100" height="30" rx="3" fill="#1c1e2a" stroke="#cc0000" stroke-width="1"/>
                        <text x="380" y="203" fill="#ffffff" font-size="8" font-weight="600" text-anchor="middle">5. CISO Opinion</text>
                        
                        <path d="M430 200 L490 200" stroke="#cc0000" stroke-width="1" fill="none"/>
                        
                        <!-- Flow Step 6 -->
                        <rect x="490" y="185" width="100" height="30" rx="3" fill="#1c1e2a" stroke="#626880" stroke-width="1"/>
                        <text x="540" y="203" fill="#ffffff" font-size="8" font-weight="600" text-anchor="middle">6. ExCom Approval</text>
                        
                        <!-- Flow Step 7 -->
                        <path d="M540 215 L540 270 L60 270 L60 250" stroke="#626880" stroke-width="1" fill="none"/>
                        <rect x="10" y="220" width="100" height="30" rx="3" fill="#0f291b" stroke="#00c853" stroke-width="1"/>
                        <text x="60" y="238" fill="#ffffff" font-size="8" font-weight="600" text-anchor="middle">Monitoring / Audit</text>
                    </svg>
                </div>

                <h3>The Six Mandatory Phases</h3>
                <ol>
                    <li><strong>Qualification:</strong> The ICT Asset Owner reports the proposed tool to IT. Together with the IT Risk Team, they complete the <em>UniCredit AI Risk Classification Questionnaire</em> to determine if the software legally qualifies as an "AI System."</li>
                    <li><strong>Classification:</strong> If it is AI, it is classified as Prohibited, High-Risk, Limited, or Minimal risk.</li>
                    <li><strong>CMDB Registration:</strong> The asset is logged in the UniCredit Configuration Management Database (CMDB) and explicitly tagged as an "AI System." A Business Impact Analysis (BIA) rating is assigned.</li>
                    <li><strong>Risk Assessment & DPIA:</strong> A detailed risk assessment is conducted covering Regulatory, ICT Security, Ethics, and Model risks. If the system processes personal data, a formal <strong>Data Protection Impact Assessment (DPIA)</strong> is conducted under GDPR.</li>
                    <li><strong>Approvals:</strong>
                        <ul>
                            <li><em>Limited Risk Systems:</em> Require CIO / Head of IT approval.</li>
                            <li><em>High-Risk Systems:</em> Require a technical binding opinion from the CISO Office, review by the CIO, and final approval by the <strong>Executive Committee (ExCom)</strong>.</li>
                        </ul>
                    </li>
                    <li><strong>Monitoring & Recertification:</strong> Deployed AI systems are continuously monitored for accuracy, bias, and model drift. The risk profile and due diligence are reviewed and recertified <strong>annually</strong>.</li>
                </ol>
            `
        },
        {
            id: 'chapter-6',
            num: 6,
            title: 'Golden Rules for Everyday AI Usage (DOs & DON\'Ts)',
            content: `
                <p>To ensure that we remain secure, compliant, and highly productive, follow this daily checklist:</p>
                
                <div class="alert-box alert-tip">
                    <div class="alert-icon">✓</div>
                    <div class="alert-text">
                        <strong>DO — Play it Safe & Smart</strong><br>
                        <ul>
                            <li><strong>DO use our secure corporate tools:</strong> Use Gemini and NotebookLM while logged into your official UniCredit account. They are safe, secure, and licensed.</li>
                            <li><strong>DO verify all outputs:</strong> LLMs generate text based on statistical probabilities, not validated facts. <strong>Always</strong> double-check numbers, citations, legacy code, and generated content before utilizing them or sending them to a colleague or client. You remain fully responsible for the output.</li>
                            <li><strong>DO anonymize/generalize inputs:</strong> When uploading text or writing prompts, remove specific customer names, account numbers, and extremely confidential trade secrets. Use placeholder values (e.g., "Client A", "Company X") to protect privacy.</li>
                            <li><strong>DO maintain human oversight:</strong> Ensure a human is always in the loop. AI should support your judgment, never replace it.</li>
                            <li><strong>DO complete mandatory AI training:</strong> Build your AI literacy as mandated by Article 4 of the AI Act. Stay informed about the latest regulations.</li>
                        </ul>
                    </div>
                </div>

                <div class="alert-box alert-warning">
                    <div class="alert-icon">✗</div>
                    <div class="alert-text">
                        <strong>DON'T — Actions that Pose Severe Risk</strong><br>
                        <ul>
                            <li><strong>DON'T use personal accounts or public tools:</strong> Never log into Gemini via a personal @gmail.com account, and never use public, unlicensed tools (e.g., public ChatGPT, midjourney, etc.) for bank business.</li>
                            <li><strong>DON'T upload customer personal data:</strong> Never input sensitive personal identifiable information (PII) protected by GDPR into AI tools, unless the system has undergone a formal DPIA and is registered in the CMDB as an approved system for that purpose.</li>
                            <li><strong>DON'T deploy unauthorized AI systems:</strong> Never connect an external AI API, deploy an open-source model locally, or build a custom chatbot without completing the mandatory IT Qualification and CMDB registration.</li>
                            <li><strong>DON'T engage in prohibited AI practices:</strong> Never attempt to utilize or build systems involving workplace emotion recognition, social scoring, or biometric categorization.</li>
                            <li><strong>DON'T create misleading content:</strong> Never use AI to generate synthetic content that could deceive clients or colleagues. Any AI-driven interactive interface must clearly declare its AI nature.</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: 'chapter-7',
            num: 7,
            title: 'The Enterprise Adoption Program',
            content: `
                <p>Have you created a powerful prompt in Gemini that saves your team 10 hours a week? Have you structured a Notebook in NotebookLM that perfectly synthesizes a complex lending policy, and do you think other branches or departments could benefit from it?</p>
                <p>We do not want your innovations to stay isolated! At UniCredit, we believe in <strong>Scaling bottom-up innovation to the enterprise level</strong>.</p>
                
                <h3>How to Scale Your AI Idea</h3>
                <p>If you have designed a prompt, workflow, or notebook structure that you believe should be adopted by the entire organization, follow our simple <strong>Enterprise Adoption Program</strong>:</p>
                
                <blockquote>
                    [Your Innovation] ──( Email: ai@unicredit.pl )──> [AI Governance Review] ──> [Compliance & DPIA Safeguards] ──> [Enterprise-Wide Deployment]
                </blockquote>

                <ol>
                    <li><strong>Submit Your Solution:</strong> Write an email to <strong>ai@unicredit.pl</strong> with a clear description of your tool, prompt, or notebook, explaining the business problem it solves and its benefits. (You can also use the form in the "Scale Idea" tab right here in this portal!)</li>
                    <li><strong>Collaborative Analysis:</strong> The AI Governance and Analytics Factory team will partner with you to review your solution, assess its feasibility, and measure its business value.</li>
                    <li><strong>Governance Handling:</strong> Our team will handle the complex compliance overhead! We will run the qualification check, coordinate the risk assessments, align with Compliance for GDPR requirements, and ensure conformity with the EU AI Act.</li>
                    <li><strong>Enterprise Launch:</strong> Once approved, we will adapt your system to the enterprise level—packaging it as a standard, secured corporate template, notebook, or application accessible to all employees, with you recognized as the institutional creator!</li>
                </ol>
            `
        },
        {
            id: 'chapter-8',
            num: 8,
            title: 'Support & Contacts',
            content: `
                <p>If you need advice, want to report an issue, or would like to submit an innovation, reach out to the appropriate team:</p>
                
                <ul>
                    <li><strong>AI Innovations, Scaling & Adoption:</strong><br>
                        📩 Email: <strong>ai@unicredit.pl</strong><br>
                        <em>Contact for: Submitting custom prompts, workflows, and tools for enterprise-level scaling.</em>
                    </li>
                    <li class="mt-4"><strong>CISO Office (AI Policy, Security, Cyber Risk & Whistleblowing):</strong><br>
                        📩 Email: <strong>cisooffice@unicredit.pl</strong><br>
                        <em>Contact for: Questions on the AI Policy, reporting potential security incidents or policy violations, and checking risk compliance.</em>
                    </li>
                    <li class="mt-4"><strong>IT Governance (AI Process, Qualification & CMDB):</strong><br>
                        📩 Email: <strong>itgovernance@unicredit.be</strong><br>
                        <em>Contact for: Qualifications of new ICT assets, CMDB registration queries, and technical asset lifecycle management.</em>
                    </li>
                </ul>

                <div class="alert-box alert-caution mt-4">
                    <div class="alert-icon">⚖️</div>
                    <div class="alert-text">
                        <strong>Whistleblowing Notice</strong><br>
                        If you identify any AI misuse or behaviors that violate our Code of Conduct, Integrity Policy, or the EU AI Act, you are protected and encouraged to report it immediately. Please refer to our official <strong>Whistleblowing Policy</strong> to file a secure and confidential report to cisooffice@unicredit.pl.
                    </div>
                </div>
            `
        }
    ];

    const COMPLIANCE_QUESTIONS = [
        {
            scenario: "“I am logged into my corporate UniCredit Google Workspace account. I want to upload a 40-page public draft of the EU AI Act to NotebookLM to summarize the key differences. Is this allowed?”",
            options: ["YES, this is allowed", "NO, this is a violation"],
            correctIndex: 0,
            explanation: "Correct! This is a perfect, compliant use of NotebookLM. Because you are logged into your corporate account, Google's safety shield ensures your files are isolated. Furthermore, the draft of the EU AI Act is a public document, posing zero confidentiality risk."
        },
        {
            scenario: "“I am working from home on my personal computer. I sign in to a personal ChatGPT account and paste a list of active UniCredit customer names and account balances to help me draft an outreach email. Is this allowed?”",
            options: ["YES, this is allowed", "NO, this is a violation"],
            correctIndex: 1,
            explanation: "Correct! Pasting customer PII (Personal Identifiable Information) into personal/unlicensed AI tools is a severe security and GDPR violation. Under public licenses, inputs are logged and used to train future public models, leaking the bank's customer secrets."
        },
        {
            scenario: "“I used Gemini to generate a Python script to automate a data-cleaning task. The script looks highly technical but correct. I should immediately deploy it to our live customer production database without manual review.”",
            options: ["YES, this is allowed", "NO, this is a violation"],
            correctIndex: 1,
            explanation: "Correct! Deploying unreviewed AI-generated code directly to production violates our Technical Safety and Human Oversight guidelines. AI-generated code is based on probabilities and can contain bugs or vulnerabilities. Always audit, test, and deploy first in staging."
        },
        {
            scenario: "“A third-party vendor pitches a system that analyzes employee CCTV feeds in real-time using biometric emotion recognition to monitor fatigue and stress levels. Our branch manager wants to install it. Is this allowed?”",
            options: ["YES, this is allowed", "NO, this is prohibited"],
            correctIndex: 1,
            explanation: "Correct! Under the EU AI Act (and strictly enforced in UniCredit AI Policy v1.1), utilizing biometric emotion recognition systems in the workplace is strictly PROHIBITED and legally banned. UniCredit will never deploy biometric profiling of employees."
        },
        {
            scenario: "“I spent several hours optimizing a custom prompt block in Gemini which structures credit audits, and it saves my team 10 hours a week. I would like to make this an official bank tool. Should I email ai@unicredit.pl?”",
            options: ["YES, this is the approved path", "NO, I should keep it local"],
            correctIndex: 0,
            explanation: "Correct! Sylwia Szuba's AI Governance team actively sponsors the Enterprise Adoption Program. When you submit custom prompts or Notebook layouts to ai@unicredit.pl, our team handles all compliance checks, DPIAs, and scales it bank-wide, recognizing you as the creator!"
        }
    ];

    const SIMULATOR_SCENARIOS = {
        gemini: [
            {
                title: "Draft Email",
                prompt: "Draft a brief welcoming email to a new corporate banking partner, explaining our digital secure services.",
                response: `<p>Subject: Welcome to UniCredit Corporate Secure Services</p>
                           <p>Dear Partner,</p>
                           <p>It is my pleasure to welcome you to UniCredit Group. We are committed to empowering your enterprise with our secure digital banking suite. Our platforms operate under strict European security tenants ensuring total privacy.</p>
                           <p>We look forward to collaborating.</p>
                           <p>Best regards,<br>[Your Name]<br>UniCredit Corporate Division</p>`
            },
            {
                title: "Optimise Query",
                prompt: "Optimize this SQL query to filter active loan balances over 50,000 PLN: SELECT * FROM loans WHERE bal > 50000",
                response: `<p>To optimize data extraction and adhere to standard indexing, filter strictly by active status and balance thresholds:</p>
                           <code>SELECT customer_id, loan_id, current_balance <br>FROM corporate_loans WITH (INDEX(idx_loan_status_bal)) <br>WHERE loan_status = 'ACTIVE' AND current_balance > 50000;</code>
                           <p>Note: Always run queries on staging replica tables first to avoid performance locks on the live production cluster.</p>`
            },
            {
                title: "Confidential Input [ALERT]",
                prompt: "Audit this client spreadsheet row: Name: Jan Kowalski, Account: PL911240101, Balance: 1,420,500 PLN.",
                response: `<blockquote style="border-left-color: var(--color-danger); background: var(--color-danger-bg); padding:10px; border-radius:4px; font-style:normal; margin-bottom:12px;">
                                <strong style="color:var(--color-danger); display:flex; align-items:center; gap:6px;">
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                    ENTERPRISE SHIELD INTERCEPTED DATA
                                </strong>
                                <span style="font-size:11px; display:block; margin-top:4px; color:var(--text-primary);">
                                    You pasted active customer PII (Names & Account Numbers) protected by GDPR. 
                                    Our enterprise licensing has safely isolated this thread from public models, but you must generalize inputs!
                                </span>
                           </blockquote>
                           <p><strong>Redacted Prompt Proceeded (Safe Mode):</strong> Audit client row: Name: <code>[Client A]</code>, Account: <code>[Redacted ID]</code>, Balance: 1,420,500 PLN.</p>
                           <p><strong>Analysis Response:</strong><br>
                           Based on UniCredit's retail lending policy, a balance exceeding 1M PLN qualifies the profile for Private Banking tier services. Recommend flagging <code>[Client A]</code> for advisory onboarding, ensuring no physical documents leave our secure perimeter.</p>`
            }
        ],
        notebook: [
            {
                title: "Workplace Emotion Rules?",
                prompt: "What are the rules regarding workplace emotion recognition in UniCredit?",
                response: `<p>According to the <strong>UniCredit AI Policy v1.1</strong>, emotion recognition systems used in the workplace are strictly <strong>PROHIBITED</strong> and classified as an unacceptable risk level <span class="citation-mark" data-source="policy" data-line="chapter4">1</span>.</p>
                           <p>UniCredit prohibits the development, purchase, or deployment of any AI systems that attempt to infer or track employee emotions, stress, or attention levels during daily work, with zero exceptions <span class="citation-mark" data-source="policy" data-line="chapter4">2</span>.</p>`,
                highlightLine: "emotion recognition systems used in the workplace (except for strict medical or safety reasons) are strictly banned."
            },
            {
                title: "High-Risk Approvals?",
                prompt: "What is the approval path for deploying a High-Risk AI tool like credit scoring?",
                response: `<p>Deploying a High-Risk AI System (e.g., Creditworthiness Scoring, CV recruitment screening, AML profiling) requires adhering to the formal <strong>AI Process v1.0</strong> pipeline <span class="citation-mark" data-source="process" data-line="chapter5">1</span>.</p>
                           <p>Specifically, the ICT Asset Owner must obtain: <br>
                           1. A formal, technical binding opinion from the **CISO Office** <span class="citation-mark" data-source="process" data-line="chapter5">2</span>. <br>
                           2. Detailed Risk & GDPR Data Protection Impact Assessments (DPIA) <span class="citation-mark" data-source="process" data-line="chapter5">3</span>. <br>
                           3. Final executive sign-off and approval from the bank's **Executive Committee (ExCom)** <span class="citation-mark" data-source="process" data-line="chapter5">4</span>.</p>`,
                highlightLine: "High-Risk Systems: Require a technical binding opinion from the CISO Office, review by the CIO, and final approval by the Executive Committee (ExCom)."
            }
        ]
    };


    // ==========================================================================
    // TAB NAVIGATION CONTROLLER
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
            
            // Trigger specific page initiations
            if (targetTab === 'simulator') {
                initPlayground();
            } else if (targetTab === 'adoption') {
                initCanvasAnimation();
            }
        });
    });


    // ==========================================================================
    // THEME TOGGLER (DARK / LIGHT)
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
    // PRESENTATION SLIDES CONTROLLER
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
    const AUTOPLAY_DELAY = 10000; // 10 seconds

    // Populate Agenda Sidebar list
    function buildSlideIndex() {
        slideIndexList.innerHTML = '';
        slides.forEach((slide, idx) => {
            const title = slide.getAttribute('data-title') || `Slide ${idx + 1}`;
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

        // Update list active states
        const items = slideIndexList.querySelectorAll('.slide-list-item');
        items.forEach((item, idx) => {
            if (idx === currentSlideIndex) {
                item.classList.add('active');
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                item.classList.remove('active');
            }
        });

        // Tracker Labels
        slideTrackerLabel.textContent = `Slide ${currentSlideIndex + 1} of ${slides.length}`;
        
        // Progress Fill
        const percentage = ((currentSlideIndex + 1) / slides.length) * 100;
        slideProgressFill.style.width = `${percentage}%`;

        // Update Presenter Notes
        const activeSlide = slides[currentSlideIndex];
        const notes = activeSlide.getAttribute('data-notes') || "No speaking notes logged for this slide layout.";
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

    // Keyboard support
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

    // Notes panel toggle
    notesToggleBtn.addEventListener('click', () => {
        const isHidden = presenterNotesPanel.style.display === 'none' || presenterNotesPanel.style.display === '';
        presenterNotesPanel.style.display = isHidden ? 'flex' : 'none';
        notesToggleBtn.classList.toggle('active');
    });

    // Auto slideshow player
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

    // Fullscreen Slide View
    fsBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            slideViewport.requestFullscreen().catch(err => {
                console.error(`Error going fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });

    buildSlideIndex();
    updateSlideUI();


    // ==========================================================================
    // INTERACTIVE PRESENTATION SLIDE COMPONENT BEHAVIORS
    // ==========================================================================
    
    // Slide 13: Risk Pyramid Interactivity
    const pyramidTiers = document.querySelectorAll('.pyramid-tier');
    const tierDisplayTitle = document.getElementById('tier-detail-title');
    const tierBadgeType = document.getElementById('tier-badge-type');
    const tierDetailDesc = document.getElementById('tier-detail-desc');
    const tierExamplesList = document.getElementById('tier-examples-list');

    const PYRAMID_DATA = {
        prohibited: {
            badge: "PROHIBITED",
            badgeClass: "prohibited-badge",
            title: "Unacceptable Risk (Strictly Banned)",
            desc: "These systems present a severe threat to human rights and safety and are prohibited under Article 5 of the EU AI Act. UniCredit strictly bans their development or deployment within any corporate operation, with zero exceptions.",
            examples: [
                "<strong>Workplace Emotion recognition:</strong> AI tools analyzing facial, stress, or attention cues of remote bank employees.",
                "<strong>Social Scoring:</strong> Segmenting or ranking citizens based on credit traits merged with social behaviors.",
                "<strong>Scraping face databases:</strong> Mass untargeted harvesting of biometric images from web servers or CCTV files."
            ]
        },
        highrisk: {
            badge: "HIGH-RISK",
            badgeClass: "highrisk-badge",
            title: "Strict Compliance Control Systems",
            desc: "Systems influencing major life assessments or essential infrastructure. Regulated tightly under Title III of the Act. Can only be deployed after completing extensive Fundamental Rights Impact Assessments (FRIA) and getting ExCom sign-off.",
            examples: [
                "<strong>Credit scoring:</strong> Core algorithms scoring corporate and retail client reliability for loans.",
                "<strong>HR CV Screening:</strong> Automated parsing systems selecting or rejecting candidate applications.",
                "<strong>AML transaction checks:</strong> Behavioral profiling tools used to investigate systemic financial crimes."
            ]
        },
        limited: {
            badge: "LIMITED RISK",
            badgeClass: "limited-badge",
            title: "Transparency Focused Systems",
            desc: "General purpose generative models, chatbots, or deep-fakes. Subject to basic light transparency rules under Title IV. Users must know they interact with AI, and outputs must be declared.",
            examples: [
                "<strong>Retail Chatbots:</strong> Conversational client assistants guiding card status queries.",
                "<strong>Generative assistants:</strong> Secure corporate Google Gemini and NotebookLM systems used by team members.",
                "<strong>Synthetic translation:</strong> Automatic document generators processing policy packages."
            ]
        },
        minimal: {
            badge: "MINIMAL RISK",
            badgeClass: "minimal-badge",
            title: "Unregulated Safety Tier",
            desc: "The majority of software applications operating with minor automated logic. Unregulated by the AI Act, posing zero threat to rights.",
            examples: [
                "<strong>Spam email filters:</strong> Email classifiers tagging potential phishing threads.",
                "<strong>Gaming physics:</strong> Simulation engines used in client onboarding gamified apps.",
                "<strong>VBA basic macros:</strong> Local logic sheets sorting records with cell commands."
            ]
        }
    };

    pyramidTiers.forEach(tier => {
        tier.addEventListener('click', () => {
            pyramidTiers.forEach(t => t.classList.remove('active-tier'));
            tier.classList.add('active-tier');
            
            const tierKey = tier.getAttribute('data-tier');
            const data = PYRAMID_DATA[tierKey];

            // Update display card with animation
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

    // Slide 19: Enterprise Adoption Pipeline Interactivity
    const pipelineSteps = document.querySelectorAll('.pipeline-step');
    const pipelineFill = document.getElementById('pipeline-progress-fill');
    const pipelineInfoDisplay = document.getElementById('pipeline-info-display');

    const PIPELINE_INFO = {
        '1': {
            title: "Phase 1: Spark (Local Innovation)",
            desc: "It starts with your daily productivity. You write an elegant prompt block, design a secure spreadsheet macro, or curate a structured NotebookLM source library that optimizes hours of manual work."
        },
        '2': {
            title: "Phase 2: Share (ai@unicredit.pl)",
            desc: "Don't keep the success isolated! Submit your workflows to <strong>ai@unicredit.pl</strong>. Within 3 business days, our AI Governance team schedules a collaborative 15-minute sync to evaluate its organizational potential."
        },
        '3': {
            title: "Phase 3: Align (IT, Legal & Security Review)",
            desc: "Our core governance office handles the heavy lifting! We register the tool in the IT Asset CMDB, perform mandatory Risk assessments, run Data Protection Impact Assessments (DPIA) under GDPR, and secure formal compliance."
        },
        '4': {
            title: "Phase 4: Scale (Enterprise Launch)",
            desc: "Once verified, we scale your prompt library or grounded workbook to the bank's secure corporate portal, deploying it as a registered bank-level template. You are recognized across the perimeter as the institutional creator!"
        }
    };

    pipelineSteps.forEach(step => {
        step.addEventListener('click', () => {
            pipelineSteps.forEach(s => s.classList.remove('active'));
            step.classList.add('active');
            
            const stepNum = step.getAttribute('data-step');
            const data = PIPELINE_INFO[stepNum];

            // Progress Fill calculations
            const widthMap = { '1': '12%', '2': '38%', '3': '62%', '4': '100%' };
            pipelineFill.style.width = widthMap[stepNum];

            // Update Text Card
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
    // SEARCHABLE EMPLOYEE HANDBOOK BUILDER
    // ==========================================================================
    const handbookTOCList = document.getElementById('handbook-toc-list');
    const chaptersWrapper = document.getElementById('handbook-chapters-wrapper');
    const searchInput = document.getElementById('handbook-search');

    function buildHandbook() {
        handbookTOCList.innerHTML = '';
        chaptersWrapper.innerHTML = '';

        HANDBOOK_CHAPTERS.forEach((ch, idx) => {
            // Build Table of Contents
            const li = document.createElement('li');
            li.className = `toc-item ${idx === 0 ? 'active' : ''}`;
            li.textContent = `Ch ${ch.num}: ${ch.title}`;
            li.addEventListener('click', () => {
                const activeItem = handbookTOCList.querySelector('.toc-item.active');
                if (activeItem) activeItem.classList.remove('active');
                li.classList.add('active');
                
                const chapterEl = document.getElementById(ch.id);
                chapterEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            handbookTOCList.appendChild(li);

            // Build content blocks
            const article = document.createElement('article');
            article.className = 'handbook-chapter';
            article.id = ch.id;
            article.innerHTML = `
                <h3>Chapter ${ch.num}: ${ch.title}</h3>
                <div class="chapter-body">${ch.content}</div>
            `;
            chaptersWrapper.appendChild(article);
        });
    }

    // High-performance search and highlight filter
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        const chapters = chaptersWrapper.querySelectorAll('.handbook-chapter');

        chapters.forEach(chapter => {
            const chId = chapter.id;
            const data = HANDBOOK_CHAPTERS.find(c => c.id === chId);
            const bodyEl = chapter.querySelector('.chapter-body');

            if (!query) {
                // Restore defaults
                bodyEl.innerHTML = data.content;
                chapter.style.display = 'block';
                return;
            }

            const rawText = bodyEl.textContent.toLowerCase();
            if (rawText.includes(query)) {
                chapter.style.display = 'block';
                
                // Highlights occurrences dynamically
                const regex = new RegExp(`(${query})`, 'gi');
                let updatedContent = data.content;
                
                // Simple textual replacements avoiding HTML parsing errors
                updatedContent = updatedContent.replace(regex, '<mark style="background:#cc0000; color:#ffffff; padding:2px; border-radius:3px;">$1</mark>');
                bodyEl.innerHTML = updatedContent;
            } else {
                chapter.style.display = 'none';
            }
        });
    });

    buildHandbook();


    // ==========================================================================
    // COMPLIANCE CHALLENGE QUIZ GAME
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
    let employeeDept = "AI Governance Domain";

    quizRegForm.addEventListener('submit', (e) => {
        e.preventDefault();
        employeeName = studentNameInput.value.trim() || "UniCredit Employee";
        employeeDept = studentDeptInput.value.trim() || "UniCredit Bank";
        
        quizStartScreen.classList.add('hidden');
        quizPlayScreen.classList.remove('hidden');
        
        activeQuestionIdx = 0;
        quizScore = 0;
        loadQuizQuestion();
    });

    function loadQuizQuestion() {
        quizExplanationBox.classList.add('hidden');
        
        const qData = COMPLIANCE_QUESTIONS[activeQuestionIdx];
        
        // Update headers
        quizQCounter.textContent = `Scenario ${activeQuestionIdx + 1} of ${COMPLIANCE_QUESTIONS.length}`;
        const pct = ((activeQuestionIdx + 1) / COMPLIANCE_QUESTIONS.length) * 100;
        quizProgressFill.style.width = `${pct}%`;
        
        quizQuestionText.textContent = qData.scenario;
        
        // Build Option buttons
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
        
        // Disable choices
        buttons.forEach(b => b.disabled = true);
        
        const isCorrect = selectedIndex === qData.correctIndex;
        if (isCorrect) {
            quizScore++;
            selectedBtn.classList.add('correct-choice');
            expStatusIcon.textContent = "✓";
            expStatusIcon.style.background = "var(--color-success-bg)";
            expStatusIcon.style.color = "var(--color-success)";
            expStatusTitle.textContent = "CORRECT & COMPLIANT!";
            quizExplanationBox.className = "quiz-explanation-box correct-explanation";
        } else {
            selectedBtn.classList.add('wrong-choice');
            // Highlight the correct one
            buttons[qData.correctIndex].classList.add('correct-choice');
            
            expStatusIcon.textContent = "✗";
            expStatusIcon.style.background = "var(--color-danger-bg)";
            expStatusIcon.style.color = "var(--color-danger)";
            expStatusTitle.textContent = "COMPLIANCE BREACH!";
            quizExplanationBox.className = "quiz-explanation-box wrong-explanation";
        }
        
        expText.textContent = qData.explanation;
        quizExplanationBox.classList.remove('hidden');
    }

    quizNextBtn.addEventListener('click', () => {
        if (activeQuestionIdx === COMPLIANCE_QUESTIONS.length - 1) {
            // End quiz, show certificate
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
        certScoreLabel.textContent = `${quizScore} out of ${COMPLIANCE_QUESTIONS.length}`;
        
        // Format Current Date
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        certCompletionDate.textContent = today.toLocaleDateString('en-US', options);
    }

    printCertBtn.addEventListener('click', () => {
        window.print();
    });

    restartQuizBtn.addEventListener('click', () => {
        quizResultScreen.classList.add('hidden');
        quizStartScreen.classList.remove('hidden');
    });


    // ==========================================================================
    // SECURE AI PLAYGROUND SIMULATOR
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

    let activeTool = 'gemini'; // 'gemini' or 'notebook'

    // Source snippets dictionary for NotebookLM grounded viewer
    const DOCUMENT_SNIPPETS = {
        policy: `[UniCredit Group AI Policy v1.1 - SEC 4.1]\nEmotion recognition systems used in the workplace (except for strict medical or safety reasons) are strictly banned.\nAny software utilizing physical, biometric categorization or face scraping CCTV algorithms constitutes Prohibited AI and results in severe compliance audits.`,
        process: `[UniCredit AI Process v1.0 - SEC 2.3]\nHigh-Risk Systems: Require a technical binding opinion from the CISO Office, review by the CIO, and final approval by the Executive Committee (ExCom).\nAll High-Risk assets must be registered in the bank asset CMDB, complete DPIA reviews under GDPR, and execute annual recertifications.`
    };

    function initPlayground() {
        buildPlaygroundScenarios();
        
        // Show first source snippet by default
        sourceSnippetText.innerText = DOCUMENT_SNIPPETS.policy;
    }

    // Toggle active tool workspace (Gemini / NotebookLM)
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

    // Populate the sidebar scenarios buttons depending on active tool
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

    // Interactive Source switching
    sourceFileItems.forEach(item => {
        item.addEventListener('click', () => {
            sourceFileItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const docKey = item.getAttribute('data-source');
            sourceSnippetText.innerText = DOCUMENT_SNIPPETS[docKey];
        });
    });

    // GEMINI CHAT HANDLERS
    function sendGeminiMessage() {
        const query = geminiChatInput.value.trim();
        if (!query) return;

        // User Chat bubble
        appendChatBubble(geminiChatViewport, 'user-msg', '👤', `<p>${query}</p>`);
        geminiChatInput.value = '';

        // Play typing animation
        const typingId = appendChatBubble(geminiChatViewport, 'bot-msg', '♊', `<p><i>Gemini is formulating response...</i></p>`);
        geminiChatViewport.scrollTop = geminiChatViewport.scrollHeight;

        setTimeout(() => {
            // Check if user selected one of our templates
            const matchedTemplate = SIMULATOR_SCENARIOS.gemini.find(s => s.prompt.toLowerCase() === query.toLowerCase());
            let botHTML = '';
            
            if (matchedTemplate) {
                botHTML = matchedTemplate.response;
            } else {
                // Default safe check
                if (query.toLowerCase().includes('kowalski') || query.toLowerCase().includes('balance') || query.toLowerCase().includes('pl91')) {
                    // Triggers PII redact shield alert
                    botHTML = SIMULATOR_SCENARIOS.gemini[2].response;
                } else {
                    botHTML = `<p>I have processed your query secure inside UniCredit's secure workspace domain. Under our CDPA contract, your inputs remain fully isolated and won't train public AI models.</p>
                               <p>Here is your drafted outline to assist your day-to-day role. Apply human oversight and verify details.</p>`;
                }
            }

            // Replace typing bubble
            const typingBubble = document.getElementById(typingId);
            if (typingBubble) {
                typingBubble.querySelector('.msg-content').innerHTML = botHTML;
            }
            geminiChatViewport.scrollTop = geminiChatViewport.scrollHeight;
        }, 1500);
    }

    // NOTEBOOKLM CHAT HANDLERS
    function sendNotebookMessage() {
        const query = notebookChatInput.value.trim();
        if (!query) return;

        appendChatBubble(notebookChatViewport, 'user-msg', '👤', `<p>${query}</p>`);
        notebookChatInput.value = '';

        const typingId = appendChatBubble(notebookChatViewport, 'bot-msg', '📓', `<p><i>NotebookLM searching grounded sources...</i></p>`);
        notebookChatViewport.scrollTop = notebookChatViewport.scrollHeight;

        setTimeout(() => {
            const matchedTemplate = SIMULATOR_SCENARIOS.notebook.find(s => s.prompt.toLowerCase() === query.toLowerCase());
            let botHTML = '';
            
            if (matchedTemplate) {
                botHTML = matchedTemplate.response;
                
                // Highlight exact sentence in the preview block on the side!
                const sourceKey = matchedTemplate.prompt.toLowerCase().includes('emotion') ? 'policy' : 'process';
                const fileTab = document.querySelector(`.source-file-item[data-source="${sourceKey}"]`);
                if (fileTab) fileTab.click();
                
                // Replace highlight
                const highlightText = matchedTemplate.highlightLine;
                const snippetText = DOCUMENT_SNIPPETS[sourceKey];
                const parts = snippetText.split(highlightText);
                if (parts.length === 2) {
                    sourceSnippetText.innerHTML = `${parts[0]}<mark style="background:rgba(212,175,55,0.4); border-radius:3px; border-bottom:1.5px solid var(--color-gold); padding:2px; color:#ffffff;">${highlightText}</mark>${parts[1]}`;
                }
            } else {
                botHTML = `<p>Your query did not match any loaded policy structures inside the grounded files.</p>
                           <p>Because NotebookLM is <strong>strictly closed-loop</strong>, I can only provide answers based on information found inside <strong>AI_Policy_v1.1.pdf</strong> and <strong>AI_Process_v1.0.pdf</strong> to eliminate hallucinations.</p>`;
            }

            const typingBubble = document.getElementById(typingId);
            if (typingBubble) {
                typingBubble.querySelector('.msg-content').innerHTML = botHTML;
                
                // Add click listener on grounded citations marks!
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
    // EMAIL FLIGHT CANVAS PARTICLE ANIMATION & SUBMISSION QUEUE
    // ==========================================================================
    const canvas = document.getElementById('email-flight-canvas');
    const ctx = canvas.getContext('2d');
    const submissionForm = document.getElementById('adoption-submission-form');
    const localSubList = document.getElementById('local-submissions-list');

    let animationId = null;
    let particles = [];
    let state = 'idle'; // 'idle', 'flight', 'success'
    let textYOffset = 0;

    const MOCK_SUBMISSIONS = [
        {
            title: "Automated Lending Policy Audit Workbook",
            desc: " Curated NotebookLM file repository storing all unilateral loan terms to search for discrepancy rates.",
            weeklySaved: "Saves approx 8 hours a week per loan processor.",
            date: "June 10, 2026",
            status: "APPROVED & SCALED 🚀"
        },
        {
            title: "Database SQL Query Synthesizer Library",
            desc: "Structured prompt rules mapped for Gemini to translate raw Polish requests into index-optimized queries.",
            weeklySaved: "Saves approx 4 hours a week per risk analyst.",
            date: "June 14, 2026",
            status: "UNDER GOVERNANCE REVIEW"
        }
    ];

    function renderLocalQueue() {
        localSubList.innerHTML = '';
        MOCK_SUBMISSIONS.forEach(sub => {
            const div = document.createElement('div');
            div.className = 'submission-item';
            
            const isApproved = sub.status.includes('APPROVED');
            const statusClass = isApproved ? 'approved' : 'review';
            
            div.innerHTML = `
                <div class="sub-header-row">
                    <h4>${sub.title}</h4>
                    <span class="sub-status-badge ${statusClass}">${sub.status}</span>
                </div>
                <div class="sub-meta-row">
                    <span>Date: ${sub.date}</span>
                    <span>Benefit: ${sub.weeklySaved}</span>
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
        
        // Gradient background
        const grad = ctx.createLinearGradient(0,0,canvas.width, canvas.height);
        grad.addColorStop(0, '#0c0d12');
        grad.addColorStop(1, '#14161f');
        ctx.fillStyle = grad;
        ctx.fillRect(0,0,canvas.width, canvas.height);

        // draw basic central secure database node icon
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

        ctx.fillStyle = 'var(--text-secondary)';
        ctx.font = 'bold 11px Montserrat';
        ctx.textAlign = 'center';
        ctx.fillText('SUBMISSION PIPELINE TO AI@UNICREDIT.PL', canvas.width/2, canvas.height/2 + 5);
    }

    function runFlightAnimation(onComplete) {
        state = 'flight';
        particles = [];
        const startX = 40;
        const startY = canvas.height / 2;
        const endX = canvas.width - 80;
        const endY = canvas.height / 2;

        // Generate flying binary packet streams
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

        // Animated paper plane coords
        let planeX = startX;
        let planeY = startY;

        function animate() {
            if (state !== 'flight') return;
            ctx.clearRect(0,0,canvas.width, canvas.height);
            
            // Draw gradient background
            const grad = ctx.createLinearGradient(0,0,canvas.width, canvas.height);
            grad.addColorStop(0, '#0c0d12');
            grad.addColorStop(1, '#14161f');
            ctx.fillStyle = grad;
            ctx.fillRect(0,0,canvas.width, canvas.height);

            // Draw target envelope
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.strokeRect(40, 20, canvas.width - 80, canvas.height - 40);

            // Update flying particles
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

            // Update plane position
            planeX += 4.5;
            planeY = startY + Math.sin(planeX * 0.04) * 15;

            // Draw paper plane vector
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

            // Destination target logo draw
            ctx.fillStyle = 'var(--uc-red)';
            ctx.beginPath();
            ctx.arc(endX + 30, endY, 20, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 9px Montserrat';
            ctx.fillText('MAIL', endX + 30, endY + 3);

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
        ctx.fillText('SUBMISSION DISPATCHED SECURELY! ✓', canvas.width/2, canvas.height/2 - 5);
        
        ctx.fillStyle = 'var(--text-secondary)';
        ctx.font = '11px Inter';
        ctx.fillText('Check your local compliance dashboard queue below.', canvas.width/2, canvas.height/2 + 15);

        // Add to Mock submissions list
        onComplete();
        setTimeout(() => {
            initCanvasAnimation();
        }, 3000);
    }

    submissionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const subBtn = document.getElementById('submit-innovation-btn');
        subBtn.disabled = true;
        subBtn.innerText = "Transmitting to ai@unicredit.pl...";

        const ideaTitle = document.getElementById('sub-title').value;
        const ideaDesc = document.getElementById('sub-desc').value;
        const ideaBenefits = document.getElementById('sub-benefits').value;

        runFlightAnimation(() => {
            // Push submission inside local list
            const today = new Date();
            const dateStr = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            
            MOCK_SUBMISSIONS.unshift({
                title: ideaTitle,
                desc: ideaDesc,
                weeklySaved: ideaBenefits,
                date: dateStr,
                status: "UNDER GOVERNANCE REVIEW"
            });
            renderLocalQueue();
            
            // Clear form fields
            document.getElementById('sub-title').value = '';
            document.getElementById('sub-desc').value = '';
            document.getElementById('sub-benefits').value = '';
            
            subBtn.disabled = false;
            subBtn.innerText = "Submit Innovation to ai@unicredit.pl 🚀";
        });
    });

    renderLocalQueue();

});
