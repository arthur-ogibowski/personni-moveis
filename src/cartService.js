import { ElMessageBox } from 'element-plus';

/**
 * Faz o gerenciamento do estado do carrinho em localStorage. Oferece funções para
 * Adicionar e remover produtos e garantir que o usuário mantenha os produtos mesmo
 * após fechar seu navegador, via localStorage.
 */
export default {

    getCartItens() {
      return JSON.parse(localStorage.getItem('carrinho')) || [];
    },
  
    addToCart(item) {
      const cartItens = this.getCartItens();
      cartItens.push(item);
      localStorage.setItem('carrinho', JSON.stringify(cartItens));
    },
  
    removeFromCart(product) {
        const cartItens = this.getCartItens();
        const index = cartItens.indexOf(product)
        //const index = this.cartProducts.indexOf(product);
        //
        if (index >= 0 && index < cartItens.length) {
            cartItens.splice(index, 1);
            //
            localStorage.setItem('carrinho', JSON.stringify(cartItens));
        }
    },

    removeAllfromCart(screenList) {
        ElMessageBox.confirm('Tem certeza que deseja esvaziar o carrinho?', 'Confirmação', {
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não', // Nesse caso não faz nada.
            type: 'warning',
        })
        .then(() => {
            // Deixa o carrinho vazio.
            localStorage.removeItem('carrinho');
            // limpa lista de produtos em tela.
            screenList = [];
        })
        .catch(() => {
            // Se o usuário clicar em "Não" ou fechar a caixa de diálogo, nada precisa ser feito.
        });
    },
};
  