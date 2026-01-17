import { useTheme } from "../../contexts/theme/ThemeProvider"
import { MdWindow } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import List from "../../components/list/List";

import { dummyLists } from "../../utils/listData.js";
import { dummyTasks } from "../../utils/tasksData.js";
import { Modal } from "../../components/modal/Modal.jsx";
import CreateBoard from "../../components/createBoard/CreateBoard.jsx";
import CreateTask from "../../components/createTask/CreateTask.jsx";
import API from "../../configs/api.js";
import toast from "react-hot-toast";
import { useTasks } from "../../contexts/tasks/TaskProvider.jsx";


export const Board = () => {
  const { theme } = useTheme()
  const { setTasks, tasks, addTask } = useTasks();

  // console.log(useTasks())
  const { name, id } = useParams()

  const [isModelOpen, setIsModelOpen] = useState(false);

  const [list, setlist] = useState(dummyLists)

  const fetchAllTasks = async (id) => {
    try {
      const result = await API.get(`/tasks?boardId=${id}`);
      // console.log(result)
      const items = result?.data?.data?.items
      if (items.length) {
        setTasks(items)
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  const handleCreateNewTask = useCallback(async (data) => {
    try {
      if (data?.title == "" || data?.description == "" || data.boardId == "" ||
        data.dueDate == "" ||
        data?.assignedTo == ""
      ) {
        toast.error("All fields manadatory ")
        return
      }

      const result = await API.post(`/boards/${id}/tasks`, data);

      const item = result?.data?.data
      if (item) {
        addTask(item)
      }
      setIsModelOpen(false)
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsModelOpen(false)
    }
  }, [])


  const handleDeleteTask = useCallback(() => {
    try {

    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      // setIsModelOpen(false)
    }
  }, [])

  const captureDeleteEvent = async (e) => {
    const action = e.target.dataset.action;
    console.log(action);
  }

  useEffect(() => {
    if (id) {
      fetchAllTasks(id)
    }

  }, [id])

  return (
    <main className="h-full w-full"
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
          <span className="text-xl font-semibold">{name || ""}</span>
        </span>

        <button className=" text-white px-4 py-2 rounded-md  transition flex items-center gap-2"
          style={{ backgroundColor: theme.primary }}
          onClick={() => setIsModelOpen(true)}
        >
          <IoIosAdd className=" inline-block h-5 w-5 font-semibold" />
          New Task
        </button>
      </section>

      <Modal isOpen={isModelOpen} onClose={() => setIsModelOpen(false)}>
        <CreateTask handleSubmit={handleCreateNewTask} />
      </Modal>

      <section className=" h-auto min-h-50 mt-5 gap-5 px-2 items-center grid grid-cols-3"
        onClickCapture={(e) => captureDeleteEvent(e)}
      >
        {list?.map((lst, i) => (
          <List key={i} lst={lst}
            items={tasks?.filter((v, i) => v.status === lst.value)}
            handleCreateNewTask={handleCreateNewTask}
            handleDeleteTask={handleDeleteTask}
          />
        ))}
      </section>

    </main>
  )
} 