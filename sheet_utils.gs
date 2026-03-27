var SheetUtils = (function () {
  function getToolData(identifier) {
    const sheetId = Config.get('TOOL_DATA_SHEET_ID');
    // If a user wants to use this, they must add 'TOOL_DATA_SHEET_ID' to their properties.
    if (!sheetId) {
      Logger.log('TOOL_DATA_SHEET_ID not configured. Skipping sheet data lookup.');
      return {};
    }
    const ss = SpreadsheetApp.openById(sheetId);
    const sht = ss.getSheets()[0];
    const raw = sht.getDataRange().getValues();
    if (raw.length < 2) return {};
    const headers = raw.shift();
    const idxNo = headers.findIndex(h => h.toString().trim().toLowerCase() === 'no.');
    const idxName = headers.findIndex(h => h.toString().trim().toLowerCase() === 'tool name');
    const row = raw.find(r => {
      const vNo = idxNo !== -1 ? r[idxNo] : null;
      const vName = idxName !== -1 ? r[idxName] : null;
      return (vNo && vNo.toString().trim().toLowerCase() === identifier.toString().trim().toLowerCase()) ||
             (vName && vName.toString().trim().toLowerCase() === identifier.toString().trim().toLowerCase());
    });
    if (!row) return {};
    const cell = {};
    headers.forEach((h, i) => { cell[h] = row[i]; });
    const out = {};
    headers.forEach((h, i) => {
      const normalizedKey = h.trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
      out[normalizedKey] = cell[h] || '';
    });
    return out;
  }
  return { getToolData };
})();
