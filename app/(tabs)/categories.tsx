import { useState } from "react";
import { StyleSheet, TouchableOpacity, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { FadeInUp } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Header } from "@/components/ui/Header";

type Category = {
  id: string;
  name: string;
  color: string;
  icon: IconSymbolName;
  count: number;
  description?: string;
};

const DEFAULT_CATEGORIES: Category[] = [
  { 
    id: '1', 
    name: 'Work', 
    color: '#FF6B6B', 
    icon: 'briefcase', 
    count: 5,
    description: 'Work-related tasks and projects'
  },
  { 
    id: '2', 
    name: 'Personal', 
    color: '#4ECDC4', 
    icon: 'person', 
    count: 3,
    description: 'Personal goals and activities'
  },
  { 
    id: '3', 
    name: 'Shopping', 
    color: '#FFD93D', 
    icon: 'cart', 
    count: 2,
    description: 'Shopping lists and items'
  },
  { 
    id: '4', 
    name: 'Health', 
    color: '#95E1D3', 
    icon: 'heart', 
    count: 1,
    description: 'Health and fitness activities'
  },
];

export default function CategoriesScreen() {
  const [categories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ThemedView style={styles.container}>
      <Header 
        title="Categories" 
        subtitle="Organize Tasks"
        rightAction={
          <TouchableOpacity 
            style={[
              styles.addButton,
              { backgroundColor: Colors[colorScheme ?? 'light'].tint }
            ]}
          >
            <IconSymbol name="plus" size={24} color="white" />
          </TouchableOpacity>
        }
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((category, index) => (
          <Animated.View
            key={category.id}
            entering={FadeInUp.delay(index * 100)}
            style={[
              styles.categoryCard,
              { 
                backgroundColor: Colors[colorScheme ?? 'light'].card,
                borderColor: Colors[colorScheme ?? 'light'].cardBorder,
              }
            ]}
          >
            <TouchableOpacity 
              style={styles.categoryContent}
              activeOpacity={0.7}
            >
              <ThemedView style={[styles.iconContainer, { backgroundColor: category.color }]}>
                <IconSymbol name={category.icon} size={24} color="white" />
              </ThemedView>
              
              <ThemedView style={styles.categoryInfo}>
                <ThemedView style={styles.categoryHeader}>
                  <ThemedText style={styles.categoryName}>{category.name}</ThemedText>
                  <ThemedView style={[
                    styles.countBadge,
                    { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }
                  ]}>
                    <ThemedText style={[
                      styles.countText,
                      { color: Colors[colorScheme ?? 'light'].textSecondary }
                    ]}>
                      {category.count}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
                {category.description && (
                  <ThemedText style={[
                    styles.categoryDescription,
                    { color: Colors[colorScheme ?? 'light'].textSecondary }
                  ]}>
                    {category.description}
                  </ThemedText>
                )}
              </ThemedView>

              <IconSymbol 
                name="chevron.right" 
                size={20} 
                color={Colors[colorScheme ?? 'light'].textSecondary}
                style={styles.chevron}
              />
            </TouchableOpacity>
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryCard: {
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryInfo: {
    flex: 1,
    marginLeft: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 17,
    fontWeight: '600',
  },
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    fontSize: 13,
    fontWeight: '500',
  },
  categoryDescription: {
    fontSize: 14,
  },
  chevron: {
    marginLeft: 12,
  },
}); 