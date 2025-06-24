const { supabase } = require('../supabaseClient');

class Stock {
    static async list() {
        const { data, error } = await supabase.from('estoque').select('*');
        if (error) throw new Error(error.message);
        return data;
    }

    static async getById(id_estoque) {
        const { data, error } = await supabase
            .from('estoque')
            .select('*')
            .eq('id_estoque', id_estoque)
            .single();
        if (error) throw new Error(error.message);
        return data;
    }

    static async create({ id_produto, quantidade, data_movimentacao, tipo_movimentacao }) {
        const { data, error } = await supabase
            .from('estoque')
            .insert([{ id_produto, quantidade, data_movimentacao, tipo_movimentacao }])
            .select();
        if (error) throw new Error(error.message);
        return data[0];
    }

    static async delete(id_estoque) {
        const { error } = await supabase.from('estoque').delete().eq('id_estoque', id_estoque);
        if (error) throw new Error(error.message);
        return { message: 'Registro de estoque deletado com sucesso' };
    }
}

module.exports = Stock;
