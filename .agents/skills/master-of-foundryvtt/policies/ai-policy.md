# Foundry Virtual Tabletop - AI Generation & Content Policy

> **Official URL:** [https://foundryvtt.com/article/ai-policy/](https://foundryvtt.com/article/ai-policy/)  
> **Source:** Foundry Gaming LLC Official Policy Documentation

---

Please enter your username and password.

Do you need to reset your password?

Your web browser has JavaScript disabled which is required in order to properly use the foundryvtt.com website. Certain website features will be disabled or will not work as expected unless JavaScript is enabled.

This website collects anonymous data about how users interact with our website. This data provides us with 
        valuable insights that help us to improve our products. Some of these analytics features are non-essential 
        and use browser cookies.

What data we collect and information on how it is used is described in our 
        Privacy Policy.

# AI Content Policy

## 

We believe that the Foundry Virtual Tabletop ecosystem is at its best when it is built by human creators — people who care about the craft of game design, software development, and artistic expression. This policy exists to protect and prioritize that work.

Generative AI tools are now widely available and integrated into many common workflows. We recognize that a blanket prohibition is not practical, and that many creators use these tools responsibly in ways that support rather than replace human authorship. At the same time, we are committed to ensuring that our package listing and marketplace reflect genuine human creative effort.

Our previous policy required creators to disclose AI usage. That approach has become unworkable as AI use has grown too common for disclosure alone to be meaningful. This policy replaces it with clear rules about what is and is not permitted. Packages that do make use of AI tools within the scope of what is permitted by this policy are no longer required to disclose that usage. Packages are assumed to include some amount of AI assistance unless explicitly designated otherwise.

## 1. What This Policy Covers

This policy covers usage of generative AI (henceforth simply "AI") performed by large language models (LLMs), diffusion models, or similar generative AI technologies. This policy does not impose restrictions on other technologies which might be thought of as artificial intelligence including other forms of machine learning, inference, or algorithms for procedural generation.

### 1.1 User-Facing Content

This policy applies to packages submitted to the official Foundry VTT package listing at foundryvtt.com/packages and the official marketplace at foundryvtt.store and the user-facing content they include. User-facing content means anything that is delivered to or executed on a user's computer as part of a package. This includes:

- Written text: rules, lore, adventure content, journal entries, item descriptions, UI labels
- Visual media: images, video, and UI assets
- Audio media: music, ambient sound, sound effects, and narration
- Software code: all code and configuration files installed to or executed on a user's computer
- Marketing materials: any text or media content used to promote or describe the package

AI usage outside user-facing content is not restricted by this policy.

This policy applies equally to content that is bundled within a package and content that is retrieved or accessed at runtime through an external source. Packages that provide an interface to AI-generated content or to interact with a model are also governed by this policy.

Authors may only provide materials to an AI model, whether as training data or as runtime context, for which they hold the copyright or have a license that permits such use. This applies equally to locally-run models and external services. AI post-processing does not alter the licensing terms of an underlying asset, and authors remain responsible for ensuring their use of third-party assets complies with applicable copyright and licensing requirements. Packages must not be designed to automatically collect or inject context from sources the author does not have rights to — such as scraping content from other installed modules or assets.

### 1.2 Your Right to Self-Publish

This policy applies only to packages distributed through our official listing and marketplace. As a Foundry VTT license holder, you retain the right to create and distribute packages that do not comply with this policy, provided you do so through channels other than our official platforms. Self-published content must otherwise comply with the Foundry VTT Limited License for Package Development.

## 2. Policy Summary

The following is a brief overview and summary of this policy:

- Prepared content must be human-made. Text, images, audio, and marketing materials that are intentionally pre-created must originate from human creative work. AI tools may provide limited assistance with editing or post-processing.
- Improvised content may be AI-generated. Content generated at runtime in direct response to end-user prompts is permitted. We do not police what users choose to generate at their own table.
- Software code may be AI generated with specific conditions. Package authors must personally understand and be prepared to maintain all code. Packages that generate software code at runtime must obtain user acknowledgement and consent for that code to be executable.
- Packages can be designated as "Zero AI". Packages that exclusively contain user-facing content developed entirely without use of AI tools may designate that package as "Zero AI", advertising their work as 100% human created.
- Non-compliant packages will be archived or deleted. Existing packages need to become compliant with this policy within 180 days. Newly submitted packages must be immediately compliant with this policy. Packages which are not compliant will be archived or deleted from our website and marketplace listings.

## 3. Prepared and Improvised Content

Our policy distinguishes between two types of user-facing content, "Prepared Content" and "Improvised Content".

### 3.1 Prepared Content

Prepared Content is content that is intentionally pre-created and crafted for consumption by end users. This includes all assets, text, and media that a package author creates or curates in advance — whether bundled directly in the package or retrieved from an external source the author has designated. We consider prepared content to be the protected domain of human artists and creatives. AI may not be used to generate prepared media content, with the exception of software code which is governed by separate rules.

### 3.2 Improvised Content

Improvised Content is content generated at runtime in direct response to unpredictable prompts made by an end user during their session. AI tools may be used to generate improvised content in response to specific end-user requests. We have a direct stake in the prepared content of packages listed on our website. Improvised content, however, is generated at the direction of individual users in their own games. We believe it is not our place to police what users choose to generate for their own games, and we respect their autonomy to make those decisions for themselves.

## 4. Rules for Prepared Content

### 4.1 Written Text

All user-facing prepared written text must be human-authored. This includes rules material, lore, adventure content, journal text, item descriptions, and UI labels. AI tools may be used for editorial assistance with proofreading or formatting of human-authored text.

Use of generative AI to translate human-authored text into other languages is permitted, but all translated text must be reviewed for accuracy by a person who speaks the target language before publication. This may be the package author or a contributor acting on their behalf.

### 4.2 Visual Media

All user-facing prepared visual assets must originate from human creative work. AI-generated images, illustrations, video, and UI assets are not permitted as prepared content.

AI tools may be used for minimal post-processing on assets that were created by a human — for example, AI-assisted upscaling, noise reduction, color correction, or arrangement — provided the original human-created asset is not appreciably altered. Adjustments that add to or iterate on a human-made source asset are not permitted. An AI-generated image that has been subsequently edited or painted over by a human is not compliant.

Licensed stock assets are permitted provided the author has verified that those assets are human-made. Authors bear responsibility for confirming the provenance of any third-party assets they use.

SVG files are treated as software code rather than visual media and follow the rules in the Software Code section below. Abusing the SVG format for media that is not naturally suited for representation as vector graphics in order to evade the prohibition on AI-generated media is prohibited.

### 4.3 Audio Media

All user-facing prepared audio must originate from human creative work. AI-generated music, ambient audio, sound effects, and narration are not permitted as prepared content.

AI tools may be used to process, enhance, or arrange audio — such as noise removal, mastering, or mixing assistance — provided the source material is human-made.

### 4.4 Software Code

Authors may use AI tools to assist with writing code, including AI-generated code, code completion, refactoring suggestions, debugging assistance, package documentation, and testing. AI-assisted software development is not prohibited, although there are certain requirements which must be followed.

An author must be able to understand, explain, modify, and maintain every part of their submitted codebase. Authors are fully responsible for all code they submit and must attest that they meet this standard at the time of submission. Submitting code that the author does not personally understand, regardless of how it was produced, is not permitted. Generating large blocks of code through AI prompting without understanding the results (sometimes called "vibe coding") is prohibited. In the event of a dispute regarding submitted code, authors may be asked to demonstrate their understanding of the codebase through commit history, design notes, or direct explanation.

To improve the quality of generated results, package authors are permitted to allow AI coding tools to reference Foundry VTT client-side source code as context. Foundry VTT source code may only be provided to an AI model for the specific purpose of Foundry VTT package development and not for the creation of any other work.

### 4.5 Marketing Materials

Marketing materials must reflect the content of the package itself. Since all prepared text and media in a package must be human-made, its marketing materials must also feature human-made work. This includes package descriptions on the foundryvtt.com website which must be human-written and may not be generated by AI tools.

## 5. Rules for Improvised Content

Packages that invoke AI generation at runtime, for example by providing the end user with an interface from which to prompt a model, are subject to this policy. Runtime generation of improvised content — meaning content produced dynamically in direct response to an unpredictable end-user prompt — is permitted for all content types including text, images, and audio. This includes packages whose primary purpose is improvised content generation, such as NPC generators, randomized game content, map builders, or AI-assisted accessibility tools. Runtime-generated content must be entirely improvisational, it is not allowed for packages to provide runtime access to content that was pre-created via AI generation.

Packages which generate code at runtime are permitted only if they are designed to require informed use by the end user. At minimum, such packages must present generated code to the user in a readable format before execution is possible. The user must explicitly confirm their understanding of generated code before it may be executed. This confirmation requirement exists because generated code can have damaging consequences; we cannot accept responsibility for any harm caused by the execution of generated code.

## 6. Compliance

It is the author's responsibility to ensure their package complies with this policy at the time of submission and with each subsequent update. Packages must remain compliant as they are updated. A package that is updated in a way that is no longer compliant will be removed from our package listing until the issue is resolved. Failure to disclose AI usage or misrepresenting how it was used may result in permanent de-listing. Repeated bad-faith violations may result in a permanent ban from submitting packages for official listing.

### 6.1 Policy Changes

This policy may change in the future. The latest and binding version of this policy will be posted on our website at https://foundryvtt.com/article/ai-policy/. If this policy changes in a substantive way that causes a previously approved package to become non-compliant, a period of 180 days is afforded during which that package may remain listed without changes. The initial publication of this policy counts as such a substantive change; currently listed content at the time of initial publication has 180 days to become compliant. After this time, packages which are no longer compatible with our current AI policy may be archived or otherwise de-listed. Minor changes to this policy to address typographical errors or enhance clarity without changing the rules of the policy do not count as substantive changes and do not trigger an extension to the afforded grace period for compliance.

### 6.2 Enforcement Dates

The most recent substantive change to this policy occurred on March 18, 2026. Existing packages which are not compliant with this policy have until September 14, 2026 to become compliant or elect to be de-listed.

### 6.3 Premium Content

This policy applies to premium content as well as non-premium content. Any new Premium Content Providers will be required to adhere to this policy for all content they publish.

Pre-existing Premium Content Providers have agreements with us that predate this policy and do not require compliance with it. We are working with those providers to renew their agreements with ones that require adherence with this policy. This process will take some time, and content published under existing agreements during the transition period may not yet be bound by this policy.

Premium content that does not meet the requirements of this policy will be archived when the term of its existing agreement expires. Users who have purchased premium content that can no longer be offered under this policy will retain access to that content, but it will need to be installed as an archived package.

### 6.4 Past Releases

Packages with releases that predate this policy may keep those releases available for installation provided that all new releases (of which there must be at least one) are compliant with the current policy. In order to be eligible for the "Zero AI" category, however, no available past release may contain content disallowed by this policy.

### 6.5 The "Contains AI Content" Category

Packages which are not compliant with our current policy will be tagged as "Contains AI Content" and will provide a brief written explanation of how AI tools and models were used in their creation. Such packages may still be publicly visible either because they are within a 180-day grace period or they are allowed to exist due to an ongoing Content Provider Agreement. Once a package tagged as "Contains AI Content" becomes archived due to incompatibility, non-compliance with this policy, or any other valid reason, that package may not become un-archived except through a manual review by our team.

### 6.6 The "Zero AI" Category

Authors who have not used any AI tools at any stage of their package's creation may designate their work as belonging to a "Zero AI" category in our package listing. This category is intended as a clear signal for users who prefer to support and utilize work produced without any AI involvement. When assigning this tag, authors must attest that no AI tools were used in any part of the package's user-facing content or the development of that content.

Packages that are incorrectly designated as "Zero AI" will have this categorization removed. In cases of knowing misrepresentation, offending packages or authors may be removed from our package listing entirely.

### 6.7 The "AI Tools" Category

Packages which incorporate AI models or interfaces to AI models for runtime generation of improvised content must be categorized in an "AI Tools" category on our package listing.

## 7. Enforcement

If you believe a package is in violation of this AI Content Policy, you may report it to our team by submitting a concern via our Contact Us form at foundryvtt.com/contact-us/. Please select "Package AI Policy" from the Inquiry Category dropdown. Reports should identify the specific package and describe the nature of the suspected violation as clearly as possible.

Our team will review reports in good faith and at our discretion. Investigation may include reviewing submitted assets, requesting additional information or evidence from the package author, examining commit history or other documentation, or asking the author direct questions about their work. We do not guarantee a response to every report, nor do we commit to specific investigation timelines.

The burden of proof falls on the author to demonstrate that all user-facing content within the package is compliant with this policy. For media content, this means being able to show a human creative process. For code, this means maintaining a commit history that demonstrates iteration and authorship as well as the ability to answer technical questions about the design and implementation of that code.

### 7.1 Consequences

Enforcement actions may be taken towards specific packages or package authors, depending on the nature of the violation.

Package level actions may include:

- Archival: The package is moved to an archived state. Archived packages remain accessible to users who have previously installed them or have a direct link, but are no longer discoverable through the listing or marketplace. An archived package may be un-archived once it is compliant with this policy.
- Deletion: The package is permanently removed and can no longer be discovered or installed. Deletion is reserved for serious violations or archival that is unresolved for a prolonged period of time. A deleted package may be resubmitted as a new submission subject to full review, without guarantee of approval.

Author-level actions may include:

- Submission Ban: The author is prohibited from submitting new packages to our package listing for a temporary or indefinite period.

### 7.2 Finality of Decisions

We recognize that detecting and assessing AI usage can be difficult and subjective. After an initial good-faith discussion and careful investigation, all rulings by Foundry VTT staff regarding compliance with this policy are final.

## 8. Examples of Permitted and Prohibited Usage

The following examples are intended to clarify the application of this policy for packages which contain some use of AI. These examples are illustrative and not exhaustive. None of these examples, including those which are permitted, qualify for the "Zero AI" tag.

### 8.1 Permitted

- A module that includes human-illustrated token artwork, with AI used only to upscale the final images for higher resolution display.
- A module that provides a runtime NPC generator, producing AI-generated biographical text in response to a user's prompt during a session.
- A module that offers a runtime image generation feature, producing AI-generated scene illustrations in response to a user's description.
- A module that uses an LLM to generate spoken narration at runtime in response to a user's request — for example, a GM tool that reads scene descriptions aloud in a generated voice chosen by the user.
- A module whose code was substantially written with AI assistance, provided the author fully understands, can explain, and is able to maintain that code.
- A module that translates its user interface into additional languages using AI, provided a fluent speaker reviews the translations before publication.

### 8.2 Not Permitted

- A module that includes a pre-generated set of AI-illustrated battlemaps bundled as prepared assets.
- A module that provides a token browser whose library is populated with AI-generated token images hosted on an external server.
- A module that pre-generates a collection of AI-written NPC biographies included as journal entries for users to browse.
- A module that uses an LLM to generate ambient music tracks that are pre-rendered and bundled with the package.
- A module that uses an LLM to generate spoken narration that is pre-recorded and bundled as audio assets.
- A module that generates macro code at runtime and executes it without first presenting the code to the user and obtaining their explicit confirmation.
- A module whose code was generated by AI and which the author cannot explain, modify, or maintain.

#### Foundry Virtual Tabletop

Foundry Virtual Tabletop © Copyright 2026, Foundry Gaming, LLC. All rights reserved.

---

## 🔗 Official Policy Links
- **Document URL:** [https://foundryvtt.com/article/ai-policy/](https://foundryvtt.com/article/ai-policy/)
- **Foundry VTT Hub:** [https://foundryvtt.com/](https://foundryvtt.com/)
