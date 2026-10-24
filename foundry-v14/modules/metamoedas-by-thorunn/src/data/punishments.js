// Dataset oficial das punições do Guia das Metamoedas (Edição Macabra) - Mestra Thorunn
export const PUNISHMENT_TIERS = {
  basic: {
    id: "basic",
    priceRange: "1-2",
    labelKey: "METAMOEDAS.Tiers.Basic",
    descKey: "METAMOEDAS.Tiers.BasicDesc"
  },
  intermediate: {
    id: "intermediate",
    priceRange: "2-3",
    labelKey: "METAMOEDAS.Tiers.Intermediate",
    descKey: "METAMOEDAS.Tiers.IntermediateDesc"
  },
  advanced: {
    id: "advanced",
    priceRange: "4-5",
    labelKey: "METAMOEDAS.Tiers.Advanced",
    descKey: "METAMOEDAS.Tiers.AdvancedDesc"
  },
  major: {
    id: "major",
    priceRange: "5-6",
    labelKey: "METAMOEDAS.Tiers.Major",
    descKey: "METAMOEDAS.Tiers.MajorDesc"
  },
  greaterChaos: {
    id: "greaterChaos",
    priceRange: "7-10",
    labelKey: "METAMOEDAS.Tiers.GreaterChaos",
    descKey: "METAMOEDAS.Tiers.GreaterChaosDesc"
  },
  supremeCatastrophe: {
    id: "supremeCatastrophe",
    priceRange: "12-20",
    labelKey: "METAMOEDAS.Tiers.SupremeCatastrophe",
    descKey: "METAMOEDAS.Tiers.SupremeCatastropheDesc"
  }
};

export const PUNISHMENTS = [
  // --- 2. TABELA BÁSICA (1-2) ---
  { id: "lingua_tropecou", tier: "basic", price: 1, nameKey: "METAMOEDAS.Punishments.LinguaTropecou.Name", effectKey: "METAMOEDAS.Punishments.LinguaTropecou.Effect" },
  { id: "palavra_proibida", tier: "basic", price: 1, nameKey: "METAMOEDAS.Punishments.PalavraProibida.Name", effectKey: "METAMOEDAS.Punishments.PalavraProibida.Effect" },
  { id: "voz_taverneiro", tier: "basic", price: 1, nameKey: "METAMOEDAS.Punishments.VozTaverneiro.Name", effectKey: "METAMOEDAS.Punishments.VozTaverneiro.Effect" },
  { id: "espirro_arcano", tier: "basic", price: 1, nameKey: "METAMOEDAS.Punishments.EspirroArcano.Name", effectKey: "METAMOEDAS.Punishments.EspirroArcano.Effect" },
  { id: "cade_minha_coisa", tier: "basic", price: 1, nameKey: "METAMOEDAS.Punishments.CadeMinhaCoisa.Name", effectKey: "METAMOEDAS.Punishments.CadeMinhaCoisa.Effect" },
  { id: "pedrinha_sapato", tier: "basic", price: 1, nameKey: "METAMOEDAS.Punishments.PedrinhaSapato.Name", effectKey: "METAMOEDAS.Punishments.PedrinhaSapato.Effect" },
  { id: "coceira_inexplicavel", tier: "basic", price: 1, nameKey: "METAMOEDAS.Punishments.CoceiraInexplicavel.Name", effectKey: "METAMOEDAS.Punishments.CoceiraInexplicavel.Effect" },
  { id: "pombo_destino", tier: "basic", price: 1, nameKey: "METAMOEDAS.Punishments.PomboDestino.Name", effectKey: "METAMOEDAS.Punishments.PomboDestino.Effect" },
  { id: "npc_ouviu_isso", tier: "basic", price: 2, nameKey: "METAMOEDAS.Punishments.NpcOuviuIsso.Name", effectKey: "METAMOEDAS.Punishments.NpcOuviuIsso.Effect" },
  { id: "mutividade_seletiva", tier: "basic", price: 2, nameKey: "METAMOEDAS.Punishments.MutividadeSeletiva.Name", effectKey: "METAMOEDAS.Punishments.MutividadeSeletiva.Effect" },
  { id: "maldicao_eco", tier: "basic", price: 2, nameKey: "METAMOEDAS.Punishments.MaldicaoEco.Name", effectKey: "METAMOEDAS.Punishments.MaldicaoEco.Effect" },
  { id: "sotaque_amaldicoado", tier: "basic", price: 2, nameKey: "METAMOEDAS.Punishments.SotaqueAmaldicoado.Name", effectKey: "METAMOEDAS.Punishments.SotaqueAmaldicoado.Effect" },
  { id: "porta_errada", tier: "basic", price: 2, nameKey: "METAMOEDAS.Punishments.PortaErrada.Name", effectKey: "METAMOEDAS.Punishments.PortaErrada.Effect" },
  { id: "guarda_cagando", tier: "basic", price: 2, nameKey: "METAMOEDAS.Punishments.GuardaCagando.Name", effectKey: "METAMOEDAS.Punishments.GuardaCagando.Effect" },

  // --- 3. TABELA INTERMEDIÁRIA (2-3) ---
  { id: "pequena_divida", tier: "intermediate", price: 2, nameKey: "METAMOEDAS.Punishments.PequenaDivida.Name", effectKey: "METAMOEDAS.Punishments.PequenaDivida.Effect" },
  { id: "cachorro_nao_gostou", tier: "intermediate", price: 2, nameKey: "METAMOEDAS.Punishments.CachorroNaoGostou.Name", effectKey: "METAMOEDAS.Punishments.CachorroNaoGostou.Effect" },
  { id: "arauto_constrangimento", tier: "intermediate", price: 2, nameKey: "METAMOEDAS.Punishments.ArautoConstrangimento.Name", effectKey: "METAMOEDAS.Punishments.ArautoConstrangimento.Effect" },
  { id: "objeto_pegajoso", tier: "intermediate", price: 2, nameKey: "METAMOEDAS.Punishments.ObjetoPegajoso.Name", effectKey: "METAMOEDAS.Punishments.ObjetoPegajoso.Effect" },
  { id: "siricotico_observador", tier: "intermediate", price: 2, nameKey: "METAMOEDAS.Punishments.SiricoticoObservador.Name", effectKey: "METAMOEDAS.Punishments.SiricoticoObservador.Effect" },
  { id: "mau_pressagio_especifico", tier: "intermediate", price: 2, nameKey: "METAMOEDAS.Punishments.MauPressagioEspecifico.Name", effectKey: "METAMOEDAS.Punishments.MauPressagioEspecifico.Effect" },
  { id: "maldicao_nome_errado", tier: "intermediate", price: 3, nameKey: "METAMOEDAS.Punishments.MaldicaoNomeErrado.Name", effectKey: "METAMOEDAS.Punishments.MaldicaoNomeErrado.Effect" },
  { id: "trumpinho_solitario", tier: "intermediate", price: 3, nameKey: "METAMOEDAS.Punishments.TrumpinhoSolitario.Name", effectKey: "METAMOEDAS.Punishments.TrumpinhoSolitario.Effect" },
  { id: "siricotico_cleptomaniaco", tier: "intermediate", price: 3, nameKey: "METAMOEDAS.Punishments.SiricoticoCleptomaniaco.Name", effectKey: "METAMOEDAS.Punishments.SiricoticoCleptomaniaco.Effect" },
  { id: "vendedor_persistente", tier: "intermediate", price: 3, nameKey: "METAMOEDAS.Punishments.VendedorPersistente.Name", effectKey: "METAMOEDAS.Punishments.VendedorPersistente.Effect" },
  { id: "chao_faz_barulho", tier: "intermediate", price: 3, nameKey: "METAMOEDAS.Punishments.ChaoFazBarulho.Name", effectKey: "METAMOEDAS.Punishments.ChaoFazBarulho.Effect" },
  { id: "armadura_barulhenta", tier: "intermediate", price: 3, nameKey: "METAMOEDAS.Punishments.ArmaduraBarulhenta.Name", effectKey: "METAMOEDAS.Punishments.ArmaduraBarulhenta.Effect" },
  { id: "excesso_sinceridade", tier: "intermediate", price: 3, nameKey: "METAMOEDAS.Punishments.ExcessoSinceridade.Name", effectKey: "METAMOEDAS.Punishments.ExcessoSinceridade.Effect" },
  { id: "musica_inconveniente", tier: "intermediate", price: 3, nameKey: "METAMOEDAS.Punishments.MusicaInconveniente.Name", effectKey: "METAMOEDAS.Punishments.MusicaInconveniente.Effect" },
  { id: "pessoa_mais_chata", tier: "intermediate", price: 3, nameKey: "METAMOEDAS.Punishments.PessoaMaisChata.Name", effectKey: "METAMOEDAS.Punishments.PessoaMaisChata.Effect" },
  { id: "gargalhada_maldita", tier: "intermediate", price: 3, nameKey: "METAMOEDAS.Punishments.GargalhadaMaldita.Name", effectKey: "METAMOEDAS.Punishments.GargalhadaMaldita.Effect" },

  // --- 4. TABELA AVANÇADA (4-5) ---
  { id: "trumpinho_diplomata", tier: "advanced", price: 4, nameKey: "METAMOEDAS.Punishments.TrumpinhoDiplomata.Name", effectKey: "METAMOEDAS.Punishments.TrumpinhoDiplomata.Effect" },
  { id: "emboscada_siricoticos", tier: "advanced", price: 4, nameKey: "METAMOEDAS.Punishments.EmboscadaSiricoticos.Name", effectKey: "METAMOEDAS.Punishments.EmboscadaSiricoticos.Effect" },
  { id: "mendigo_profetico", tier: "advanced", price: 4, nameKey: "METAMOEDAS.Punishments.MendigoProfetico.Name", effectKey: "METAMOEDAS.Punishments.MendigoProfetico.Effect" },
  { id: "maldicao_monologo", tier: "advanced", price: 4, nameKey: "METAMOEDAS.Punishments.MaldicaoMonologo.Name", effectKey: "METAMOEDAS.Punishments.MaldicaoMonologo.Effect" },
  { id: "nao_era_estatua", tier: "advanced", price: 4, nameKey: "METAMOEDAS.Punishments.NaoEraEstatua.Name", effectKey: "METAMOEDAS.Punishments.NaoEraEstatua.Effect" },
  { id: "ex_do_nada", tier: "advanced", price: 4, nameKey: "METAMOEDAS.Punishments.ExDoNada.Name", effectKey: "METAMOEDAS.Punishments.ExDoNada.Effect" },
  { id: "fiscalizacao_arcana", tier: "advanced", price: 4, nameKey: "METAMOEDAS.Punishments.FiscalizacaoArcana.Name", effectKey: "METAMOEDAS.Punishments.FiscalizacaoArcana.Effect" },
  { id: "familiar_sindicalizou", tier: "advanced", price: 4, nameKey: "METAMOEDAS.Punishments.FamiliarSindicalizou.Name", effectKey: "METAMOEDAS.Punishments.FamiliarSindicalizou.Effect" },
  { id: "mimica_compulsoria", tier: "advanced", price: 4, nameKey: "METAMOEDAS.Punishments.MimicaCompulsoria.Name", effectKey: "METAMOEDAS.Punishments.MimicaCompulsoria.Effect" },
  { id: "aquele_npc_aqui", tier: "advanced", price: 5, nameKey: "METAMOEDAS.Punishments.AqueleNpcAqui.Name", effectKey: "METAMOEDAS.Punishments.AqueleNpcAqui.Effect" },
  { id: "siricotico_alfa", tier: "advanced", price: 5, nameKey: "METAMOEDAS.Punishments.SiricoticoAlfa.Name", effectKey: "METAMOEDAS.Punishments.SiricoticoAlfa.Effect" },
  { id: "tres_trumpinhos_sobretudo", tier: "advanced", price: 5, nameKey: "METAMOEDAS.Punishments.TresTrumpinhosSobretudo.Name", effectKey: "METAMOEDAS.Punishments.TresTrumpinhosSobretudo.Effect" },
  { id: "maldicao_contrario", tier: "advanced", price: 5, nameKey: "METAMOEDAS.Punishments.MaldicaoContrario.Name", effectKey: "METAMOEDAS.Punishments.MaldicaoContrario.Effect" },
  { id: "problema_tem_advogado", tier: "advanced", price: 5, nameKey: "METAMOEDAS.Punishments.ProblemaTemAdvogado.Name", effectKey: "METAMOEDAS.Punishments.ProblemaTemAdvogado.Effect" },

  // --- 5. TABELA DE GASTOS MAIORES (5-6) ---
  { id: "rival_inesperado", tier: "major", price: 5, nameKey: "METAMOEDAS.Punishments.RivalInesperado.Name", effectKey: "METAMOEDAS.Punishments.RivalInesperado.Effect" },
  { id: "item_fala", tier: "major", price: 5, nameKey: "METAMOEDAS.Punishments.ItemFala.Name", effectKey: "METAMOEDAS.Punishments.ItemFala.Effect" },
  { id: "galinha_do_caos", tier: "major", price: 5, nameKey: "METAMOEDAS.Punishments.GalinhaDoCaos.Name", effectKey: "METAMOEDAS.Punishments.GalinhaDoCaos.Effect" },
  { id: "universo_cobra_frete", tier: "major", price: 5, nameKey: "METAMOEDAS.Punishments.UniversoCobraFrete.Name", effectKey: "METAMOEDAS.Punishments.UniversoCobraFrete.Effect" },
  { id: "reuniao_de_familia", tier: "major", price: 6, nameKey: "METAMOEDAS.Punishments.ReuniaoDeFamilia.Name", effectKey: "METAMOEDAS.Punishments.ReuniaoDeFamilia.Effect" },
  { id: "trumpinho_com_faca", tier: "major", price: 6, nameKey: "METAMOEDAS.Punishments.TrumpinhoComFaca.Name", effectKey: "METAMOEDAS.Punishments.TrumpinhoComFaca.Effect" },
  { id: "siricoticos_montados", tier: "major", price: 6, nameKey: "METAMOEDAS.Punishments.SiricoticosMontados.Name", effectKey: "METAMOEDAS.Punishments.SiricoticosMontados.Effect" },
  { id: "parabens_sidequest", tier: "major", price: 6, nameKey: "METAMOEDAS.Punishments.ParabensSidequest.Name", effectKey: "METAMOEDAS.Punishments.ParabensSidequest.Effect" },
  { id: "maldicao_do_drama", tier: "major", price: 6, nameKey: "METAMOEDAS.Punishments.MaldicaoDoDrama.Name", effectKey: "METAMOEDAS.Punishments.MaldicaoDoDrama.Effect" },
  { id: "burocracia_infernal", tier: "major", price: 6, nameKey: "METAMOEDAS.Punishments.BurocraciaInfernal.Name", effectKey: "METAMOEDAS.Punishments.BurocraciaInfernal.Effect" },
  { id: "mercador_siricotico", tier: "major", price: 6, nameKey: "METAMOEDAS.Punishments.MercadorSiricotico.Name", effectKey: "METAMOEDAS.Punishments.MercadorSiricotico.Effect" },

  // --- 6. TABELA DE CAOS MAIOR (7-10) ---
  { id: "inimigo_natural_plano", tier: "greaterChaos", price: 7, nameKey: "METAMOEDAS.Punishments.InimigoNaturalPlano.Name", effectKey: "METAMOEDAS.Punishments.InimigoNaturalPlano.Effect" },
  { id: "maldicao_musica_batalha", tier: "greaterChaos", price: 7, nameKey: "METAMOEDAS.Punishments.MaldicaoMusicaBatalha.Name", effectKey: "METAMOEDAS.Punishments.MaldicaoMusicaBatalha.Effect" },
  { id: "ma_reputacao_temporaria", tier: "greaterChaos", price: 7, nameKey: "METAMOEDAS.Punishments.MaReputacaoTemporaria.Name", effectKey: "METAMOEDAS.Punishments.MaReputacaoTemporaria.Effect" },
  { id: "siricotico_xama", tier: "greaterChaos", price: 7, nameKey: "METAMOEDAS.Punishments.SiricoticoXama.Name", effectKey: "METAMOEDAS.Punishments.SiricoticoXama.Effect" },
  { id: "trumpinho_executivo", tier: "greaterChaos", price: 7, nameKey: "METAMOEDAS.Punishments.TrumpinhoExecutivo.Name", effectKey: "METAMOEDAS.Punishments.TrumpinhoExecutivo.Effect" },
  { id: "aquele_bau_tem_dentes", tier: "greaterChaos", price: 8, nameKey: "METAMOEDAS.Punishments.AqueleBauTemDentes.Name", effectKey: "METAMOEDAS.Punishments.AqueleBauTemDentes.Effect" },
  { id: "encontro_aleatorio_premium", tier: "greaterChaos", price: 8, nameKey: "METAMOEDAS.Punishments.EncontroAleatorioPremium.Name", effectKey: "METAMOEDAS.Punishments.EncontroAleatorioPremium.Effect" },
  { id: "siricotocalipse_localizado", tier: "greaterChaos", price: 8, nameKey: "METAMOEDAS.Punishments.SiricotocalipseLocalizado.Name", effectKey: "METAMOEDAS.Punishments.SiricotocalipseLocalizado.Effect" },
  { id: "cacada_trumpinica", tier: "greaterChaos", price: 8, nameKey: "METAMOEDAS.Punishments.CacadaTrumpinica.Name", effectKey: "METAMOEDAS.Punishments.CacadaTrumpinica.Effect" },
  { id: "maldicao_verdade_especifica", tier: "greaterChaos", price: 8, nameKey: "METAMOEDAS.Punishments.MaldicaoVerdadeEspecifica.Name", effectKey: "METAMOEDAS.Punishments.MaldicaoVerdadeEspecifica.Effect" },
  { id: "destino_senso_humor", tier: "greaterChaos", price: 9, nameKey: "METAMOEDAS.Punishments.DestinoSensoHumor.Name", effectKey: "METAMOEDAS.Punishments.DestinoSensoHumor.Effect" },
  { id: "combo_siricotico_trumpinho", tier: "greaterChaos", price: 10, nameKey: "METAMOEDAS.Punishments.ComboSiricoticoTrumpinho.Name", effectKey: "METAMOEDAS.Punishments.ComboSiricoticoTrumpinho.Effect" },
  { id: "nem_todo_balanceado", tier: "greaterChaos", price: 10, nameKey: "METAMOEDAS.Punishments.NemTodoBalanceado.Name", effectKey: "METAMOEDAS.Punishments.NemTodoBalanceado.Effect" },
  { id: "chefe_opcional_desnecessario", tier: "greaterChaos", price: 10, nameKey: "METAMOEDAS.Punishments.ChefeOpcionalDesnecessario.Name", effectKey: "METAMOEDAS.Punishments.ChefeOpcionalDesnecessario.Effect" },
  { id: "maldicao_pessima_impressao", tier: "greaterChaos", price: 10, nameKey: "METAMOEDAS.Punishments.MaldicaoPessimaImpressao.Name", effectKey: "METAMOEDAS.Punishments.MaldicaoPessimaImpressao.Effect" },

  // --- 7. TABELA DE CATÁSTROFES SUPREMAS (12-20) ---
  { id: "retorno_do_fdp", tier: "supremeCatastrophe", price: 12, nameKey: "METAMOEDAS.Punishments.RetornoDoFdp.Name", effectKey: "METAMOEDAS.Punishments.RetornoDoFdp.Effect" },
  { id: "siricotico_rei", tier: "supremeCatastrophe", price: 12, nameKey: "METAMOEDAS.Punishments.SiricoticoRei.Name", effectKey: "METAMOEDAS.Punishments.SiricoticoRei.Effect" },
  { id: "trumpinhos_guilda", tier: "supremeCatastrophe", price: 12, nameKey: "METAMOEDAS.Punishments.TrumpinhosGuilda.Name", effectKey: "METAMOEDAS.Punishments.TrumpinhosGuilda.Effect" },
  { id: "profecia_mais_idiota", tier: "supremeCatastrophe", price: 15, nameKey: "METAMOEDAS.Punishments.ProfeciaMaisIdiota.Name", effectKey: "METAMOEDAS.Punishments.ProfeciaMaisIdiota.Effect" },
  { id: "conselho_siricoticos", tier: "supremeCatastrophe", price: 15, nameKey: "METAMOEDAS.Punishments.ConselhoSiricoticos.Name", effectKey: "METAMOEDAS.Punishments.ConselhoSiricoticos.Effect" },
  { id: "metagame_olhou_volta", tier: "supremeCatastrophe", price: 15, nameKey: "METAMOEDAS.Punishments.MetagameOlhouVolta.Name", effectKey: "METAMOEDAS.Punishments.MetagameOlhouVolta.Effect" },
  { id: "catastrofe_administrativa", tier: "supremeCatastrophe", price: 18, nameKey: "METAMOEDAS.Punishments.CatastrofeAdministrativa.Name", effectKey: "METAMOEDAS.Punishments.CatastrofeAdministrativa.Effect" },
  { id: "grande_migracao_siricoticos", tier: "supremeCatastrophe", price: 20, nameKey: "METAMOEDAS.Punishments.GrandeMigracaoSiricoticos.Name", effectKey: "METAMOEDAS.Punishments.GrandeMigracaoSiricoticos.Effect" },
  { id: "mesa_pediu_por_isso", tier: "supremeCatastrophe", price: 20, nameKey: "METAMOEDAS.Punishments.MesaPediuPorIsso.Name", effectKey: "METAMOEDAS.Punishments.MesaPediuPorIsso.Effect" }
];
