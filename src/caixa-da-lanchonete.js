class CaixaDaLanchonete {

    cardapio = [["cafe", "Café", 3.00], ["chantily", "Chantily (extra do Café)", 1.50],
     ["suco", "Suco Natural", 9.20], ["sanduiche", "Sanduíche", 6.50], 
     ["queijo", "Queijo (extra do Sanduíche)", 2.00], ["salgado", "Salgado", 7.25],
      ["combo1", "1 Suco e 1 Sanduíche", 9.50], ["combo2", "1 Café 1 Sanduíche", 7.50]];

    formasPagamento = ["dinheiro", "debito", "credito"];

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (this.formasPagamento.includes(metodoDePagamento)) {
            if (itens.length > 0) {
                if (this.verificaExtras(itens)) {
                    if (!this.quantidadeZero(itens)) {
                        if (this.itemExiste(itens)) {
                            if (metodoDePagamento == "dinheiro") {
                            return "R$ " + String(Number.parseFloat((this.calculaValorCarrinho(itens) - (this.calculaValorCarrinho(itens) * 0.05))).toFixed(2)).replace(".", ",");
                            } else if (metodoDePagamento == "debito") {
                                return "R$ " + String(Number.parseFloat(this.calculaValorCarrinho(itens)).toFixed(2)).replace(".", ",");
                            } else if (metodoDePagamento == "credito") {
                                return "R$ " + String(Number.parseFloat((this.calculaValorCarrinho(itens) + (this.calculaValorCarrinho(itens) * 0.03))).toFixed(2)).replace(".", ",");
                            }
                        } else {
                            return "Item inválido!";
                        }
                    } else {
                        return "Quantidade inválida!";
                    }
                } else {
                    return "Item extra não pode ser pedido sem o principal";
                }
            } else {
                return "Não há itens no carrinho de compra!";
            }
        }
        return "Forma de pagamento inválida!";
    }

    quantidadeZero(itens) {
        for (var i = 0; i < itens.length; i++) {
            if (parseInt(this.somenteQuantidade(itens[i])) == 0) {
                return true;
            }
        }
        return false;
    }

    somenteQuantidade(texto) {
        return texto.split(",")[1];
    }

    itemExiste(itens) {
        var numeroItens = 0;
        for (var i = 0; i < itens.length; i++) {
            if (this.cardapioItens().includes(this.somenteItem(itens[i]))) {
                numeroItens = numeroItens + 1;
            }
        }
        return itens.length == numeroItens;
    }

    somenteItem(texto) {
        return texto.split(",")[0];
    }

    cardapioItens() {
        var itens = [];
        for (var i = 0; i < this.cardapio.length; i++) {
            itens.push(this.cardapio[i][0]);
        }
        return itens;
    }

    verificaExtras(itens) {
        var numeroItemExtras = 0;
        var numeroItemExtrasExistentes = 0;
        for (var i = 0; i < itens.length; i++) {
            if (this.somenteItem(itens[i]) == "chantily"
                    || this.somenteItem(itens[i]) == "queijo") {
                numeroItemExtras = numeroItemExtras + 1;
                if (this.somenteItem(itens[i]) == "chantily") {
                    if (this.somenteCarrinhoItens(itens).includes("cafe")) {
                        numeroItemExtrasExistentes = numeroItemExtrasExistentes + 1;
                    }
                } else {
                    if (this.somenteCarrinhoItens(itens).includes("sanduiche")) {
                        numeroItemExtrasExistentes = numeroItemExtrasExistentes + 1;
                    }
                }
            }
        }
        return numeroItemExtras == numeroItemExtrasExistentes;
    }

    somenteCarrinhoItens(itens) {
        var carrinhoItens = [];
        for (var i = 0; i < itens.length; i++) {
            carrinhoItens.push(this.somenteItem(itens[i]));
        }
        return carrinhoItens;
    }

    calculaValorCarrinho(itens) {
        var valorCarrinho = 0;
        for (var i = 0; i < itens.length; i++) {
            valorCarrinho = valorCarrinho + (this.somenteQuantidade(itens[i]) * this.valorItem(this.somenteItem(itens[i])));
        }
        return valorCarrinho;
    }

    valorItem(item) {
        for (var i = 0; i < this.cardapio.length; i++) {
            if (this.cardapio[i][0] == item) {
                return this.cardapio[i][2];
            }
        }
        return 0;
    }

}

export { CaixaDaLanchonete };
