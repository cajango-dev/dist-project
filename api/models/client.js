const { supabase } = require('../supabaseClient');

class Client {
    static async list() {
        const { data, error } = await supabase.from('cliente').select('*');
        if (error) throw new Error(error.message);
        return data;
    }

    static async getById(id_cliente) {
        const { data, error } = await supabase
            .from('cliente')
            .select('*')
            .eq('id_cliente', id_cliente)
            .single();
        if (error) throw new Error(error.message);
        return data;
    }

    static async create({ nome, email, status, cpf, telefone }) {
        const { data, error } = await supabase
            .from('cliente')
            .insert([{ nome, email, status, cpf, telefone }])
            .select();
        if (error) throw new Error(error.message);
        return data[0];
    }

    static async update(id_cliente, updateData) {
        // Remove campos undefined
        Object.keys(updateData).forEach(key => {
            if (updateData[key] === undefined) delete updateData[key];
        });

        const { data, error } = await supabase
            .from('cliente')
            .update(updateData)
            .eq('id_cliente', id_cliente)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }

    static async delete(id_cliente) {
        const { error } = await supabase
            .from('cliente')
            .delete()
            .eq('id_cliente', id_cliente);
        if (error) throw new Error(error.message);
        return { message: 'Cliente deletado com sucesso' };
    }
}

module.exports = Client;
