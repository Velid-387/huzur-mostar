// This file helps Netlify identify that this is an Angular project
module.exports = {
  framework: "angular",
  command: "npm run build",
  publish: "dist/huzur-mostar/browser",
  dev: {
    framework: "angular",
    command: "npm run dev",
    port: 4200,
    targetPort: 4200
  },
  edge_functions: [
    {
      function: "ssr",
      path: "/*"
    }
  ]
}; 