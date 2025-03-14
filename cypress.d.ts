import { mount } from "cypress/react"

// Augment the Cypress namespace to include type definitions for
// your custom command.
declare global {
  namespace Cypress {
    interface Chainable {
      // Add custom commands if needed
      // login(email: string, password: string): Chainable<void>
      // mount: typeof mount
    }
  }
}
