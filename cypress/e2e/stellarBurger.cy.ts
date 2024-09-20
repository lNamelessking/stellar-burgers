describe('Интеграционное тестирование приложения Stellar Burgers', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.viewport(1200, 800);
    cy.visit('/');
    cy.get('#modals').as('modal');
    cy.get('[data-cy="Кристаллы марсианских альфа-сахаридов"]').as('ingr')
    cy.get('[data-cy="Флюоресцентная булка R2-D3"]').as('bun');
    cy.get('[data-cy="Краторная булка N-200i"]').as('bun-two');
  });

  describe('Тест на открытие модальных окон', () => {
    it('Тест на открытие модального окна, сохранение окна после перезагрузки', () => {
      cy.visit('/');
      cy.get('@modal').should('be.empty');
      cy.get('@ingr').click();
      cy.url().should('include', '643d69a5c3f7b9001cfa0948');
      cy.get('@modal').should('not.be.empty');
      cy.reload(true);
      cy.url().should('include', '643d69a5c3f7b9001cfa0948');
      cy.get('@modal').should('not.be.empty');
    });

    it('Тест на закрытие модального окна на крестик', () => {
      cy.visit('/');
      cy.get('@modal').should('be.empty');
      cy.get('@ingr').click();
      cy.url().should('include', '643d69a5c3f7b9001cfa0948');
      cy.get('@modal').should('not.be.empty');
      cy.get('[data-cy="close-modal"]').click();
      cy.get('@modal').should('be.empty');
    });

    it('Тест на закрытие модального окна на оверлей', () => {
      cy.visit('/');
      cy.get('@modal').should('be.empty');
      cy.get('@ingr').click();
      cy.url().should('include', '643d69a5c3f7b9001cfa0948');
      cy.get('@modal').should('not.be.empty');
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('@modal').should('be.empty');
    });
  });

  describe('Тест на работу с конструктором', () => {
    afterEach(() => {
      cy.reload(true);
    });

    it('Проверяем добавление ингридиентов и увеличение счётчика', () => {
      cy.visit('/');
      cy.get('@ingr')
        .find('button')
        .click();
      cy.get('@ingr')
        .find('.counter')
        .should('contain.text', '1');
      cy.get('@ingr')
        .find('button')
        .click();
      cy.get('@ingr')
        .find('.counter')
        .should('contain.text', '2');
    });

    it('Проверяем добавление булки и смены счётчика', () => {
      cy.visit('/');
      cy.get('@bun-two').find('button').click();
      cy.get('@bun-two')
        .find('.counter')
        .should('contain.text', '2');
      cy.get('@bun').find('button').click();
      cy.get('@bun')
        .find('.counter')
        .should('contain.text', '2');
    });
  });

  describe('Тест на оформление заказа', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.intercept('POST', 'api/orders', { fixture: 'order' });
      cy.setCookie('accessToken', 'testAccessToken');
      localStorage.setItem('refreshToken', 'testRefreshToken');
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    })

    it('Оформление заказа', () => {
      cy.visit('/');
      cy.get('@bun').find('button').click();
      cy.get('@bun')
        .find('.counter')
        .should('contain.text', '2');
      cy.get('[data-cy="Биокотлета из марсианской Магнолии"]')
        .find('button')
        .click();
      cy.get('[data-cy="Биокотлета из марсианской Магнолии"]')
        .find('.counter')
        .should('contain.text', '1');
      cy.get('[data-cy="Соус Spicy-X"]').find('button').click();
      cy.get('[data-cy="Соус Spicy-X"]')
        .find('.counter')
        .should('contain.text', '1');
      cy.get('[data-cy="data-order-button"]').click();
      cy.get('@modal').find('h2').contains('53454');
      cy.wait(1000);
      cy.get('@modal').find('button').click();
      cy.get('[data-cy="noBuns"]').should('contain.text', "Выберите булки")
    });
  });
});
