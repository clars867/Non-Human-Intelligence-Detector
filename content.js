function analyzeText(text) {
  let score = 0;
  let structure = [];
  let aiPhrases = [];
  let startsWithRepeats = {};
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);

  const patterns = [
    { regex: /It is (important|clear|worth noting)/i, score: 10, tag: "AI-Transition" },
    { regex: /This raises the question/i, score: 15, tag: "Rhetorical Question" },
    { regex: /In (other words|this context|conclusion|summary)/i, score: 10, tag: "AI-Summarizer" },
    { regex: /As a result|Therefore|In summary/i, score: 10, tag: "AI-Connector" }
  ];

  sentences.forEach((s) => {
    const words = s.split(" ");
    const start = words.slice(0, 3).join(" ").toLowerCase();
    startsWithRepeats[start] = (startsWithRepeats[start] || 0) + 1;

    structure.push(s.length > 100 ? "Complex" : "Simple");

    patterns.forEach(p => {
      if (s.match(p.regex)) {
        score += p.score;
        aiPhrases.push(p.tag + ": " + s);
      }
    });
  });

  const structuralFlow = ["claim", "context", "support", "question", "conclusion"];
  let structureMatch = structuralFlow.every((_, i) => i < sentences.length);

  const repetitiveStarts = Object.values(startsWithRepeats).filter(v => v > 2).length;
  score += repetitiveStarts * 5;

  const judgment = score >= 50 ? "Likely AI" : "Likely Human";

  return {
    score,
    structure: structure.join(", "),
    aiPhrases,
    structureMatch,
    judgment
  };
}

function injectSidebar(results) {
  const sidebar = document.createElement("div");
  sidebar.style.position = "fixed";
  sidebar.style.top = "0";
  sidebar.style.right = "0";
  sidebar.style.width = "350px";
  sidebar.style.height = "100%";
  sidebar.style.background = "#1e1e1e";
  sidebar.style.color = "white";
  sidebar.style.zIndex = "9999";
  sidebar.style.padding = "20px";
  sidebar.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
  sidebar.style.overflowY = "auto";
  sidebar.style.fontFamily = "monospace";

  sidebar.innerHTML = `
    <h2>🧠 Non-Human Intelligence Detector</h2>
    <p><strong>AI-Likeness Score:</strong> ${results.score}</p>
    <p><strong>Structural Pattern Match:</strong> ${results.structureMatch}</p>
    <p><strong>Sentence Complexity:</strong></p>
    <pre>${results.structure}</pre>
    <p><strong>Flagged Phrases:</strong></p>
    <pre>${results.aiPhrases.join("\n")}</pre>
    <p><strong>Final Judgment:</strong> ${results.judgment}</p>
    <button id="closeDetector" style="margin-top: 10px; padding: 6px 12px;">Close</button>
  `;

  document.body.appendChild(sidebar);

  document.getElementById("closeDetector").onclick = () => {
    sidebar.remove();
  };
}

(function () {
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    const results = analyzeText(selectedText);
    injectSidebar(results);
  } else {
    alert("Please select some text first.");
  }
})();
