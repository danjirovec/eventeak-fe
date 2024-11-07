export enum Category {
  Movie = 'Movie',
  Concert = 'Concert',
  Talk = 'Talk',
  Quiz = 'Quiz',
  Theater = 'Theater',
  Exhibition = 'Exhibition',
  Festival = 'Festival',
  Workshop = 'Workshop',
  Performance = 'Performance',
  Dance = 'Dance',
}

export const categoryOptions = Object.keys(Category).map((key) => ({
  value: key,
  label: Category[key as keyof typeof Category],
}));

export enum Language {
  Czech = 'Czech',
  English = 'English',
  Slovak = 'Slovak',
  Spanish = 'Spanish',
  Russian = 'Russian',
  Mandarin = 'Mandarin',
  French = 'French',
  Arabic = 'Arabic',
  Japanese = 'Japanese',
  Portuguese = 'Portuguese',
  German = 'German',
}

export const languageOptions = Object.keys(Language).map((key) => ({
  value: key,
  label: Language[key as keyof typeof Language],
}));

export enum Currency {
  CZK = 'CZK',
  EUR = 'EUR',
  USD = 'USD',
}

export const currencyOptions = Object.keys(Currency).map((key) => ({
  value: key,
  label: Currency[key as keyof typeof Currency],
}));
