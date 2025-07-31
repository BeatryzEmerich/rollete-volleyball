// src/utils/teamDivider.js
export function getBestTeamDivision(players) {
  const teamSizes = [5, 4, 3, 2];
  const totalPlayers = players.length;

  let bestOption = null;

  for (let size of teamSizes) {
    const numTeams = Math.floor(totalPlayers / size);
    const leftovers = totalPlayers % size;

    if (numTeams === 0) continue; 

    if (
      !bestOption ||
      leftovers < bestOption.leftovers ||
      (leftovers === bestOption.leftovers && numTeams < bestOption.numTeams)
    ) {
      bestOption = {
        teamSize: size,
        numTeams,
        leftovers,
      };
    }
  }

  return bestOption;
}
