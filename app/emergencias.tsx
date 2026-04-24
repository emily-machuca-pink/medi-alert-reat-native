import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/shared/ui/themed-text';
import { ThemedView } from '@/shared/ui/themed-view';

export default function EmergenciasScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Emergencias
      </ThemedText>
      <ThemedText style={styles.body}>
        Vista placeholder para el rol <ThemedText type="defaultSemiBold">Paramédico</ThemedText>.
      </ThemedText>

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
  container: { flex: 1, padding: 16, paddingTop: 60 },
  title: { marginBottom: 12 },
  body: { marginBottom: 16 },
  links: { gap: 12 },
});
