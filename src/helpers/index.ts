export const dateToFormat = (dateString: string) => {
  const date = new Date(dateString);
  const localDate = date.toLocaleDateString(); // Local date
  const localTime = date.toLocaleTimeString(); // Local time
  return localDate + " , " + localTime;
};

export const padZero = (number: number) => {
  return number.toString().padStart(2, "0"); // Ensure two-digit format
};

export function toRoman(num: number) {
  const romanNumerals: Record<number, string> = {
    1: "I",
    5: "V",
    10: "X",
    50: "L",
    100: "C",
    500: "D",
    1000: "M",
  };

  function helper(n: number, place: number): string {
    if (n === 0) return "";

    const d = Math.floor(n / place);
    const nextPlace = place / 10;

    switch (d) {
      case 1:
        return romanNumerals[place] + helper(n - place, nextPlace);
      case 2:
        return (
          romanNumerals[place] +
          romanNumerals[place] +
          helper(n - 2 * place, nextPlace)
        );
      case 3:
        return (
          romanNumerals[place] +
          romanNumerals[place] +
          romanNumerals[place] +
          helper(n - 3 * place, nextPlace)
        );
      case 4:
        return (
          romanNumerals[place] +
          romanNumerals[5 * place] +
          helper(n - 4 * place, nextPlace)
        );
      case 5:
        return romanNumerals[5 * place] + helper(n - 5 * place, nextPlace);
      case 6:
        return (
          romanNumerals[5 * place] +
          romanNumerals[place] +
          helper(n - 6 * place, nextPlace)
        );
      case 7:
        return (
          romanNumerals[5 * place] +
          romanNumerals[place] +
          romanNumerals[place] +
          helper(n - 7 * place, nextPlace)
        );
      case 8:
        return (
          romanNumerals[5 * place] +
          romanNumerals[place] +
          romanNumerals[place] +
          romanNumerals[place] +
          helper(n - 8 * place, nextPlace)
        );
      case 9:
        return (
          romanNumerals[place] +
          romanNumerals[10 * place] +
          helper(n - 9 * place, nextPlace)
        );
      default:
        return "";
    }
  }

  return helper(num, 1000);
}
