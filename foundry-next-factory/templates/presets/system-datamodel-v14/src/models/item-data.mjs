/**
 * [PT-BR] DataModel tipado para Itens (Equipamentos e Habilidades) no Foundry VTT v14+
 * [EN] Typed DataModel for Items (Gear and Features) in Foundry VTT v14+
 */
export class ItemDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    return {
      quantity: new fields.NumberField({ required: true, integer: true, min: 0, initial: 1 }),
      weight: new fields.NumberField({ required: true, min: 0, initial: 0 }),
      price: new fields.NumberField({ required: true, min: 0, initial: 0 }),
      description: new fields.HTMLField({ required: false, blank: true, initial: "" })
    };
  }
}

