chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "nonHumanIntelligenceDetectorAnalyze",
    title: "Analyze with Non-Human Intelligence Detector",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "nonHumanIntelligenceDetectorAnalyze") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
  }
});
