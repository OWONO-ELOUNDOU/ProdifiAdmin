export function addWeeksToToday(weeks: number): string {
    const today = new Date();
    const resultDate = new Date(today);

    // Ajouter le nombre de semaines à la date actuelle
    resultDate.setDate(today.getDate() + weeks * 7);

    // Formater la date au format ISO (YYYY-MM-DD)
    // et retourner la partie date
    return resultDate.toISOString().split('T')[0];
}