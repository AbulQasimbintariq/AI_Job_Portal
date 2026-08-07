"use client";

import { useState, KeyboardEvent } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
}

export default function SearchBar({
    placeholder = "Search resumes, jobs, interviews...",
    onSearch,
}: SearchBarProps) {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (onSearch) {
            onSearch(query.trim());
        } else {
            console.log("Searching:", query);
        }
    };

    const handleKeyDown = (
        e: KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const clearSearch = () => {
        setQuery("");
        onSearch?.("");
    };

    return (
        <div className= "relative w-full max-w-md" >

        {/* Search Icon */ }

        < Search
    size = { 18}
    className = "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        {/* Input */ }

        < input
    type = "text"
    value = { query }
    placeholder = { placeholder }
    onChange = {(e) => setQuery(e.target.value)
}
onKeyDown = { handleKeyDown }
className = "w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-20 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
    />

    {/* Right Side */ }

    < div className = "absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2" >

        { query && (
            <button
            onClick={ clearSearch }
        className = "rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        aria-label="Clear search"
          >
       <X size={ 16 } />
        </button>
           )}

<span className="hidden rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-400 md:block" >
    Ctrl + K
    </span>

    </div>

    </div>
  );
}