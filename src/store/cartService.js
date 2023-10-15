/**
 * Faz o gerenciamento do estado do carrinho em localstorage. Oferece funções para
 * Adicionar e remover produtos e garantir que o usuário mantenha os produtos mesmo
 * após fechar seu navegador, via localstorage.
 */
export default {

    // PRODUTO.

    /** Adquire produtos do localStorage. */
    getCartItems() {
        return JSON.parse(localStorage.getItem('carrinho')) || [];
    },
    /** Checa se o produto já é presente no localstorage pelo id. */
    productIsAlreadyInCart(productId) {
        const cartItens = this.getCartItems();
        return cartItens.some(product => product.productId === productId)
    },
    /** Retorna a qtde de produtos armazenados em localstorage. */
    amountOfProductsInCart() {
        // Adquire produtos.
        const localStorageProducts = this.getCartItems();
        const localStorageCmps = this.getCmpItems();
        // Adquire info do usuário adquirindo token.
        //const userEmail = JSON.parse(jwtDecode(AuthService.getToken()));

        // Se carrinho foi criado com sucesso e tem ao menos um produto, coloca qtde de produtos, senão uma string vazia.
        let totalItems = 0
        if (localStorageProducts && localStorageProducts.length > 0) {
          totalItems += localStorageProducts.length;
        }
        if(localStorageCmps && localStorageCmps.length > 0) {
          totalItems += localStorageCmps.length;
        }
        // Atribui total de itens se for diferente de 0 ou string vazia.
        return totalItems != 0 ? totalItems : '';
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
    /** Atualiza valores do localStorage com uma nova lista recebida como argumento. */
    updateCart(cartItems) {
        localStorage.setItem('carrinho', JSON.stringify(cartItems));
        // Dispara um evento para atualizar a qtde de produtos e exibir no icone do carrinho na navbar.
        window.dispatchEvent(new Event('cartUpdated'));
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
    /** Remove o localstorage de carrinho e atualiza com lista vazia. */
    removeAllfromCart() {
        this.updateCart([]);
    },


    // CMP:

    getCmpItems() {
        return JSON.parse(localStorage.getItem('carrinhoCMP')) || [];
    },
    cmpIsAlreadyInCart(cmpId) {
        const cmpItems = this.getCartItems();
        return cmpItems.some(cmp => cmp.id === cmpId);
    },
    addCmpToCart(productCmp) {
        const cmpItems = this.getCmpItems();
        const index = cmpItems.findIndex((item) => item.id === productCmp.id);
        // Produto esta sendo adiciona pela primeira vez.
        if (!this.cmpIsAlreadyInCart(productCmp.id)) {
            productCmp.amount = 1;
            cmpItems.push(productCmp);
        } else {
            // Adiciona +1 no amount de produto já existente.
            const cartCmp = cmpItems[index]; // Adquire referência do produto na lista.
            cartCmp.amount++;
        }
        this.updateCmpCart(cmpItems);
    },
    updateCmpCart(cartCmpItems) {
        localStorage.setItem('carrinhoCMP', JSON.stringify(cartCmpItems));
        // Dispara um evento para atualizar a qtde de produtos e CMP e exibir no icone do carrinho na navbar.
        window.dispatchEvent(new Event('cartUpdated'));
    },
    removeAllFromCmpCart() {
        this.updateCmpCart([]);
    },
    removeOneCmpFromCart(cmp) {
        const cartCmpItems = this.getCmpItems();
        const itemIndex = cartCmpItems.findIndex((item) => item.id === cmp.id);
        // Se igual a -1, item não existe produto na lista.
        if (itemIndex !== -1) {
            // Remove o item da lista
            cartCmpItems.splice(itemIndex, 1);
            // Atualiza o armazenamento local com a lista atualizada.
            this.updateCmpCart(cartCmpItems);
        }
    },
};
