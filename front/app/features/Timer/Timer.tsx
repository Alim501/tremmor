import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  startTimer,
  stopTimer,
  resetTimer,
  tick,
  changePhase,
} from "./timerSlice";
import { fetchAndSetTasks, completeCycleAndUpdateTasks } from "./timerThunks";
import type { RootState } from "~/store";
import { useAppDispatch } from "~/store";
import TodoButton from "~/components/elements/todoButton";
import { fetchTasks } from "../ToDoTasks/taskThunks";

export default function Timer() {
  const dispatch = useAppDispatch();
  const { time, isRunning, isBrake, tasks } = useSelector(
    (state: RootState) => state.timer
  );

  const [activeButton, setActiveButton] = useState<
    "start" | "pause" | "reset" | null
  >(null);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    dispatch(fetchAndSetTasks());
  }, [dispatch]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        dispatch(tick());
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, dispatch]);

  useEffect(() => {
    if (time === 0 && isBrake === "no") {
      dispatch(completeCycleAndUpdateTasks()).then(() => {
        dispatch(fetchTasks());
      });
    } else if (time === 0) {
      dispatch(changePhase());
    }
  }, [time, isBrake, dispatch]);

  const getStatusLabel = () => {
    if (isBrake === "no") return "Running";
    if (isBrake === "short") return "Brake (Short)";
    if (isBrake === "long") return "Brake (Long)";
    return "Paused";
  };

  console.log(time, isRunning, isBrake, tasks);

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-3xl font-bold">{formatTime(time)}</h1>
      <div className="text-lg font-semibold">Status: {getStatusLabel()}</div>
      <div className="flex space-x-4">
        <TodoButton
          onClick={() => {
            setActiveButton("start");
            dispatch(startTimer());
          }}
          text="▶️ Старт"
          color={activeButton === "start" ? "green" : "gray"}
        />
        <TodoButton
          onClick={() => {
            setActiveButton("pause");
            dispatch(stopTimer());
          }}
          text="⏸️ Пауза"
          color={activeButton === "pause" ? "yellow" : "gray"}
        />
        <TodoButton
          onClick={() => {
            setActiveButton("reset");
            dispatch(resetTimer());
            setTimeout(() => setActiveButton(null), 1000);
          }}
          text="🔄 Сброс"
          color={activeButton === "reset" ? "red" : "gray"}
        />
      </div>
    </div>
  );
}
