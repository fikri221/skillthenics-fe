import { Image } from "expo-image";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Zap } from "lucide-react-native";
import React from "react";

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
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24 }}
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
              <Zap size={24} color={COLORS.green} />
              {/* TODO: Hardcode level and XP */}
              <Text style={styles.xpCardTitle}>Level 1</Text>
            </View>
            <Text style={styles.xpCardText}>0 / 100 XP</Text>
          </View>
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
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  xpCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  levelBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  xpCardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.white,
  },
  xpCardText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.muted,
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
