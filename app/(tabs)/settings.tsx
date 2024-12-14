import { StyleSheet, Platform, Switch, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Header } from "@/components/ui/Header";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
};

function SettingsSection({ title, children }: SettingsSectionProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      <View style={[
        styles.sectionContent,
        {
          backgroundColor: isDark ? "rgba(255, 255, 255, 0.03)" : "#F8F9FA",
          borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "#E9ECEF",
        }
      ]}>
        {children}
      </View>
    </View>
  );
}

type SettingsRowProps = {
  icon: React.ComponentProps<typeof IconSymbol>["name"];
  label: string;
  value?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
};

function SettingsRow({
  icon,
  label,
  value,
  onPress,
  rightElement
}: SettingsRowProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <TouchableOpacity
      style={[
        styles.settingsRow,
        {
          borderColor: isDark ? "rgba(255, 255, 255, 0.05)" : "#E9ECEF"
        }
      ]}
      onPress={() => {
        if (onPress) {
          onPress();
          if (Platform.OS === "ios") {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
        }
      }}
    >
      <View style={styles.rowLeft}>
        <IconSymbol
          name={icon}
          size={22}
          color={isDark ? "#00ff9d" : Colors[colorScheme ?? "light"].text}
        />
        <ThemedText style={styles.rowLabel}>{label}</ThemedText>
      </View>
      <View style={styles.rowRight}>
        {value && <ThemedText style={styles.rowValue}>{value}</ThemedText>}
        {rightElement}
        {onPress && (
          <IconSymbol
            name="chevron.right"
            size={18}
            color={Colors[colorScheme ?? "light"].textSecondary}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  return (
    <ThemedView style={styles.container}>
      <Header title="Settings" subtitle="Preferences" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <SettingsSection title="App Settings">
          <SettingsRow
            icon="bell"
            label="Notifications"
            rightElement={
              <Switch
                value={true}
                onValueChange={() => {}}
                ios_backgroundColor="#3e3e3e"
              />
            }
          />
          <SettingsRow
            icon="hand.raised"
            label="Haptic Feedback"
            rightElement={
              <Switch
                value={true}
                onValueChange={() => {}}
                ios_backgroundColor="#3e3e3e"
              />
            }
          />
        </SettingsSection>

        <SettingsSection title="Account">
          <SettingsRow
            icon="person"
            label="Profile"
            value="John Doe"
            onPress={() => {}}
          />
          <SettingsRow
            icon="envelope"
            label="Email"
            value="john@example.com"
            onPress={() => {}}
          />
        </SettingsSection>

        <SettingsSection title="Support">
          <SettingsRow
            icon="questionmark.circle"
            label="Help Center"
            onPress={() => {}}
          />
          <SettingsRow icon="star" label="Rate App" onPress={() => {}} />
          <SettingsRow icon="info.circle" label="About" value="Version 1.0.0" />
        </SettingsSection>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1
  },
  content: {
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 140 : 120,
    gap: 32
  },
  section: {
    gap: 12
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    opacity: 0.7,
    marginLeft: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  sectionContent: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: "500"
  },
  rowValue: {
    fontSize: 16,
    opacity: 0.6
  }
});
