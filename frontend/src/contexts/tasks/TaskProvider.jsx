import { createContext, useContext, useState } from "react"
const TaskContext = createContext(null);
const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
        setTasks((prev) => [...prev, task]);
    };

    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((t) => t._id !== id));
    };
    return (
        <TaskContext.Provider
            value={{
                tasks,
                setTasks,
                addTask,
                deleteTask,
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