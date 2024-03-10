const DEFAULT_WAIT_TIME = 2000

describe('Product Filter', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Has Loaded product Filter Page', () => {
    cy.visit('/')
    cy.wait(DEFAULT_WAIT_TIME)
    const titleElement = cy.get('h1').first()
    titleElement.should('include.text', 'Filter')
  })

  it("Display elements before filter applied", () => {
    cy.wait(DEFAULT_WAIT_TIME);
    cy.get('[data-testid="property-select"]').should('exist');
    cy.get('[data-testid="clear-filter"]').should('exist');
    cy.get('[data-testid="operator-select"]').should('not.exist');
    cy.get('[data-testid="value-select"]').should('not.exist');
    cy.get('[data-testid="value-input"]').should('not.exist');
    cy.get('[data-testid="product-item"]').should('have.length', 6);
  });

  it("Filter Items that have weight equal 5, get result and then change filter to greater than 10", () => {
    cy.get('[data-testid="operator-select"]').should('not.exist');
    cy.wait(DEFAULT_WAIT_TIME);
    cy.get('[data-testid="property-select"]').click();
    cy.get('[data-testid="property-select"]')
    .find('.select__menu-list')
    .contains('.select__option', 'Weight')
    .click();
    cy.wait(DEFAULT_WAIT_TIME);
    cy.get('[data-testid="operator-select"]').should('exist');

    cy.get('[data-testid="value-input"]').should('not.exist');
    cy.get('[data-testid="operator-select"]').click();
    cy.get('[data-testid="operator-select"]')
    .find('.select__menu-list .select__option').should('have.length', 6);
    cy.get('[data-testid="operator-select"]')
    .find('.select__menu-list')
    .contains('.select__option', 'Equals')
    .click();

    cy.wait(DEFAULT_WAIT_TIME);
    cy.get('[data-testid="value-input"]').should('exist');
    cy.get('[data-testid="value-input"]').type('5');
    cy.wait(DEFAULT_WAIT_TIME);
    cy.get('[data-testid="product-item"]').should('have.length', 2);

    cy.get('[data-testid="operator-select"]').click();
    cy.get('[data-testid="operator-select"]')
    .find('.select__menu-list')
    .contains('.select__option', 'greater')
    .click();
    cy.get('[data-testid="value-input"]').type('10');
    cy.get('[data-testid="product-item"]').should('have.length', 1);

  });

  it("Filter Items that have category equal to tools nd then change filter to is any of kitchen or tools ", () => {
    cy.get('[data-testid="operator-select"]').should('not.exist');
    cy.wait(DEFAULT_WAIT_TIME);
    cy.get('[data-testid="property-select"]').click();
    cy.get('[data-testid="property-select"]')
    .find('.select__menu-list')
    .contains('.select__option', 'Category')
    .click();

    cy.get('[data-testid="value-input"]').should('not.exist');
    cy.get('[data-testid="operator-select"]').click();
    cy.get('[data-testid="operator-select"]')
    .find('.select__menu-list .select__option').should('have.length', 4);

    cy.get('[data-testid="operator-select"]')
    .find('.select__menu-list')
    .contains('.select__option', 'Equals')
    .click();
    cy.wait(DEFAULT_WAIT_TIME);
    cy.get('[data-testid="value-input"]').should('exist');
    cy.get('[data-testid="value-input"]').type('tools');
    cy.get('[data-testid="product-item"]').should('have.length', 2);

    cy.get('[data-testid="value-select"]').should('not.exist');

    cy.get('[data-testid="operator-select"]').click();
    cy.get('[data-testid="operator-select"]')
    .find('.select__menu-list')
    .contains('.select__option', 'any of')
    .click();

    cy.get('[data-testid="value-select"]').should('exist');

    cy.get('[data-testid="value-select"]').click();
    cy.get('[data-testid="value-select"]')
    .find('.select__menu-list')
    .contains('.select__option', 'kitchen')
    .click();

    cy.get('[data-testid="value-select"]').click();
    cy.get('[data-testid="value-select"]')
    .find('.select__menu-list')
    .contains('.select__option', 'tool')
    .click();
    cy.get('[data-testid="product-item"]').should('have.length', 3);

  });

  it("Product names that contain 'mer' in thier name  and test clear filters", () => {
    cy.get('[data-testid="operator-select"]').should('not.exist');
    cy.wait(DEFAULT_WAIT_TIME);
    cy.get('[data-testid="property-select"]').click();
    cy.get('[data-testid="property-select"]')
    .find('.select__menu-list')
    .contains('.select__option', 'Name')
    .click();

    cy.get('[data-testid="value-input"]').should('not.exist');
    cy.get('[data-testid="operator-select"]').click();
    cy.get('[data-testid="operator-select"]')
    .find('.select__menu-list .select__option').should('have.length', 5);

    cy.get('[data-testid="operator-select"]')
    .find('.select__menu-list')
    .contains('.select__option', 'Contains')
    .click();
    cy.wait(DEFAULT_WAIT_TIME);
    cy.get('[data-testid="value-input"]').should('exist');
    cy.get('[data-testid="value-input"]').type('mer');
    cy.get('[data-testid="product-item"]').should('have.length', 1);

    cy.wait(DEFAULT_WAIT_TIME);
    cy.get('[data-testid="clear-filter"]').click();
    cy.get('[data-testid="product-item"]').should('have.length', 6);
  });

  it('Product wireless has any value and then no value', () => {
    cy.get('[data-testid="operator-select"]').should('not.exist')
    cy.wait(DEFAULT_WAIT_TIME)
    cy.get('[data-testid="property-select"]').click()
    cy.get('[data-testid="property-select"]')
      .find('.select__menu-list')
      .contains('.select__option', 'Wireless')
      .click()

    cy.get('[data-testid="value-input"]').should('not.exist')
    cy.get('[data-testid="operator-select"]').click()
    cy.get('[data-testid="operator-select"]')
      .find('.select__menu-list .select__option')
      .should('have.length', 4)

    cy.get('[data-testid="operator-select"]')
      .find('.select__menu-list')
      .contains('.select__option', 'any value')
      .click()
    cy.wait(DEFAULT_WAIT_TIME)
    cy.get('[data-testid="value-input"]').should('not.exist')
    cy.get('[data-testid="value-select"]').should('not.exist')
    cy.get('[data-testid="product-item"]').should('have.length', 3)

    cy.wait(DEFAULT_WAIT_TIME)
    cy.get('[data-testid="operator-select"]').click()
    cy.get('[data-testid="operator-select"]')
      .find('.select__menu-list')
      .contains('.select__option', 'no value')
      .click()
    cy.get('[data-testid="clear-filter"]').click()
    cy.get('[data-testid="value-input"]').should('not.exist')
    cy.get('[data-testid="value-select"]').should('not.exist')
    cy.get('[data-testid="product-item"]').should('have.length', 3)
    cy.wait(DEFAULT_WAIT_TIME)
    cy.get('[data-testid="clear-filter"]').click()
    cy.get('[data-testid="product-item"]').should('have.length', 6)
  })
})
