import { IoMdAdd } from "react-icons/io";
import TaskCard from "../taskCard/TaskCard";
import { Modal } from "../modal/Modal";
import { useState } from "react";
import CreateTask from "../createTask/CreateTask";
import { useParams } from "react-router-dom"

const List = ({ lst, items,
    handleCreateNewTask,
    handleDeleteTask,
    handleUpdateTask
}) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const { boardId } = useParams()
    // console.log(items)


    return (
        <div key={lst?.id} className={`${lst?.bg}  w-full h-100 overflow-y-scroll hide-scrollbar rounded-md relative`}>

            <section className=" h-10  w-full justify-between items-center px-3 py-2 rounded-t-md flex-row flex cursor-pointer ">
                <span className="flex  items-center gap-2  cursor-pointer">
                    <span className="text-xs font-semibold">{lst.title}</span>
                    <div className={`h-5 w-5 rounded-full items-center justify-center flex bg-white text-[10px]`}>{items?.length || 0}</div>
                </span>
                <IoMdAdd className="h-6 w-6" onClick={() => setIsModalOpen(true)} />
            </section>

            <main className="px-2 py-4 flex flex-col gap-2">
                {items?.map((item, i) => (
                    <TaskCard key={i} data={item}
                        handleDeleteTask={handleDeleteTask}
                        handleUpdateTask={handleUpdateTask}
                    />
                ))}
            </main>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
                <CreateTask prefills={{ status: lst.value }} boardId={boardId} handleSubmit={handleCreateNewTask} />
            </Modal>

        </div>
    )
}
export default List