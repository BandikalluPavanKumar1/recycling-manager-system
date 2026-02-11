import { faker } from '@faker-js/faker';

const skillPool = [
  "Waste Sorting",
  "Hazardous Material Handling",
  "Lean Six Sigma",
  "Team Leadership",
  "Safety Compliance",
  "Equipment Maintenance",
  "ISO 14001",
  "LEED Certification",
  "Circular Economy Strategy",
  "Process Optimization",
  "Root Cause Analysis",
  "Conflict Resolution",
  "Shift Planning",
  "Risk Assessment",
  "Operational Efficiency"
];

const generateScore = (experience, hasLeadershipSkill) => {
  let base = experience * 3;

  if (hasLeadershipSkill) {
    base += 10;
  }

  return Math.min(100, faker.number.int({ min: base - 10, max: base + 10 }));
};

const generateCandidates = (count) => {
  const candidates = [];

  for (let i = 0; i < count; i++) {
    const experience = faker.number.int({ min: 2, max: 20 });
    const skills = faker.helpers.arrayElements(skillPool, faker.number.int({ min: 3, max: 5 }));

    const hasLeadership = skills.includes("Team Leadership");

    const crisisScore = generateScore(experience, hasLeadership);
    const sustainabilityScore = generateScore(
      experience,
      skills.includes("ISO 14001") || skills.includes("Circular Economy Strategy")
    );
    const motivationScore = generateScore(experience, hasLeadership);

    candidates.push({
      id: i + 1,
      name: faker.person.fullName(),
      experience,
      skills,
      scores: {
        crisis: crisisScore,
        sustainability: sustainabilityScore,
        motivation: motivationScore
      }
    });
  }

  return candidates;
};

console.log(JSON.stringify(generateCandidates(40), null, 2));
