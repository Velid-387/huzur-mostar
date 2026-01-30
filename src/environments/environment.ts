export const environment = {
  production: false,
  useNetlifyForms: true, // For local development, use Netlify forms
  emailApiUrl: '/send-email.php', // Not used in dev, but defined for consistency

  // Announcement banner configuration
  announcementBanner: {
    enabled: true, // Set to true to display the banner
    message: `Huzur tim uzima mali odmor 🤍
Nakon dvije godine intenzivnog rada vrijeme je da ovaj tim malo odmori.
Od 29.12. do 14.01. naši cvjetovi miruju, a mi punimo srca, ideje i tišinu novom snagom.
@huzur.mostar u tom periodu neće raditi.
Vraćamo se nakon toga odmorniji, s još više nježnosti, boja i mirisa, spremni da vam opet donosimo male trenutke smiraja kroz cvijeće.
Do tada, neka vam dani budu lagani, a srca huzurom ispunjena. 🌿✨
Vidimo se uskoro 🌹`,
    startDate: '2025-12-29', // Banner starts showing from this date
    endDate: '2026-01-14', // Banner automatically hides after this date
    type: 'vacation' as 'info' | 'warning' | 'vacation', // Visual style variant
    dismissible: true, // Allow users to dismiss the banner
    persistDismissalHours: 24 // Hours to remember dismissal (24 = show again next day)
  }
};