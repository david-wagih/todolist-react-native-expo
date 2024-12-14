import { StyleSheet, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { FadeInUp } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Header } from "@/components/ui/Header";
import { useColorScheme } from "@/hooks/useColorScheme";

// Add type definition for task items
type RecentTask = {
  id: number;
  title: string;
  timeAgo: string;
};

// Create mock data with proper typing
const RECENT_TASKS: RecentTask[] = [
  { id: 1, title: 'Task 1', timeAgo: '2 hours ago' },
  { id: 2, title: 'Task 2', timeAgo: '3 hours ago' },
  { id: 3, title: 'Task 3', timeAgo: '5 hours ago' },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ThemedView style={styles.container}>
      <Header 
        title="Welcome Back" 
        subtitle="Today's Overview"
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          entering={FadeInUp.delay(100)}
          style={[
            styles.summaryCard,
            {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#F8F9FA',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#E9ECEF',
            }
          ]}
        >
          <ThemedView style={styles.summaryContent}>
            <ThemedText style={styles.summaryTitle}>Daily Progress</ThemedText>
            <ThemedView style={styles.progressRow}>
              <ThemedText style={styles.progressNumber}>8/12</ThemedText>
              <ThemedText style={styles.progressLabel}>tasks completed</ThemedText>
            </ThemedView>
          </ThemedView>
        </Animated.View>

        <ThemedText style={styles.sectionTitle}>Recent Tasks</ThemedText>
        
        {/* Recent Tasks Cards */}
        {RECENT_TASKS.map((task) => (
          <Animated.View
            key={task.id}
            entering={FadeInUp.delay(150 + task.id * 100)}
            style={[
              styles.taskCard,
              {
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#F8F9FA',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#E9ECEF',
              }
            ]}
          >
            <ThemedText style={styles.taskTitle}>{task.title}</ThemedText>
            <ThemedText style={styles.taskTime}>{task.timeAgo}</ThemedText>
          </Animated.View>
        ))}
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
  summaryCard: {
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 25,
    overflow: 'hidden',
  },
  summaryContent: {
    padding: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    opacity: 0.8,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  progressNumber: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '600',
    letterSpacing: -1,
  },
  progressLabel: {
    fontSize: 16,
    opacity: 0.6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    opacity: 0.8,
  },
  taskCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  taskTime: {
    fontSize: 14,
    opacity: 0.6,
  },
});
