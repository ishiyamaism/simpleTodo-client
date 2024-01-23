import { API_URL } from "@/staticValues/url";
import { useState } from "react";
import { CiClock1 } from "react-icons/ci";
import { FaClock, FaEdit, FaSave } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useTodos } from "../hooks/useTodos";
import { TodoType } from "../types";
import { formatDate } from "../utils/formatDate";
type TodoProps = {
  todo: TodoType;
};

const Todo = ({ todo }: TodoProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(todo.title);
  const { todos, mutate } = useTodos();

  const handleEdit = async () => {
    setIsEditing(!isEditing);

    if (isEditing) {
      const response = await fetch(
        `https://02.kaizentools.net/api/todo/${todo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: editedTitle,
          }),
        }
      );

      if (response.ok) {
        const editedTodo = await response.json();
        const updatedTodos = todos.map((todo: TodoType) =>
          todo.id === editedTodo.id ? editedTodo : todo
        );
        mutate(updatedTodos);
      }
    }
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`${API_URL}/todo/${todo.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const updatedTodos = todos.filter((todo: TodoType) => todo.id != id);
      mutate(updatedTodos);
    }
  };

  const toggleTodoCompletion = async (id: number, done: boolean) => {
    const method = done ? "DELETE" : "PUT";

    const response = await fetch(`${API_URL}/todo/${id}/done`, {
      method: method,
    });

    if (response.ok) {
      const editedTodo = await response.json();
      const updatedTodos = todos.map((todo: TodoType) =>
        todo.id === editedTodo.id ? editedTodo : todo
      );
      mutate(updatedTodos);
    }
  };

  return (
    <li className="py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id={`todo1${todo.id}`}
            type="checkbox"
            checked={todo.done ? true : false}
            onChange={() => toggleTodoCompletion(todo.id, todo.done)}
            className="hidden" // チェックボックスを非表示にする
          />
          <label
            htmlFor={`todo1${todo.id}`}
            className="flex items-center cursor-pointer"
          >
            <div className="w-4 h-4 flex justify-center items-center mr-2">
              {/* カスタムチェックボックス */}
              <div
                className={`rounded-full border-2 ${
                  todo.done ? "bg-slate-500" : "border-slate-500"
                } w-4 h-4 flex items-center justify-center`}
              >
                {/* チェックされたときに表示されるアイコン */}
                {todo.done ? (
                  <div className="rounded-full bg-blue-500 w-2 h-2"></div>
                ) : null}
              </div>
            </div>
          </label>
          <div className="flex flex-col">
            {isEditing ? (
              <input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                type="text"
                className="border rounded py-1 px-2"
              />
            ) : (
              <>
                <div
                  className={`text-lg font-medium mr-2 ${
                    todo.done ? "line-through" : ""
                  }`}
                >
                  {todo.title}
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-xs font-extralight font-mono ">
                  <CiClock1 /> {formatDate(new Date(todo.created_at))}
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-xs font-extralight font-mono ">
                  <FaClock /> {formatDate(new Date(todo.updated_at))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleEdit}
            className="duration-300 hover:bg-gray-200 py-2 px-2 rounded-md border"
          >
            {isEditing ? <FaSave /> : <FaEdit />}
          </button>

          <button
            onClick={() => handleDelete(todo.id)}
            className="duration-300 hover:bg-gray-200 py-2 px-2 rounded-md border"
          >
            <RiDeleteBin2Line />
          </button>
        </div>
      </div>
    </li>
  );
};

export default Todo;
