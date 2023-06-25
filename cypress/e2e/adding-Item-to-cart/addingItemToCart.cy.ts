describe("Navigation", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:5173/store");
        cy.get('#add_item').eq(0).click({force: true});
        cy.get('#cartId').click({force: true})

    });


    it("should increase item quantity 6 times", () => {

        cy.get('#increaseBTN').eq(0).then(($btn) => {
            for (let i = 0; i < 5; i++) {
                cy.wrap($btn).click({force: true});
            }
        });

    });


    it("should decrease item quantity 1 times", () => {

        cy.get('#decreaseBTN').eq(0).click({force: true});


    });

    it("should remove the item from cart", () => {

        cy.get('#deleteBTN').eq(0).click({force: true});
    });

    it ("should add item to cart and refresh the page" , () => {
        cy.reload()
    }) ;

});