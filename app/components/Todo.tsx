import { API_URL } from "@/staticValues/url";
import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { TodoType } from "../types";

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
      const response = await fetch(`${API_URL}/todo/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editedTitle,
        }),
      });

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

    console.log(done, method);

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
              <span
                className={`text-lg font-medium mr-2 ${
                  todo.done ? "line-through" : ""
                }`}
              >
                {" "}
                {todo.title}{" "}
              </span>
            )}
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleEdit}
            className="duration-300 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition ease-in-out transform hover:-translate-y-1"
          >
            {isEditing ? "Save" : "🖊"}
          </button>
          <button
            onClick={() => handleDelete(todo.id)}
            className="duration-300 bg-red-400 hover:bg-red-500 text-white font-medium py-2 px-4 rounded-lg shadow-md transition ease-in-out transform hover:-translate-y-1"
          >
            ✘
          </button>
        </div>
      </div>
    </li>
  );
};

export default Todo;
