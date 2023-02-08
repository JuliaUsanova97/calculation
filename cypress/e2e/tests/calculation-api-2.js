import { gql } from '@apollo/client'
import { client } from '../../src/graphql-client'


describe("Successfully logs in from api", () => {
    beforeEach(() => {
      cy.request({
        method: "POST",
        url: Cypress.env("API_URL"),
  
        headers: {
          "Content-Type": "application/json",
          "auth-method": "email",
        },
        body: {
          email: Cypress.env("EMAIL"),
          password: Cypress.env("PASSWORD"),
        },
      }).then((response) => {
        cy.setCookie("jwt-token", response.body.token);
      });
      cy.reload();
    });
  
    it('creates one item', () => {
/*         const random = Cypress._.random(1e5)
        const title = `test ${random}`
        cy.log(`Adding item ${title}`)
          .then(() => {
            const query = gql`
              mutation AddTodo($title: String!) {
                createTodo(title: $title, completed: false) {
                  id
                }
              }
            `
      
            return client.query({
              query,
              variables: {
                title,
              },
              fetchPolicy: 'no-cache',
            })
          })

          .its('data.createTodo', { timeout: 0 })
          .should('have.property', 'id')
       */

 /*          query,
          variables: {
            data: {
                address,
                constructionPeriod,
                furnished,
                numberOfRooms,
                surfaceArea
            }
          },
        
          {
            address: "200 Quai de Valmy, Paris, France",
            constructionPeriod:"newest",
            furnished:false,
            numberOfRooms:1,
            surfaceArea:55
          }
 */
        cy.visit(`${Cypress.env("WEBSITE_URL")}/rent-control`);
      })
  
   
  
  
  });
  
  