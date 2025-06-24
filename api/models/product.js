const { supabase } = require('../supabaseClient');

class Product {
    static async list() {
        const { data, error } = await supabase.from('produto').select('*');
        if (error) throw new Error(error.message);
        return data;
    }

    static async getById(id_produto) {
        const { data, error } = await supabase
            .from('produto')
            .select('*')
            .eq('id_produto', id_produto)
            .single();
        if (error) throw new Error(error.message);
        return data;
    }

    static async create({ nome, descricao, preco, quantidade_estoque, id_fornecedor }) {
        const { data, error } = await supabase
            .from('produto')
            .insert([{ nome, descricao, preco, quantidade_estoque, id_fornecedor }])
            .select();
        if (error) throw new Error(error.message);
        return data[0];
    }

    static async update(id_produto, updateData) {
        Object.keys(updateData).forEach(key => {
            if (updateData[key] === undefined) delete updateData[key];
        });

        const { data, error } = await supabase
            .from('produto')
            .update(updateData)
            .eq('id_produto', id_produto)
            .select()
            .single();
        if (error) throw new Error(error.message);
        return data;
    }

    static async delete(id_produto) {
        const { error } = await supabase
            .from('produto')
            .delete()
            .eq('id_produto', id_produto);
        if (error) throw new Error(error.message);
        return { message: 'Produto deletado com sucesso' };
    }
}

module.exports = Product;
