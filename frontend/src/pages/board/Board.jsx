import { useTheme } from "../../contexts/theme/ThemeProvider"
import { MdWindow } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import List from "../../components/list/List";

import { dummyLists } from "../../utils/listData.js";
import { Modal } from "../../components/modal/Modal.jsx";
import CreateTask from "../../components/createTask/CreateTask.jsx";
import API from "../../configs/api.js";
import toast from "react-hot-toast";
import { useTasks } from "../../contexts/tasks/TaskProvider.jsx";
import { IoCaretBack } from "react-icons/io5";

export const Board = () => {
  const navigate = useNavigate();
  const { theme } = useTheme()
  const { setTasks, tasks, addTask, deleteTask, updateTask, aggData } = useTasks();

  const [loading, setLoading] = useState(false);

  const { name, id } = useParams()

  const [isModelOpen, setIsModelOpen] = useState(false);

  const [list, setlist] = useState(dummyLists)


  const fetchAllTasks = async (id) => {
    try {
      const result = await API.get(`/tasks?boardId=${id}`);

      const items = result?.data?.data?.items
      if (Array.isArray(items)) {
        setTasks(items)
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  const handleCreateNewTask = useCallback(async (data) => {
    try {
      if (loading) return
      if (data?.title == "" || data?.description == "" || data.boardId == "" ||
        data.dueDate == "" ||
        data?.assignedTo == ""
      ) {
        toast.error("All fields manadatory ")
        return
      }
      setLoading(true);

      const result = await API.post(`/boards/${id}/tasks`, data);

      const item = result?.data?.data
      if (item) {
        addTask(item)
      }
      setIsModelOpen(false)
      toast.success("New Task added")
    } catch (error) {
      toast.error("Something went wrong")
      setIsModelOpen(false)
    } finally {
      setLoading(false);
    }
  }, [id])


  const handleDeleteTask = useCallback(async (task) => {
    if (loading) return

    try {
      setLoading(true)
      const result = await API.delete(`/tasks/${task?._id}`)
      if (result?.data?.success) {
        deleteTask(task?._id)
        toast.success("Task deleted successfully")
      } else {
        toast.error("Failed to delete task")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete task")
    } finally {
      setLoading(false)
    }
  }, [id])

  const handleUpdateTask = useCallback(async (updatedTask, id) => {
    if (!id) return
    if (loading) return

    try {
      setIsModelOpen(false)
      setLoading(true)
      const result = await API.put(`/tasks/${id}`, updatedTask)
      toast.success("Task Updated..")
      setIsModelOpen(false)
      updateTask(updatedTask, id)
    } catch (error) {
      const errMsg = error?.response?.data?.error || "Somethig went wrong"
      toast.error(errMsg)
    } finally {
      setLoading(false)
    }
  }, [id])


  useEffect(() => {
    if (id) {
      fetchAllTasks(id)
    }
    console.log("page found")

  }, [])

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
          <IoCaretBack className="h-10 w-10 cursor-pointer active:opacity-90" onClick={() => navigate(-1)} />

          <span className="text-xl font-semibold ">{name || ""}{name != "" ? " 's Board" : ""}</span>
        </span>

        <button className=" text-white px-4 py-2 rounded-md active:opacity-95 active:scale-95 ease-in  transition flex items-center gap-2"
          style={{ backgroundColor: theme.primary }}
          onClick={() => setIsModelOpen(true)}
        >
          <IoIosAdd className=" inline-block h-5 w-5 font-semibold" />
          New Task
        </button>
      </section>

      <Modal isOpen={isModelOpen} onClose={() => setIsModelOpen(false)}>
        <CreateTask handleSubmit={handleCreateNewTask}
        />
      </Modal>

      <section className=" h-auto min-h-50 mt-5 gap-5 px-2 items-center grid grid-cols-3"
      >
        {list?.map((lst, i) => (
          <List key={i} lst={lst}
            items={tasks?.filter((v, i) => v.status === lst.value)}
            handleCreateNewTask={handleCreateNewTask}
            handleDeleteTask={handleDeleteTask}
            handleUpdateTask={handleUpdateTask}

          />
        ))}
      </section>

    </main>
  )
} 