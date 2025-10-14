import { useEffect, useState } from "react";
import azkarService from "../services/azkar-service";
import { Zikr } from "../types/azkar";

export function useAzkar(category: "morning" | "evening") {
  const [azkar, setAzkar] = useState<Zikr[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAzkar();
  }, [category]);

  const loadAzkar = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await azkarService.getAzkarByCategory(category);
      setAzkar(data);
    } catch (err) {
      setError("Failed to load azkar. Please check your connection.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const incrementCount = (zikrId: string) => {
    setAzkar((prev) =>
      prev.map((zikr) => {
        if (zikr.id === zikrId && (zikr.currentCount || 0) < zikr.repetitions) {
          return {
            ...zikr,
            currentCount: (zikr.currentCount || 0) + 1,
          };
        }
        return zikr;
      })
    );
  };

  const decrementCount = (zikrId: string) => {
    setAzkar((prev) =>
      prev.map((zikr) => {
        if (zikr.id === zikrId && (zikr.currentCount || 0) > 0) {
          return {
            ...zikr,
            currentCount: (zikr.currentCount || 0) - 1,
          };
        }
        return zikr;
      })
    );
  };

  const resetCount = (zikrId: string) => {
    setAzkar((prev) =>
      prev.map((zikr) => {
        if (zikr.id === zikrId) {
          return { ...zikr, currentCount: 0 };
        }
        return zikr;
      })
    );
  };

  const resetAll = () => {
    setAzkar((prev) => prev.map((zikr) => ({ ...zikr, currentCount: 0 })));
  };

  return {
    azkar,
    loading,
    error,
    incrementCount,
    decrementCount,
    resetCount,
    resetAll,
    refresh: loadAzkar,
  };
}
