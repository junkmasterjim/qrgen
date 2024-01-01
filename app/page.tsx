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
			<h1 className="text-center text-5xl font-bold text-[#3662E3]">QRgen</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleRedirect();
				}}
				className="flex gap-2 bg-[#080b13] focus-within:ring ring-[#3662E3] rounded-xl p-2"
			>
				<Input
					value={input}
					onChange={handleInput}
					placeholder="https://noahpittman.xyz"
					className="bg-[#080b13] border-none placeholder:text-[#3662E3]/40 text-[#3662E3] focus-visible:ring-0 focus-visible:ring-offset-0"
					type="url"
					required
				/>

				<Button
					type="submit"
					className="rounded-xl bg-[#3662E3] text-white hover:bg-[#3557b3]"
					variant={"secondary"}
				>
					QR Code
				</Button>
			</form>
		</div>
	);
};

export default Home;
