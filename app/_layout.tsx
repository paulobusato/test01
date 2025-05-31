import { Stack } from "expo-router";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "@/global.css";

// Optional: Define a custom theme or use the default
const theme = {
  ...DefaultTheme,
  // Add your custom theme properties here if needed
  // colors: {
  //   ...DefaultTheme.colors,
  //   primary: 'tomato',
  //   accent: 'yellow',
  // },
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
              options={{
                title: "Aluno",
                headerTitleAlign: "center",
                headerShadowVisible: false,
              }}
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
              options={{
                title: "Responsável",
                headerTitleAlign: "center",
                headerShadowVisible: false,
              }}
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
              options={{
                title: "Sessão",
                headerTitleAlign: "center",
                headerShadowVisible: false,
              }}
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
              options={{
                title: "Atividade",
                headerTitleAlign: "center",
                headerShadowVisible: false,
              }}
          />
          <Stack.Screen
              name="endereco/ListEnderecoScreen"
              options={{
                title: "Endereços",
                headerTitleAlign: "center",
                headerShadowVisible: false,
              }}
          />
          <Stack.Screen
              name="endereco/EditEnderecoScreen"
              options={{
                title: "Endereço",
                headerTitleAlign: "center",
                headerShadowVisible: false,
              }}
          />
        </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
