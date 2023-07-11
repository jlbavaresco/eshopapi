class Produto {
    constructor(codigo, nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria, categoria_nome) {
        this.codigo = codigo;
        this.nome = nome;
        this.descricao = descricao;
        this.quantidade_estoque = quantidade_estoque;
        this.ativo = ativo;
        this.valor = valor;
        this.data_cadastro = data_cadastro;
        this.categoria = categoria;
        this.categoria_nome = categoria_nome;
    }
}

module.exports = Produto;