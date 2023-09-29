/**
 * Faz o gerenciamento do estado do carrinho em localStorage. Oferece funções para
 * Adicionar e remover produtos e garantir que o usuário mantenha os produtos mesmo
 * após fechar seu navegador, via localStorage.
 */
export default {

    getCartItems() {
        return JSON.parse(localStorage.getItem('carrinho')) || [];
    },
    updateCart(cartItems) {
        localStorage.setItem('carrinho', JSON.stringify(cartItems));
    },
    addToCart(product) {
        const cartItems = this.getCartItems();
        const index = cartItems.findIndex((item) => item.productId === product.productId);
        if (!this.productIsAlreadyInCart(product.productId)) {
            product.amount = 1;
            cartItems.push(product);
        } else {
            // Adiciona +1 na qtde de vezes que o produto foi selecionado.
            const cartProduct = cartItems[index]; // Adquire referência do produto na lista.
            cartProduct.amount++;
        }
        this.updateCart(cartItems)
    },
    removeFromCart(product) {
        const cartItems = this.getCartItems();
        const itemIndex = cartItems.findIndex((item) => item.productId === product.productId);
        // Se igual a -1, item não existe produto na lista.
        if (itemIndex !== -1) {
            // Remove o item da lista
            cartItems.splice(itemIndex, 1);
            // Atualiza o armazenamento local com a lista atualizada
            this.updateCart(cartItems)
        }
    },
    productIsAlreadyInCart(productId) {
        const cartItens = this.getCartItems();
        return cartItens.some(product => product.productId === productId)
    },
    removeAllfromCart() {
        localStorage.removeItem('carrinho');
    },
    amountOfProductsInCart(){ 
        return JSON.parse(localStorage.getItem('carrinho')).length || 0;
    }
};
