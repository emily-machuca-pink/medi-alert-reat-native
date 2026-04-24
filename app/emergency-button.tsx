import { Link, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/shared/ui/themed-text';
import { ThemedView } from '@/shared/ui/themed-view';

function coerceUsername(username: unknown) {
  if (typeof username !== 'string') return null;
  const trimmed = username.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export default function EmergencyButtonScreen() {
  const params = useLocalSearchParams();
  const username = coerceUsername(params.username);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Historial Médico
      </ThemedText>

      <View style={styles.card}>
        <ThemedText type="subtitle">Paciente</ThemedText>
        <ThemedText>
          {username ? `Usuario: ${username}` : 'Sin usuario (falta parámetro)'}
        </ThemedText>
        <ThemedText style={styles.notes}>
          Placeholder: aquí irá la vista real del historial médico.
        </ThemedText>
      </View>

      <View style={styles.links}>
        <Link href="../login">
          <Link.Trigger>
            <ThemedText type="link">Volver al login</ThemedText>
          </Link.Trigger>
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 60, gap: 16 },
  title: { marginBottom: 4 },
  card: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    gap: 6,
  },
  notes: { marginTop: 6 },
  links: { gap: 12 },
});
