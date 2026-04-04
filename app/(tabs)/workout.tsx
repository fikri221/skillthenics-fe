import React, { useEffect } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useWorkoutStore } from "@/store/useWorkoutStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera, Check, Plus, Timer } from "lucide-react-native";

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
  muted2: "#444444",
};

export default function WorkoutScreen() {
  const {
    exercises,
    currentExercise,
    currentSet,
    reps,
    completedSets,
    timerRunning,
    seconds,
    restMode,
    restSeconds,
    addRep,
    removeRep,
    setCurrentExercise,
    completeSet,
    toggleTimer,
    tickTimer,
    skipRest,
    tickRestTimer,
  } = useWorkoutStore();

  const exercise = exercises[currentExercise];
  const totalSetsCompleted = completedSets.flat().length;
  const totalSets = exercises.reduce((a, b) => a + b.sets, 0);
  const progressPct =
    totalSets > 0 ? (totalSetsCompleted / totalSets) * 100 : 0;

  // Timer logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerRunning) {
      interval = setInterval(() => {
        tickTimer();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, tickTimer]);

  // Rest timer logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (restMode && restSeconds > 0) {
      interval = setInterval(() => {
        tickRestTimer();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [restMode, restSeconds, tickRestTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLabel}>Today&apos;s Session</Text>
          <Text style={styles.headerTitle}>Pull Day</Text>
        </View>
        <TouchableOpacity
          style={[styles.timerBtn, timerRunning && styles.timerBtnActive]}
          onPress={toggleTimer}
        >
          <Timer size={14} color={timerRunning ? COLORS.bg : COLORS.muted} />
          <Text
            style={[styles.timerText, timerRunning && { color: COLORS.bg }]}
          >
            {formatTime(seconds)}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Session Progress */}
      <View style={styles.sessionProgress}>
        <View style={styles.sessionProgressTrack}>
          <View
            style={[styles.sessionProgressFill, { width: `${progressPct}%` }]}
          />
        </View>
        <Text style={styles.sessionProgressText}>
          {totalSetsCompleted} / {totalSets} sets done
        </Text>
      </View>

      {/* Exercise Navigation */}
      <View style={styles.exerciseNav}>
        {exercises.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.exNavDot,
              currentExercise === i && styles.exNavDotActive,
              completedSets[i].length === item.sets && styles.exNavDotDone,
            ]}
            onPress={() => {
              setCurrentExercise(i);
            }}
          >
            <Text
              style={styles.exNavDotText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Main Workout Card */}
      <View style={styles.mainCard}>
        {/* Camera preview placeholder */}
        <View style={styles.cameraArea}>
          <Camera size={28} color="#333" />
          <Text style={styles.cameraText}>Camera Preview</Text>
          <Text style={styles.cameraSubtext}>Tap to enable form check</Text>
        </View>

        {/* Exercise name */}
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <Text style={styles.setInfo}>
          Set {currentSet} of {exercise.sets}
          {completedSets[currentExercise][currentSet - 1] !== undefined && (
            <Text style={styles.prevSets}>
              {" "}
              · Prev:{" "}
              {completedSets[currentExercise][currentSet - 1] !== undefined &&
                completedSets[currentExercise][currentSet - 1]}{" "}
              reps
            </Text>
          )}
        </Text>

        {/* Reps counter */}
        {!exercise.isTime ? (
          <View style={styles.repCounter}>
            <TouchableOpacity
              style={styles.repBtn}
              onPress={removeRep}
              activeOpacity={0.7}
            >
              <Text style={styles.repBtnText}>-</Text>
            </TouchableOpacity>
            <View style={styles.repDisplay}>
              <Text style={styles.repNumber}>{reps}</Text>
              <Text style={styles.repLabel}>reps</Text>
            </View>
            <TouchableOpacity
              style={[styles.repBtn, styles.repBtnAdd]}
              onPress={addRep}
              activeOpacity={0.7}
            >
              <Plus size={24} color={COLORS.bg} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.repCounter}>
            <View style={styles.repDisplay}>
              <Text
                style={[
                  styles.repNumber,
                  { color: timerRunning ? COLORS.green : COLORS.white },
                ]}
              >
                {formatTime(seconds)}
              </Text>
              <Text style={styles.repLabel}>hold time</Text>
            </View>
          </View>
        )}

        {/* Target */}
        <Text style={styles.target}>
          Target: {exercise.target}
          {exercise.isTime ? "s" : " reps"}
        </Text>
      </View>

      {/* Rest mode overlay */}
      {restMode && (
        <View style={styles.restOverlay}>
          <Text style={styles.restTitle}>Rest</Text>
          <Text style={styles.restTimer}>{restSeconds}</Text>
          <TouchableOpacity style={styles.skipRest} onPress={skipRest}>
            <Text style={styles.skipRestText}>Skip Rest</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.completeSetBtn}
          onPress={completeSet}
          activeOpacity={0.85}
        >
          <Check size={20} color={COLORS.bg} />
          <Text style={styles.completeSetText}>Complete Set</Text>
        </TouchableOpacity>
      </View>
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
  headerLabel: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 2,
  },
  headerTitle: { color: COLORS.white, fontSize: 22, fontWeight: "800" },
  timerBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  timerBtnActive: { backgroundColor: COLORS.green, borderColor: COLORS.green },
  timerText: {
    color: COLORS.muted,
    fontWeight: "700",
    fontSize: 14,
    fontFamily: "monospace",
  },
  sessionProgress: {
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  sessionProgressTrack: {
    height: 4,
    backgroundColor: "#1E1E1E",
    borderRadius: 2,
    marginBottom: 6,
    overflow: "hidden",
  },
  sessionProgressFill: {
    height: "100%",
    backgroundColor: COLORS.green,
    borderRadius: 2,
  },
  sessionProgressText: { color: COLORS.muted, fontSize: 11, fontWeight: "500" },
  exerciseNav: {
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  exNavDot: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 4,
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  exNavDotActive: { borderColor: COLORS.blue, backgroundColor: "#0A1520" },
  exNavDotDone: {
    borderColor: COLORS.green + "55",
    backgroundColor: "#0A1A0A",
  },
  exNavDotText: { color: COLORS.muted, fontSize: 9, fontWeight: "600" },
  mainCard: {
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: "#141414",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cameraArea: {
    width: "100%",
    height: 120,
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#252525",
    borderStyle: "dashed",
    gap: 4,
  },
  cameraText: { color: "#444", fontSize: 13, fontWeight: "600" },
  cameraSubtext: { color: "#333", fontSize: 10 },
  exerciseName: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
    textAlign: "center",
    marginTop: 8,
  },
  setInfo: { color: COLORS.muted, fontSize: 14, fontWeight: "600" },
  prevSets: { color: "#555", fontSize: 12 },
  repCounter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  repBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#252525",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  repBtnAdd: { backgroundColor: COLORS.blue },
  repBtnText: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "300",
    lineHeight: 34,
  },
  repDisplay: { alignItems: "center", minWidth: 80 },
  repNumber: {
    color: COLORS.white,
    fontSize: 72,
    fontWeight: "900",
    letterSpacing: -3,
    lineHeight: 80,
  },
  repLabel: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "600",
    marginTop: -4,
  },
  target: { color: "#555", fontSize: 13, fontWeight: "500" },
  restOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#0F0F0Fee",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    gap: 12,
  },
  restTitle: {
    color: COLORS.muted,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 4,
    textTransform: "uppercase",
  },
  restTimer: {
    color: COLORS.white,
    fontSize: 80,
    fontWeight: "900",
    letterSpacing: -3,
  },
  skipRest: {
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#333",
    marginTop: 8,
  },
  skipRestText: { color: COLORS.muted, fontWeight: "600", fontSize: 14 },
  actions: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  addRepBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  addRepText: { color: COLORS.white, fontWeight: "700", fontSize: 15 },
  completeSetBtn: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.green,
    borderRadius: 16,
    paddingVertical: 16,
  },
  completeSetText: { color: COLORS.bg, fontWeight: "800", fontSize: 15 },
});
