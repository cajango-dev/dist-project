const { supabase } = require('../supabaseClient');

class Payment {
    static async list() {
        const { data, error } = await supabase.from('pagamento').select('*');
        if (error) throw new Error(error.message);
        return data;
    }

    static async getById(id_pagamento) {
        const { data, error } = await supabase
            .from('pagamento')
            .select('*')
            .eq('id_pagamento', id_pagamento)
            .single();
        if (error) throw new Error(error.message);
        return data;
    }

    static async create({ id_pedido, valor, data_pagamento, forma_pagamento }) {
        const { data, error } = await supabase
            .from('pagamento')
            .insert([{ id_pedido, valor, data_pagamento, forma_pagamento }])
            .select();
        if (error) throw new Error(error.message);
        return data[0];
    }

    static async delete(id_pagamento) {
        const { error } = await supabase
            .from('pagamento')
            .delete()
            .eq('id_pagamento', id_pagamento);
        if (error) throw new Error(error.message);
        return { message: 'Pagamento deletado com sucesso' };
    }
}

module.exports = Payment;
