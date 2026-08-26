"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

interface RosterPlayer {
  name: string;
  isGoalkeeper: boolean;
  isSohan: boolean;
}

interface MatchPlayer {
  id: string;
  name: string;
  isGoalkeeper: boolean;
  isSohan: boolean;
  isGuest: boolean;
  minutes: number;
  fee: number;
  isCapped?: boolean;
}

const ROSTER: RosterPlayer[] = [
  { name: "Utsho", isGoalkeeper: true, isSohan: false },
  { name: "Shaishab", isGoalkeeper: false, isSohan: false },
  { name: "Sujon", isGoalkeeper: false, isSohan: false },
  { name: "Nakib", isGoalkeeper: false, isSohan: false },
  { name: "Sakib", isGoalkeeper: false, isSohan: false },
  { name: "Himel", isGoalkeeper: true, isSohan: false },
  { name: "Shawon", isGoalkeeper: false, isSohan: false },
  { name: "Ayon", isGoalkeeper: false, isSohan: false },
  { name: "Robin", isGoalkeeper: false, isSohan: false },
  { name: "Omi", isGoalkeeper: false, isSohan: false },
  { name: "Sohan", isGoalkeeper: false, isSohan: true },
  { name: "Sajjad", isGoalkeeper: false, isSohan: false },
  { name: "Rokibul", isGoalkeeper: false, isSohan: false },
  { name: "Tasbih", isGoalkeeper: false, isSohan: false },
  { name: "Rabbi", isGoalkeeper: false, isSohan: false },
  { name: "Omar", isGoalkeeper: false, isSohan: false },
  { name: "Moshiur", isGoalkeeper: false, isSohan: false },
  { name: "Naeem", isGoalkeeper: true, isSohan: false },
  { name: "Childhood", isGoalkeeper: true, isSohan: false },
  { name: "Sowad", isGoalkeeper: false, isSohan: false },
  { name: "Saif", isGoalkeeper: false, isSohan: false },
  { name: "Akash", isGoalkeeper: false, isSohan: false },
  { name: "Shushmoy", isGoalkeeper: false, isSohan: false },
  { name: "Shoron", isGoalkeeper: false, isSohan: false },
  { name: "Aminul", isGoalkeeper: false, isSohan: false },
  { name: "Jisan", isGoalkeeper: false, isSohan: false },
  { name: "Kayum", isGoalkeeper: false, isSohan: false },
  { name: "Parvej", isGoalkeeper: false, isSohan: false },
  { name: "Tiash", isGoalkeeper: false, isSohan: false },
  { name: "Noor", isGoalkeeper: false, isSohan: false },
  { name: "Oliul", isGoalkeeper: false, isSohan: false },
  { name: "Mojumdar", isGoalkeeper: false, isSohan: false },
  { name: "Maz", isGoalkeeper: false, isSohan: false },
  { name: "Tanzil", isGoalkeeper: false, isSohan: false },
  { name: "Rokib", isGoalkeeper: false, isSohan: false },
  { name: "Nahid", isGoalkeeper: false, isSohan: false },
  { name: "Roni", isGoalkeeper: false, isSohan: false },
  { name: "Mizan", isGoalkeeper: false, isSohan: false },
  { name: "Masud", isGoalkeeper: false, isSohan: false },
  { name: "Kabbo", isGoalkeeper: false, isSohan: false },
  { name: "Shaon", isGoalkeeper: false, isSohan: false },
  { name: "GK Hridoy", isGoalkeeper: true, isSohan: false },
  { name: "GK Sumo", isGoalkeeper: true, isSohan: false },
];

const DEFAULT_SQUAD_NAMES = [
  "Utsho",
  "Shaishab",
  "Sujon",
  "Nakib",
  "Sakib",
  "Himel",
  "Shawon",
  "Ayon",
  "Robin",
  "Omi",
  "Sohan",
  "Sajjad",
];

export default function CalculatorPage() {
  const [slotFee, setSlotFee] = useState<number>(1400);
  const [players, setPlayers] = useState<MatchPlayer[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [customName, setCustomName] = useState<string>("");
  const [customIsGK, setCustomIsGK] = useState<boolean>(false);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  }, []);

  const createDefaultSquad = useCallback((): MatchPlayer[] => {
    return DEFAULT_SQUAD_NAMES.map((name, idx) => {
      const roster = ROSTER.find((r) => r.name === name);
      return {
        id: `${name.toLowerCase()}_${idx}`,
        name: roster ? roster.name : name,
        isGoalkeeper: roster ? roster.isGoalkeeper : false,
        isSohan: roster ? roster.isSohan : false,
        isGuest: false,
        minutes: 90,
        fee: 0,
      };
    });
  }, []);

  // Initialize state from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("psb_calculator_players_v3");
      if (saved) {
        const parsed: MatchPlayer[] = JSON.parse(saved);
        const validated: MatchPlayer[] = parsed.map((p) => {
          const match = ROSTER.find(
            (r) => r.name.toLowerCase() === p.name.toLowerCase()
          );
          return {
            id: p.id,
            name: match ? match.name : p.name,
            isGoalkeeper: match ? match.isGoalkeeper : !!p.isGoalkeeper,
            isSohan: match ? match.isSohan : !!p.isSohan,
            isGuest: match ? false : !!p.isGuest,
            minutes: p.minutes !== undefined ? p.minutes : 90,
            fee: 0,
          };
        });
        setPlayers(validated);
      } else {
        setPlayers(createDefaultSquad());
      }
    } catch {
      setPlayers(createDefaultSquad());
    }
  }, [createDefaultSquad]);

  // Persist to LocalStorage whenever players array structure changes
  useEffect(() => {
    if (players.length > 0) {
      localStorage.setItem(
        "psb_calculator_players_v3",
        JSON.stringify(
          players.map((p) => ({
            id: p.id,
            name: p.name,
            isGoalkeeper: p.isGoalkeeper,
            isSohan: p.isSohan,
            isGuest: p.isGuest,
            minutes: p.minutes,
          }))
        )
      );
    }
  }, [players]);

  // Calculation Engine
  const calculation = useMemo(() => {
    const feeNum = isNaN(slotFee) || slotFee < 0 ? 0 : slotFee;

    const computedPlayers: MatchPlayer[] = players.map((p) => ({
      ...p,
      fee: 0,
      isCapped: false,
    }));

    const activePlayers = computedPlayers.filter((p) => p.minutes > 0);
    const activeCount = activePlayers.length;
    const totalMinutes = activePlayers.reduce((sum, p) => sum + p.minutes, 0);

    if (activeCount === 0) {
      return {
        computedPlayers,
        activeCount: 0,
        totalMinutes: 0,
        costPerMin: 0,
        totalCollected: 0,
        remainingBalance: feeNum,
      };
    }

    // 1. Sohan Rule: Fixed 120 BDT if active
    const activeSohan = activePlayers.find((p) => p.isSohan);
    const sohanFee = activeSohan ? 120 : 0;
    if (activeSohan) {
      activeSohan.fee = 120;
    }

    const remainingFee = feeNum - sohanFee;
    const activeNonSohan = activePlayers.filter((p) => !p.isSohan);
    const totalNonSohanMinutes = activeNonSohan.reduce(
      (sum, p) => sum + p.minutes,
      0
    );

    if (activeNonSohan.length === 0) {
      if (activeSohan) {
        activeSohan.fee = feeNum;
      }
      return {
        computedPlayers,
        activeCount,
        totalMinutes,
        costPerMin: 0,
        totalCollected: feeNum,
        remainingBalance: 0,
      };
    }

    // Base rate for non-Sohan players
    const baseRate =
      totalNonSohanMinutes > 0 ? remainingFee / totalNonSohanMinutes : 0;

    // 2. Goalkeeper Rule: Capped at 150 BDT
    activeNonSohan.forEach((p) => {
      p.fee = baseRate * p.minutes;
    });

    const activeGKs = activeNonSohan.filter((p) => p.isGoalkeeper);
    let totalGKExcess = 0;

    activeGKs.forEach((p) => {
      if (p.fee > 150) {
        totalGKExcess += p.fee - 150;
        p.fee = 150;
        p.isCapped = true;
      }
    });

    // 3. Redistribution Rule: Excess to non-GK, non-Sohan players
    const activeNonGKNonSohan = activeNonSohan.filter((p) => !p.isGoalkeeper);
    const totalNonGKNonSohanMinutes = activeNonGKNonSohan.reduce(
      (sum, p) => sum + p.minutes,
      0
    );

    if (totalGKExcess > 0 && totalNonGKNonSohanMinutes > 0) {
      activeNonGKNonSohan.forEach((p) => {
        p.fee += totalGKExcess * (p.minutes / totalNonGKNonSohanMinutes);
      });
    } else if (totalGKExcess > 0 && totalNonGKNonSohanMinutes === 0) {
      activeGKs.forEach((p) => {
        p.fee = baseRate * p.minutes;
        p.isCapped = false;
      });
    }

    // 4. Rounding to Nearest 10 BDT
    computedPlayers.forEach((p) => {
      if (p.minutes > 0) {
        p.fee = Math.round(p.fee / 10) * 10;
      } else {
        p.fee = 0;
      }
    });

    // Discrepancy balancing
    const tempTotal = computedPlayers.reduce((sum, p) => sum + p.fee, 0);
    let discrepancy = feeNum - tempTotal;

    const candidates = computedPlayers.filter((p) => p.minutes > 0);
    candidates.sort((a, b) => {
      if (a.isSohan !== b.isSohan) return a.isSohan ? 1 : -1;
      if (a.isGoalkeeper !== b.isGoalkeeper) return a.isGoalkeeper ? 1 : -1;
      return b.minutes - a.minutes;
    });

    if (candidates.length > 0 && Math.abs(discrepancy) > 0.01) {
      let index = 0;
      let attempts = 0;
      const maxAttempts = candidates.length * 50;
      while (Math.abs(discrepancy) > 0.01 && attempts < maxAttempts) {
        const adj = Math.sign(discrepancy) * Math.min(10, Math.abs(discrepancy));
        if (adj < 0 && candidates[index].fee + adj < 0) {
          index = (index + 1) % candidates.length;
          attempts++;
          continue;
        }
        candidates[index].fee =
          Math.round((candidates[index].fee + adj) * 100) / 100;
        discrepancy -= adj;
        index = (index + 1) % candidates.length;
        attempts = 0;
      }
    }

    const finalCollected = computedPlayers.reduce((sum, p) => sum + p.fee, 0);
    const remainingBalance = Math.round((feeNum - finalCollected) * 100) / 100;

    let costPerMin = 0;
    const normalActive = activeNonGKNonSohan.filter((p) => p.minutes > 0);
    if (normalActive.length > 0 && normalActive[0].minutes > 0) {
      costPerMin = normalActive[0].fee / normalActive[0].minutes;
    } else if (totalMinutes > 0) {
      costPerMin = finalCollected / totalMinutes;
    }

    return {
      computedPlayers,
      activeCount,
      totalMinutes,
      costPerMin,
      totalCollected: finalCollected,
      remainingBalance,
    };
  }, [slotFee, players]);

  // Actions
  const updatePlayerMinutes = (id: string, mins: number) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, minutes: mins } : p))
    );
  };

  const removePlayer = (id: string) => {
    const p = players.find((pl) => pl.id === id);
    if (p) {
      setPlayers((prev) => prev.filter((pl) => pl.id !== id));
      showToast(`Moved "${p.name}" back to Squad Pool.`);
    }
  };

  const addPlayerFromPool = (name: string) => {
    const rosterMatch = ROSTER.find(
      (r) => r.name.toLowerCase() === name.toLowerCase()
    );
    const newPlayer: MatchPlayer = {
      id: `player_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: rosterMatch ? rosterMatch.name : name,
      isGoalkeeper: rosterMatch ? rosterMatch.isGoalkeeper : false,
      isSohan: rosterMatch ? rosterMatch.isSohan : false,
      isGuest: !rosterMatch,
      minutes: 90,
      fee: 0,
    };
    setPlayers((prev) => [...prev, newPlayer]);
    showToast(`Added "${newPlayer.name}" (90 min) to match.`);
  };

  const addGuestPlayer = () => {
    const trimmed = customName.trim();
    if (!trimmed) return;

    if (players.some((p) => p.name.toLowerCase() === trimmed.toLowerCase())) {
      alert(`Player "${trimmed}" is already in the match!`);
      return;
    }

    const rosterMatch = ROSTER.find(
      (r) => r.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (rosterMatch) {
      addPlayerFromPool(rosterMatch.name);
    } else {
      const isGK =
        customIsGK ||
        trimmed.toLowerCase() === "naeem" ||
        trimmed.toLowerCase() === "childhood" ||
        trimmed.toLowerCase().startsWith("gk");
      const isSohan = trimmed.toLowerCase() === "sohan";

      const newPlayer: MatchPlayer = {
        id: `player_${Date.now()}`,
        name: trimmed,
        isGoalkeeper: isGK,
        isSohan: isSohan,
        isGuest: true,
        minutes: 90,
        fee: 0,
      };

      setPlayers((prev) => [...prev, newPlayer]);
      showToast(`Added Guest "${trimmed}" (90 min) to match.`);
    }

    setCustomName("");
    setCustomIsGK(false);
  };

  const resetMatch = () => {
    if (
      confirm(
        "Reset active list back to default 12 players? This will set everyone to 90 min."
      )
    ) {
      setPlayers(createDefaultSquad());
      setSlotFee(1400);
      setSearchQuery("");
      showToast("Calculator reset to 12 main players.");
    }
  };

  // Report generation text
  const reportText = useMemo(() => {
    const active = calculation.computedPlayers
      .filter((p) => p.minutes > 0)
      .sort((a, b) => b.fee - a.fee);

    let text = `Match Fee Report\n`;
    text += `Slot Fee: ${slotFee} BDT\n\n`;

    if (active.length === 0) {
      text += `No players participated in this match.\n`;
    } else {
      active.forEach((p) => {
        let suffix = "";
        if (p.isSohan) suffix = " (Fixed)";
        else if (p.isGoalkeeper && p.isCapped) suffix = " (GK Capped)";
        else if (p.isGoalkeeper) suffix = " (GK)";
        text += `${p.name} - ${p.minutes} min - ${
          p.fee % 1 === 0 ? p.fee.toFixed(0) : p.fee.toFixed(2)
        } BDT${suffix}\n`;
      });
    }

    text += `\nTotal Collected: ${
      calculation.totalCollected % 1 === 0
        ? calculation.totalCollected.toFixed(0)
        : calculation.totalCollected.toFixed(2)
    } BDT\n`;
    return text;
  }, [slotFee, calculation]);

  const copySummary = () => {
    const summary = `Match Summary:\nSlot Fee: ${slotFee} BDT\nActive Players: ${calculation.activeCount}\nTotal Minutes: ${calculation.totalMinutes} min\nCost Per Minute: ${calculation.costPerMin.toFixed(
      4
    )} BDT\nTotal Collected: ${calculation.totalCollected} BDT`;
    navigator.clipboard.writeText(summary);
    showToast("Summary copied to clipboard!");
  };

  const exportCSV = () => {
    let csv = "data:text/csv;charset=utf-8,";
    csv += "Player Name,Minutes Played,Role,Fee (BDT)\n";

    calculation.computedPlayers.forEach((p) => {
      let role = "Player";
      if (p.isSohan) role = "Sohan (Fixed)";
      else if (p.isGoalkeeper) role = "Goalkeeper";
      if (p.isGuest) role += " (Guest)";

      csv += `"${p.name}",${p.minutes},"${role}",${
        p.fee % 1 === 0 ? p.fee.toFixed(0) : p.fee.toFixed(2)
      }\n`;
    });

    const encoded = encodeURI(csv);
    const link = document.createElement("a");
    link.setAttribute("href", encoded);
    const date = new Date().toISOString().slice(0, 10);
    link.setAttribute("download", `PSB_Match_Fees_${date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("CSV file exported!");
  };

  // Filter available benched pool
  const activeNames = useMemo(
    () => new Set(players.map((p) => p.name.toLowerCase())),
    [players]
  );

  const benchedPool = useMemo(() => {
    return ROSTER.filter((p) => !activeNames.has(p.name.toLowerCase()))
      .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase().trim()))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [activeNames, searchQuery]);

  const sortedActiveTable = useMemo(() => {
    return [...calculation.computedPlayers].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [calculation.computedPlayers]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 h-16 bg-background/85 backdrop-blur-xl border-b border-border z-50 shadow-2xl">
        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-9 w-9 overflow-hidden rounded border border-white/10 group-hover:border-flag-red transition-colors">
              <Image
                src="/logo.png"
                alt="PSB"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-2xl tracking-widest font-bold text-foreground group-hover:text-flag-red transition-colors">
                PSB CLUB
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-flag-red shadow-[0_0_8px_rgba(226,55,47,0.9)]" />
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-bold uppercase tracking-[0.2em] border border-white/20 px-4 py-2 rounded hover:border-flag-red hover:text-flag-red hover:bg-flag-red/5 transition-all"
            >
              ← Back to Club Page
            </Link>
          </div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto mt-24 mb-10 px-6 grid grid-cols-1 lg:grid-cols-[340px_1fr_280px] xl:grid-cols-[350px_1fr_310px] gap-6 items-start">
        {/* Left Column: Summary & Controls */}
        <div className="sticky top-24 flex flex-col gap-5">
          {/* Live Summary Card */}
          <div className="bg-card border border-card-border rounded-lg p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl tracking-wide font-bold">
                Live Summary
              </h2>
              <span className="border border-flag-red/30 bg-flag-red/10 text-flag-red text-[11px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                Matchday
              </span>
            </div>

            <ul className="space-y-3 text-sm">
              <li className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-muted">Target Slot Fee</span>
                <div className="relative w-32 flex items-center">
                  <input
                    type="number"
                    value={slotFee}
                    onChange={(e) => setSlotFee(parseFloat(e.target.value) || 0)}
                    min={0}
                    step={50}
                    className="w-full bg-input border border-border rounded px-3 py-1.5 text-right font-bold text-foreground focus:outline-none focus:border-flag-red"
                  />
                  <span className="absolute right-3 text-xs font-bold text-muted pointer-events-none">
                    BDT
                  </span>
                </div>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-muted">Active Players</span>
                <span className="font-semibold text-foreground">
                  {calculation.activeCount}
                </span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-muted">Total Minutes</span>
                <span className="font-semibold text-foreground">
                  {calculation.totalMinutes} min
                </span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-muted">Cost Per Min (Normal)</span>
                <span className="font-semibold text-foreground">
                  {calculation.costPerMin.toFixed(4)} BDT
                </span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-muted">Total Collected</span>
                <span className="font-bold text-flag-red text-red-glow">
                  {calculation.totalCollected % 1 === 0
                    ? calculation.totalCollected.toFixed(0)
                    : calculation.totalCollected.toFixed(2)}{" "}
                  BDT
                </span>
              </li>
              <li className="flex justify-between items-center pt-3 border-t border-border">
                <span className="text-muted font-medium">Remaining Balance</span>
                <span className="font-display text-2xl font-bold text-foreground">
                  {calculation.remainingBalance % 1 === 0
                    ? calculation.remainingBalance.toFixed(0)
                    : calculation.remainingBalance.toFixed(2)}{" "}
                  BDT
                </span>
              </li>
            </ul>
          </div>

          {/* Controls Card */}
          <div className="bg-card border border-card-border rounded-lg p-5 shadow-2xl">
            <h2 className="font-display text-2xl tracking-wide font-bold mb-4">
              Calculator Controls
            </h2>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => setReportModalOpen(true)}
                className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider bg-flag-red text-white rounded hover:bg-red-600 shadow-[0_0_20px_rgba(226,55,47,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Generate Report
              </button>
              <button
                onClick={copySummary}
                className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider bg-transparent border border-border text-foreground rounded hover:bg-white/5 transition flex items-center justify-center gap-2"
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
                Copy Summary Text
              </button>
              <button
                onClick={exportCSV}
                className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider bg-transparent border border-border text-foreground rounded hover:bg-white/5 transition flex items-center justify-center gap-2"
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Export to CSV
              </button>
              <button
                onClick={() => window.print()}
                className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider bg-transparent border border-border text-foreground rounded hover:bg-white/5 transition flex items-center justify-center gap-2"
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-3a2 2 0 00-2-2H9a2 2 0 00-2 2v3a2 2 0 002 2zm5-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h6z"
                  />
                </svg>
                Print Results
              </button>
              <button
                onClick={resetMatch}
                className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider bg-red-500/10 border border-red-500/30 text-red-400 rounded hover:bg-red-500/20 transition flex items-center justify-center gap-2"
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17"
                  />
                </svg>
                Reset Match
              </button>
            </div>
          </div>
        </div>

        {/* Center Column: Active Squad Playing Table */}
        <div className="flex flex-col gap-5">
          <div className="bg-card border border-card-border rounded-lg px-5 py-3.5 flex items-center justify-between">
            <span className="font-display text-2xl font-bold tracking-wide">
              Active Squad Playing
            </span>
            <span className="text-xs font-bold text-accent bg-accent-muted px-3 py-1 rounded uppercase">
              {calculation.activeCount}{" "}
              {calculation.activeCount === 1 ? "Player" : "Players"}
            </span>
          </div>

          <div className="bg-card border border-card-border rounded-lg overflow-x-auto shadow-2xl">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-white/[0.02]">
                  <th className="text-[11px] font-bold uppercase tracking-widest text-muted px-4 py-3">
                    Player Name
                  </th>
                  <th className="text-[11px] font-bold uppercase tracking-widest text-muted px-4 py-3">
                    Minutes Played
                  </th>
                  <th className="text-[11px] font-bold uppercase tracking-widest text-muted px-4 py-3 text-right">
                    Fee Amount
                  </th>
                  <th className="text-[11px] font-bold uppercase tracking-widest text-muted px-4 py-3 text-center w-16">
                    Bench
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedActiveTable.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center text-muted py-10 text-sm"
                    >
                      No active players playing. Select from the Squad Pool on the
                      right to add them!
                    </td>
                  </tr>
                ) : (
                  sortedActiveTable.map((p) => {
                    let rowBg = "";
                    if (p.minutes === 0) rowBg = "bg-white/[0.02] opacity-50";
                    else if (p.isSohan) rowBg = "bg-amber-500/10";
                    else if (p.isGoalkeeper) rowBg = "bg-blue-500/10";

                    return (
                      <tr
                        key={p.id}
                        className={`border-b border-white/[0.03] transition-colors hover:bg-white/[0.04] ${rowBg}`}
                      >
                        <td className="px-4 py-3 font-semibold text-foreground">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span>{p.name}</span>
                            {p.isSohan && (
                              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                Sohan (Fixed)
                              </span>
                            )}
                            {p.isGoalkeeper && (
                              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                Goalkeeper
                              </span>
                            )}
                            {p.isGuest && (
                              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                Guest
                              </span>
                            )}
                            {p.isCapped && p.minutes > 0 && (
                              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-600 text-white">
                                CAPPED
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={p.minutes}
                            onChange={(e) =>
                              updatePlayerMinutes(p.id, parseInt(e.target.value))
                            }
                            className="bg-input border border-border text-foreground px-2.5 py-1 rounded text-xs font-medium cursor-pointer focus:outline-none focus:border-accent"
                          >
                            <option value={0}>0 min</option>
                            <option value={30}>30 min</option>
                            <option value={60}>60 min</option>
                            <option value={90}>90 min</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span
                            className={`font-mono font-bold text-sm ${
                              p.isSohan && p.minutes > 0
                                ? "text-amber-400"
                                : p.isCapped && p.minutes > 0
                                ? "text-blue-400"
                                : "text-foreground"
                            }`}
                          >
                            {p.fee % 1 === 0 ? p.fee.toFixed(0) : p.fee.toFixed(2)}
                          </span>
                          <span className="text-[11px] text-muted font-medium ml-1">
                            BDT
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => removePlayer(p.id)}
                            title="Send to Squad Pool"
                            className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10 transition"
                          >
                            <svg
                              width="18"
                              height="18"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Squad Pool (Benched / Roster Players) */}
        <div className="bg-card border border-card-border rounded-lg p-5 shadow-2xl">
          <h2 className="font-display text-2xl tracking-wide font-bold mb-4">
            Club Squad Pool
          </h2>

          <div className="mb-3">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-muted mb-1">
              Search Available Players
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type name to filter pool..."
              className="w-full bg-input border border-border rounded px-3 py-2 text-xs text-foreground focus:outline-none focus:border-accent"
            />
          </div>

          {/* Scrollable Pool List */}
          <div className="flex flex-col gap-1.5 max-h-[380px] overflow-y-auto pr-1 mb-4">
            {benchedPool.length === 0 ? (
              <div className="text-center text-muted py-6 text-xs">
                No benched players found.
              </div>
            ) : (
              benchedPool.map((p) => {
                let borderClass = "";
                let roleBadge = "";
                if (p.isSohan) {
                  borderClass = "border-l-4 border-l-amber-400";
                  roleBadge = "Fixed";
                } else if (p.isGoalkeeper) {
                  borderClass = "border-l-4 border-l-blue-400";
                  roleBadge = "GK";
                }

                return (
                  <button
                    key={p.name}
                    onClick={() => addPlayerFromPool(p.name)}
                    className={`w-full text-left bg-input border border-border text-foreground px-3 py-2 rounded text-xs font-semibold hover:border-flag-red hover:bg-flag-red/10 transition flex items-center justify-between ${borderClass}`}
                  >
                    <span>+ {p.name}</span>
                    {roleBadge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                        {roleBadge}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Add Guest Player */}
          <div className="pt-4 border-t border-border">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-muted mb-1">
              Add Guest Player
            </label>
            <div className="flex gap-1.5 mb-2">
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addGuestPlayer()}
                placeholder="Guest name..."
                className="flex-1 bg-input border border-border rounded px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-flag-red"
              />
              <button
                onClick={addGuestPlayer}
                className="bg-flag-red text-white px-3.5 py-1.5 rounded text-xs font-bold uppercase hover:bg-red-600 transition"
              >
                Add
              </button>
            </div>
            <label className="inline-flex items-center gap-2 text-xs text-muted cursor-pointer select-none">
              <input
                type="checkbox"
                checked={customIsGK}
                onChange={(e) => setCustomIsGK(e.target.checked)}
                className="accent-flag-red cursor-pointer"
              />
              Mark as Goalkeeper?
            </label>
          </div>
        </div>
      </main>

      {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-card border border-card-border rounded-lg max-w-xl w-full p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-display text-2xl font-bold">
                Generated Match Report
              </h3>
              <button
                onClick={() => setReportModalOpen(false)}
                className="text-muted hover:text-foreground text-xl"
              >
                ×
              </button>
            </div>
            <textarea
              readOnly
              value={reportText}
              className="w-full h-64 bg-input border border-border text-foreground font-mono text-xs p-4 rounded resize-none focus:outline-none leading-relaxed"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(reportText);
                  showToast("Report copied to clipboard!");
                  setReportModalOpen(false);
                }}
                className="flex-1 py-2.5 px-4 bg-flag-red text-white rounded font-bold uppercase text-xs hover:bg-red-600 shadow-[0_0_15px_rgba(226,55,47,0.4)] transition"
              >
                Copy to Clipboard
              </button>
              <button
                onClick={() => setReportModalOpen(false)}
                className="py-2.5 px-4 bg-transparent border border-border text-foreground rounded font-bold uppercase text-xs hover:bg-white/5 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-flag-red text-white px-6 py-3 rounded text-xs font-bold uppercase tracking-wider shadow-red-glow-lg z-50 transition-all duration-300 pointer-events-none ${
          toastVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-12 opacity-0"
        }`}
      >
        {toastMessage}
      </div>
    </div>
  );
}