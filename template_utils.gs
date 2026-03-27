var TemplateUtils = (function () {
  function apply(templateId, values) {
    try {
      const newFile = DriveApp.getFileById(templateId)
                              .makeCopy('Review – ' + (values['toolname'] || 'Unnamed'));
      const newDocId = newFile.getId();
      const doc = DocumentApp.openById(newDocId);
      const body = doc.getBody();
      
      Logger.log('Opening document: ' + newDocId);
      
      let replacementCount = 0;
      
      Object.keys(values).forEach(key => {
        const escapedKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp('{{\\s*' + escapedKey + '\\s*}}', 'g');
        const rawValue = String(values[key] || '');
        
        const replacement =
          rawValue === '✓' || rawValue === '✔️' ? '✔️' :
          rawValue === '❌' ? '❌' :
          rawValue === 'Yes' ? '✔️' :
          rawValue === 'No' ? '❌' :
          rawValue === 'Unknown' ? 'Not available' :
          rawValue;
        
        const beforeText = body.getText();
        replaceEverywhere(body, regex, replacement);
        const afterText = body.getText();
        
        if (beforeText !== afterText) {
          replacementCount++;
          Logger.log(`Replacing: {{${key}}} → "${replacement.substring(0, 50)}..."`);
        }
      });
      
      // Check for unreplaced placeholders
      const unreplaced = body.getText().match(/{{[^}]+}}/g);
      if (unreplaced) {
        Logger.log(`${unreplaced.length} unreplaced placeholders found:`);
        [...new Set(unreplaced)].forEach(p => Logger.log('• ' + p));
      } else {
        Logger.log('All placeholders successfully replaced');
      }
      
      Logger.log(`Total replacements made: ${replacementCount}`);
      
      doc.saveAndClose();
      return newDocId;
      
    } catch (e) {
      Logger.log('Error applying template: ' + e.message);
      throw e;
    }
  }
  
  function replaceEverywhere(body, regex, replacement) {
    const totalElements = body.getNumChildren();
    for (let i = 0; i < totalElements; i++) {
      const element = body.getChild(i);
      scanAndReplace(element, regex, replacement);
    }
  }
  
  function scanAndReplace(element, regex, replacement) {
    const type = element.getType();
    
    if (type === DocumentApp.ElementType.PARAGRAPH || type === DocumentApp.ElementType.LIST_ITEM) {
      const text = element.asText();
      const original = text.getText();
      const updated = original.replace(regex, replacement);
      if (original !== updated) {
        text.setText(updated);
      }
    }
    
    if (type === DocumentApp.ElementType.TABLE) {
      const table = element.asTable();
      for (let r = 0; r < table.getNumRows(); r++) {
        const row = table.getRow(r);
        for (let c = 0; c < row.getNumCells(); c++) {
          const cell = row.getCell(c);
          for (let j = 0; j < cell.getNumChildren(); j++) {
            const child = cell.getChild(j);
            if (child.getType() === DocumentApp.ElementType.PARAGRAPH || 
                child.getType() === DocumentApp.ElementType.LIST_ITEM) {
              const text = child.asText();
              const original = text.getText();
              const updated = original.replace(regex, replacement);
              if (original !== updated) {
                text.setText(updated);
              }
            }
          }
        }
      }
    }
  }
  
  return { apply };
})();
