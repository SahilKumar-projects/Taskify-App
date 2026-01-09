import { useEffect, useState } from "react";
import API from "../services/api";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TasksSection = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");
  const [editDueDate, setEditDueDate] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await API.post("/tasks", {
      title,
      priority,
      dueDate: dueDate || null,
    });

    setTitle("");
    setPriority("Medium");
    setDueDate("");
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await API.put(`/tasks/${task._id}`, {
      completed: !task.completed,
    });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
  };

  const saveEdit = async (id) => {
    await API.put(`/tasks/${id}`, {
      title: editTitle,
      priority: editPriority,
      dueDate: editDueDate || null,
    });
    setEditingId(null);
    fetchTasks();
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const reordered = Array.from(tasks);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setTasks(reordered);

    await API.put(
      "/tasks/reorder/all",
      reordered.map((t, i) => ({ id: t._id, order: i }))
    );
  };

  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white shadow-xl p-5 mb-6">
      <h3 className="font-semibold mb-2">
        My Tasks ({completed}/{total})
      </h3>

      {/* PROGRESS BAR */}
      <div className="mb-4">
        <div className="w-full h-2 bg-gray-200 rounded">
          <div
            className="h-2 bg-black rounded transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ADD TASK – RESPONSIVE */}
      <form
        onSubmit={handleAdd}
        className="flex flex-col sm:flex-row gap-2 mb-3"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task"
          className="w-full px-3 py-2 rounded-lg bg-gray-100"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 rounded-lg bg-gray-100"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 rounded-lg bg-gray-100"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button className="bg-black text-white px-4 py-2 rounded-lg w-full sm:w-auto">
          Add
        </button>
      </form>

      {/* SEARCH */}
      <input
        placeholder="Search tasks"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-3 px-3 py-2 rounded-lg bg-gray-100"
      />

      {/* TASK LIST */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(p) => (
            <div ref={p.innerRef} {...p.droppableProps} className="space-y-2">
              {filtered.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(p) => (
                    <div
                      ref={p.innerRef}
                      {...p.draggableProps}
                      {...p.dragHandleProps}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-white border rounded-lg p-3"
                    >
                      {editingId === task._id ? (
                        <div className="flex flex-col sm:flex-row flex-1 gap-2">
                          <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="flex-1 px-2 py-1 rounded bg-gray-100"
                          />

                          <input
                            type="date"
                            value={editDueDate}
                            onChange={(e) => setEditDueDate(e.target.value)}
                            className="px-2 py-1 rounded bg-gray-100"
                          />

                          <select
                            value={editPriority}
                            onChange={(e) => setEditPriority(e.target.value)}
                            className="px-2 py-1 rounded bg-gray-100"
                          >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                          </select>

                          <button
                            onClick={() => saveEdit(task._id)}
                            className="text-green-600 text-sm"
                          >
                            Save
                          </button>

                          <button
                            onClick={() => setEditingId(null)}
                            className="text-gray-500 text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex flex-wrap items-center gap-3">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => toggleComplete(task)}
                            />

                            <span
                              className={`${
                                task.completed
                                  ? "line-through text-gray-400"
                                  : ""
                              }`}
                            >
                              {task.title}
                            </span>

                            <span
                              className={`text-xs px-2 py-0.5 rounded ${
                                task.priority === "High"
                                  ? "bg-red-100 text-red-600"
                                  : task.priority === "Low"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-yellow-100 text-yellow-600"
                              }`}
                            >
                              {task.priority}
                            </span>

                            {task.dueDate && (
                              <span className="text-xs text-gray-500">
                                Due:{" "}
                                {new Date(task.dueDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>

                          <div className="flex gap-4 text-sm">
                            <button
                              onClick={() => startEdit(task)}
                              className="text-blue-600"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => handleDelete(task._id)}
                              className="text-red-500"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {p.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TasksSection;
