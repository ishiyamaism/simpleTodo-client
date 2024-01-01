"use client";

import { API_URL } from "@/staticValues/url";
import { useRef } from "react";
import Todo from "./components/Todo";
import { useTodos } from "./hooks/useTodos";
import { TodoType } from "./types";

export default function Home() {
  // const allTodos = await fetch("API", {chache: "force-cache"});
  // SSG
  const { todos, mutate } = useTodos();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/todo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: inputRef.current?.value,
        isCompleted: false,
      }),
    });

    if (response.ok) {
      const newTodo = await response.json();
      mutate([...todos, newTodo]);
      inputRef.current!.value = "";
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-32 py-4 px-4">
      <div className="px-4 py-2">
        <h1 className="text-gray-800 font-bold text-2xl uppercase">
          Public Todo List
        </h1>
      </div>
      <form
        className="w-full max-w-sm mx-auto px-4 py-2"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center border-b-2 border-blue-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-1 text-xl leading-tight focus:outline-none"
            type="text"
            placeholder="追加するTodo"
            ref={inputRef}
          />
          <button
            className="duration-300 flex-shrink-0 font-bold bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 border-4 text-white py-2 px-4 rounded-lg shadow-md transition ease-in-out transform hover:-translate-y-1"
            type="submit"
          >
            追加
          </button>
        </div>
      </form>
      <ul className="divide-y divide-gray-200 px-4">
        {todos?.map((todo: TodoType) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
