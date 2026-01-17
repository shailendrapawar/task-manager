import { useTheme } from "../../contexts/theme/ThemeProvider"
import { MdWindow } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { Modal } from "../../components/modal/Modal";
import { useEffect, useState } from "react";
import CreateBoard from "../../components/createBoard/CreateBoard";
import { dummyBoards } from "../../utils/BoardData.js"
import BoardCard from "../../components/boardCard/BoardCard.jsx";

import { toast } from "react-hot-toast"
import API from "../../configs/api.js"

const Home = () => {
    // console.log(useTheme())
    const { theme } = useTheme()
    const [boardModalOpen, setBoardModalOpen] = useState(false);
    const [boards, setBoards] = useState([]);

    const [agg, setAgg] = useState([])

    const [newBoard, setNewBoard] = useState({
        title: "",
        description: ""
    })

    const fetchAllboards = async () => {
        try {
            const result = await API.get("/boards");
            // console.log(result);
            const { items, agg } = result?.data?.data

            // console.log(result?.data?.data)
            if (Array.isArray(items)) {
                setBoards(items)
                setAgg(agg)
                return
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    const createBoard = async () => {
        try {
            if (newBoard.title == "" || newBoard.description == "") {
                toast.error("All Fields is mandatory")
                return
            }
            const result = await API.post("/boards", newBoard)
            // console.log(result)
            const newEntry = result.data.data
            if (newEntry) {
                setBoards(prev => [...prev, newEntry])
            }
            toast.success("Board created")

        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setBoardModalOpen(false)
        }
    }

    useEffect(() => {
        fetchAllboards()
    }, [])

    return (

        <main className=" h-full w-full "
            style={{
                backgroundColor: theme.background,
                color: theme.text,
            }}
        >

            <section className=" h-18 w-full  flex justify-between items-center px-5 "
                style={{
                    borderBottom: `2px solid ${theme.border}`
                }}
            >

                <span className=" flex items-center gap-2"
                    style={{ color: theme.primary }}
                >
                    <MdWindow className="h-10 w-10" />
                    <span className="text-xl font-semibold">Task-Flow</span>
                </span>

                <button className=" text-white px-4 py-2 rounded-md  transition flex items-center gap-2"
                    style={{ backgroundColor: theme.primary }}
                    onClick={() => setBoardModalOpen(true)}
                >
                    <IoIosAdd className=" inline-block h-5 w-5 font-semibold" />
                    New Board
                </button>
            </section>

            <section>
                <Modal isOpen={boardModalOpen} onClose={() => setBoardModalOpen(false)} >
                    <CreateBoard newBoard={newBoard} setNewBoard={setNewBoard} createBoard={createBoard} />
                </Modal>

                <main className=" h-auto w-full px-5 mt-5">

                    <h3 className="text-2xl font-semibold" style={{ color: theme.mutedText }}>Your Boards </h3>
                    <span style={{ color: theme.mutedText }}>Organize your work with Kanban boards</span>

                    <div className="h-auto w-full grid grid-cols-1 sm:grid-cols-2 place-items-center gap-2 py-5 mt-5">
                        {
                            boards?.map((board) => {
                                const aggData = agg?.filter((v, i) => v?._id?.toString() == board?._id?.toString())
                                return <BoardCard key={board?._id} board={board} aggData={aggData?.[0]} />
                            })
                        }

                    </div>

                </main>
            </section>


        </main>
    )
}
export default Home