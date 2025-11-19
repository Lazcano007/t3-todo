"use client";

import { api } from "~/trpc/react";
import { useState } from "react";

export default function TodoPage() {
    const [text, setText] = useState("");

    const utils = api.useUtils();

    const todos = api.todo.getAll.useQuery();
    const createTodo = api.todo.create.useMutation({
        onSuccess: () => utils.todo.getAll.invalidate(),
    });
    const deleteTodo = api.todo.delete.useMutation({
        onSuccess: () => utils.todo.getAll.invalidate(),
    });
    
    return (
        <main className="max-w-lg mx-auto p-6">
            <h1 className="text-7xl font-bold mb-4">Todo App</h1>

            <form
                onSubmit={(e) => {
                e.preventDefault();
                if (!text.trim()) return;
                createTodo.mutate({ text });
                setText("");
                }}
                className="flex gap-2 mb-4"
                >
                <input
                className="border px-3 py-2 rounded flex-1"
                placeholder="Ny todo…"
                value={text}
                onChange={(e) => setText(e.target.value)}
                />

                <button className="bg-blue-600 text-white px-4 rounded"> Lägg till</button>
            </form>

                <ul className="flex flex-col gap-2">
                    {todos.data?.map((todo) => (
                    <li
                        key={todo.id}
                        className="flex justify-between p-3 border rounded"
                    >
                        {todo.text}

                        <button onClick={() => deleteTodo.mutate({ id: todo.id })} className="text-red-600"> ✖ </button>
                    </li>
                    ))}
                </ul>
        </main>
    );
}