import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";

const cores = {
  fundo: "#080F3D",
  topo: "#101952",
  card: "#18245F",
  rosa: "#F5164A",
  branco: "#FFFFFF",
  cinza: "#AAB3D7",
  verde: "#35D47A",
};

const servidores = [
  {
    nome: "Lendários",
    jogo: "League of Legends",
    categoria: "Ranqueado",
    horario: "18/06 às 21:00h",
    imagem: require("../../assets/jogo-lendarios.png"),
  },
  {
    nome: "Yeah, boy",
    jogo: "Counter-Strike",
    categoria: "Diversão",
    horario: "23/06 às 19:00h",
    imagem: require("../../assets/jogo-yeahboy.png"),
  },
  {
    nome: "Rumo ao topo",
    jogo: "CS:GO",
    categoria: "Ranqueado",
    horario: "20/06 às 09:00h",
    imagem: require("../../assets/jogo-rumo.png"),
  },
  {
    nome: "Bora queimar tudo",
    jogo: "Apex Legends",
    categoria: "Ranqueado",
    horario: "21/06 às 14:20h",
    imagem: require("../../assets/jogo-bora.png"),
  },
  {
    nome: "Valorosos",
    jogo: "Valorant",
    categoria: "Diversão",
    horario: "22/06 às 18:30h",
    imagem: require("../../assets/jogo-valorosos.png"),
  },
];

export default function Index() {
  const [tela, setTela] = useState("login");
  const [servidor, setServidor] = useState(servidores[0]);
  const [categoria, setCategoria] = useState("Ranqueado");

  function abrirDetalhes(item: typeof servidores[0]) {
    setServidor(item);
    setCategoria(item.categoria);
    setTela("detalhes");
  }

  return (
    <SafeAreaView style={styles.safe}>
      {tela === "login" && (
        <Login onEntrar={() => setTela("home")} />
      )}

      {tela === "home" && (
        <Home
          onDetalhes={abrirDetalhes}
          onAgendar={() => setTela("agendar")}
        />
      )}

      {tela === "detalhes" && (
        <Detalhes
          servidor={servidor}
          onVoltar={() => setTela("home")}
          onAgendar={() => setTela("agendar")}
        />
      )}

      {tela === "agendar" && (
        <Agendar
          servidor={servidor}
          categoria={categoria}
          setCategoria={setCategoria}
          onVoltar={() => setTela("detalhes")}
        />
      )}
    </SafeAreaView>
  );
}

function Login({ onEntrar }: { onEntrar: () => void }) {
  return (
    <View style={styles.login}>
      <View style={styles.loginImagem}>
        <Text style={{ fontSize: 90 }}>🎮</Text>
        <Text style={styles.controle}>⚔️</Text>
      </View>

      <Text style={styles.loginTitulo}>
        Conecte-se{"\n"}e organize suas{"\n"}jogatinas
      </Text>

      <Text style={styles.loginTexto}>
        Crie grupos para jogar seus games{"\n"}
        favoritos com seus amigos
      </Text>

      <TouchableOpacity style={styles.botao} onPress={onEntrar}>
        <Text style={styles.botaoTexto}>◉  Entrar com Discord</Text>
      </TouchableOpacity>
    </View>
  );
}

function Cabecalho({
  titulo,
  onVoltar,
}: {
  titulo: string;
  onVoltar: () => void;
}) {
  return (
    <View style={styles.cabecalho}>
      <TouchableOpacity onPress={onVoltar}>
        <Text style={styles.voltar}>‹</Text>
      </TouchableOpacity>
      <Text style={styles.tituloCabecalho}>{titulo}</Text>
    </View>
  );
}

function Home({
  onDetalhes,
}: {
  onDetalhes: (item: typeof servidores[0]) => void;
  onAgendar: () => void;
}) {
  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.home}>
      <View style={styles.usuario}>
        <Image
          source={require("../../assets/avatar-tiago.png")}
          style={styles.avatar}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.nomeUsuario}>Olá, Tiago</Text>
          <Text style={styles.subTexto}>Hoje é dia de vitória</Text>
        </View>

        <View style={styles.mais}>
          <Text style={{ color: cores.branco, fontSize: 24 }}>+</Text>
        </View>
      </View>

      <View style={styles.categoriasHome}>
        <Categoria icone="🏆" texto="Ranqueado" />
        <Categoria icone="⚔️" texto="Duelo 1x1" />
        <Categoria icone="🎅" texto="Diversão" />
      </View>

      <View style={styles.linhaTitulo}>
        <Text style={styles.tituloSecao}>Partidas agendadas</Text>
        <Text style={styles.subTexto}>Total 6</Text>
      </View>

      {servidores.map((item) => (
        <TouchableOpacity
          key={item.nome}
          style={styles.partida}
          onPress={() => onDetalhes(item)}
        >
          <Image source={item.imagem} style={styles.imagemJogo} />

          <View style={{ flex: 1 }}>
            <Text style={styles.nomePartida}>{item.nome}</Text>
            <Text style={styles.horario}>{item.horario}</Text>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.subTexto}>{item.categoria}</Text>
            <Text style={styles.anfitriao}>♟ Anfitrião</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function Categoria({
  icone,
  texto,
}: {
  icone: string;
  texto: string;
}) {
  return (
    <View style={styles.categoria}>
      <Text style={{ fontSize: 23 }}>{icone}</Text>
      <Text style={styles.categoriaTexto}>{texto}</Text>
    </View>
  );
}

function Detalhes({
  servidor,
  onVoltar,
  onAgendar,
}: {
  servidor: typeof servidores[0];
  onVoltar: () => void;
  onAgendar: () => void;
}) {
  const jogadores = [
    ["Tiago Luchtenberg", "Disponível", require("../../assets/avatar-tiago.png")],
    ["Rodrigo Gonçalves", "Ocupado", require("../../assets/avatar-rodrigo.png")],
    ["Diego Fernandes", "Ocupado", require("../../assets/avatar-diego.png")],
  ];

  return (
    <View style={styles.tela}>
      <Cabecalho titulo="Detalhes" onVoltar={onVoltar} />

      <ScrollView contentContainerStyle={styles.detalhes}>
        <Image
          source={require("../../assets/banner-lendarios.png")}
          style={styles.banner}
        />

        <View style={styles.bannerTexto}>
          <Text style={styles.bannerTitulo}>{servidor.nome}</Text>
          <Text style={styles.bannerDescricao}>
            É hoje que vamos chegar ao challenger sem perder uma partida da md10
          </Text>
        </View>

        <View style={styles.jogadoresTitulo}>
          <Text style={styles.label}>Jogadores</Text>
          <Text style={styles.subTexto}>Total 3</Text>
        </View>

        {jogadores.map((jogador) => (
          <View style={styles.jogador} key={jogador[0]}>
            <Image source={jogador[2]} style={styles.avatarPequeno} />

            <View>
              <Text style={styles.nomeJogador}>{jogador[0]}</Text>
              <Text
                style={{
                  color:
                    jogador[1] === "Disponível"
                      ? cores.verde
                      : cores.rosa,
                  fontSize: 7,
                }}
              >
                • {jogador[1]}
              </Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.botao} onPress={onAgendar}>
          <Text style={styles.botaoTexto}>◉  Entrar na partida</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function Agendar({
  servidor,
  categoria,
  setCategoria,
  onVoltar,
}: {
  servidor: typeof servidores[0];
  categoria: string;
  setCategoria: (valor: string) => void;
  onVoltar: () => void;
}) {
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [hora, setHora] = useState("");
  const [minuto, setMinuto] = useState("");
  const [descricao, setDescricao] = useState("");

  function confirmar() {
    Alert.alert("Agendamento", "Partida agendada!");
  }

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.agendar}>
      <Cabecalho titulo="Agendar partida" onVoltar={onVoltar} />

      <Text style={styles.label}>Categoria</Text>

      <View style={styles.categoriasAgendar}>
        <BotaoCategoria
          texto="Ranqueado"
          icone="🏆"
          ativo={categoria === "Ranqueado"}
          onPress={() => setCategoria("Ranqueado")}
        />

        <BotaoCategoria
          texto="Duelo 1x1"
          icone="⚔️"
          ativo={categoria === "Duelo 1x1"}
          onPress={() => setCategoria("Duelo 1x1")}
        />

        <BotaoCategoria
          texto="Diversão"
          icone="🎅"
          ativo={categoria === "Diversão"}
          onPress={() => setCategoria("Diversão")}
        />
      </View>

      <Text style={styles.label}>Servidor</Text>

      <View style={styles.servidor}>
        <Image source={servidor.imagem} style={styles.imagemServidor} />

        <View style={{ flex: 1 }}>
          <Text style={styles.nomePartida}>{servidor.nome}</Text>
          <Text style={styles.subTexto}>{servidor.jogo}</Text>
        </View>

        <Text style={styles.check}>✓</Text>
      </View>

      <View style={styles.linhaLabels}>
        <Text style={styles.label}>Dia e mês</Text>
        <Text style={styles.label}>Horário</Text>
      </View>

      <View style={styles.inputs}>
        <Campo valor={dia} mudar={setDia} placeholder="22" />
        <Campo valor={mes} mudar={setMes} placeholder="06" />
        <View style={{ width: 20 }} />
        <Campo valor={hora} mudar={setHora} placeholder="19" />
        <Campo valor={minuto} mudar={setMinuto} placeholder="30" />
      </View>

      <View style={styles.linhaTitulo}>
        <Text style={styles.label}>Descrição</Text>
        <Text style={styles.subTexto}>Máx. 100 caracteres</Text>
      </View>

      <TextInput
        style={styles.descricao}
        value={descricao}
        onChangeText={setDescricao}
        multiline
        maxLength={100}
        placeholder="É hoje que vamos chegar ao challenger sem perder uma partida da md10"
        placeholderTextColor="#7782B5"
      />

      <TouchableOpacity style={styles.botao} onPress={confirmar}>
        <Text style={styles.botaoTexto}>Agendar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Campo({
  valor,
  mudar,
  placeholder,
}: {
  valor: string;
  mudar: (valor: string) => void;
  placeholder: string;
}) {
  return (
    <TextInput
      style={styles.input}
      value={valor}
      onChangeText={mudar}
      placeholder={placeholder}
      placeholderTextColor="#7782B5"
      keyboardType="numeric"
      maxLength={2}
    />
  );
}

function BotaoCategoria({
  texto,
  icone,
  ativo,
  onPress,
}: {
  texto: string;
  icone: string;
  ativo: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.botaoCategoria, ativo && styles.botaoCategoriaAtivo]}
      onPress={onPress}
    >
      <Text style={{ fontSize: 23 }}>{icone}</Text>
      <Text style={styles.categoriaTexto}>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.fundo },
  tela: { flex: 1, backgroundColor: cores.fundo },

  login: {
    flex: 1,
    backgroundColor: cores.fundo,
    alignItems: "center",
    justifyContent: "center",
    padding: 22,
  },
  loginImagem: {
    height: 205,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  controle: { position: "absolute", right: 25, bottom: 20, fontSize: 42 },
  loginTitulo: {
    color: cores.branco,
    borderWidth: 2,
    borderColor: cores.rosa,
    width: "100%",
    textAlign: "center",
    fontSize: 21,
    fontWeight: "800",
    paddingVertical: 5,
  },
  loginTexto: {
    color: cores.cinza,
    textAlign: "center",
    fontSize: 10,
    lineHeight: 16,
    margin: 10,
  },
  botao: {
    height: 45,
    backgroundColor: cores.rosa,
    borderRadius: 5,
    width: "92%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  botaoTexto: {
    color: cores.branco,
    fontWeight: "700",
    fontSize: 11,
  },

  cabecalho: {
    height: 54,
    backgroundColor: cores.topo,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  voltar: { color: cores.branco, fontSize: 30, marginRight: 12 },
  tituloCabecalho: { color: cores.branco, fontWeight: "700", fontSize: 12 },

  home: { padding: 15, paddingBottom: 25 },
  usuario: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  avatar: { width: 40, height: 40, borderRadius: 7, marginRight: 10 },
  nomeUsuario: { color: cores.branco, fontWeight: "700", fontSize: 14 },
  subTexto: { color: cores.cinza, fontSize: 8, marginTop: 3 },
  mais: {
    width: 38,
    height: 38,
    backgroundColor: cores.rosa,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  categoriasHome: { flexDirection: "row", marginBottom: 22 },
  categoria: {
    flex: 1,
    height: 70,
    backgroundColor: cores.card,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  categoriaTexto: { color: cores.branco, fontSize: 8 },
  linhaTitulo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  tituloSecao: { color: cores.branco, fontWeight: "700", fontSize: 11 },

  partida: {
    backgroundColor: cores.card,
    borderRadius: 6,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },
  imagemJogo: { width: 42, height: 42, borderRadius: 5, marginRight: 9 },
  nomePartida: { color: cores.branco, fontWeight: "700", fontSize: 10 },
  horario: { color: cores.cinza, fontSize: 8, marginTop: 4 },
  anfitriao: { color: cores.rosa, fontSize: 7, marginTop: 3 },

  detalhes: { paddingBottom: 25 },
  banner: { width: "100%", height: 155 },
  bannerTexto: {
    padding: 14,
    marginTop: -68,
    minHeight: 68,
    backgroundColor: "rgba(8,15,61,0.55)",
  },
  bannerTitulo: { color: cores.branco, fontSize: 15, fontWeight: "800" },
  bannerDescricao: { color: cores.branco, fontSize: 8, marginTop: 4 },
  jogadoresTitulo: {
    marginTop: 25,
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    color: cores.branco,
    fontWeight: "700",
    fontSize: 9,
    marginHorizontal: 15,
    marginTop: 12,
    marginBottom: 7,
  },
  jogador: {
    marginHorizontal: 15,
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: "#202A64",
    flexDirection: "row",
    alignItems: "center",
  },
  avatarPequeno: { width: 32, height: 32, borderRadius: 5, marginRight: 9 },
  nomeJogador: { color: cores.branco, fontSize: 9, fontWeight: "600" },

  agendar: { paddingBottom: 30 },
  categoriasAgendar: { flexDirection: "row", paddingHorizontal: 15 },
  botaoCategoria: {
    flex: 1,
    height: 72,
    backgroundColor: cores.card,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    borderWidth: 1,
    borderColor: cores.card,
  },
  botaoCategoriaAtivo: { borderColor: cores.rosa },

  servidor: {
    marginHorizontal: 15,
    backgroundColor: cores.card,
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  imagemServidor: { width: 40, height: 40, borderRadius: 5, marginRight: 9 },
  check: { color: cores.rosa, fontSize: 20, fontWeight: "800" },

  linhaLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 15,
  },
  inputs: {
    flexDirection: "row",
    marginHorizontal: 15,
    alignItems: "center",
  },
  input: {
    width: 42,
    height: 40,
    backgroundColor: cores.card,
    color: cores.branco,
    borderRadius: 5,
    textAlign: "center",
    marginRight: 5,
    fontSize: 10,
  },
  descricao: {
    marginHorizontal: 15,
    minHeight: 95,
    backgroundColor: cores.card,
    borderRadius: 5,
    color: cores.branco,
    padding: 10,
    textAlignVertical: "top",
    fontSize: 9,
  },
});
