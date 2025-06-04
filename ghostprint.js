window.ghostprint = {
  analyzeText: function(text) {
    const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
    let score = 0;
    let structure = [];

    sentences.forEach(s => {
      if (s.match(/It is (important|clear|worth noting)/i)) score += 1;
      if (s.match(/This raises the question/i)) score += 2;
      if (s.match(/In other words|As a result|Therefore/i)) score += 1;
      structure.push(s.length > 100 ? "Complex" : "Simple");
    });

    return {
      score,
      structure: structure.join(", ")
    };
  }
};
