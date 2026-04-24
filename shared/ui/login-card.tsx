import { useMemo, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export type DocumentType = { label: string; value: string };

export type LoginCardSubmitPayload = {
  documentType: string | null;
  documentNumber: string;
  password: string;
};

export type LoginCardProps = {
  epsName?: string;
  documentTypes?: DocumentType[];
  onForgotPasswordPress?: () => void;
  onSubmit?: (payload: LoginCardSubmitPayload) => void;
};

export function LoginCard({
  epsName = "Nombre de la EPS",
  documentTypes,
  onForgotPasswordPress,
  onSubmit,
}: LoginCardProps) {
  const resolvedDocumentTypes = useMemo<DocumentType[]>(
    () =>
      documentTypes ?? [
        { label: "Cédula de ciudadanía (CC)", value: "CC" },
        { label: "Tarjeta de identidad (TI)", value: "TI" },
        { label: "Cédula de extranjería (CE)", value: "CE" },
        { label: "Pasaporte (PA)", value: "PA" },
      ],
    [documentTypes],
  );

  const [docType, setDocType] = useState<string | null>(null);
  const [docNumber, setDocNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [docTypeModalVisible, setDocTypeModalVisible] = useState(false);

  const docTypeLabel = useMemo(() => {
    if (!docType) return null;
    return (
      resolvedDocumentTypes.find((d) => d.value === docType)?.label ?? docType
    );
  }, [docType, resolvedDocumentTypes]);

  const submit = () => {
    onSubmit?.({
      documentType: docType,
      documentNumber: docNumber.trim(),
      password,
    });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Inicia Sesión</Text>
      <Text style={styles.subtitle}>{epsName}</Text>

      <View style={styles.form}>
        <Pressable
          accessibilityRole="button"
          onPress={() => setDocTypeModalVisible(true)}
          style={styles.field}
        >
          <Text
            style={[styles.fieldText, !docTypeLabel && styles.placeholderText]}
          >
            {docTypeLabel ?? "Tipo de documento"}
          </Text>
          <Text style={styles.chevron}>⌄</Text>
        </Pressable>

        <TextInput
          defaultValue={docNumber}
          onChangeText={setDocNumber}
          placeholder="Numero de documento"
          inputMode="numeric"
          autoCorrect={false}
          returnKeyType="next"
          style={styles.input}
        />

        <TextInput
          defaultValue={password}
          onChangeText={setPassword}
          placeholder="Contraseña"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
          returnKeyType="go"
          onSubmitEditing={submit}
          style={styles.input}
        />
      </View>

      <View style={styles.actionsRow}>
        <Pressable
          accessibilityRole="button"
          onPress={onForgotPasswordPress}
          disabled={!onForgotPasswordPress}
          style={({ pressed }) => [
            styles.forgot,
            pressed && styles.forgotPressed,
          ]}
        >
          <Text style={styles.forgotText}>¿Has olvidado tu contraseña?</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={submit}
          style={({ pressed }) => [
            styles.submit,
            pressed && styles.submitPressed,
          ]}
        >
          <Text style={styles.submitText}>Inicio de sesión</Text>
        </Pressable>
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={docTypeModalVisible}
        onRequestClose={() => setDocTypeModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setDocTypeModalVisible(false)}
        >
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalTitle}>Tipo de documento</Text>
            <View style={styles.modalList}>
              {resolvedDocumentTypes.map((d) => (
                <Pressable
                  key={d.value}
                  accessibilityRole="button"
                  onPress={() => {
                    setDocType(d.value);
                    setDocTypeModalVisible(false);
                  }}
                  style={({ pressed }) => [
                    styles.modalItem,
                    pressed && styles.modalItemPressed,
                  ]}
                >
                  <Text style={styles.modalItemText}>{d.label}</Text>
                </Pressable>
              ))}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderCurve: "continuous",
    paddingHorizontal: 18,
    paddingVertical: 22,
    backgroundColor: "#FFFFFF",
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    ...(Platform.OS === "android"
      ? { elevation: 3 }
      : {
          shadowColor: "#000",
          shadowOpacity: 0.12,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 8 },
        }),
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1E73E8",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: "600",
    color: "#1E73E8",
    textAlign: "center",
    opacity: 0.9,
  },
  form: {
    marginTop: 18,
    gap: 10,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 999,
    borderCurve: "continuous",
    backgroundColor: "#EFEFEF",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  fieldText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 14,
    flex: 1,
    paddingRight: 10,
  },
  placeholderText: {
    color: "#8A8A8A",
    fontWeight: "500",
  },
  chevron: {
    color: "#3B82F6",
    fontSize: 18,
    marginTop: -2,
  },
  input: {
    borderRadius: 999,
    borderCurve: "continuous",
    backgroundColor: "#EFEFEF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },
  actionsRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  forgot: {
    flex: 1,
    paddingVertical: 8,
  },
  forgotPressed: {
    opacity: 0.8,
  },
  forgotText: {
    fontSize: 12,
    color: "#111",
    fontWeight: "700",
  },
  submit: {
    backgroundColor: "#1E73E8",
    borderRadius: 999,
    borderCurve: "continuous",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  submitPressed: {
    opacity: 0.9,
  },
  submitText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "800",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
  modalCard: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 20,
    borderCurve: "continuous",
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
    marginBottom: 10,
  },
  modalList: {
    gap: 8,
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderCurve: "continuous",
    backgroundColor: "#F3F4F6",
  },
  modalItemPressed: {
    opacity: 0.9,
  },
  modalItemText: {
    color: "#111",
    fontWeight: "700",
  },
});
