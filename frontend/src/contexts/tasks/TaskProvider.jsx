import { createContext, useContext, useState } from "react"
const TaskContext = createContext(null);
const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
        setTasks((prev) => [...prev, task]);
    };

    const deleteTask = (id) => {
        setTasks((prev) =>
            prev.filter((t) => t?._id?.toString() !== id?.toString())
        );
    };

    const updateTask = (updatedTask, id) => {
        setTasks((prev) =>
            prev.map((task) =>
                task._id?.toString() === id?.toString()
                    ? { ...task, ...updatedTask }
                    : task
            )
        );
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                setTasks,
                addTask,
                deleteTask,
                updateTask
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}
export default TaskProvider

export const useTasks = () => {
    const ctx = useContext(TaskContext);
    if (!ctx) throw new Error("useTasks must be used inside TaskProvider");
    return ctx;
};