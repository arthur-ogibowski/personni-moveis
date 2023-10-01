/**
 * Faz o gerenciamento do estado do carrinho em localstorage. Oferece funções para
 * Adicionar e remover produtos e garantir que o usuário mantenha os produtos mesmo
 * após fechar seu navegador, via localstorage.
 */
export default {

    /** Adquire produtos do localStorage. */
    getCartItems() {
        return JSON.parse(localStorage.getItem('carrinho')) || [];
    },
    /** Atualiza valores do localStorage com uma nova lista recebida como argumento. */
    updateCart(cartItems) {
        localStorage.setItem('carrinho', JSON.stringify(cartItems));
        // Dispara um evento para atualizar a qtde de produtos e exibir no icone do carrinho na navbar.
        window.dispatchEvent(new Event('cartUpdated'));
    },
    /** Adiciona um produto no carrinho. Se o produto ja existe atualiza sua quantidade. */
    addToCart(product) {
        const cartItems = this.getCartItems();
        const index = cartItems.findIndex((item) => item.productId === product.productId);
        // Produto esta sendo adiciona pela primeira vez.
        if (!this.productIsAlreadyInCart(product.productId)) {
            product.amount = 1;
            cartItems.push(product);
        } else {
            // Adiciona +1 no amount de produto já existente.
            const cartProduct = cartItems[index]; // Adquire referência do produto na lista.
            cartProduct.amount++;
        }
        this.updateCart(cartItems)
    },
    /**
     * Remove um produto no carrinho. Se o produto ja existe atualiza sua quantidade, se produto foi
     * removido (não pode ser encontrado) remove o produto do localstorage.
     */
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
    /** Checa se o produto já é presente no localstorage pelo id. */
    productIsAlreadyInCart(productId) {
        const cartItens = this.getCartItems();
        return cartItens.some(product => product.productId === productId)
    },
    /** Remove o localstorage de carrinho e atualiza com lista vazia. */
    removeAllfromCart() {
        this.updateCart([]);
    },
    /** Retorna a qtde de produtos armazenados em localstorage. */
    amountOfProductsInCart(){ 
        return JSON.parse(localStorage.getItem('carrinho')).length || 0;
    }
};
