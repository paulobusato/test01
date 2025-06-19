import {Stack} from "expo-router";
import {
  MD3LightTheme as DefaultTheme,
  IconButton,
  PaperProvider,
} from "react-native-paper";
import {SafeAreaProvider} from "react-native-safe-area-context";

import "@/global.css";

import {Provider} from 'react-redux';
import {store} from '@/store/store';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1976d2",
    background: "#FFFFFF",
    surface: "#FFFFFF",
    onSurface: "#000000",
  },
};

export default function RootLayout() {
  return (
      <Provider store={store}>
        <SafeAreaProvider>
          <PaperProvider theme={theme}>
            <Stack>
              <Stack.Screen
                  name="index"
                  options={{
                    title: "Home",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                  }}
              />
              <Stack.Screen
                  name="aluno/ListAlunoScreen"
                  options={{
                    title: "Alunos",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                  }}
              />
              <Stack.Screen
                  name="aluno/EditAlunoScreen"
                  options={({route}) => ({
                    title: "Aluno",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerRight: () => {
                      // @ts-ignore
                      const {id} = route.params || {};
                      if (!id) return null;

                      return (
                          <IconButton
                              icon="trash-can-outline"
                              size={24}
                              onPress={() => {
                                // @ts-ignore
                                if (window["handleDelete"]) {
                                  // @ts-ignore
                                  window["handleDelete"]();
                                } else {
                                  console.log("handleDelete not initialized");
                                }
                              }}
                          />
                      );
                    }
                  })}
              />
              <Stack.Screen
                  name="responsavel/ListResponsavelScreen"
                  options={{
                    title: "Responsáveis",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                  }}
              />
              <Stack.Screen
                  name="responsavel/EditResponsavelScreen"
                  options={({route}) => ({
                    title: "Responsável",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerRight: () => {
                      // @ts-ignore
                      const {id} = route.params || {};
                      if (!id) return null;

                      return (
                          <IconButton
                              icon="trash-can-outline"
                              size={24}
                              onPress={() => {
                                // @ts-ignore
                                if (window["handleDelete"]) {
                                  // @ts-ignore
                                  window["handleDelete"]();
                                } else {
                                  console.log("handleDelete not initialized");
                                }
                              }}
                          />
                      );
                    }
                  })}
              />
              <Stack.Screen
                  name="sessao/ListSessaoScreen"
                  options={{
                    title: "Sessões",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                  }}
              />
              <Stack.Screen
                  name="sessao/EditSessaoScreen"
                  options={({route}) => ({
                    title: "Sessão",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerRight: () => {
                      // @ts-ignore
                      const {id} = route.params || {};
                      if (!id) return null;

                      return (
                          <IconButton
                              icon="trash-can-outline"
                              size={24}
                              onPress={() => {
                                // @ts-ignore
                                if (window["handleDelete"]) {
                                  // @ts-ignore
                                  window["handleDelete"]();
                                } else {
                                  console.log("handleDelete not initialized");
                                }
                              }}
                          />
                      );
                    }
                  })}
              />
              <Stack.Screen
                  name="atividade/ListAtividadeScreen"
                  options={{
                    title: "Atividades",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                  }}
              />
              <Stack.Screen
                  name="atividade/EditAtividadeScreen"
                  options={({route}) => ({
                    title: "Atividade",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerRight: () => {
                      // @ts-ignore
                      const {id} = route.params || {};
                      if (!id) return null;

                      return (
                          <IconButton
                              icon="trash-can-outline"
                              size={24}
                              onPress={() => {
                                // @ts-ignore
                                if (window["handleDelete"]) {
                                  // @ts-ignore
                                  window["handleDelete"]();
                                } else {
                                  console.log("handleDelete not initialized");
                                }
                              }}
                          />
                      );
                    }
                  })}
              />
              <Stack.Screen
                  name="logradouro/ListLogradouroScreen"
                  options={{
                    title: "Logradouros",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                  }}
              />
              <Stack.Screen
                  name="logradouro/EditLogradouroScreen"
                  options={({route}) => ({
                    title: "Logradouro",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerRight: () => {
                      // @ts-ignore
                      const {id} = route.params || {};
                      if (!id) return null;

                      return (
                          <IconButton
                              icon="trash-can-outline"
                              size={24}
                              onPress={() => {
                                // @ts-ignore
                                if (window["handleDelete"]) {
                                  // @ts-ignore
                                  window["handleDelete"]();
                                } else {
                                  console.log("handleDelete not initialized");
                                }
                              }}
                          />
                      );
                    }
                  })}
              />
              <Stack.Screen
                  name="bairro/ListBairroScreen"
                  options={{
                    title: "Bairros",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                  }}
              />
              <Stack.Screen
                  name="bairro/EditBairroScreen"
                  options={({route}) => ({
                    title: "Bairro",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerRight: () => {
                      // @ts-ignore
                      const {id} = route.params || {};
                      if (!id) return null;

                      return (
                          <IconButton
                              icon="trash-can-outline"
                              size={24}
                              onPress={() => {
                                // @ts-ignore
                                if (window["handleDelete"]) {
                                  // @ts-ignore
                                  window["handleDelete"]();
                                } else {
                                  console.log("handleDelete not initialized");
                                }
                              }}
                          />
                      );
                    }
                  })}
              />
              <Stack.Screen
                  name="cidade/ListCidadeScreen"
                  options={{
                    title: "Cidades",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                  }}
              />
              <Stack.Screen
                  name="cidade/EditCidadeScreen"
                  options={({route}) => ({
                    title: "Cidade",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerRight: () => {
                      // @ts-ignore
                      const {id} = route.params || {};
                      if (!id) return null;

                      return (
                          <IconButton
                              icon="trash-can-outline"
                              size={24}
                              onPress={() => {
                                // @ts-ignore
                                if (window["handleDelete"]) {
                                  // @ts-ignore
                                  window["handleDelete"]();
                                } else {
                                  console.log("handleDelete not initialized");
                                }
                              }}
                          />
                      );
                    }
                  })}
              />
              <Stack.Screen
                  name="estado/ListEstadoScreen"
                  options={{
                    title: "Estados",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                  }}
              />
              <Stack.Screen
                  name="estado/EditEstadoScreen"
                  options={({route}) => ({
                    title: "Estado",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerRight: () => {
                      // @ts-ignore
                      const {id} = route.params || {};
                      if (!id) return null;

                      return (
                          <IconButton
                              icon="trash-can-outline"
                              size={24}
                              onPress={() => {
                                // @ts-ignore
                                if (window["handleDelete"]) {
                                  // @ts-ignore
                                  window["handleDelete"]();
                                } else {
                                  console.log("handleDelete not initialized");
                                }
                              }}
                          />
                      );
                    }
                  })}
              />
              <Stack.Screen
                  name="escola/ListEscolaScreen"
                  options={{
                    title: "Escolas",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                  }}
              />
              <Stack.Screen
                  name="escola/EditEscolaScreen"
                  options={({route}) => ({
                    title: "Escola",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerRight: () => {
                      // @ts-ignore
                      const {id} = route.params || {};
                      if (!id) return null;

                      return (
                          <IconButton
                              icon="trash-can-outline"
                              size={24}
                              onPress={() => {
                                // @ts-ignore
                                if (window["handleDelete"]) {
                                  // @ts-ignore
                                  window["handleDelete"]();
                                } else {
                                  console.log("handleDelete not initialized");
                                }
                              }}
                          />
                      );
                    }
                  })}
              />
              <Stack.Screen
                  name="turno/ListTurnoScreen"
                  options={{
                    title: "Turnos",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                  }}
              />
              <Stack.Screen
                  name="turno/EditTurnoScreen"
                  options={({route}) => ({
                    title: "Turno",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerRight: () => {
                      // @ts-ignore
                      const {id} = route.params || {};
                      if (!id) return null;

                      return (
                          <IconButton
                              icon="trash-can-outline"
                              size={24}
                              onPress={() => {
                                // @ts-ignore
                                if (window["handleDelete"]) {
                                  // @ts-ignore
                                  window["handleDelete"]();
                                } else {
                                  console.log("handleDelete not initialized");
                                }
                              }}
                          />
                      );
                    }
                  })}
              />
              <Stack.Screen
                  name="nacionalidade/ListNacionalidadeScreen"
                  options={{
                    title: "Nacionalidades",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                  }}
              />
              <Stack.Screen
                  name="nacionalidade/EditNacionalidadeScreen"
                  options={({route}) => ({
                    title: "Nacionalidade",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerRight: () => {
                      // @ts-ignore
                      const {id} = route.params || {};
                      if (!id) return null;

                      return (
                          <IconButton
                              icon="trash-can-outline"
                              size={24}
                              onPress={() => {
                                // @ts-ignore
                                if (window["handleDelete"]) {
                                  // @ts-ignore
                                  window["handleDelete"]();
                                } else {
                                  console.log("handleDelete not initialized");
                                }
                              }}
                          />
                      );
                    }
                  })}
              />
              <Stack.Screen
                  name="procedimento/ListProcedimentoScreen"
                  options={{
                    title: "Procedimentos",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                  }}
              />
              <Stack.Screen
                  name="procedimento/EditProcedimentoScreen"
                  options={({route}) => ({
                    title: "Procedimento",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerRight: () => {
                      // @ts-ignore
                      const {id} = route.params || {};
                      if (!id) return null;

                      return (
                          <IconButton
                              icon="trash-can-outline"
                              size={24}
                              onPress={() => {
                                // @ts-ignore
                                if (window["handleDelete"]) {
                                  // @ts-ignore
                                  window["handleDelete"]();
                                } else {
                                  console.log("handleDelete not initialized");
                                }
                              }}
                          />
                      );
                    }
                  })}
              />
              <Stack.Screen
                  name="status/ListStatusScreen"
                  options={{
                    title: "Status",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                  }}
              />
              <Stack.Screen
                  name="status/EditStatusScreen"
                  options={({route}) => ({
                    title: "Status",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerRight: () => {
                      // @ts-ignore
                      const {id} = route.params || {};
                      if (!id) return null;

                      return (
                          <IconButton
                              icon="trash-can-outline"
                              size={24}
                              onPress={() => {
                                // @ts-ignore
                                if (window["handleDelete"]) {
                                  // @ts-ignore
                                  window["handleDelete"]();
                                } else {
                                  console.log("handleDelete not initialized");
                                }
                              }}
                          />
                      );
                    }
                  })}
              />
            </Stack>
          </PaperProvider>
        </SafeAreaProvider>
      </Provider>
  );
}
