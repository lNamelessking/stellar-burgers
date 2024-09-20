describe('Интеграционное тестирование приложения Stellar Burgers', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.viewport(1200, 800);
  });

  describe('Тест на открытие модальных окон', () => {
    it('Тест на открытие модального окна, сохранение окна после перезагрузки', () => {
      cy.visit('/');
      cy.get('#modals').should('be.empty');
      cy.get('[data-cy="Кристаллы марсианских альфа-сахаридов"]').click();
      cy.url().should('include', '643d69a5c3f7b9001cfa0948');
      cy.get('#modals').should('not.be.empty');
      cy.reload(true);
      cy.url().should('include', '643d69a5c3f7b9001cfa0948');
      cy.get('#modals').should('not.be.empty');
    });

    it('Тест на закрытие модального окна на крестик', () => {
      cy.visit('/');
      cy.get('#modals').should('be.empty');
      cy.get('[data-cy="Кристаллы марсианских альфа-сахаридов"]').click();
      cy.url().should('include', '643d69a5c3f7b9001cfa0948');
      cy.get('#modals').should('not.be.empty');
      cy.get('[data-cy="close-modal"]').click();
      cy.get('#modals').should('be.empty');
    });

    it('Тест на закрытие модального окна на оверлей', () => {
      cy.visit('/');
      cy.get('#modals').should('be.empty');
      cy.get('[data-cy="Кристаллы марсианских альфа-сахаридов"]').click();
      cy.url().should('include', '643d69a5c3f7b9001cfa0948');
      cy.get('#modals').should('not.be.empty');
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('#modals').should('be.empty');
    });
  });

  describe('Тест на работу с конструктором', () => {
    afterEach(() => {
      cy.reload(true);
    });

    it('Проверяем добавление ингридиентов и увеличение счётчика', () => {
      cy.visit('/');
      cy.get('[data-cy="Кристаллы марсианских альфа-сахаридов"]')
        .find('button')
        .click();
      cy.get('[data-cy="Кристаллы марсианских альфа-сахаридов"]')
        .find('.counter')
        .should('contain.text', '1');
      cy.get('[data-cy="Кристаллы марсианских альфа-сахаридов"]')
        .find('button')
        .click();
      cy.get('[data-cy="Кристаллы марсианских альфа-сахаридов"]')
        .find('.counter')
        .should('contain.text', '2');
    });

    it('Проверяем добавление булки и смены счётчика', () => {
      cy.visit('/');
      cy.get('[data-cy="Краторная булка N-200i"]').find('button').click();
      cy.get('[data-cy="Краторная булка N-200i"]')
        .find('.counter')
        .should('contain.text', '2');
      cy.get('[data-cy="Флюоресцентная булка R2-D3"]').find('button').click();
      cy.get('[data-cy="Флюоресцентная булка R2-D3')
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
      cy.get('[data-cy="Флюоресцентная булка R2-D3"]').find('button').click();
      cy.get('[data-cy="Флюоресцентная булка R2-D3"]')
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
      cy.get('#modals').find('h2').contains('53454');
      cy.wait(1000);
      cy.get('#modals').find('button').click();
      cy.get('[data-cy="noBuns"]').should('contain.text', "Выберите булки")
    });
  });
});
