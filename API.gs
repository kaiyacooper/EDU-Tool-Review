var Api = (function () {

  const MASTER_PROMPT = `
You are an expert educational technology analyst working for {{INSTITUTION_NAME}}. Your role is to assist educators in evaluating technology tools. Your primary task is to conduct a comprehensive review of the educational tool "{{TOOL_NAME}}", keeping the context of your specific institution in mind.

You will use your web search capabilities to find relevant information. Prioritize sources directly related to {{INSTITUTION_NAME}} if they exist, followed by the tool's official website, independent ed-tech review sites, and case studies from other higher-education institutions.

Follow these instructions carefully:
You must fill in the information in the exact format "FIELD_NAME: answer" for each requested field.

**Tool Finder Summary**
toolsummary: [Write one concise sentence to be shown on a tools database card.]

**Status/Usage/Purpose**
status_available: [Answer Yes/No if Actively Developed]
status_under_review: [Answer Yes/No if In Beta/Early Access]
status_denied: [Answer Yes/No if Legacy/Deprecating]
purpose_accessibility: [Answer Yes/No]
purpose_analytics: [Answer Yes/No]
purpose_assessment: [Answer Yes/No]
purpose_badging: [Answer Yes/No]
purpose_collaboration: [Answer Yes/No]
purpose_content: [Answer Yes/No]
purpose_content_creation: [Answer Yes/No]
purpose_course_management: [Answer Yes/No]
purpose_discussion: [Answer Yes/No]
purpose_interactivity: [Answer Yes/No]
purpose_library: [Answer Yes/No]
purpose_peer_review: [Answer Yes/No]
purpose_plagiarism: [Answer Yes/No]
purpose_proctoring: [Answer Yes/No]
purpose_publisher_content: [Answer Yes/No]
purpose_storage: [Answer Yes/No]
usage_canvas: [Answer Yes/No if it integrates with an LMS]
usage_website: [Answer Yes/No if it's a standalone website]
usage_mobile_app: [Answer Yes/No if it has a mobile app]

**Cost**
cost: [Answer Yes/No if it requires purchase by users/departments.]
no_cost: [Answer Yes/No if it is free.]
campus_licensed: [Answer Yes/No if it's typically sold via institutional license.]
cost_info: [Describe the cost structure in detail.]

**Support**
full_support: [Answer Yes/No if full institutional support is typical.]
limited_support: [Answer Yes/No if limited institutional support is typical.]
vendor_support: [Answer Yes/No if it's vendor-only support.]
support_info: [Describe the support model.]

**Similar Tools**
link_to_similar_tool_1: [Name of first similar tool]
link_to_similar_tool_2: [Name of second similar tool]
link_to_similar_tool_3: [Name of third similar tool]

**Overview**
overview: [A 100-word summary of the tool's functionality.]

**Functions**
main_features: [A sentence describing main features.]
grade_pass_back: [Answer Yes/No]
canvas_lti: [Answer Yes/No]
non_lti: [Answer Yes/No]
mobile_access: [Answer Yes/No]

**Instructional Considerations**
use_cases: [Detailed bullet-point list of use cases as per original prompt rules.]
class_sizes: [Which class sizes the tool is best suited for.]
modalities: [Which modalities best complement the tool.]
limitations: [Known institutional barriers and tool-specific limitations.]
complexity: [Simple, Moderate, or Advanced, with reasoning.]
accessibility: [100-word summary of accessibility features.]

**Accessing Tool**
install: [Installation instructions.]
account_instructions: [Steps to acquire an account.]

**Resources**
training_link: [Link or description]
tutorial: [Link or description]
vendor_resource_link: [Link or description]
vendor_support_link: [Link or description]

**References**
sources: [A comprehensive list of all sources used, formatted as requested.]
`;

  function generateFullReview(toolName, institutionName) {
    // 1. Insert all the contextual information into the master prompt.
    const finalPrompt = MASTER_PROMPT
      .replace('{{TOOL_NAME}}', toolName)
      .replace(/{{INSTITUTION_NAME}}/g, institutionName); // Use /g to replace all instances
    
    // 2. Call the API with the completed prompt.
    const apiResponseText = callGenericApiWithPrompt(finalPrompt);

    // 3. Parse the text response into a usable JavaScript object.
    return parseResponse(apiResponseText);
  }

  function callGenericApiWithPrompt(prompt) {
    const endpoint = 'https://api.openai.com/v1/chat/completions';
    const apiKey = Config.get('API_KEY');

    if (!apiKey) {
      Logger.log('API_KEY not found in script properties.');
      throw new Error('API Key is not configured.');
    }

    const payload = {
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      max_tokens: 4000
    };

    const options = {
      method: "post",
      contentType: "application/json",
      headers: { Authorization: "Bearer " + apiKey },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
      timeout: 120000
    };

    try {
      const response = UrlFetchApp.fetch(endpoint, options);
      const content = response.getContentText();
      if (response.getResponseCode() !== 200) {
        Logger.log(`API Error: ${content}`);
        return `API Error: ${content}`;
      }
      const json = JSON.parse(content);
      return json.choices?.[0]?.message?.content || "";
    } catch (e) {
      Logger.log("API call failed: " + e.message);
      return "API call failed.";
    }
  }
  
  function parseResponse(text) {
    const result = {};
    const lines = text.split('\n').filter(line => line.includes(':'));
    
    lines.forEach(line => {
      const match = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        if (key && value && !value.startsWith('[')) {
          result[key] = value;
        }
      }
    });
    Logger.log(`Parsed ${Object.keys(result).length} fields from master prompt response.`);
    return result;
  }

  return {
    generateFullReview
  };
})();
