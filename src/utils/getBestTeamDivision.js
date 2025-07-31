export function getBestTeamDivision(players, maxLeftovers = 3) {
  const teamSizes = [5, 4, 3, 2]; // ordem de prioridade
  const totalPlayers = players.length;

  let bestOption = null;

  for (let size of teamSizes) {
    const numTeams = Math.floor(totalPlayers / size);
    const leftovers = totalPlayers % size;

    // Rejeita formações com menos de 2 times ou com muitas sobras
    if (numTeams < 2 || leftovers > maxLeftovers) continue;

    if (
      !bestOption ||
      size > bestOption.teamSize || // maior time é prioridade
      (size === bestOption.teamSize && leftovers < bestOption.leftovers) // se empatar no tamanho, escolhe menos sobras
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
