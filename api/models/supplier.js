const { supabase } = require('../supabaseClient');

class Supplier {
  static async list() {
    const { data, error } = await supabase.from('fornecedor').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  static async getById(id_fornecedor) {
    const { data, error } = await supabase
      .from('fornecedor')
      .select('*')
      .eq('id_fornecedor', id_fornecedor)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  static async create({ nome, email, telefone, cnpj }) {
    const { data, error } = await supabase
      .from('fornecedor')
      .insert([{ nome, email, telefone, cnpj }])
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  }

  static async update(id_fornecedor, updateData) {
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) delete updateData[key];
    });

    const { data, error } = await supabase
      .from('fornecedor')
      .update(updateData)
      .eq('id_fornecedor', id_fornecedor)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async delete(id_fornecedor) {
    const { error } = await supabase
      .from('fornecedor')
      .delete()
      .eq('id_fornecedor', id_fornecedor);
    if (error) throw new Error(error.message);
    return { message: 'Fornecedor deletado com sucesso' };
  }
}

module.exports = Supplier;
