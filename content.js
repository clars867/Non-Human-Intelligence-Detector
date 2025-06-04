function analyzeSelection(text) {
  const results = window.nonHumanIntelligenceDetector.analyzeText(text);
  alert("AI-Likeness Score: " + results.score + "\nStructure: " + results.structure);
}

const selectedText = window.getSelection().toString();
if (selectedText) {
  analyzeSelection(selectedText);
} else {
  alert("Please select some text first.");
}
