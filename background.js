chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "ghostprintAnalyze",
    title: "Analyze with GhostPrint",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "ghostprintAnalyze") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
  }
});
