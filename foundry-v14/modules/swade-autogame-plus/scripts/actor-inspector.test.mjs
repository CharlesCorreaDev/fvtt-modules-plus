import { test, describe } from "node:test";
import assert from "node:assert";
import { ActorInspector } from "./actor-inspector.mjs";

describe("ActorInspector (SWADE Actor Dossier & Extraction)", () => {
  const mockActor = {
    id: "act-123",
    uuid: "Actor.act-123",
    name: "Barak, o Bárbaro",
    type: "character",
    isWildCard: true,
    img: "tokens/barak.webp",
    prototypeToken: {
      texture: { src: "tokens/barak_token.webp", scaleX: 1.2 },
      disposition: 1,
    },
    system: {
      details: {
        race: "Humano",
        archetype: "Guerreiro Errante",
        biography: { value: "<p>Um guerreiro das estepes geladas.</p>" },
      },
      advances: {
        rank: "Experiente",
        value: 4,
        experience: 25,
      },
      attributes: {
        agility: { die: { sides: 8, modifier: 0 } },
        smarts: { die: { sides: 6, modifier: 0 } },
        spirit: { die: { sides: 8, modifier: 0 } },
        strength: { die: { sides: 10, modifier: 0 } },
        vigor: { die: { sides: 8, modifier: 0 } },
      },
      stats: {
        parry: { value: 6 },
        toughness: { value: 8, armor: 2 },
      },
      wounds: { value: 0, max: 3, ignored: 0 },
      fatigue: { value: 0, max: 2 },
      bennies: { value: 3, max: 3 },
      status: {
        isShaken: false,
        isDistracted: false,
        isVulnerable: false,
        isBleedingOut: false,
        isIncapacitated: false,
      },
    },
    itemTypes: {
      skill: [
        {
          id: "sk-1",
          name: "Lutar",
          img: "icons/sword.webp",
          system: { attribute: "agility", die: { sides: 10, modifier: 0 } },
        },
        {
          id: "sk-2",
          name: "Atirar",
          img: "icons/bow.webp",
          system: { attribute: "agility", die: { sides: 6, modifier: 0 } },
        },
      ],
      edge: [
        {
          id: "ed-1",
          name: "Golpe Poderoso",
          img: "icons/edge1.webp",
          system: { category: "combat", description: "Bônus de dano" },
        },
      ],
      hindrance: [
        {
          id: "hd-1",
          name: "Código de Honra",
          img: "icons/code.webp",
          system: { major: true, description: "Nunca trapacear" },
        },
      ],
      power: [
        {
          id: "pw-1",
          name: "Raio",
          img: "icons/bolt.webp",
          system: { rank: "novice", pp: 2, range: "12", damage: "2d6" },
        },
      ],
      weapon: [
        {
          id: "wp-1",
          name: "Espada Grande",
          img: "icons/greatsword.webp",
          system: { damage: "For+d10", ap: 1, heavyWeapon: false },
        },
      ],
      armor: [
        {
          id: "ar-1",
          name: "Cota de Malha",
          img: "icons/chainmail.webp",
          system: { armor: 2, weight: 12 },
        },
      ],
      gear: [
        {
          id: "gr-1",
          name: "Cantil",
          img: "icons/waterskin.webp",
          system: { quantity: 1, weight: 1 },
        },
      ],
      ability: [
        {
          id: "ab-1",
          name: "Visão no Escuro",
          img: "icons/darkvision.webp",
          system: { subtype: "special", description: "Enxerga na escuridão" },
        },
      ],
    },
    effects: [
      {
        id: "ef-1",
        name: "Invisível",
        img: "icons/invisible.webp",
        disabled: false,
        duration: { rounds: 3 },
      },
    ],
  };

  test("deve inspecionar e extrair todos os dados de bio e metadados", () => {
    const data = ActorInspector.inspect(mockActor);
    assert.strictEqual(data.id, "act-123");
    assert.strictEqual(data.bio.name, "Barak, o Bárbaro");
    assert.strictEqual(data.bio.race, "Humano");
    assert.strictEqual(data.bio.archetype, "Guerreiro Errante");
    assert.strictEqual(data.bio.rank, "Experiente");
    assert.strictEqual(data.bio.wildCard, true);
    assert.strictEqual(data.media.portraitImg, "tokens/barak.webp");
    assert.strictEqual(data.media.prototypeTokenImg, "tokens/barak_token.webp");
  });

  test("deve listar atributos centrais com dados e modificadores", () => {
    const data = ActorInspector.inspect(mockActor);
    assert.strictEqual(data.attributes.strength.die, 10);
    assert.strictEqual(data.attributes.agility.die, 8);
    assert.strictEqual(data.attributes.smarts.die, 6);
  });

  test("deve extrair perícias, vantagens, desvantagens e poderes", () => {
    const data = ActorInspector.inspect(mockActor);
    assert.strictEqual(data.skills.length, 2);
    assert.strictEqual(data.skills[0].name, "Lutar");
    assert.strictEqual(data.skills[0].die, 10);

    assert.strictEqual(data.edges.length, 1);
    assert.strictEqual(data.edges[0].name, "Golpe Poderoso");

    assert.strictEqual(data.hindrances.length, 1);
    assert.strictEqual(data.hindrances[0].severity, "major");

    assert.strictEqual(data.powers.length, 1);
    assert.strictEqual(data.powers[0].name, "Raio");
  });

  test("deve extrair armas, armaduras, equipamentos, efeitos e condições", () => {
    const data = ActorInspector.inspect(mockActor);
    assert.strictEqual(data.inventory.weapons.length, 1);
    assert.strictEqual(data.inventory.weapons[0].name, "Espada Grande");
    assert.strictEqual(data.inventory.weapons[0].ap, 1);

    assert.strictEqual(data.inventory.armors.length, 1);
    assert.strictEqual(data.inventory.gear.length, 1);
    assert.strictEqual(data.abilities.length, 1);
    assert.strictEqual(data.effects.length, 1);
    assert.strictEqual(data.effects[0].name, "Invisível");

    assert.strictEqual(data.stats.parry, 6);
    assert.strictEqual(data.stats.toughness, 8);
    assert.strictEqual(data.stats.armor, 2);
  });
});
