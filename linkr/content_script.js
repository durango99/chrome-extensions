var additionalInfo = {
  "title": document.title,
  "selection": window.getSelection().toString()
};

chrome.extension.connect().postMessage(additionalInfo);