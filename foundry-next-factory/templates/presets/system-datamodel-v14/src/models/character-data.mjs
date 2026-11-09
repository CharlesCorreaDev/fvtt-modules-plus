/**
 * [PT-BR] DataModel tipado para Personagens (Actors) no Foundry VTT v14+
 * [EN] Typed DataModel for Characters (Actors) in Foundry VTT v14+
 */
export class CharacterDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    return {
      attributes: new fields.SchemaField({
        level: new fields.NumberField({ required: true, integer: true, min: 1, initial: 1 }),
        hp: new fields.SchemaField({
          value: new fields.NumberField({ required: true, integer: true, initial: 10 }),
          max: new fields.NumberField({ required: true, integer: true, initial: 10 })
        })
      }),
      biography: new fields.HTMLField({ required: false, blank: true, initial: "" })
    };
  }

  /**
   * [PT-BR] Computa dados derivados (modificadores, limites, cálculos dinâmicos)
   * [EN] Computes derived data (modifiers, caps, dynamic calculations)
   */
  prepareDerivedData() {
    // Exemplo de cálculo reativo / Example of derived reactive computation
    if (this.attributes.hp.value > this.attributes.hp.max) {
      this.attributes.hp.value = this.attributes.hp.max;
    }
  }
}

