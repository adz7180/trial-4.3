// src/utils/contractorMatcher.js

export function matchUserToContractor(userZip, preferences) {
  // Simulated contractor list (in reality, fetch from backend)
  const contractors = [
    { id: 1, name: "Elite Builds", zip: "90210", specialties: ["modern", "elegant"] },
    { id: 2, name: "FutureForm Homes", zip: "10001", specialties: ["tech", "energy-efficient"] },
    { id: 3, name: "Northern Estates", zip: "T5J0N3", specialties: ["luxury", "custom"] }
  ];

  return contractors.find(contractor => 
    contractor.zip === userZip &&
    contractor.specialties.some(style => preferences.includes(style))
  );
}
