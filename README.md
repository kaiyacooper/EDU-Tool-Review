# Automated API Tool-Review for Ed Tech

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Built with: Google Apps Script](https://img.shields.io/badge/Built_with-Google_Apps_Script-orange.svg)

An AI-powered tool using Google Apps Script and Google Docs that automates the educational technology review process.

### Demo

This tool transforms a complex and lengthy process into a simple two step comprehensive, formatted review document. The screenshot below shows an example of the final automaticly generated output.

<p align="center">
  <img src="./images/Final Tool Review Template.png" alt="Example of a final generated review" width="600"/>
</p>

### Step-by-Step Walkthrough

<details>
<summary>Click to see the full process from start to finish</summary>

The entire workflow is managed through a series of simple dialogs within Google Docs.

**1. Run from the Menu**
<br>
<img src="./images/tool review button in google docs.png" alt="Step 1: Menu" width="500"/>

**2. Enter the Tool Name**
<br>
<img src="./images/name of tool being reviewed in tool review.png" alt="Step 2: Tool Name Prompt" width="500"/>

**3. Provide Your Institution**
<br>
<img src="./images/name of institution for tool review.png" alt="Step 3: Institution Prompt" width="500"/>

**4. The Script Goes to Work**
<br>
<img src="./images/geenrating tool review .png" alt="Step 4: Generating Dialog" width="500"/>

**5. Success! The Link is Provided**
<br>
<img src="./images/Tool Review Created.png" alt="Step 5: Success Dialog" width="500"/>

**6. The Final Document is Ready**
<br>
<img src="./images/Final Tool Review Template.png" alt="Step 6: The Final Document" width="500"/>

</details>


### Why I Built This

During my experiance in higher education, I have seen how much time and effort goes into evaluating new educational technologies. The process involves extensive research, testing, and documentation. I started this project to create an efficient workflow, allowing educators, institutions, or anyone interested to generate a comprehensive, well-formatted first draft of a review in under two minutes, freeing them up to focus on higher level analysis. I also enjoy working in Apps Script and think the development process and automation is really interesting! 

### Features

*   **Automated Generation:** Run the entire review process from the click of a button in Google Docs.
*   **Context-Aware Analysis:** Prompts the user for their institution to generate a review that is tailored and relevant.
*   **AI Prompt Engineering:** Utilizes a detailed, structured prompt to ensure high-quality, consistent output from the AI.
*   **Document Creation:** Automatically generates a new, cleanly formatted Google Doc for each review based on a customizable template.
*   **Zero Dependencies:** Runs entirely within the Google Workspace ecosystem with no external libraries required.

### Stack

*   **Google Apps Script**
*   **JavaScript (ES6)**
*   **OpenAI API (GPT-4)**
*   **Google Workspace Automation (Google Docs)**

## DISCLAIMER: AI is known to have many biases and false information, due to this it is important to read through and double check all output provided by this tool. I made this to be a helpful starting point, but I am not responsible for any false information the AI might generate. Please use your best judgment!

---

### Installation & Setup Guide

This tool runs entirely within a Google Doc. Follow these steps to set it up in your own Google account.

**Prerequisites:**
*   For this specific version, you need to have an API key from an AI provider like OpenAI. If you wanted to switch it out with a different providor, its pretty simple to change the information in the code, this can be done from previous knowledge or just by searching for a tutorial, there are tons for Apps Script specifically and API key source code. 

**1. Create the "Script Runner" Google Doc**
*   Create a new, blank Google Doc. This document's only purpose is to host the script and provide the menu. You can name it whatever you like. 

**2. Copy the Script Files**
*   Open the Apps Script editor by going to `Extensions > Apps Script`.
*   Once Apps Script is loaded in a new environment, you will see a default `Code.gs` file. Rename it to `main.gs` and paste the code from the `main.gs` file in this repository.
*   Click the `+` icon to add new script files. Create a file for each of the following and paste the corresponding code from this repository into each one:
    *   `API.gs`
    *   `config.gs`
    *   `template_fields.gs`
    *   `template_utils.gs`
    *   `debug.gs`
*   Click the "Save project" icon.

**3. Create the "Template" Google Doc**
*   Create a *second*, separate Google Doc. This will be your review template.
*   Copy the entire text from the expandable section below and paste it into this document.
*   From the URL of this template document, copy its ID (the long string of characters between `/d/` and `/edit`).

<details>
<summary>Click to expand and copy the full template text</summary>
Tool Review: {{toolname}}
Summary: {{toolsummary}}

Overview:
{{overview}}

Filters
STATUS
PURPOSE
USAGE
{{status_available}} Available
{{purpose_accessibility}} Accessibility
{{usage_canvas}} Integrated with LMS
{{status_under_review}} Beta / In Review
{{purpose_analytics}} Analytics
{{usage_website}} Standalone Website
{{status_denied}} Legacy / Denied
{{purpose_assessment}} Assessment
{{usage_mobile_app}} Mobile / Desktop App
{{purpose_badging}} Badging
{{purpose_collaboration}} Collaboration
{{purpose_content}} Content
{{purpose_content_creation}} Content Creation
{{purpose_course_management}} Course Management
{{purpose_discussion}} Discussion
{{purpose_interactivity}} Interactivity
{{purpose_library}} Library
{{purpose_peer_review}} Peer Review
{{purpose_plagiarism}} Plagiarism
{{purpose_proctoring}} Proctoring Content
{{purpose_publisher_content}} Publisher Content
{{purpose_storage}} Storage


COST MODEL
SUPPORT MODEL
{{cost}} Requires Purchase
{{full_support}} Full Institutional Support
{{no_cost}} No Cost (Free)
{{limited_support}} Limited Institutional Support
{{campus_licensed}} Institutional/Site License
{{vendor_support}} Vendor-Only Support
Cost Details: {{cost_info}}
Support Details: {{support_info}}


Instructional Details
Similar Tools:

{{link_to_similar_tool_1}}
{{link_to_similar_tool_2}}
{{link_to_similar_tool_3}}
Key Functions:

Main Features: {{main_features}}
Grade Pass-Back: {{grade_pass_back}}
LMS Integration (LTI): {{canvas_lti}}
Mobile Access: {{mobile_access}}
Instructional Considerations:

Use Cases:
{{use_cases}}
Best For Class Sizes: {{class_sizes}}
Best For Modalities: {{modalities}}
Limitations & Barriers: {{limitations}}
Complexity / Learning Curve: {{complexity}}
Accessibility:
{{accessibility}}

Setup & Resources
Installation / Account Setup:

Installation: {{install}}
Account Instructions: {{account_instructions}}
Help & Training Resources:

Official Trainings: {{training_link}}
Tutorials & Guides: {{tutorial}}
Vendor Resource Center: {{vendor_resource_link}}
Vendor Support Contact: {{vendor_support_link}}
References
{{sources}}


</details>

**4. Configure the Script**
*   Go back to your Apps Script project editor.
*   Click the **Project Settings** (⚙️) icon on the left.
*   Scroll down to **Script Properties** and click **Add script property**.
*   Add the following two properties:
    1.  **Property:** `API_KEY` | **Value:** *[Paste your OpenAI API Key here]*
    2.  **Property:** `TEMPLATE_DOC_ID` | **Value:** *[Paste the Google Doc ID of your template here]*
*   Click **Save script properties**.

**5. Run the Tool!**
*   Go back to your "AI Tool Reviewer" (the blank runner doc).
*   Refresh the page. A new **"Tool Review"** menu should appear at the top.
*   Click **Tool Review > Generate Review** and follow the prompts.

---

### The Master Prompt

The core logic of this tool is powered by a single, comprehensive master prompt. This demonstrates the power of prompt engineering to achieve structured and reliable output from an AI. Remember, the key is being as specific as possible when requesting an LLM to complete a task for you. Reinforcing is also reccomended when having long complex prompts like this due to memory. 

<details>
<summary>Click to expand and see the full master prompt</summary>
You are an expert educational technology analyst. Your role is to assist educators and instructional designers in evaluating technology tools used to improve learner outcomes in higher education across multiple disciplines. Your task is to pull information from the web and any provided sources to complete a comprehensive review.

You will use information you find online from reputable sources, including the tool's official website, independent ed-tech review sites (like G2, EdSurge, Capterra), and case studies from other higher-education institutions. You will use this information to fill in the answers for the various sections below.

If the user does not provide expected documents (e.g., a rubric or accessibility report), proceed using only the materials that are available. For all missing information, note its absence in the final “References” section and complete as much of the review as possible using web searches.

Follow these instructions carefully:
Fill in the information in the exact order and format it is presented in, including tables and bullet point lists. Do not skip any sections. The template is broken into sections (identified by **bold asterisks**) and subsections (identified by a single *asterisk*).

Use the following information as guidance for each section:

**Tool Finder Summary** 
[Write one concise sentence to be shown on a tools database card.]

**Status/Usage/Purpose** 
[For the **Status** and **Usage** sections, select only one option. For the **Purpose** section, select all options that apply.]

**Status** (Select only one option, reflecting the tool's current market standing.)
*Actively Developed [The tool receives regular updates and is actively promoted by the vendor.]
*Legacy/Deprecating [The tool is no longer actively developed or is being phased out.]
*In Beta/Early Access [The tool is new and not yet in full public release.]
· (At the end of the template, cite where this Status information was found.)

**Purpose** (Select all options that apply based on the tool's primary functions found on its website and in reviews.)
*Accessibility
*Analytics
*Assessment 
*Badging
*Collaboration
*Content 
*Content Creation
*Course Management
*Discussion 
*Interactivity 
*Library 
*Peer Review 
*Plagiarism 
*Proctoring Content 
*Publisher Content
*Storage 
· (At the end of the template, cite where the selected purpose information was found.)

**Usage** (Select only one option, representing the primary way the tool is accessed.)
*Integrated with LMS (e.g., Canvas, Blackboard)
*Standalone Website 
*Mobile/Desktop App 
· (At the end of the template, cite where this Usage information was found.)

**Cost** 
[Select the most appropriate option based on web searches of the tool's pricing page.]
*Cost [Requires purchase by individual users or departments.]
*No Cost [Available for free from the vendor. Note if there is a 'freemium' model.]
*Institutional/Site License [The cost is typically covered by a bulk license purchased by an institution.]
· (At the end of the template, cite where this cost information was found.)

**Support** 
[Select the level of support typically available for this tool.]
*Full Institutional Support [This implies a deep level of organizational adoption, which includes:
● Admin access for the organization's IT team
● Dedicated internal helpdesk support
● Formal training workshops offered by the institution]
*Limited Institutional Support [This implies some organizational use, which includes:
● Best-effort helpdesk support for common issues
● No administrative access for internal teams
● Informal guidance or community-based support]
*Vendor-Only Support [The user relies entirely on the tool's developer for help:
● Support is handled via vendor documentation, forums, or help tickets
● No internal institutional support is provided]
· (At the end of the template, cite where this Support information was found.)

[Answer the following sections in header and bullet point lists, not table format.]

**Similar Tools** 
[Based on general web searches and industry knowledge, provide up to three other well-known and established tools that serve a similar primary instructional purpose. List only the tool names.]

**Overview** 
[Please write a 100-word summary that provides a concise overview of the functionality of the tool being reviewed.]

**Functions**
*Features [Write a sentence describing the tool's main features, then answer "Yes" or "No" for each of the following capabilities.] 
*Grade pass back [Does it support sending grades back to an LMS gradebook?]
*LMS Integration (LTI) [Does it support integration via LTI standards?]
*Non-LTI Use [Can it be used effectively without being integrated into an LMS?]
*Mobile Access [Is there a functional mobile app or mobile-responsive website?]

**Instructional Considerations**
*Use Cases [Create a detailed list that summarizes real, verifiable use cases of this tool within higher‑education institutions and present all results as a list of examples rather than narrative paragraphs. Only include examples that come directly from colleges or universities, supported by authentic, active links to resources that lead to official university instructional‑technology pages, faculty support sites, or the tool’s official higher‑education case studies. All examples must reflect actual usage rather than hypothetical scenarios, and every link must point to the specific page where the use case is described. Each use case must appear as its own bullet‑point list item. Explain how the tool has been used within LMS-based courses and identify the course modalities (in‑person, online synchronous, online asynchronous, hybrid, hyflex, or blended) that are genuinely supported by the tool’s capabilities. These modalities must also be presented as bullet‑point list items. Provide at least two examples of assignments for each applicable LMS assessment type (quizzes, discussions, and assignments). Each example should begin with a verb and should describe a realistic college‑level instructional scenario. If no real university‑level use cases exist, clearly state that no documented higher‑education examples are available, then provide detailed hypothetical examples following the same bullet-point structure.]
*Class Sizes [Indicate which class sizes the tool being reviewed is best suited for. Begin this with a verb (e.g., "Serves small classes under 30...").]
*Modalities [Indicate which modalities best compliment the tool being reviewed. Begin this with a verb (e.g., "Supports online asynchronous and hybrid courses...").]
*Limitations or barriers [Include common institutional barriers (e.g., data privacy policies, integration challenges) and tool-specific limitations found in reviews. Begin this with a verb.]
*Complexity or Learning Curve [Based on user reviews and documentation, indicate whether the tool's complexity is simple, moderate, or advanced. Reference reviews if possible.] 
*Accessibility [Write a summary (up to 100 words) of the tool's accessibility features based on its VPAT, WCAG compliance statements, or other accessibility documentation found online. Provide specific examples of how the tool meets standards. After the summary, CHOOSE AND STATE ONE of the following options based on your findings: · “Users should discuss this tool with their students to ensure no one requires an unaddressed accommodation.” OR · “[insert vendor name] claims to meet modern industry standards regarding accessibility, such as WCAG 2.1.”]

**Accessing Tool** 
[This section can be left blank; it needs to be manually filled out by the tool reviewer. Only fill out this section if the information found can be verified and is 100% accurate. If possible, add a table with three sections labeled: Where to find the tool in an LMS, Installation instructions, and Steps to acquire an account.]

**Resources** 
[Indicate appropriate links, or if unable to find links, how to locate information for the following headers, based on web searches and provided documents.]
*Trainings [Add link to official training materials or webinars OR description on how to find them.]
*Tutorials, links, and articles [Add link OR description on how to find them.]
*Vendor Resources [Add link to the vendor's main documentation or resource center.]
*Vendor support [Add link to the vendor's support contact page or helpdesk.]

This concludes the template information. At the bottom, include a “References” section listing all sources used.
For each source, specify:
· The section of the template informed (e.g., Accessibility, Support, Use Cases, etc.)
· The document name or URL where the information was found (e.g., Vendor Documentation, Review sites, Accessibility statements, etc.)


</details>

---

### License

This project is licensed under the MIT License. See the `LICENSE` file for details.
