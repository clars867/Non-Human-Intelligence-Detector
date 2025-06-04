function analyzeText(text) {
  let score = 0;
  let structure = [];

  if (text.match(/It is (important|clear|worth noting)/i)) score += 10;
  if (text.match(/This raises the question/i)) score += 15;
  if (text.match(/In other words|As a result|Therefore/i)) score += 10;

  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  sentences.forEach((s) => {
    structure.push(s.length > 100 ? "Complex" : "Simple");
  });

  return {
    score,
    structure: structure.join(", "),
  };
}

(function () {
  const selectedText = window.getSelection().toString();

  if (selectedText) {
    const results = analyzeText(selectedText);
    alert(
      "AI-Likeness Score: " + results.score + "\nStructure: " + results.structure
    );
  } else {
    alert("Please select some text first.");
  }
})();
