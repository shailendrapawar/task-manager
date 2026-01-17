import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
// import { renderPriority } from "../../utils/tasksData";
const TaskCard = ({ data }) => {
    const { title,
        description,
        assignee,
        priority,
        onEdit,
        onDelete,
        assignedTo
    } = data
    // console.log(data)
    const [isHover, setIsHover] = useState(false);

    const handleDelete = () => {

    }

    return (
        <div
            className="w-full rounded-lg bg-white px-4 py-3 cursor-pointer"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
            onMouseOver={(e) => setIsHover(true)}
            onMouseOut={(e) => setIsHover(false)}
        >
            {/* Header: title + actions */}
            <div className="flex justify-between items-start mb-1 cursor-pointer">
                <h4 className="text-sm font-semibold">
                    {title}
                </h4>


                <div className={`flex gap-1 text-sm cursor-pointer relative ${isHover ? 'visible' : 'invisible'}`}>
                    <button className="text-red-500 hover:text-white hover:bg-red-500 active:opacity-80 rounded-full transition-all ease-in-out h-6 w-6 cursor-pointer flex  justify-center items-center"

                    >
                        <MdDeleteForever data-action="delete-task"
                            data-id={`${data.id || data._id}`}
                            className="" 
                            />
                    </button>
                    <button className="text-blue-500 hover:text-white hover:bg-blue-500 active:opacity-80 rounded-full transition-all ease-in-out h-6 w-6 cursor-pointer flex justify-center items-center"

                    >
                        <MdEdit data-action="edit-task"
                            data-id={`${data.id || data._id}`}
                            className=""
                        />
                    </button>
                </div>

            </div>

            {/* Description */}
            <p className="text-xs text-gray-500 mb-3">
                {description}
            </p>

            {/* Footer */}
            <div className=" mt-5 flex flex-col sm:flex-row gap-2 items-center justify-between">
                {/* Assignee */}
                <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                        {assignedTo?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs text-gray-600">
                        Assinee: {assignedTo}
                    </span>
                </div>

                {renderPriority(priority)}
            </div>
        </div>
    );
};

export default TaskCard;

export const renderPriority = (priority = "medium") => {
    const map = {
        low: {
            bg: "#ecfdf5",
            text: "#16a34a"
        },
        medium: {
            bg: "#fffbeb",
            text: "#d97706"
        },
        high: {
            bg: "#fef2f2",
            text: "#dc2626"
        }
    };

    const { bg, text } = map[priority] || map.medium;

    return (
        <span
            className="text-[10px] px-2 py-1 rounded"
            style={{
                backgroundColor: bg,
                color: text
            }}
        >
            {priority}
        </span>
    );
};