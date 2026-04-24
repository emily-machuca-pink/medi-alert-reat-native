import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Alert, StyleSheet, View } from "react-native";

import { LoginCard } from "@/shared/ui/login-card";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.decor}>
        <MaterialCommunityIcons
          name="test-tube"
          size={64}
          color="rgba(255,255,255,0.18)"
        />
      </View>
      <View style={[styles.decor, styles.decorTopRight]}>
        <MaterialCommunityIcons
          name="wheelchair-accessibility"
          size={64}
          color="rgba(255,255,255,0.18)"
        />
      </View>
      <View style={[styles.decor, styles.decorMidLeft]}>
        <MaterialCommunityIcons
          name="medical-bag"
          size={68}
          color="rgba(255,255,255,0.18)"
        />
      </View>
      <View style={[styles.decor, styles.decorMidRight]}>
        <MaterialCommunityIcons
          name="stethoscope"
          size={72}
          color="rgba(255,255,255,0.18)"
        />
      </View>

      <View style={styles.center}>
        <LoginCard
          epsName="Nombre de la EPS"
          onForgotPasswordPress={() =>
            Alert.alert("Recuperar contraseña", "Pendiente")
          }
          onSubmit={(payload) =>
            Alert.alert(
              "Login (pendiente)",
              `Tipo: ${payload.documentType ?? "—"}\nDocumento: ${payload.documentNumber}`,
            )
          }
        />
      </View>

      <View style={styles.logoWrap}>
        <Image
          source={require("@/assets/images/medi-shield.png")}
          style={styles.logo}
          contentFit="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2F78B8",
    paddingHorizontal: 18,
  },
  decor: {
    position: "absolute",
    top: 80,
    left: 22,
  },
  decorTopRight: { top: 90, right: 24, left: undefined },
  decorMidLeft: { top: 360, left: 10 },
  decorMidRight: { top: 390, right: 18, left: undefined },
  center: {
    flex: 1,
    justifyContent: "center",
  },
  logoWrap: {
    alignItems: "center",
    paddingBottom: 32,
  },
  logo: {
    width: 220,
    height: 220,
  },
});
