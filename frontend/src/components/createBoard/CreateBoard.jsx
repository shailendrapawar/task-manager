import { useState } from "react";
import { useTheme } from "../../contexts/theme/ThemeProvider"


const CreateBoard = ({ newBoard, setNewBoard, createBoard }) => {
    const { theme } = useTheme()
    const boardData = useState(newBoard)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBoard((prevData) => ({
            ...prevData,
            [name]: value
        }));

    };

    return (
        <div className=" w-100 h-60  py-1  relative flex flex-col "
            onChange={(e) => handleChange(e)}
        >

            <h3 className="text-2xl font-semibold">Create New Board</h3>
            <input type="text"
                placeholder="Board Name"
                className=" w-full border-2 border-gray-300 rounded-md px-3 py-2 mt-4 focus:outline-none focus:ring-1 focus:ring-gray-500 transition "
                name="title"
                value={boardData.title}
            />
            <textarea
                placeholder="Board Description"
                className=" w-full border-2 border-gray-300 rounded-md px-3 py-2 mt-4 focus:outline-none focus:ring-1 focus:ring-gray-500 transition  resize-none"
                name="description"
                value={boardData.description}
            ></textarea>

            {boardData.title != "" && (
                <button className=" h-10 w-30 mt-5 self-end rounded-md transition  active:scale-90 ease-in-out"
                    style={{ backgroundColor: theme.primary, color: 'white' }}
                    onClick={createBoard}
                >
                    Create Board
                </button>
            )}
        </div>
    )
}
export default CreateBoard