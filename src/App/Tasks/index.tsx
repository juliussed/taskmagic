import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/store";
import { useEffect, useState, useCallback } from "react";
import { LuAlarmClock } from "react-icons/lu";
import { RiStarLine, RiBriefcaseLine, RiBookOpenLine, RiAppsLine } from "react-icons/ri";
import { Dropdown, Menu } from "antd";
import { MdOutlineDelete, MdModeEdit } from "react-icons/md";
import { EllipsisOutlined } from "@ant-design/icons";
import { deleteTask, setSelectedTask } from "../../Redux/taskSlice";

interface Task {
  id: string;
  title: string;
  note: string;
  deadline: string;
  category: string;
  color: string;
  time: string;
}

// Function to calculate time remaining
const calculateTimeRemaining = (deadline: string) => {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const difference = deadlineDate.getTime() - now.getTime();

  if (difference <= 0) return "Expired";

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return hours >= 24
    ? `${Math.floor(hours / 24)}d ${hours % 24}h ${minutes}m`
    : `${hours}h ${minutes}m ${seconds}s`;
};

// Category Styling
const categoryStyles: Record<string, { bgColor: string; textColor: string; icon: JSX.Element }> = {
  Important: { bgColor: "bg-red-800", textColor: "text-white", icon: <RiStarLine /> },
  Work: { bgColor: "bg-blue-800", textColor: "text-white", icon: <RiBriefcaseLine /> },
  Assignments: { bgColor: "bg-green-800", textColor: "text-white", icon: <RiBookOpenLine /> },
  Others: { bgColor: "bg-gray-800", textColor: "text-white", icon: <RiAppsLine /> },
};

// TaskList Component
const TaskList = ({
  title,
  tasks,
  countdowns,
  onEdit,
  onDelete,
}: {
  title: string;
  tasks: Task[];
  countdowns: Record<string, string>;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}) => {
  const { bgColor, textColor, icon } = categoryStyles[title] || categoryStyles["Others"];

  return (
    <div className="h-[full] w-[25%] bg-gray-100 rounded-lg shadow-md flex flex-col">
      {/* Fixed Header */}
      <h2 className={`text-xl rounded-t-lg text-center p-2 ${bgColor} ${textColor} flex items-center justify-center gap-2`}>
        {icon} {title} Tasks
      </h2>

      {/* Scrollable Task List */}
      <div className="flex-grow flex flex-col gap-2 overflow-y-auto scrollbar-none p-2 space-y-2">
        {tasks.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {tasks.map((task) => {
              const menu = (
                <Menu
                  items={[
                    { key: "edit", label: "Edit", icon: <MdModeEdit size={20} />, onClick: () => onEdit(task) },
                    { key: "delete", label: "Delete", icon: <MdOutlineDelete size={20} />, danger: true, onClick: () => onDelete(task.id) },
                  ]}
                />
              );

              return (
                <li
                  key={task.id}
                  className={`relative p-3 text-lg h-[150px] flex flex-col items-center justify-between rounded-md shadow-md cursor-pointer hover:rotate-1 ${
                    countdowns[task.id] === "Expired"
                      ? "animate-blink bg-red-200 text-gray-700 border border-white"
                      : "bg-gray-200"
                  }`}
                  style={{ border: `2px solid ${task.color}` }}
                >
                  {/* Dropdown Menu */}
                  <div className="absolute top-2 right-2">
                    <Dropdown overlay={menu} trigger={["click"]} placement="bottomLeft">
                      <EllipsisOutlined className="text-xl cursor-pointer" />
                    </Dropdown>
                  </div>

                  <h3 className="h-[20%] font-bold flex w-full items-center justify-center">{task.title}</h3>
                  <small className="flex w-full py-2 h-[80%] flex-wrap text-center">{task.note}</small>
                  <div className="w-full flex justify-end h-[20%]">
                    <small className="flex items-center gap-3">
                      <LuAlarmClock />
                      <span>{countdowns[task.id]}</span>
                    </small>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="h-full flex justify-center items-center text-gray-400">No {title} Tasks</div>
        )}
      </div>
    </div>
  );
};

// Main Tasks Component
export default function Tasks({ searchQuery }: { searchQuery: string }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [countdowns, setCountdowns] = useState<Record<string, string>>({});

  // Update countdowns
  const updateCountdowns = useCallback(() => {
    const updatedCountdowns: Record<string, string> = {};
    tasks.forEach((task) => {
      updatedCountdowns[task.id] = calculateTimeRemaining(task.deadline);
    });
    setCountdowns(updatedCountdowns);
  }, [tasks]);

  useEffect(() => {
    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [updateCountdowns]);

  // 🔍 Filter tasks based on search query
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Categorize tasks
  const categorizedTasks = {
    Important: filteredTasks.filter((task) => task.category === "Important"),
    Work: filteredTasks.filter((task) => task.category === "Work"),
    Assignments: filteredTasks.filter((task) => task.category === "Assignments"),
    Others: filteredTasks.filter((task) => !["Important", "Work", "Assignments"].includes(task.category)),
  };

  return (
    <div className="w-full h-full flex justify-between gap-2">
      {Object.entries(categorizedTasks).map(([category, taskList]) => (
        <TaskList
          key={category}
          title={category}
          tasks={taskList}
          countdowns={countdowns}
          onEdit={(task) => dispatch(setSelectedTask(task))}
          onDelete={(id) => dispatch(deleteTask(id))}
        />
      ))}
    </div>
  );
}
