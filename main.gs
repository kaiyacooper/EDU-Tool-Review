function onOpen() {
  const ui = DocumentApp.getUi();
  ui.createMenu('Tool Review')
    .addItem('Generate Review', 'generateReview')
    .addToUi();
}

/**
 * Main function to generate a tool review document.
 */
function generateReview() {
  const ui = DocumentApp.getUi();

  // Check API key configuration
  const apiKey = Config.get('API_KEY');
  if (!apiKey) {
    ui.alert('Script Not Configured', 'The user has not yet configured the necessary API key in the project settings.', ui.ButtonSet.OK);
    return;
  }

  // Gather Tool Name and Institution from the user
  let toolInput, institution;
  try {
    const toolPrompt = ui.prompt('Step 1 of 2: Tool Name', 'Enter the name or website of the tool to review:', ui.ButtonSet.OK_CANCEL);
    if (toolPrompt.getSelectedButton() !== ui.Button.OK || !toolPrompt.getResponseText()) return;
    toolInput = toolPrompt.getResponseText().trim();

  // Add university information for a more tailored response
    const institutionPrompt = ui.prompt('Step 2 of 2: Your Institution', 'Enter the name of your university or organization:', ui.ButtonSet.OK_CANCEL);
    if (institutionPrompt.getSelectedButton() !== ui.Button.OK || !institutionPrompt.getResponseText()) return;
    institution = institutionPrompt.getResponseText().trim();

  } catch (e) {
    return; // User cancelled one of the prompts
  }

  const toolName = toolInput.startsWith('http') ? '' : toolInput;
  const url = toolInput.startsWith('http') ? toolInput : '';

  
  // Create the HTML object 
  const workingHtml = HtmlService.createHtmlOutput('<b>Please wait...</b><br>Generating a tailored review for ' + institution + '. This may take a minute or two.')
      .setWidth(300)
      .setHeight(120);
  ui.showModalDialog(workingHtml, 'Generating...');
  
  // Call the API.
  const apiResult = Api.generateFullReview(toolName || url, institution);
  
  let merged = Object.assign({}, TemplateFields.all, apiResult);

  if (!merged['toolname']) merged['toolname'] = toolName || url;
  Object.keys(merged).forEach(k => {
    if ((k.startsWith('status_') || k.startsWith('purpose_') || k.startsWith('usage_')) && merged[k].toLowerCase() === 'yes') {
      merged[k] = '✔️';
    }
  });
  if (merged['cost'] && merged['cost'].toLowerCase() === 'yes') {
    merged['no_cost'] = ''; merged['campus_licensed'] = '';
  } else if (merged['no_cost'] && merged['no_cost'].toLowerCase() === 'yes') {
    merged['cost'] = ''; merged['campus_licensed'] = '';
  } else if (merged['campus_licensed'] && merged['campus_licensed'].toLowerCase() === 'yes') {
    merged['cost'] = ''; merged['no_cost'] = '';
  }
  if (merged['full_support'] && merged['full_support'].toLowerCase() === 'yes') {
    merged['limited_support'] = ''; merged['vendor_support'] = '';
  } else if (merged['limited_support'] && merged['limited_support'].toLowerCase() === 'yes') {
    merged['full_support'] = ''; merged['vendor_support'] = '';
  } else if (merged['vendor_support'] && merged['vendor_support'].toLowerCase() === 'yes') {
    merged['full_support'] = ''; merged['limited_support'] = '';
  }
  Object.keys(TemplateFields.all).forEach(k => {
    if (!merged[k] || merged[k] === '') merged[k] = 'Not available';
  });
  
  // Create new Document
  const templateId = Config.get('TEMPLATE_DOC_ID');
  if (!templateId) {
    ui.alert('Script Not Configured', 'The script developer has not yet configured the template document ID.', ui.ButtonSet.OK);
    return;
  }
  const newDocId = TemplateUtils.apply(templateId, merged);
  try {
    const html = HtmlService.createHtmlOutput(`<p>✅ Review created!</p><p>You can view it here:</p><a href="https://docs.google.com/document/d/${newDocId}/edit" target="_blank">Open New Document</a>`)
        .setWidth(300)
        .setHeight(120);
    ui.showModalDialog(html, 'Success');
  } catch (e) {
    Logger.log('✅ Review created: https://docs.google.com/document/d/' + newDocId + '/edit');
  }
}
