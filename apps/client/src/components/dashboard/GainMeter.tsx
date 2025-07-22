import { useGlobalStore } from "@/store/global";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export const GainMeter = () => {
  const getCurrentGainValue = useGlobalStore(
    (state) => state.getCurrentGainValue
  );
  const isEnabled = useGlobalStore((state) => state.isSpatialAudioEnabled);

  const [gainValue, setGainValue] = useState(1);

  // Update gain value every 50ms for smoother animation
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentGain = getCurrentGainValue();
      setGainValue(currentGain);
    }, 50);

    return () => clearInterval(intervalId);
  }, [getCurrentGainValue]);

  // Calculate bar width as percentage (max gain is typically 1)
  // Limit to 94% to maintain visible border radius at max gain
  const barWidthPercent = Math.min(94, Math.max(0, gainValue * 94));

  // Format gain value as percentage
  const gainPercentage = Math.round(gainValue * 100);

  // Get color based on gain value using smooth interpolation - neutral gray to green
  const getColor = () => {
    if (gainValue >= 0.9) return "#22c55e"; // green-500
    if (gainValue >= 0.7) return "#4ade80"; // green-400
    if (gainValue >= 0.5) return "#86efac"; // green-300
    if (gainValue >= 0.3) return "#a3a3a3"; // neutral-400
    return "#737373"; // neutral-500
  };

  return (
    <div className="flex items-center w-full">
      <div className="text-xs font-mono text-neutral-400 pr-2.5">
        {gainPercentage}%
      </div>

      {/* Visual gain meter */}
      <div className="relative h-3 w-full bg-neutral-800/60 rounded-full overflow-hidden flex items-center px-0.5">
        <motion.div
          className="absolute h-1.5 rounded-full"
          initial={{ width: 0 }}
          animate={{
            width: `${barWidthPercent}%`,
            opacity: isEnabled ? 1 : 0.5,
            backgroundColor: getColor(),
          }}
          transition={{
            duration: 0.05,
            type: "tween",
            backgroundColor: { duration: 0.2 },
          }}
        />
      </div>
    </div>
  );
};
