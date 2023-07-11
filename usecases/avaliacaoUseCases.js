const { pool } = require('../config');
const Avaliacao = require('../entities/avaliacao')

const getAvaliacaoDB = async (codigoproduto) => {
    try {    
        const { rows } = await pool.query(`select codigo, autor, email, texto, nota, to_char(data,'YYYY-MM-DD') as data, produto
        from avaliacoes
        where produto = $1        
        order by codigo`,[codigoproduto]);
        return rows.map((avaliacao) => new Avaliacao(avaliacao.codigo, avaliacao.autor, avaliacao.email, avaliacao.texto,
            avaliacao.nota, avaliacao.data, avaliacao.produto));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addAvaliacaoDB = async (body) => {
    try {   
        const { autor, email, texto, nota, data, produto } = body; 
        const results = await pool.query(`INSERT INTO avaliacoes (autor, email, texto, nota, data, produto) 
            VALUES ($1, $2, $3, $4, $5, $6)
            returning codigo, autor, email, texto, nota, to_char(data,'YYYY-MM-DD') as data, produto`,
        [autor, email, texto, nota, data, produto]);
        const avaliacao = results.rows[0];
        return new Avaliacao(avaliacao.codigo, avaliacao.autor, avaliacao.email, avaliacao.texto,
            avaliacao.nota, avaliacao.data, avaliacao.produto);
    } catch (err) {
        throw "Erro ao inserir a avaliação: " + err;
    }    
}

const updateAvaliacaoDB = async (body) => {
    try {   
        const { codigo, autor, email, texto, nota, data, produto }  = body; 
        const results = await pool.query(`UPDATE avaliacoes set autor = $2 , email = $3, texto = $4, 
        nota = $5, data = $6, produto = $7 where codigo = $1
        returning codigo, autor, email, texto, nota, to_char(data,'YYYY-MM-DD') as data, produto`,
        [codigo, autor, email, texto, nota, data, produto]);     
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const avaliacao = results.rows[0];
        return new Avaliacao(avaliacao.codigo, avaliacao.autor, avaliacao.email, avaliacao.texto,
            avaliacao.nota, avaliacao.data, avaliacao.produto);
    } catch (err) {
        throw "Erro ao alterar a avaliação: " + err;
    }      
}

const deleteAvaliacaoDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM avaliacoes where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Avaliação removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover a avaliação: " + err;
    }     
}

const getAvaliacaoPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`select codigo, autor, email, texto, nota, to_char(data,'YYYY-MM-DD') as data, produto
        from avaliacoes where codigo = $1 `,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const avaliacao = results.rows[0];
            return new Avaliacao(avaliacao.codigo, avaliacao.autor, avaliacao.email, avaliacao.texto,
                avaliacao.nota, avaliacao.data, avaliacao.produto);
        }       
    } catch (err) {
        throw "Erro ao recuperar a avaliação: " + err;
    }     
}

module.exports = {
    getAvaliacaoDB, addAvaliacaoDB, updateAvaliacaoDB, deleteAvaliacaoDB, getAvaliacaoPorCodigoDB
}
