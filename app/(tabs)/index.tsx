import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  ChevronRight,
  Flame,
  Play,
  TrendingUp,
  Zap,
} from "lucide-react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

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

const workoutData = [
  { name: "Pull Ups", sets: "4 × 8 reps", icon: "💪", done: true },
  { name: "Ring Rows", sets: "3 × 12 reps", icon: "🔁", done: true },
  { name: "Dead Hang", sets: "3 × 30s", icon: "⏱️", done: false },
  { name: "Scapular Pulls", sets: "3 × 10 reps", icon: "🎯", done: false },
];

const statsData = [
  {
    label: "Workouts",
    value: "4",
    icon: <Flame size={16} color={COLORS.orange} />,
  },
  {
    label: "XP Earned",
    value: "480",
    icon: <Zap size={16} color={COLORS.yellow} />,
  },
  {
    label: "Streak",
    value: "12d",
    icon: <TrendingUp size={16} color={COLORS.green} />,
  },
];

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

        {/* Current Skill Focus */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Current Skill Focus</Text>
        </View>

        <TouchableOpacity
          style={styles.focusCard}
          onPress={() => router.push("/skill")}
          activeOpacity={0.8}
        >
          <View style={styles.focusLeft}>
            <View style={styles.focusIcon}>
              <Text style={{ fontSize: 22 }}>🏋️</Text>
            </View>
            <View>
              {/* Hardcode value */}
              <Text style={styles.focusLabel}>Pull Up</Text>
              <View style={styles.levelRow}>
                {/* Hardcode value (need looping) */}
                <View style={styles.levelPip} />
                <View style={styles.levelPip} />
                <View style={styles.levelPip} />
                <View
                  style={[styles.levelPip, { backgroundColor: COLORS.muted2 }]}
                />
                <View
                  style={[styles.levelPip, { backgroundColor: COLORS.muted2 }]}
                />
                {/* Hardcode value */}
                <Text style={styles.levelRowText}>Level 3 / 5</Text>
              </View>
            </View>
          </View>
          <ChevronRight size={18} color={COLORS.muted} />
        </TouchableOpacity>

        {/* Today's Workout */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today&apos;s Workout</Text>
          <TouchableOpacity onPress={() => router.push("/workout")}>
            <Text style={styles.seeAll}>View all</Text>
          </TouchableOpacity>
        </View>

        {workoutData.map((item, index) => (
          <View
            key={index}
            style={[styles.exerciseCard, item.done && styles.exerciseCardDone]}
          >
            <View style={styles.exerciseLeft}>
              <View
                style={[styles.exerciseIcon, item.done && { opacity: 0.5 }]}
              >
                <Text style={{ fontSize: 18 }}>{item.icon}</Text>
              </View>
              <View>
                <Text
                  style={[styles.exerciseName, item.done && styles.doneText]}
                >
                  {item.name}
                </Text>
                <Text style={styles.exerciseSets}>{item.sets}</Text>
              </View>
            </View>
            <View
              style={[styles.checkCircle, item.done && styles.checkCircleDone]}
            >
              {item.done && (
                <Text
                  style={{
                    color: COLORS.bg,
                    fontSize: 12,
                    fontWeight: "700",
                  }}
                >
                  ✓
                </Text>
              )}
            </View>
          </View>
        ))}

        {/* Stats Row */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>This Week</Text>
        </View>
        <View style={styles.statsRow}>
          {statsData.map((item, index) => (
            <View key={index} style={styles.statCard}>
              {item.icon}
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => router.push("/workout")}
          activeOpacity={0.85}
        >
          <Play size={18} color={COLORS.bg} fill={COLORS.bg} />
          <Text style={styles.ctaText}>Start Training</Text>
        </TouchableOpacity>
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
  // XP / Level Card
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
  // Section Header Current Skill Focus
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  focusCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  focusLeft: { flexDirection: "row", alignItems: "center", gap: 14 },
  focusIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#1E2A1E",
    alignItems: "center",
    justifyContent: "center",
  },
  focusLabel: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  levelRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  levelPip: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.green,
  },
  levelRowText: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 4,
  },
  // Today's Workout
  seeAll: { color: COLORS.green, fontSize: 13, fontWeight: "600" },
  exerciseCard: {
    marginHorizontal: 20,
    marginBottom: 8,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  exerciseCardDone: { opacity: 0.55 },
  exerciseLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  exerciseIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.card2,
    alignItems: "center",
    justifyContent: "center",
  },
  exerciseName: { color: COLORS.white, fontSize: 15, fontWeight: "600" },
  doneText: { textDecorationLine: "line-through", color: COLORS.muted },
  exerciseSets: { color: COLORS.muted, fontSize: 12, marginTop: 2 },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  checkCircleDone: { backgroundColor: COLORS.green, borderColor: COLORS.green },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: { color: COLORS.white, fontSize: 20, fontWeight: "800" },
  statLabel: { color: COLORS.muted, fontSize: 11, fontWeight: "500" },
  ctaButton: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: COLORS.green,
    borderRadius: 18,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  ctaText: {
    color: COLORS.bg,
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.3,
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
