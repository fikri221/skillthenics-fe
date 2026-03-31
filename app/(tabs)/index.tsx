import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Zap } from "lucide-react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  bg: "#0F0F0F",
  card: "#1A1A1A",
  card2: "#212121",
  border: "#2A2A2A",
  green: "#39E878",
  blue: "#00C8FF",
  orange: "#FF8C00",
  yellow: "#FFD700",
  white: "#FFFFFF",
  muted: "#888888",
  muted2: "#555555",
};

export default function HomeScreen() {
  const xp = 0;
  const xpMax = 100;
  const xpPct = (xp / xpMax) * 100;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi, </Text>
            <Text style={styles.username}>John</Text>
          </View>
        </View>

        {/* XP / Level Card */}
        <View style={styles.xpCard}>
          <View style={styles.xpCardHeader}>
            <View style={styles.levelBadge}>
              <Zap size={16} color={COLORS.bg} />
              {/* TODO: Hardcode level and XP */}
              <Text style={styles.levelText}>LVL 1</Text>
            </View>
            <Text style={styles.xpCardText}>0 / 100 XP</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${xpPct}%` }]} />
          </View>
          <Text style={styles.xpSubText}>{xpMax - xp} XP until next level</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
  },
  greeting: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.muted,
  },
  username: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  xpCard: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  xpCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  levelBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.green,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    gap: 4,
  },
  levelText: {
    color: COLORS.bg,
    fontWeight: "800",
    fontSize: 13,
    letterSpacing: 0.5,
  },
  xpCardText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.muted,
  },
  progressTrack: {
    height: 8,
    backgroundColor: "#2A2A2A",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.green,
    borderRadius: 4,
  },
  xpSubText: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 8,
    fontWeight: "500",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
