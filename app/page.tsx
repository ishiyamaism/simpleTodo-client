"use client";

import { SiteTitle } from "@/staticValues/info";
import { API_URL } from "@/staticValues/url";
import Image from "next/image";
import { useRef } from "react";
import { MdPlaylistAdd } from "react-icons/md";
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

    if (!inputRef.current?.value) return;

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
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16 py-4 px-4">
      <div className="px-4 py-2 flex flex-row items-center ">
        <Image
          src="/profile.png"
          width={45}
          height={45}
          alt="profile"
          className="rounded-full mr-3"
        />
        <h1 className="text-gray-800 font-bold text-2xl uppercase">
          {SiteTitle}
        </h1>
      </div>
      <form
        className="w-full max-w-sm mx-auto px-4 py-2"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center border-b-2 border-gray-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-1 text-xl leading-tight focus:outline-none"
            type="text"
            placeholder="やるべきこと"
            ref={inputRef}
          />
          <button
            className="flex-shrink-0 text-xl hover:bg-gray-300 p-2 rounded-lg border"
            type="submit"
          >
            <MdPlaylistAdd />
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
