function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('My App')
    .addItem('Show Greetings', 'showSidebar')
    .addToUi();
}

function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Greetings')
    .setWidth(300);
  SpreadsheetApp.getUi().showSidebar(html);
}

function doGet(e) {
  const action = e?.parameter?.action;

  let result;
  switch (action) {
    case 'getGreetings':
      result = { status: 'success', data: getAllGreetings() };
      break;
    case 'addGreeting':
      addGreeting(e.parameter.name);
      result = { status: 'success', message: 'Greeting added' };
      break;
    default:
      result = { status: 'error', message: 'Unknown action' };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function addGreetingViaSheet(name) {
  addGreeting(name);
  return 'Greeting added!';
}
