// src/data/candidates.js

const names = [
  "Sai Krishna Reddy", "Venkata Ramana", "Srinivas Rao", "Anil Kumar Reddy", "Pradeep Naidu",
  "Harsha Vardhan", "Chandra Sekhar", "Kiran Kumar", "Ravi Teja", "Manikanta Reddy",
  "Suresh Babu", "Vamsi Krishna", "Naveen Kumar", "Raghava Rao", "Sudheer Reddy",
  "Anusha Reddy", "Divya Sri", "Lakshmi Prasanna", "Harika Reddy", "Sowjanya Naidu",
  "Keerthana Reddy", "Bhavani Devi", "Meghana Sri", "Tejaswini Reddy", "Pavani Kumari",
  "Venkatesh Reddy", "Mahesh Babu", "Siva Prasad", "Naga Chaitanya", "Ramakrishna Reddy",
  "Durga Prasad", "Satish Kumar", "Chaitanya Reddy", "Pranitha Reddy", "Sravani Devi",
  "Gayathri Reddy", "Bhargav Reddy", "Nikhil Reddy", "Madhavi Reddy", "Rohith Kumar"
];



const skillsPool = [
  "Waste Sorting",
  "OSHA Safety",
  "Lean Six Sigma",
  "Logistics",
  "Hazardous Materials",
  "Team Leadership",
  "ISO 14001",
  "Inventory Management",
  "Circular Economy Strategy",
  "Process Optimization",
  "Conflict Resolution",
  "Shift Planning",
  "Risk Assessment",
  "Equipment Maintenance"
];

// Generate realistic score based on experience + skill bonus
function generateScore(experience, bonus = 0) {
  const base = experience * 3 + bonus;
  const variation = Math.floor(Math.random() * 15);
  return Math.min(100, base + variation);
}

export function generateCandidates() {
  const candidates = names.map((name, index) => {
    const experience = Math.floor(Math.random() * (20 - 2) + 2);
    const skills = [...skillsPool]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const leadershipBonus = skills.includes("Team Leadership") ? 10 : 0;
    const sustainabilityBonus = skills.includes("ISO 14001") ? 10 : 0;

    const crisisScore = generateScore(experience, leadershipBonus);
    const sustainabilityScore = generateScore(experience, sustainabilityBonus);
    const motivationScore = generateScore(experience, leadershipBonus);

    return {
      id: index + 1,
      name,
      experience,
      skills,
      crisisScore,
      sustainabilityScore,
      motivationScore,
      totalScore: crisisScore + sustainabilityScore + motivationScore
    };
  });

  // Sort and assign rank
  const sorted = [...candidates].sort((a, b) => b.totalScore - a.totalScore);

  return sorted.map((candidate, index) => ({
    ...candidate,
    rankPosition: index + 1
  }));
}
