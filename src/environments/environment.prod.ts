export const environment = {
  production: true,
  // Determine whether to use Netlify forms or custom PHP backend at runtime
  // This will be determined based on the domain in the contact component
  useNetlifyForms: false, // Default for production
  emailApiUrl: '/send-email.php', // PHP email handler for GlobalHost deployment

  // Announcement banner configuration
  announcementBanner: {
    enabled: false, // Set to true to display the banner
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