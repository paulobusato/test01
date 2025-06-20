import React, {useEffect, useState} from "react";
import {KeyboardAvoidingView, Platform, ScrollView, View} from "react-native";

import {ActivityIndicator, Button, FAB, TextInput, useTheme, Text} from "react-native-paper";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {addSessao, deleteSessao, fetchSessao, updateSessao} from "@/store/slices/sessaoSlice";

import {DatePickerModal, pt, en, registerTranslation, TimePickerModal} from 'react-native-paper-dates'
import {CalendarDate} from "react-native-paper-dates/lib/typescript/Date/Calendar";
import {clearAluno} from "@/store/slices/alunoSlice";
import {clearAtividade} from "@/store/slices/atividadeSlice";
import {clearStatus} from "@/store/slices/statusSlice";
import {clearProcedimento} from "@/store/slices/procedimentoSlice";

registerTranslation('en', en)
registerTranslation('pt-BR', pt)

const EditSessaoScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const params: { id: string } = useLocalSearchParams();
  const router = useRouter();

  const {sessao, loading: loadingSessao} = useAppSelector((state) => state.sessao);

  const {aluno, loading: loadingAluno} = useAppSelector((state) => state.aluno);
  const {atividade, loading: loadingAtividade} = useAppSelector((state) => state.atividade);
  const {status, loading: loadingStatus} = useAppSelector((state) => state.status);
  const {procedimento, loading: loadingProcedimento} = useAppSelector((state) => state.procedimento);

  const [form, setForm] = useState({
    nome: "",
    queixa: "",
    encaminhamento: "",
    atividade: "",
    observacao: "",
    date: "",
    time: "",
    status: "",
    procedimento: "",
  });

  useEffect(() => {
    if (aluno) {
      setForm({
        ...form,
        nome: aluno.nome,
      });
      dispatch(clearAluno())
    }
  }, [dispatch, form, aluno]);

  useEffect(() => {
    if (atividade) {
      setForm({
        ...form,
        atividade: atividade.nome,
      });
      dispatch(clearAtividade())
    }
  }, [dispatch, form, atividade]);

  useEffect(() => {
    if (status) {
      setForm({
        ...form,
        status: status.nome,
      });
      dispatch(clearStatus())
    }
  }, [dispatch, form, status]);

  useEffect(() => {
    if (procedimento) {
      setForm({
        ...form,
        procedimento: procedimento.nome,
      });
      dispatch(clearProcedimento())
    }
  }, [dispatch, form, procedimento]);

  useEffect(() => {
    dispatch(fetchSessao(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (sessao) {
      setForm(sessao);
    }
  }, [sessao]);

  const handleCreation = async () => {
    try {
      // @ts-ignore
      await dispatch(addSessao({
        ...sessao,
        ...form,
      }));
      router.back();
    } catch {
      alert("Ocorreu um erro ao adicionar a sessão.");
    }
  };

  const handleSave = async () => {
    try {

      await dispatch(updateSessao({
        id: params.id,
        // @ts-ignore
        data: {
          ...sessao,
          ...form,
        }
      }));
    } catch {
      alert("Ocorreu um erro ao atualizar a sessão.");
    }
  };

  const handleSaveAndBack = async () => {
    try {
      await dispatch(updateSessao({
        id: params.id,
        // @ts-ignore
        data: {
          ...sessao,
          ...form,
        }
      }));
      router.back();
    } catch {
      alert("Ocorreu um erro ao atualizar a sessão.");
    }
  };

  useEffect(() => {
    // @ts-ignore
    window["handleDelete"] = async () => {
      try {
        await dispatch(deleteSessao(params.id));
        router.back();
      } catch {
        alert("Ocorreu um erro ao deletar a sessão.");
      }
    };

    return () => {
      // @ts-ignore
      delete window["handleDelete"];
    };
  }, [dispatch, params.id, router]);

  /* Data */
  const [date, setDate] = React.useState<CalendarDate | undefined>(undefined);
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
      (params: any) => {
        setOpen(false);
        setDate(params.date);
        setForm({
          ...form,
          date: `${params.date.getDate().toString().padStart(2, '0')}/${(params.date.getMonth() + 1).toString().padStart(2, '0')}/${params.date.getFullYear()}`
        })
      },
      [setOpen, setDate, form]
  );

  /* Hora */
  const [visible, setVisible] = React.useState(false)
  const onDismiss = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onConfirm = React.useCallback(
      (time: any) => {
        setVisible(false);
        setForm({
              ...form,
              time: `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}`,
            },
        );
      },
      [setVisible, form]
  );

  if (loadingSessao || loadingAluno || loadingAtividade || loadingStatus || loadingProcedimento) {
    return (
        <View
            style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.colors.background}}>
          <ActivityIndicator animating={true} size="large" color={theme.colors.primary}/>
        </View>
    );
  }

  return (
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView style={{padding: 16}} contentContainerStyle={{paddingBottom: 100}}
                      keyboardShouldPersistTaps="handled">
            <TextInput
                mode={"outlined"}
                value={form.nome}
                onChangeText={(text) => setForm({...form, nome: text})}
                readOnly={true}
                left={<TextInput.Icon icon="magnify"
                                      onPress={async () => router.push("/aluno/ListAlunoScreen")}/>}
                label="Aluno"
                right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, nome: ""})}/>}
                editable={false}
                style={{marginBottom: 16}}
            />
            <TextInput
                mode={"outlined"}
                value={form.atividade}
                onChangeText={(text) => setForm({...form, atividade: text})}
                readOnly={true}
                left={<TextInput.Icon icon="magnify"
                                      onPress={async () => router.push("/atividade/ListAtividadeScreen")}/>}
                label="Atividade"
                right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, atividade: ""})}/>}
                editable={false}
                style={{marginBottom: 16}}
            />
            <TextInput
                mode={"outlined"}
                value={form.status}
                onChangeText={(text) => setForm({...form, status: text})}
                readOnly={true}
                left={<TextInput.Icon icon="magnify"
                                      onPress={async () => router.push("/status/ListStatusScreen")}/>}
                label="Status"
                right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, status: ""})}/>}
                editable={false}
                style={{marginBottom: 16}}
            />
            <TextInput
                mode={"outlined"}
                value={form.procedimento}
                onChangeText={(text) => setForm({...form, procedimento: text})}
                readOnly={true}
                left={<TextInput.Icon icon="magnify"
                                      onPress={async () => router.push("/procedimento/ListProcedimentoScreen")}/>}
                label="Procedimento"
                right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, procedimento: ""})}/>}
                editable={false}
                style={{marginBottom: 16}}
            />
            <Text variant="labelLarge" style={{marginBottom: 16}}>Agendamento</Text>
            <View style={{marginBottom: 16}}>
              <Button textColor={"#000000"} onPress={() => setOpen(true)} uppercase={false} mode="outlined">
                {form.date ? form.date : "Escolha uma data"}
              </Button>
              <DatePickerModal
                  locale="pt"
                  mode="single"
                  visible={open}
                  onDismiss={onDismissSingle}
                  date={date}
                  onConfirm={onConfirmSingle}
              />
            </View>
            <View style={{marginBottom: 16}}>
              <Button textColor={"#000000"} onPress={() => setVisible(true)} uppercase={false} mode="outlined">
                {form.time ? form.time : "Escolha um horário"}
              </Button>
              <TimePickerModal
                  visible={visible}
                  onDismiss={onDismiss}
                  onConfirm={onConfirm}
                  hours={12}
                  minutes={14}
              />
            </View>
            <TextInput
                mode={"outlined"}
                value={form.queixa}
                onChangeText={(text) => setForm({...form, queixa: text})}
                label="Queixa"
                right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, queixa: ""})}/>}
                multiline={true}
                numberOfLines={5}
                style={{marginBottom: 16, minHeight: 100}}
            />
            <TextInput
                mode={"outlined"}
                value={form.encaminhamento}
                onChangeText={(text) => setForm({...form, encaminhamento: text})}
                label="Encaminhamento"
                right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, encaminhamento: ""})}/>}
                multiline={true}
                numberOfLines={5}
                style={{marginBottom: 16, minHeight: 100}}
            />
            <TextInput
                mode={"outlined"}
                value={form.observacao}
                onChangeText={(text) => setForm({...form, observacao: text})}
                label="Observação"
                right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, observacao: ""})}/>}
                multiline={true}
                numberOfLines={5}
                style={{marginBottom: 16, minHeight: 100}}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        <FAB
            icon="check"
            style={{
              position: "absolute",
              margin: 16,
              right: 0,
              bottom: 0,
            }}
            onPress={params.id ? handleSaveAndBack : handleCreation}
        />
      </View>
  );
};

export default EditSessaoScreen;
