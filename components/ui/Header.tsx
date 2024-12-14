import { Platform, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

type HeaderProps = {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
  showBack?: boolean;
  onBack?: () => void;
};

export function Header({ title, subtitle, rightAction, showBack, onBack }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  return (
    <Animated.View 
      entering={FadeIn}
      style={[
        styles.container,
        {
          paddingTop: insets.top + 10,
          backgroundColor: colorScheme === 'dark' 
            ? 'rgba(21, 23, 24, 0.8)' 
            : 'rgba(255, 255, 255, 0.8)',
          borderBottomColor: colorScheme === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)',
        }
      ]}
    >
      <ThemedView style={styles.content}>
        <ThemedView style={styles.titleContainer}>
          {showBack && (
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <IconSymbol 
                name="chevron.left" 
                size={24} 
                color={Colors[colorScheme ?? 'light'].text} 
              />
            </TouchableOpacity>
          )}
          <ThemedView>
            {subtitle && (
              <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
            )}
            <ThemedText type="title">{title}</ThemedText>
          </ThemedView>
        </ThemedView>
        {rightAction && (
          <ThemedView style={styles.rightAction}>
            {rightAction}
          </ThemedView>
        )}
      </ThemedView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    ...Platform.select({
      ios: {
        backdropFilter: 'blur(20px)',
      },
    }),
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
    padding: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 4,
  },
  rightAction: {
    justifyContent: 'center',
  },
}); 