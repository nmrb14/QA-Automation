describe('pruebas de flujo de compras en saucedemo',{testIsolation:false},()=>{
    

    it('TC-1: Login con usuario válid', () => {
        cy.visit('https://www.saucedemo.com');
        cy.get('#user-name').type('standard_user'); // Ingresar usuario
        cy.get('#password').type('secret_sauce'); // Ingresar contraseña
        cy.get('#login-button').click(); // Hacer clic en Login
    })

    it('TC-2: Agregar productos al carrito', () => {
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        
        // Agregar productos al carrito
        cy.get('.inventory_item').first().find('button').click(); // Agregar el primer producto
        cy.get('.inventory_item').last().find('button').click(); // Agregar el último producto
        
        // Validar que el carrito refleja los productos agregados
        cy.get('.shopping_cart_badge').should('contain', '2');
    });

    it('TC-2: Agregar productos al carrito', () => {
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        // Agregar productos al carrito
        cy.get('.inventory_item').first().find('button').click(); // Agregar el primer producto
        cy.get('.inventory_item').last().find('button').click(); // Agregar el último producto

        // Validar que el carrito refleja los productos agregados
        cy.get('.shopping_cart_badge').should('contain', '2');
    });

    it('TC-3: Realizar el checkout', () => {
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        // Agregar un producto al carrito y proceder al checkout
        cy.get('.inventory_item').first().find('button').click();
        cy.get('.shopping_cart_link').click(); // Ir al carrito
        cy.get('#checkout').click(); // Hacer clic en Checkout
        // Completar datos requeridos
        cy.get('#first-name').type('John');
        cy.get('#last-name').type('Doe');
        cy.get('#postal-code').type('12345');
        cy.get('#continue').click();
        // Finalizar compra
        cy.get('#finish').click();

    // Validar mensaje de confirmación
    cy.get('.complete-header').should('contain', 'THANK YOU FOR YOUR ORDER');
    });

    it('TC-4: Validar que se haya realizado el checkout', () => {
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        // Agregar un producto y finalizar compra
        cy.get('.inventory_item').first().find('button').click();
        cy.get('.shopping_cart_link').click();
        cy.get('#checkout').click();
        cy.get('#first-name').type('John');
        cy.get('#last-name').type('Doe');
        cy.get('#postal-code').type('12345');
        cy.get('#continue').click();
        cy.get('#finish').click();

        // Validar el mensaje
        cy.get('.complete-header').should('contain', 'THANK YOU FOR YOUR ORDER');

    
        });

        it('TC-5: Realizar el logout', () => {
            cy.get('#user-name').type('standard_user');
            cy.get('#password').type('secret_sauce');
            cy.get('#login-button').click();
            // Abrir el menú y cerrar sesión
            cy.get('#react-burger-menu-btn').click();
            cy.get('#logout_sidebar_link').click();

            // Validar que el usuario es redirigido a la pantalla de login
            cy.url().should('eq', 'https://www.saucedemo.com/');
            cy.get('#login-button').should('be.visible');

        });



        describe('Compra con usuario problem_user', () => {
            beforeEach(() => {
              // Visitar la página de SauceDemo
              cy.visit('https://www.saucedemo.com');
          
              // Ingresar las credenciales del usuario problem_user (reemplaza con los datos reales)
              cy.get('#user-name').type('problem_user');
              cy.get('#password').type('secret_sauce');
              cy.get('#login-button').click();
            });
          
            it('Debe completar el proceso de compra', () => {
              // Agregar productos al carrito (ajusta los selectores según la UI)
              cy.get('.inventory_item:first').find('.btn_inventory').click();
              cy.get('.shopping_cart_badge').should('have.text', '1');
          
              // Ir al carrito
              cy.get('.shopping_cart_link').click();
          
              // Realizar el checkout
              cy.get('.btn_primary.cart_button').click();
          
              // Completar los datos de envío (ajusta los selectores según la UI)
              cy.get('#first-name').type('John');
              cy.get('#last-name').type('Doe');
              cy.get('#postal-code').type('12345');
              cy.get('#continue').click();
          
              // Confirmar el pedido
              cy.get('#finish').click();
          
              // Validar que se haya realizado el checkout (ajusta el selector según la UI)
              cy.get('.complete-header').should('contain.text', 'Thank you for your order');
          
              // Realizar el logout
              cy.get('#logout_sidebar_container').click();
            });
          });






})
