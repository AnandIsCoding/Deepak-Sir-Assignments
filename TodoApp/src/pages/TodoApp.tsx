import React, { useState } from "react";
import {
  useAddTaskMutation,
  useGetTodosQuery,
  useDeleteTaskMutation,
  useToggleTaskMutation,
} from "../api";

import { FiTrash2, FiCircle, FiCheckCircle } from "react-icons/fi";

export default function TodoApp() {
  const [text, setText] = useState("");

  const { data = [], isLoading } = useGetTodosQuery();
  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [toggleTask] = useToggleTaskMutation();

  const handleAdd = async () => {
    if (!text.trim()) return;

    await addTask({ title: text, completed: false });
    setText(""); // clear input
  };

  if (isLoading)
    return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-6">

        <h1 className="text-2xl font-bold text-gray-900 mb-5 text-center">
          🌟 Beautiful Todo App
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-5">
          <input
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Write a task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            onClick={handleAdd}
            className="px-5 py-3 bg-blue-600 text-white rounded-xl shadow-md
                       hover:bg-blue-700 active:scale-95 transition"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {data.map((t: any) => (
            <div
              key={t.id}
              className="flex justify-between items-center p-4 rounded-xl bg-white shadow-md
                         border border-gray-200 hover:shadow-lg transition"
            >
              <span
                className={`text-lg ${
                  t.completed ? "line-through text-gray-500" : "text-gray-800"
                }`}
              >
                {t.title}
              </span>

              <div className="flex items-center gap-4 text-xl">

                {/* Toggle Completed */}
                <button
                  className="text-green-600 hover:scale-110 transition"
                  onClick={() => toggleTask(t)}
                >
                  {t.completed ? <FiCheckCircle /> : <FiCircle />}
                </button>

                {/* Delete */}
                <button
                  className="text-red-500 hover:scale-110 transition"
                  onClick={() => deleteTask(t.id)}
                >
                  <FiTrash2 />
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
