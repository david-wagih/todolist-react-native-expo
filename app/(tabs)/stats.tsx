import { StyleSheet, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { FadeInUp } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Header } from "@/components/ui/Header";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function StatsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ThemedView style={styles.container}>
      <Header 
        title="Statistics" 
        subtitle="Overview"
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.statsGrid}>
          {[
            { number: '12', label: 'Tasks Today' },
            { number: '85%', label: 'Completion Rate' },
            { number: '4', label: 'Categories' },
            { number: '28', label: 'Total Tasks' },
          ].map((stat, index) => (
            <Animated.View 
              key={stat.label}
              entering={FadeInUp.delay(index * 100)}
              style={[
                styles.statCard,
                {
                  backgroundColor: Colors[colorScheme ?? 'light'].card,
                  borderColor: Colors[colorScheme ?? 'light'].cardBorder,
                }
              ]}
            >
              <ThemedView style={styles.statContent}>
                <ThemedText style={styles.statNumber}>{stat.number}</ThemedText>
                <ThemedText style={styles.statLabel}>{stat.label}</ThemedText>
              </ThemedView>
            </Animated.View>
          ))}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 140 : 120,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  statCard: {
    width: '47%',
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    aspectRatio: 1.2,
  },
  statContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: -1,
  },
  statLabel: {
    fontSize: 16,
    opacity: 0.6,
    textAlign: 'center',
  },
}); 