const { supabase } = require('../supabaseClient');

class Table {
    static async list() {
        const { data, error } = await supabase.from('mesa').select('*');
        if (error) throw new Error(error.message);
        return data;
    }

    static async getById(id_mesa) {
        const { data, error } = await supabase
            .from('mesa')
            .select('*')
            .eq('id_mesa', id_mesa)
            .single();
        if (error) throw new Error(error.message);
        return data;
    }

    static async create({ numero, status, qtd_pessoas }) {
        const { data, error } = await supabase
            .from('mesa')
            .insert([{ numero, status, qtd_pessoas }])
            .select();
        if (error) throw new Error(error.message);
        return data[0];
    }

    static async update(id_mesa, updateData) {
        Object.keys(updateData).forEach((key) => {
            if (updateData[key] === undefined) delete updateData[key];
        });

        const { data, error } = await supabase
            .from('mesa')
            .update(updateData)
            .eq('id_mesa', id_mesa)
            .select()
            .single();
        if (error) throw new Error(error.message);
        return data;
    }

    static async delete(id_mesa) {
        const { error } = await supabase
            .from('mesa')
            .delete()
            .eq('id_mesa', id_mesa);
        if (error) throw new Error(error.message);
        return { message: 'Mesa deletada com sucesso' };
    }
}

module.exports = Table;
