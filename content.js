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

// STARTER TRIGGER TO TEST SIDEBAR OUTPUT
(function () {
  const testResults = {
    score: 72,
    structureMatch: true,
    structure: "Complex, Simple, Complex",
    aiPhrases: ["AI-Connector: As a result, ...", "AI-Transition: It is important to note..."],
    judgment: "Likely AI"
  };
  injectSidebar(testResults);
})();
  
