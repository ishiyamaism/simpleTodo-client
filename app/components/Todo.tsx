import { API_URL } from "@/staticValues/url";
import { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
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
        `https://02.kaizentools.net/api:18082/todo/${todo.id}`,
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

    console.log(response);

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
            id="todo1"
            name="todo1"
            type="checkbox"
            checked={todo.done ? true : false}
            onChange={() => toggleTodoCompletion(todo.id, todo.done)}
            className="h-4 w-4 text-teal-600 focus:ring-teal-500
          border-gray-300 rounded"
          />
          <label className="ml-3 block text-gray-900">
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
                <div className="text-gray-400 text-sm font-extralight">
                  {formatDate(new Date(todo.created_at))}
                </div>
              </>
            )}
          </label>
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
            className="duration-300  hover:bg-gray-200    py-2 px-2 rounded-md border"
          >
            <RiDeleteBin2Line />
          </button>
        </div>
      </div>
    </li>
  );
};

export default Todo;
