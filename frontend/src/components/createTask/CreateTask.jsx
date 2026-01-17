import { useState } from "react";
import { useTheme } from "../../contexts/theme/ThemeProvider";

const CreateTask = ({
    boardId,
    handleSubmit,
    actionLabel,
    prefills
}) => {
    const { theme } = useTheme();

    const [task, setTask] = useState({
        title: prefills?.title || "",
        description: prefills?.description || "",
        status: prefills?.status || "todo",
        priority: prefills?.priority || "medium",
        dueDate: prefills?.dueData || "",
        assignedTo: prefills?.assignedTo || "",
        boardId: prefills?.priority || boardId
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        if (!name) return;

        setTask((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const inputCls =
        "w-full rounded-md px-2 py-1.5 text-sm focus:outline-none";

    return (
        <div className={`flex flex-col gap-2 text-sm `}
        >
            <h4 className="font-semibold">New Task</h4>

            <input
                name="title"
                placeholder="Title"
                value={task?.title}
                onChange={onChange}
                className={inputCls}
                style={{ border: `1px solid ${theme.input}` }}
            />

            <textarea
                name="description"
                placeholder="Description"
                value={task?.description}
                onChange={onChange}
                rows={2}
                className={inputCls}
                style={{ border: `1px solid ${theme.input}` }}
            />

            <div className="flex gap-2">
                <select
                    name="status"
                    value={task?.status}
                    onChange={onChange}
                    className={inputCls}
                    style={{ border: `1px solid ${theme.input}` }}
                >
                    <option value="todo">Todo</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>

                <select
                    name="priority"
                    value={task?.priority}
                    className={inputCls}
                    onChange={onChange}
                    style={{ border: `1px solid ${theme.input}` }}
                >
                    <option value="low">Low</option>
                    <option value="medium">Med</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div className="flex gap-2">
                <input
                    type="date"
                    name="dueDate"
                    value={task?.dueDate}
                    onChange={onChange}
                    className={inputCls}
                    style={{ border: `1px solid ${theme.input}` }}
                />

                <input
                    name="assignedTo"
                    placeholder="Assignee"
                    value={task?.assignedTo}
                    onChange={onChange}
                    className={inputCls}
                    style={{ border: `1px solid ${theme.input}` }}
                />
            </div>

            {task?.title && (
                <button
                    className="self-end mt-1 px-4 py-1.5 rounded-md text-sm"
                    style={{
                        background: theme.primary,
                        color: theme.primaryText
                    }}
                    onClick={() => handleSubmit(task)}
                >
                    {actionLabel||"Create"}
                </button>
            )}
        </div>
    );
};

export default CreateTask;
