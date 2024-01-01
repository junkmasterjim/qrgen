"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";

const Home = () => {
	const router = useRouter();

	const [input, setInput] = useState("");
	const handleInput = (e: { target: { value: SetStateAction<string> } }) => {
		setInput(e.target.value);
	};

	const handleRedirect = () => {
		// Redirect to a new page with url search params
		router.push(`/qr?url=${input}`);
	};

	return (
		<div className="flex flex-col space-y-8 p-2 max-w-xl mx-auto min-h-screen justify-center">
			<h1 className="text-center text-5xl font-bold text-secondary">
				QR<span className="text-stone-800">gen</span>
			</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleRedirect();
				}}
				className="flex gap-2 bg-neutral-800 focus-within:ring ring-neutral-300 rounded p-2"
			>
				<Input
					value={input}
					onChange={handleInput}
					placeholder="https://noahpittman.xyz"
					className="bg-neutral-800 border-none placeholder:text-neutral-400/50 text-neutral-100 focus-visible:ring-0 focus-visible:ring-offset-0"
					type="url"
					required
				/>

				<Button type="submit" variant={"secondary"}>
					QR Code
				</Button>
			</form>
		</div>
	);
};

export default Home;
