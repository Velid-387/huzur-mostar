export const environment = {
  production: true,
  // Determine whether to use Netlify forms or custom PHP backend at runtime
  // This will be determined based on the domain in the contact component
  useNetlifyForms: false, // Default for production
  emailApiUrl: '/send-email.php' // PHP email handler for GlobalHost deployment
}; 