const { supabase } = require('../supabaseClient');

class Order {
    static async create(data) {
        return await supabase.from('pedido').insert(data).select();
    }

    static async list() {
        return await supabase.from('pedido').select('*');
    }

    static async getById(id_venda) {
        return await supabase.from('pedido').select('*').eq('id_venda', id_venda).single();
    }

    static async addProductToOrder({ id_venda, id_produto, quantidade, subtotal }) {
        return await supabase.from('venda_produto').insert({ id_venda, id_produto, quantidade, subtotal }).select();
    }

    static async listProducts(id_venda) {
        return await supabase
            .from('venda_produto')
            .select('*, produto(*)')
            .eq('id_venda', id_venda);
    }
}

module.exports = Order;
