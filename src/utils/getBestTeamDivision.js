export function getBestTeamDivision(players) {
  const teamSizes = [5, 4, 3, 2];
  const totalPlayers = players.length;

  let bestOption = null;

  for (let size of teamSizes) {
    const numTeams = Math.floor(totalPlayers / size);
    const leftovers = totalPlayers % size;

    // Garante no mínimo 2 times completos
    if (numTeams < 2) continue;

    if (
      !bestOption ||
      leftovers < bestOption.leftovers ||
      (leftovers === bestOption.leftovers && numTeams > bestOption.numTeams)
    ) {
      bestOption = {
        teamSize: size,
        numTeams,
        leftovers,
      };
    }
  }

  // Se não for possível formar 2 times completos, retorna null
  return bestOption;
}
