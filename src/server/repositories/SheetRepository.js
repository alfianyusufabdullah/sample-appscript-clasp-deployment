import { CONFIG } from '../config.js';

export function getSheetByName(name) {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  return ss.getSheetByName(name);
}

export function findAll(sheetName) {
  const sheet = getSheetByName(sheetName);
  return sheet.getDataRange().getValues();
}

export function appendRow(sheetName, rowData) {
  const sheet = getSheetByName(sheetName);
  sheet.appendRow(rowData);
}
