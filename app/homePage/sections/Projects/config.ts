import { Organization, Project, ProjectCategory, Skill } from "./types";

/**
 * Work experience content. This replaces the old CMS: add, edit, or reorder
 * entries here. Projects are sorted by startDate at render time, so array
 * order doesn't matter.
 */

// Organizations, listed in the order the filter buttons should appear
export const ORGANIZATIONS = {
    rula: { id: 'rula', name: 'Rula' },
    novelConcept: { id: 'novel-concept', name: 'Novel Concept Studio' },
    nxu: { id: 'nxu', name: 'Nxu Technologies' },
    publicis: { id: 'publicis', name: 'Publicis Sapient' },
} satisfies Record<string, Organization>

export const CATEGORIES = {
    frontEnd: { id: 'front-end', name: 'Front End', tagColor: '1d4ed8', tagFontColor: 'ffffff' },
    backEnd: { id: 'back-end', name: 'Back End', tagColor: 'b91c1c', tagFontColor: 'ffffff' },
    fullStack: { id: 'full-stack', name: 'Full Stack', tagColor: '15803d', tagFontColor: 'ffffff' },
    devEx: { id: 'devex', name: 'DevEx', tagColor: 'facc15', tagFontColor: '000000' },
} satisfies Record<string, ProjectCategory>

const skill = (id: string, name: string, tagColor: string, tagFontColor: string): Skill =>
    ({ id, name, tagColor, tagFontColor })

const SKILLS = {
    typescript: skill('typescript', 'TypeScript', '3178c6', 'ffffff'),
    react: skill('react', 'React', '61dafb', '000000'),
    reactNative: skill('react-native', 'React Native', '20232a', '61dafb'),
    nextjs: skill('nextjs', 'Next.js', '000000', 'ffffff'),
    tailwind: skill('tailwind', 'Tailwind', '38bdf8', '0f172a'),
    node: skill('node', 'Node.js', '3c873a', 'ffffff'),
    express: skill('express', 'Express', '444444', 'ffffff'),
    nestjs: skill('nestjs', 'NestJS', 'e0234e', 'ffffff'),
    postgres: skill('postgres', 'PostgreSQL', '336791', 'ffffff'),
    mongodb: skill('mongodb', 'MongoDB', '00684a', 'ffffff'),
    dynamodb: skill('dynamodb', 'DynamoDB', '4053d6', 'ffffff'),
    aws: skill('aws', 'AWS', '232f3e', 'ff9900'),
    awsLambda: skill('aws-lambda', 'AWS Lambda', 'ff9900', '000000'),
    awsIot: skill('aws-iot', 'AWS IoT Core', '232f3e', 'ff9900'),
    digitalOcean: skill('digitalocean', 'DigitalOcean', '0080ff', 'ffffff'),
    expo: skill('expo', 'Expo', '000020', 'ffffff'),
    stripe: skill('stripe', 'Stripe', '635bff', 'ffffff'),
    payload: skill('payload', 'Payload CMS', '000000', 'ffffff'),
    hubspot: skill('hubspot', 'HubSpot', 'ff7a59', 'ffffff'),
    builderio: skill('builderio', 'Builder.io', '18b4f4', '000000'),
    java: skill('java', 'Java', 'e76f00', 'ffffff'),
    springBoot: skill('spring-boot', 'Spring Boot', '6db33f', 'ffffff'),
    kafka: skill('kafka', 'Kafka', '231f20', 'ffffff'),
    junit: skill('junit', 'JUnit', '25a162', 'ffffff'),
    jest: skill('jest', 'Jest', '99425b', 'ffffff'),
    graphql: skill('graphql', 'GraphQL', 'e10098', 'ffffff'),
    appium: skill('appium', 'Appium', '662d91', 'ffffff'),
    flutter: skill('flutter', 'Flutter', '02569b', 'ffffff'),
    dart: skill('dart', 'Dart', '0175c2', 'ffffff'),
    launchdarkly: skill('launchdarkly', 'LaunchDarkly', '405bff', 'ffffff'),
    amplitude: skill('amplitude', 'Amplitude', '1e61f0', 'ffffff'),
    storybook: skill('storybook', 'Storybook', 'ff4785', 'ffffff'),
    reactHookForm: skill('react-hook-form', 'React Hook Form', 'ec5990', 'ffffff'),
    githubActions: skill('github-actions', 'GitHub Actions', '2088ff', 'ffffff'),
    aiDev: skill('ai-dev', 'AI-Assisted Development', '7c3aed', 'ffffff'),
    claudeCode: skill('claude-code', 'Claude Code', 'd97757', 'ffffff'),
    netlify: skill('netlify', 'Netlify', '32e6e2', '0e1e25'),
    playwright: skill('playwright', 'Playwright', '2ead33', 'ffffff'),
    posthog: skill('posthog', 'PostHog', 'f54e00', 'ffffff'),
    seo: skill('seo', 'SEO', '4285f4', 'ffffff'),
    accessibility: skill('accessibility', 'Accessibility', 'fde047', '1f2937'),
    technicalDesign: skill('technical-design', 'Technical Design', '27272a', 'facc15'),
}

export const PROJECTS: Project[] = [
    // ----- Rula -----
    {
        id: 'rula-appointment-confirmation',
        title: 'Appointment Confirmation',
        organization: ORGANIZATIONS.rula,
        projectCategory: CATEGORIES.fullStack,
        skills: [SKILLS.aiDev, SKILLS.technicalDesign, SKILLS.typescript, SKILLS.react, SKILLS.node, SKILLS.dynamodb, SKILLS.launchdarkly],
        startDate: '2026-07-01',
        description_html: `
            <p>Added a confirm-or-cancel step to Rula's appointment reminder emails and texts, so patients can tell us whether they're going 48 and 24 hours before a session. The goal was to cut no-shows among partner-referred patients. I was the sole developer and wrote the technical design myself, both firsts for me. AI tools were central to how I worked across planning, review, and implementation.</p>
            <p><strong>Design &amp; planning</strong></p>
            <ul>
                <li>Wrote the technical design document. I ran an architecture spike on where confirmation status should live and moved away from the lifecycle-messaging vendor to a webhook-based design that keeps Rula's own services as the source of truth</li>
                <li>Defended the choice of service in writing and answered a security review covering signed, expiring confirmation links, PHI minimization, authenticated route splitting, rate limiting, and webhook trust</li>
                <li>Used AI to produce a milestone-by-milestone timeline estimate, which my manager added to the initiative and used for leadership reporting</li>
                <li>Used AI to work through the security review's six concerns one by one. The security team accepted every response without asking for revisions</li>
            </ul>
            <p><strong>Implementation (three codebases, two of them new to me)</strong></p>
            <ul>
                <li>Used AI pair programming to ramp up on unfamiliar codebases in hours instead of days. I merged my first patient workflow service PR within 48 hours of opening the repo, and eight PRs across two new repos within two weeks</li>
                <li><em>Patient workflow service:</em> confirmation entity, store, service layer, and a public, rate-limited confirmation endpoint backed by DynamoDB</li>
                <li><em>Telehealth app:</em> a feature-flagged confirmation page with appointment details and pre-appointment tasks</li>
                <li><em>Shared component library:</em> a new wordmark component and brand color support</li>
            </ul>
            <p><strong>Launch &amp; follow-through</strong></p>
            <ul>
                <li>Rolled the LaunchDarkly experiment out to production, ramping from a small holdout to an even three-way split</li>
                <li>Resolved a production incident where the page created survey records on load instead of on click, which was skewing metrics</li>
                <li>Shipped the fast-follow milestones and a QA pass, then turned our retro into a cross-functional collaboration guide that the team now uses, and proposed packaging it as a Claude skill so it feeds directly into the team's AI-assisted workflows</li>
            </ul>
        `,
    },
    {
        id: 'rula-medicaid-partner-routing',
        title: 'Medicaid Partner Referral Routing',
        organization: ORGANIZATIONS.rula,
        projectCategory: CATEGORIES.fullStack,
        skills: [SKILLS.aiDev, SKILLS.typescript, SKILLS.react, SKILLS.nextjs, SKILLS.storybook],
        startDate: '2026-09-01',
        description_html: `
            <p>Some patients referred through Rula's Direct Booking Tool are Medicaid members who need to schedule with an outside partner instead of booking with Rula. This project detects those patients and routes them to clear next steps instead of dead-ending their booking.</p>
            <ul>
                <li>Added a new partner configuration field across the stack: the config parser schema, the partner service, and the partner configs themselves</li>
                <li>Built the external-referral instructions route, a partner registry, and a referral card component with Storybook coverage</li>
                <li>Added a neutral inline-notice variant to the design system and the redirect logic that sends Medicaid submissions to the partner instructions</li>
                <li>Worked with design to disable unsupported form options instead of hiding them, which matches existing patterns in the tool</li>
            </ul>
            <p>The registry-and-redirect pattern can be reused for future external scheduling partners.</p>
        `,
    },
    {
        id: 'rula-pcp-first-session-free',
        title: 'PCP Referrals: First Session Free',
        organization: ORGANIZATIONS.rula,
        projectCategory: CATEGORIES.fullStack,
        skills: [SKILLS.typescript, SKILLS.react, SKILLS.nextjs, SKILLS.launchdarkly, SKILLS.reactHookForm],
        startDate: '2026-05-01',
        endDate: '2026-06-30',
        description_html: `
            <p>A partnership program that lets primary care providers refer patients to Rula with a free first session. It extended the patient referral system I'd built earlier to a new B2B channel. It was the most complex cross-service integration I'd led at the time, spanning the booking app, the ops app, the marketing service, the partner service, and LaunchDarkly.</p>
            <ul>
                <li>Ran the discovery spike on the partner-service integration and was a named reviewer on the technical design</li>
                <li>Built an inline patient eligibility check that validates date of birth, coverage type, and participating state in real time</li>
                <li>Added the "One Session Free" promotion and eligibility messaging across the referral form, hold confirmation, and insurance steps, plus state-specific ineligibility rules</li>
                <li>Replaced a tedious manual step where staff pre-seeded referral codes. Codes are now created just in time when the form is submitted. I spotted this improvement and shipped it on my own</li>
                <li>Prevented returning patients from reusing codes, and redeemed codes at booking time in the agent-led flow</li>
                <li>Kept a testing workbook that caught eligibility bugs before launch</li>
            </ul>
            <p>Shipped more than 20 merged PRs across two repositories for this initiative.</p>
        `,
    },
    {
        id: 'rula-employer-portal',
        title: 'SMB Employer Portal',
        organization: ORGANIZATIONS.rula,
        projectCategory: CATEGORIES.frontEnd,
        skills: [SKILLS.typescript, SKILLS.react, SKILLS.accessibility, SKILLS.tailwind],
        startDate: '2026-02-01',
        endDate: '2026-04-30',
        description_html: `
            <p>A new B2B product that lets small and medium-sized businesses set up mental health benefit campaigns for their employees: upload a roster, configure a campaign, preview the emails, and track results. I was the primary frontend contributor and owned three of the seven major feature areas.</p>
            <ul>
                <li><strong>Roster upload:</strong> CSV parsing and validation, drag-and-drop upload, and a review step before import</li>
                <li><strong>Campaign creation wizard:</strong> routing, a progress tracker, the wizard shell, launch action, and success screen</li>
                <li><strong>Shared foundations:</strong> the context-based state management, the two-column campaign layout, and step components</li>
                <li>Wrote the architecture and ownership doc for the frontend and led end-to-end testing. My testing workbook became the source of truth for QA, UAT, and design review</li>
                <li>Added accessibility before any audit asked for it: focus trapping, skip navigation, per-route document titles, and semantic labels and lists</li>
                <li>Closed 15+ bug and polish tickets in a two-month push before launch (30+ merged PRs)</li>
            </ul>
        `,
    },
    {
        id: 'rula-partner-registration-bypass',
        title: 'Partner Registration Bypass',
        organization: ORGANIZATIONS.rula,
        projectCategory: CATEGORIES.frontEnd,
        skills: [SKILLS.typescript, SKILLS.nextjs, SKILLS.launchdarkly, SKILLS.technicalDesign],
        startDate: '2026-02-01',
        endDate: '2026-03-31',
        description_html: `
            <p>Patients coming from a large health-system partner were sent through a full Rula registration flow that re-collected information the partner had already provided. I co-wrote the technical design and extended our registration-bypass logic to cover both of the partner's entry points: fax referrals and the Direct Booking Tool.</p>
            <ul>
                <li>Refactored the core patient-routing function that decides who skips registration (+625/−339 lines, my largest PR that quarter) without changing behavior for any other partner</li>
                <li>Updated the post-booking experience and cleaned up the related feature flags and naming</li>
            </ul>
            <p>This removed friction from a major partnership and set the pattern now used to extend the bypass to other regions.</p>
        `,
    },
    {
        id: 'rula-checkout-modal',
        title: 'Booking Funnel Refresh: Checkout Modal',
        organization: ORGANIZATIONS.rula,
        projectCategory: CATEGORIES.frontEnd,
        skills: [SKILLS.typescript, SKILLS.react, SKILLS.nextjs, SKILLS.amplitude, SKILLS.reactHookForm],
        liveUrl: 'https://www.rula.com/',
        startDate: '2025-11-01',
        endDate: '2026-01-31',
        description_html: `
            <p>A major refresh of Rula's patient booking funnel. It replaced a multi-page checkout with a checkout modal on the provider profile, so patients book without leaving the provider they picked. I owned the checkout-form milestone and built the form and modal from scratch. It was my largest individual feature up to that point.</p>
            <ul>
                <li>Built the checkout form, booking-hold summary card, loader, and the modal itself, including the slide-in transition</li>
                <li>Hooked the modal into the provider profile page with error handling, redirect flows, and a path for duplicate accounts</li>
                <li>Added Amplitude and Freshpaint analytics so the team could measure the new funnel</li>
                <li>Did several rounds of mobile polish, including fixing layout jitter on the primary conversion surface</li>
            </ul>
            <p>Mine was the only testable component on the team before the holiday break. The modal is now the primary conversion surface for new patient bookings.</p>
        `,
    },
    {
        id: 'rula-referrals',
        title: 'Patient Referrals: Gift a Session',
        organization: ORGANIZATIONS.rula,
        projectCategory: CATEGORIES.fullStack,
        skills: [SKILLS.typescript, SKILLS.react, SKILLS.nextjs],
        startDate: '2025-10-01',
        endDate: '2025-11-30',
        description_html: `
            <p>Rula's patient referral program lets existing patients gift a session to friends and family. I built the redemption side of the program into the booking app.</p>
            <ul>
                <li>Created the booking app's client for the new marketing service API, the first integration with that service</li>
                <li>Added referral callouts to provider profiles and referral-code checks for returning patients</li>
                <li>Redeemed referral codes when a booking hold is placed</li>
                <li>Added Medicare and Medicaid ineligibility checks for providers</li>
            </ul>
            <p>Designing the client to be reusable paid off six months later, when the same client and redemption pattern powered the PCP First Session Free program.</p>
        `,
    },
    {
        id: 'rula-directory-in-person',
        title: 'Provider Directory: In-Person Therapy',
        organization: ORGANIZATIONS.rula,
        projectCategory: CATEGORIES.frontEnd,
        skills: [SKILLS.typescript, SKILLS.react, SKILLS.nextjs, SKILLS.amplitude],
        liveUrl: 'https://www.rula.com/',
        startDate: '2025-08-01',
        endDate: '2025-09-30',
        description_html: `
            <p>Extended Rula's public provider directory to support booking in-person therapy alongside virtual sessions. That meant updating search, results, profile pages, and the booking-hold flow. My work covered nearly the whole surface.</p>
            <ul>
                <li>Added in-person booking-hold support and merged two parallel confirmation components into one, removing duplication between the virtual and in-person paths</li>
                <li>Built a results-switching component, a mobile-only search modal, and "default" provider suggestions under name-search results</li>
                <li>Added an in-person location map and session info to provider profiles</li>
                <li>Handled edge cases with a provider/preference mismatch modal, a suspended-filters banner, and keeping the selected city when filters change</li>
                <li>Added analytics for provider-name search</li>
            </ul>
            <p>During the same period I upgraded the booking app from Next.js 14 to 15.</p>
        `,
    },
    {
        id: 'rula-cities-in-directory',
        title: 'Provider Directory: Cities & Addresses',
        organization: ORGANIZATIONS.rula,
        projectCategory: CATEGORIES.frontEnd,
        skills: [SKILLS.typescript, SKILLS.react, SKILLS.reactHookForm],
        startDate: '2025-06-01',
        endDate: '2025-08-31',
        description_html: `
            <p>An SEO-driven project to tie providers to the cities they practice in, especially those offering in-person therapy. I worked on the track that let providers view and update their own practice address in the provider portal.</p>
            <ul>
                <li>Built the "change your address" form and took over the address-change modal when a teammate went on leave. I delivered both without slipping the schedule</li>
                <li>I was the first person on the growth team to do significant work in the provider portal. I worked through a difficult local environment and test-account setup, then documented it for the engineers after me</li>
                <li>Explained to product the difference between form validation errors and backend geocoding errors, which kept a scope-expanding request out of the launch</li>
                <li>Raised a form revalidation pattern with the wider engineering team, which led to a suggestion to make it a frontend convention</li>
            </ul>
        `,
    },
    {
        id: 'rula-internal-tooling',
        title: 'Internal Docs & AI Tooling',
        organization: ORGANIZATIONS.rula,
        projectCategory: CATEGORIES.devEx,
        skills: [SKILLS.aiDev, SKILLS.claudeCode, SKILLS.typescript, SKILLS.githubActions, SKILLS.react],
        startDate: '2026-06-01',
        description_html: `
            <p>Side projects that make my team faster, mostly about keeping technical design docs easy to write, review, and find, and about making our docs work well with AI-assisted workflows. I built both tools with heavy AI assistance.</p>
            <ul>
                <li><strong>Design doc sync:</strong> a GitHub Actions pipeline that publishes design docs from a repository to Confluence on merge. It pulls metadata from frontmatter and keeps inline comment threads. AI tools let me iterate quickly on the Confluence API integration and the Markdown-to-Confluence conversion. The team now uses it to publish design docs, including docs written by other engineers</li>
                <li><strong>md-with-comments:</strong> a review tool for Markdown with inline, anchored comments that are written back into the file. That way an LLM (or the next person) sees exactly which feedback applies to which text. It ships as a core library, desktop app, CLI, and VS Code extension, with a unit-tested anchoring format designed to survive AI-made edits. I used Claude Code throughout and had it generate two of the four PRs directly</li>
                <li><strong>Team docs:</strong> guides on debugging mobile-only web issues (presented live to the growth team), managing GitHub notifications, and the team's Linear-to-Jira migration</li>
            </ul>
        `,
    },

    // ----- Novel Concept Studio -----
    {
        id: 'novel-concept-purpose-plate',
        title: 'Purpose Plate Marketing Site',
        organization: ORGANIZATIONS.novelConcept,
        projectCategory: CATEGORIES.frontEnd,
        skills: [SKILLS.nextjs, SKILLS.typescript, SKILLS.tailwind, SKILLS.netlify, SKILLS.playwright, SKILLS.posthog, SKILLS.accessibility, SKILLS.seo],
        // TODO: add liveUrl: 'https://www.purposeplate.com/' once the site's password gate comes down
        startDate: '2026-08-01',
        description_html: `
            <p>A launch site for Purpose Plate, a new social-enterprise meal company whose purchases help provide meals for people in need. The site is a funnel, not a store: every page leads visitors to the company's ordering platform, which handles menus, payments, and pickup. The site itself holds no cart and stores no customer data.</p>
            <ul>
                <li>Ran discovery before any design work began, including a project brief that flagged, early, the legal constraints on how a for-profit company can describe its give-back</li>
                <li>Worked alongside the client's marketing agency, turning their design prototypes into a statically generated Next.js 15 site deployed on Netlify</li>
                <li>Built a strict design-token layer in Tailwind v4, with tests that block utilities the design doesn't allow, and audited every color pairing for WCAG AA contrast</li>
                <li>Gated CI on linting, type checks, unit tests, Playwright end-to-end tests with axe accessibility checks, and Lighthouse performance budgets</li>
                <li>Enforced import boundaries between features so parallel AI coding agents could build separate parts of the site at the same time without colliding. That shipped 70+ merged PRs in about two months</li>
                <li>Wired up launch SEO (sitemap, robots, llms.txt, Open Graph cards, canonical-domain redirects) and PostHog analytics on outbound order clicks</li>
            </ul>
        `,
    },
    {
        id: 'novel-concept-studio-site',
        title: 'Novel Concept Studio Website & CMS',
        organization: ORGANIZATIONS.novelConcept,
        projectCategory: CATEGORIES.fullStack,
        skills: [SKILLS.nextjs, SKILLS.payload, SKILLS.mongodb, SKILLS.netlify, SKILLS.digitalOcean, SKILLS.accessibility],
        liveUrl: 'https://novelconcept.studio',
        startDate: '2024-06-01',
        description_html: `
            <p>I founded Novel Concept Studio to give small businesses affordable, custom-built websites with no templates or site builders. Its own marketing site and CMS were the first things I built, and they serve as the reference implementation for client work.</p>
            <ul>
                <li>Designed, built, and host the consumer-facing Next.js marketing site</li>
                <li>Built an internal CMS (Payload CMS and MongoDB) so content changes don't need a code change</li>
                <li>Deployed the marketing site on Netlify and the CMS on DigitalOcean</li>
                <li>Built the "Contact Us" form end to end, including backend services and reCAPTCHA</li>
                <li>Iterate on page content and SEO metadata, and hold every new feature to WCAG 2 compliance at minimum</li>
            </ul>
        `,
    },
    {
        id: 'novel-concept-client-sites',
        title: 'Small Business Client Websites',
        organization: ORGANIZATIONS.novelConcept,
        projectCategory: CATEGORIES.frontEnd,
        skills: [SKILLS.react, SKILLS.nextjs, SKILLS.tailwind, SKILLS.netlify, SKILLS.seo],
        liveUrl: 'https://novelconcept.studio',
        startDate: '2024-06-01',
        description_html: `
            <p>I take each client from first conversation through design, development, hosting, and ongoing updates, using a pay-for-what-you-need monthly pricing model.</p>
            <p><strong>Case study: Bean Catering</strong></p>
            <ul>
                <li>Worked with the owner to define business goals and a timeline</li>
                <li>Drafted custom designs in quick, transparent iterations</li>
                <li>Implemented on-site SEO and advised on off-site SEO, reaching the first page of Google results for local searches</li>
                <li>Deployed on Netlify behind a custom subdomain, with ongoing monitoring of uptime, SEO, and traffic</li>
            </ul>
            <p><strong>Other clients</strong></p>
            <ul>
                <li><a href="https://dinnersbyderek.com" target="_blank" rel="noreferrer">Dinners By Derek</a></li>
                <li><a href="https://hornsbyhealthandfitness.com" target="_blank" rel="noreferrer">Hornsby Health and Fitness</a></li>
                <li>Goodness Cafe, Sugar Pine Ridge, Loggers, Bean Around the Block, Diamond Jim's, and Sonora Brewing</li>
            </ul>
        `,
    },

    // ----- Nxu Technologies -----
    {
        id: 'nxu-admin-panel',
        title: 'EV Charging Station Admin Panel',
        organization: ORGANIZATIONS.nxu,
        projectCategory: CATEGORIES.fullStack,
        skills: [SKILLS.nextjs, SKILLS.typescript, SKILLS.postgres, SKILLS.awsLambda, SKILLS.awsIot, SKILLS.tailwind],
        startDate: '2023-05-01',
        endDate: '2024-05-31',
        description_html: `
            <p>Nxu built networked EV fast-charging stations. I was a primary developer on the internal admin panel the company used to operate them, from the first prototype station through a revenue-generating public beta.</p>
            <ul>
                <li>Designed self-service CRUD flows for critical business data: charging stations, business locations, admins and users, roles, and more</li>
                <li>Implemented secure role-based authentication using AWS IAM, Next.js API handlers, and PostgreSQL</li>
                <li>Wrote TypeScript AWS Lambda microservices that start, pause, and stop charging sessions by messaging stations through AWS IoT Core</li>
                <li>Created a modular, reusable AWS SAM template for those Lambdas, saving hundreds of development hours on each new service</li>
                <li>Moved shared logic like authenticated API calls into reusable React hooks</li>
                <li>Worked with the hardware and firmware teams to decide which charging data they needed, then wrote the PostgreSQL queries to read, write, and format it</li>
            </ul>
        `,
    },
    {
        id: 'nxu-one-app',
        title: 'NxuOne Web & Mobile Apps',
        organization: ORGANIZATIONS.nxu,
        projectCategory: CATEGORIES.fullStack,
        skills: [SKILLS.reactNative, SKILLS.expo, SKILLS.react, SKILLS.typescript, SKILLS.nestjs],
        startDate: '2023-10-01',
        endDate: '2024-05-31',
        description_html: `
            <p>NxuOne was the customer-facing iOS, Android, and web app for starting and stopping charging sessions, managing a profile, and updating billing. To hit an aggressive company goal for the beta launch, I moved from the admin panel to help build it, and it shipped in time.</p>
            <ul>
                <li>Built the account management pages in the React web and React Native mobile apps, which onboarded 200+ users during the beta</li>
                <li>Developed the NestJS REST endpoints behind account customization</li>
                <li>Tracked down and fixed show-stopping bugs ahead of the release deadline</li>
                <li>Did in-depth code reviews on new feature pull requests</li>
            </ul>
        `,
    },
    {
        id: 'nxu-marketing-site',
        title: 'Marketing Site & Station Sales Flow',
        organization: ORGANIZATIONS.nxu,
        projectCategory: CATEGORIES.fullStack,
        skills: [SKILLS.react, SKILLS.nextjs, SKILLS.builderio, SKILLS.stripe, SKILLS.hubspot],
        liveUrl: 'https://www.nxuenergy.com/',
        startDate: '2023-05-01',
        endDate: '2024-05-31',
        description_html: `
            <p>Nxu's marketing website, built on Builder.io so the non-technical content team could manage it themselves. It also became a new revenue stream.</p>
            <ul>
                <li>Worked with a cross-functional team to define requirements for a self-service charging station sales flow, then designed and built it as an e-commerce flow using Next.js, Stripe, and HubSpot</li>
                <li>Built a full suite of React components and layouts for the content team to use in Builder.io</li>
                <li>Refactored the codebase to maximize reuse, remove style inconsistencies, and make the most of the CMS for non-engineers</li>
                <li>Mentored a junior developer on React best practices and helped unblock Builder.io integration issues</li>
            </ul>
        `,
    },

    // ----- Publicis Sapient -----
    // Dates within each role are estimates where LinkedIn only lists the role's range.
    {
        id: 'publicis-mayo-patient-portal',
        title: 'Mayo Clinic Patient Portal',
        organization: ORGANIZATIONS.publicis,
        projectCategory: CATEGORIES.frontEnd,
        skills: [SKILLS.react, SKILLS.reactNative, SKILLS.nextjs, SKILLS.graphql, SKILLS.jest, SKILLS.accessibility],
        liveUrl: 'https://www.mayoclinic.org/',
        startDate: '2022-03-01',
        endDate: '2023-05-31',
        description_html: `
            <p>A redesign of Mayo Clinic's patient portal on an ambitious timeline, delivered as a Next.js website and a React Native mobile app. I was one of the few team members who split time between both.</p>
            <ul>
                <li>Worked with cross-functional and cross-organizational stakeholders to build pixel-perfect React and React Native components</li>
                <li>Optimized the app's data access strategy using GraphQL and Apollo</li>
                <li>Wrote unit tests to keep code coverage at or above 85%</li>
                <li>Audited existing components for WCAG accessibility compliance</li>
                <li>Supported the production launch and fast-follow work, turning real user feedback into new features and enhancements</li>
            </ul>
        `,
    },
    {
        id: 'publicis-mayo-survey-app',
        title: 'Mayo Clinic Outpatient Survey App',
        organization: ORGANIZATIONS.publicis,
        projectCategory: CATEGORIES.frontEnd,
        skills: [SKILLS.reactNative, SKILLS.typescript, SKILLS.accessibility],
        startDate: '2021-08-01',
        endDate: '2022-03-31',
        description_html: `
            <p>A cross-platform React Native app for surveying upper-digestive surgery outpatients during recovery, built by a small team. It was my first project on the Mayo Clinic account and led to my role on the patient portal redesign.</p>
            <ul>
                <li>Worked with stakeholders across organizations to define requirements and flag medical-industry pitfalls early</li>
                <li>Designed and built a robust, deterministic system for defining and rendering large outpatient surveys</li>
                <li>Integrated native features such as push notifications and user preferences</li>
                <li>Turned technical designs into pixel-perfect cross-platform components, and proposed updates based on feedback from end users and accessibility experts</li>
            </ul>
        `,
    },
    {
        id: 'publicis-marriott-web',
        title: 'Marriott Homes & Villas Web App',
        organization: ORGANIZATIONS.publicis,
        projectCategory: CATEGORIES.frontEnd,
        skills: [SKILLS.react, SKILLS.graphql, SKILLS.jest, SKILLS.storybook],
        liveUrl: 'https://homes-and-villas.marriott.com/',
        startDate: '2020-12-01',
        endDate: '2021-08-31',
        description_html: `
            <p>After working on the platform's backend, I moved to the customer-facing React site for Marriott's vacation rental business.</p>
            <ul>
                <li>Turned high-fidelity designs into pixel-perfect components and pages</li>
                <li>Connected frontend and backend services with GraphQL and Apollo to build new booking workflows</li>
                <li>Added Jest unit tests to raise component and page coverage, and wrote Storybook stories for new and existing components</li>
                <li>Did in-depth code reviews and gave feedback to teammates</li>
            </ul>
        `,
    },
    {
        id: 'publicis-marriott-microservices',
        title: 'Marriott Homes & Villas Microservices',
        organization: ORGANIZATIONS.publicis,
        projectCategory: CATEGORIES.backEnd,
        skills: [SKILLS.java, SKILLS.springBoot, SKILLS.kafka, SKILLS.junit],
        startDate: '2020-06-01',
        endDate: '2020-12-31',
        description_html: `
            <p>Backend services handling vacation rental data for Marriott's Homes &amp; Villas platform.</p>
            <ul>
                <li>Implemented critical Spring Boot microservices for international rental bookings, including time zone and currency conversion</li>
                <li>Set up communication between microservices using Apache Kafka</li>
                <li>Added JUnit tests to improve coverage and prevent regressions</li>
                <li>Worked with distributed, cross-functional teammates to refine business requirements</li>
            </ul>
        `,
    },
    {
        id: 'publicis-howard-hughes-demo',
        title: 'Howard Hughes Demo App',
        organization: ORGANIZATIONS.publicis,
        projectCategory: CATEGORIES.frontEnd,
        skills: [SKILLS.flutter, SKILLS.dart],
        startDate: '2020-01-01',
        endDate: '2020-02-29',
        description_html: `
            <p>A mock cross-platform Flutter app for a Howard Hughes sales pitch, built on a deadline of about two weeks.</p>
            <ul>
                <li>Built mock components and app pages from the provided assets, with full navigation and some working features such as a light/dark mode preference</li>
                <li>Shared what I learned in a company-wide Flutter and Dart presentation with 250+ attendees</li>
                <li>Later used Flutter again to build an internal app that encouraged networking among Publicis Sapient employees</li>
            </ul>
        `,
    },
    {
        id: 'publicis-pilot-test-automation',
        title: 'Pilot myRewards+ Test Automation',
        organization: ORGANIZATIONS.publicis,
        projectCategory: CATEGORIES.devEx,
        skills: [SKILLS.appium, SKILLS.java, SKILLS.aws],
        startDate: '2019-06-01',
        endDate: '2020-01-31',
        description_html: `
            <p>Owned the automated UI test suite for Pilot Flying J's myRewards+ Android app.</p>
            <ul>
                <li>Built a comprehensive suite of Appium functional tests, 70+ cases in all</li>
                <li>Ran the full suite daily on a fleet of real devices through AWS Device Farm</li>
                <li>Sent stakeholders automatically generated reports that called out discrepancies and likely causes</li>
                <li>Kept tests passing through major app version updates, and abstracted shared test logic to save hundreds of hours of maintenance</li>
            </ul>
        `,
    },
    {
        id: 'publicis-magic-mirror',
        title: 'Magic Mirror Proof of Concept (Internship)',
        organization: ORGANIZATIONS.publicis,
        projectCategory: CATEGORIES.fullStack,
        skills: [SKILLS.react, SKILLS.node, SKILLS.express],
        startDate: '2018-06-01',
        endDate: '2018-08-31',
        description_html: `
            <p>As a technology intern at Sapient Razorfish (now Publicis Sapient), I was on a team of four interns that built a prototype "magic mirror" in-store display, covering frontend, backend, and hardware.</p>
            <ul>
                <li>Built React components for the mirror's UI and contributed to the backend</li>
                <li>Learned React, Node, and Git, which became my go-to stack for years afterward</li>
                <li>Presented the finished prototype to the office's developers at the end of the summer</li>
            </ul>
        `,
    },
]
