import { useState, useCallback } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Header } from "@/components/ui/Header";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const colorScheme = useColorScheme() ?? "light";

  const addTodo = useCallback(() => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false
      };
      setTodos((prev) => [todo, ...prev]);
      setNewTodo("");
      if (Platform.OS === "ios") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    }
  }, [newTodo]);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Header 
        title="Your Tasks" 
        subtitle="Hello 👋"
        rightAction={
          <ThemedText style={styles.count}>{todos.length} tasks</ThemedText>
        }
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { color: Colors[colorScheme].text }]}
            placeholder="Add a new task..."
            placeholderTextColor={Colors[colorScheme].tabIconDefault}
            value={newTodo}
            onChangeText={setNewTodo}
            onSubmitEditing={addTodo}
          />
          <TouchableOpacity
            style={[styles.addButton, { opacity: newTodo.trim() ? 1 : 0.5 }]}
            onPress={addTodo}
            disabled={!newTodo.trim()}
          >
            <IconSymbol
              name="plus.circle.fill"
              size={32}
              color={Colors[colorScheme].tint}
            />
          </TouchableOpacity>
        </ThemedView>

        {todos.map((todo) => (
          <Animated.View
            key={todo.id}
            entering={FadeInRight}
            exiting={FadeOutLeft}
            style={[
              styles.todoItem,
              { backgroundColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)' }
            ]}
          >
            <TouchableOpacity
              style={styles.todoCheckbox}
              onPress={() => toggleTodo(todo.id)}
            >
              <IconSymbol
                name={todo.completed ? "checkmark.circle.fill" : "circle"}
                size={24}
                color={
                  todo.completed
                    ? Colors[colorScheme].tint
                    : Colors[colorScheme].tabIconDefault
                }
              />
            </TouchableOpacity>
            <ThemedText
              style={[styles.todoText, todo.completed && styles.completedText]}
            >
              {todo.text}
            </ThemedText>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTodo(todo.id)}
            >
              <IconSymbol
                name="trash.fill"
                size={20}
                color={Colors[colorScheme].tabIconDefault}
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
    paddingTop: Platform.OS === 'ios' ? 140 : 120, // Account for header height
  },
  count: {
    fontSize: 16,
    opacity: 0.7
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  input: {
    flex: 1,
    height: 55,
    borderRadius: 16,
    paddingHorizontal: 20,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: "rgba(128, 128, 128, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(128, 128, 128, 0.1)",
  },
  addButton: {
    padding: 8
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(128, 128, 128, 0.1)",
  },
  todoCheckbox: {
    padding: 8
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8
  },
  completedText: {
    opacity: 0.5,
    textDecorationLine: "line-through"
  },
  deleteButton: {
    padding: 8
  }
});
