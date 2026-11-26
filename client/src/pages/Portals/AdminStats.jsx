import { memo, useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  ChartNoAxesCombined, Files, BookOpen, FileQuestion,
  Database, RefreshCw, CheckCircle2, XCircle
} from "lucide-react";

import PageLayout from "../../components/Layout/PageLayout";
import PageHeader from "../../components/Layout/PageHeader";
import MobileLoader from "../../components/Loader/MobileLoader";

const API_URL = import.meta.env.VITE_API_URL;
const semesters = [1, 2, 3, 4];
const units = ["1", "2", "3", "4", "5", "QB"];

const panel = "min-w-0 bg-black/60 backdrop-blur-md border border-white/10 rounded-3xl p-5 sm:p-8";

const AdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [semester, setSemester] = useState("4");

  const request = useRef(null);

  // Fetch statistics
  const fetchStats = async (initial = true) => {
    request.current?.abort();

    const controller = new AbortController();
    request.current = controller;

    const start = Date.now();
    const mobile = window.matchMedia("(max-width: 767px)").matches;

    initial ? setLoading(true) : setRefreshing(true);
    setError(false);

    try {
      const { data } = await axios.get(`${API_URL}/api/notes/stats`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
        },
        signal: controller.signal,
      });

      if (controller.signal.aborted) return;

      if (!data.subjectCoverage || !data.semesterBreakdown) {
        throw new Error("Incomplete statistics response");
      }

      setStats(data);

      if (!initial) toast.success("Statistics updated");

    } catch (err) {
      if (controller.signal.aborted) return;

      console.error("Stats Error:", err);
      if (initial) setError(true);

      toast.error("Unable to load statistics");

    } finally {
      if (initial && mobile && !controller.signal.aborted) {
        await new Promise(resolve =>
          setTimeout(resolve, Math.max(0, 1500 - (Date.now() - start)))
        );
      }

      if (!controller.signal.aborted) {
        setLoading(false);
        setRefreshing(false);

        if (initial && mobile) {
          window.dispatchEvent(new Event("stars-shuffle"));
        }
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchStats();

    return () => request.current?.abort();
  }, []);

  // Overview cards
  const cards = [
    ["Total Notes", stats?.totalNotes, Files, "text-purple-400"],
    ["Total Subjects", stats?.totalSubjects, BookOpen, "text-blue-400"],
    ["Question Banks", stats?.totalQuestionBanks, FileQuestion, "text-amber-400"],
    ["Storage Used", `${stats?.storageUsed ?? 0} MB`, Database, "text-green-400"],
  ];

  const percentage = stats?.storagePercentage ?? 0;

  const status = percentage >= 90
    ? "CRITICAL"
    : percentage >= 50 ? "HEAVY" : "OPTIMAL";

  const statusColor = percentage >= 90
    ? "text-red-400"
    : percentage >= 50 ? "text-amber-400" : "text-green-400";

  const maxNotes = Math.max(
    1, ...Object.values(stats?.semesterBreakdown || {})
  );

  const coverage = Object.entries(
    stats?.subjectCoverage?.[semester] || {}
  ).sort(([a], [b]) => a.localeCompare(b));

return (
  <PageLayout centered={false}>

      {loading && (
        <MobileLoader
          title="Loading Statistics"
          description="Fetching repository insights..."
          icon={ChartNoAxesCombined}
        />
      )}

<div
  className={`w-full max-w-7xl px-0 md:px-10 font-[font1] text-white ${
    loading ? "invisible md:visible" : ""
  }`}
>

  {/* Page Heading */}
  <PageHeader
    title="Platform Analytics"
    description="Insights into your notes repository"
  />

          {loading ? (

            /* Desktop Skeleton */
            <div className="hidden md:block animate-pulse">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map(([title]) => (
                  <div key={title} className={panel}>
                    <div className="h-4 w-24 bg-purple-500/20 rounded mb-5" />
                    <div className="h-10 w-20 bg-white/10 rounded-lg" />
                  </div>
                ))}
              </div>

              <div className={`${panel} h-40 mt-6`} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div className={`${panel} h-80`} />
                <div className={`${panel} h-80`} />
              </div>
            </div>

          ) : error || !stats ? (

            /* Error State */
            <div className="text-center py-20">
              <ChartNoAxesCombined className="w-12 h-12 text-gray-500 mx-auto mb-5" />

              <h3 className="text-2xl font-bold mb-3">
                Unable to Load Statistics
              </h3>

              <p className="text-gray-400 mb-6">
                Please try again.
              </p>

              <button
                onClick={() => fetchStats()}
                className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl cursor-pointer"
              >
                Try Again
              </button>
            </div>

          ) : (

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

              {/* Overview Heading */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <h3 className="text-lg sm:text-xl font-bold">
                  Repository Overview
                </h3>

                <button
                  onClick={() => fetchStats(false)}
                  disabled={refreshing}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-purple-500/50 px-4 py-2 rounded-xl cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
                  <span className="text-sm">
                    {refreshing ? "Refreshing..." : "Refresh"}
                  </span>
                </button>
              </div>

              {/* Overview Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {cards.map(([title, value, Icon, color]) => (
                  <div
                    key={title}
                    className="min-w-0 bg-black/60 border border-white/10 rounded-3xl p-4 sm:p-6 hover:border-purple-500/40 transition"
                  >
                    <div className={`flex items-center justify-between gap-2 mb-5 ${color}`}>
                      <p className="text-[10px] sm:text-xs font-bold uppercase">
                        {title}
                      </p>
                      <Icon className="w-5 h-5 shrink-0" />
                    </div>

                    <h3 className="text-xl sm:text-3xl font-black break-words">
                      {value}
                    </h3>
                  </div>
                ))}
              </div>

              {/* Storage Overview */}
              <div className={`${panel} mt-6`}>
                <div className="flex justify-between items-center gap-3 mb-5">
                  <h3 className="text-xl font-bold">Storage Overview</h3>

                  <span className={`text-xs font-bold ${statusColor}`}>
                    ● {status}
                  </span>
                </div>

                <h3 className="text-3xl font-black mb-5">
                  {stats.storageUsed} MB
                  <span className="text-sm text-gray-500 font-normal">
                    {" "}/ {stats.storageLimit} MB
                  </span>
                </h3>

                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      percentage >= 90 ? "bg-red-500"
                      : percentage >= 50 ? "bg-amber-500"
                      : "bg-purple-500"
                    }`}
                    style={{ width: `${Math.max(0, Math.min(percentage, 100))}%` }}
                  />
                </div>

                <div className="flex justify-between gap-3 mt-3 text-xs sm:text-sm text-gray-400">
                  <span>{percentage}% utilized</span>
                  <span>{stats.storageRemaining} MB remaining</span>
                </div>

                <p className="text-gray-500 text-[11px] mt-4">
                  Based on recorded PDF sizes and the configured repository limit.
                </p>
              </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 items-stretch">

                {/* Notes by Semester */}
                <div className={panel}>
                  <h3 className="text-xl font-bold mb-2">
                    Notes by Semester
                  </h3>

                  <p className="text-gray-500 text-xs mb-8">
                    Distribution across all four semesters
                  </p>

                  <div className="flex flex-col gap-6">
                    {semesters.map(n => {
                      const count = stats.semesterBreakdown?.[n] || 0;

                      return (
                        <div key={n} className="flex items-center gap-3">
                          <span className="text-gray-300 text-xs sm:text-sm w-24 shrink-0">
                            Semester {n}
                          </span>

                          <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-700 to-purple-400 rounded-full transition-all duration-1000"
                              style={{ width: `${count / maxNotes * 100}%` }}
                            />
                          </div>

                          <span className="text-sm font-bold w-8 text-right">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 pt-5 border-t border-white/10 flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Total Uploaded PDFs</span>
                    <span className="text-2xl font-bold text-purple-400">
                      {stats.totalNotes}
                    </span>
                  </div>
                </div>

{/* Subject Coverage */}
<div className={`${panel} lg:h-[500px] flex flex-col`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        Subject Coverage
                      </h3>
                      <p className="text-gray-500 text-xs">
                        Track available and missing study materials
                      </p>
                    </div>

                    <select
                      aria-label="Select semester"
                      value={semester}
                      onChange={e => setSemester(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-gray-300 outline-none focus:border-purple-500 cursor-pointer"
                    >
                      {semesters.map(n => (
                        <option key={n} value={n} className="bg-black">
                          Semester {n}
                        </option>
                      ))}
                    </select>
                  </div>

                  {coverage.length === 0 ? (
                <div className="py-12 text-center flex-1 flex flex-col items-center justify-center">
                      <BookOpen className="w-10 h-10 mx-auto text-gray-600 mb-3" />
                      <p className="text-gray-400 text-sm">
                        No subjects available for this semester.
                      </p>
                    </div>
                  ) : (
<div className="flex flex-col gap-4 lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:pr-2">
  {coverage.map(([subject, availableUnits]) => {
                        const count = units.filter(unit => availableUnits[unit]).length;

                        return (
                          <div key={subject} className="bg-white/5 border border-white/5 rounded-2xl p-3 sm:p-4">

                            <div className="flex items-center justify-between gap-2 mb-4">
                              <h4 className="text-sm font-bold break-words min-w-0">
                                {subject}
                              </h4>

                              <span className={`text-[10px] sm:text-xs shrink-0 ${
                                count === units.length ? "text-green-400" : "text-amber-400"
                              }`}>
                                {count}/{units.length} available
                              </span>
                            </div>

                            <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                              {units.map(unit => {
                                const available = Boolean(availableUnits[unit]);
                                const Icon = available ? CheckCircle2 : XCircle;

                                return (
                                  <div
                                    key={unit}
                                    title={`${unit === "QB" ? "Question Bank" : `Unit ${unit}`}: ${available ? "Available" : "Missing"}`}
                                    className={`flex flex-col items-center justify-center gap-2 py-3 rounded-xl border ${
                                      available
                                        ? "bg-green-500/10 border-green-500/20 text-green-400"
                                        : "bg-red-500/10 border-red-500/20 text-red-400"
                                    }`}
                                  >
                                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="text-[10px] sm:text-xs font-bold">
                                      {unit === "QB" ? "QB" : `U${unit}`}
                                    </span>
                                    <span className="sr-only">
                                      {available ? "Available" : "Missing"}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

               <div className="flex justify-center gap-6 mt-6 text-xs shrink-0">
                    <span className="flex items-center gap-2 text-green-400">
                      <CheckCircle2 className="w-4 h-4" /> Available
                    </span>
                    <span className="flex items-center gap-2 text-red-400">
                      <XCircle className="w-4 h-4" /> Missing
                    </span>
                  </div>
                </div>

              </div>

              {/* Last Updated */}
              <p className="text-center mt-8 pb-6 text-gray-500 text-xs">
                Last updated: {new Date(stats.lastUpdated).toLocaleString("en-IN")}
              </p>

            </div>
                  )}
        </div>
    </PageLayout>
  );
};

export default memo(AdminStats);