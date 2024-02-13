"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import QRDisplay from "@/components/QrDisplay";
import Link from "next/link";

const Home = () => {
	const router = useRouter();
	const [input, setInput] = useState("");

	const params = useSearchParams().get("url");

	useEffect(() => {
		if (!params) {
			setInput("");
		}
	}, [params]);

	return (
		<div className="flex w-full flex-col p-2 max-w-xl mx-auto min-h-screen justify-center">
			{!params && (
				<motion.div
					initial={{
						opacity: 0,
						y: 20,
					}}
					animate={{
						opacity: 1,
						y: 0,
					}}
					transition={{
						duration: 0.3,
					}}
					className="space-y-8"
				>
					<h1 className="text-center text-5xl font-bold ">QRgen</h1>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							router.push("/?url=" + input);
						}}
						className="flex gap-2 bg-accent focus-within:ring ring-ring rounded-xl p-2"
					>
						<Input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="https://qr.npitt.dev"
							className="bg-accent border-none  focus-visible:ring-0 focus-visible:ring-offset-0"
							type="url"
							required
						/>

						<Button type="submit" className="rounded-xl " variant={"secondary"}>
							QR Code
						</Button>
					</form>
					<p className="text-center text-xs text-muted-foreground">
						Made with ❤️ by{" "}
						<Link
							className="border-b hover:text-foreground hover:border-foreground transition-colors"
							target="_blank"
							href={"https://npitt.dev"}
						>
							Noah Pittman
						</Link>
					</p>
				</motion.div>
			)}

			{params && (
				<motion.div
					initial={{
						opacity: 0,
						y: 20,
					}}
					animate={{
						opacity: 1,
						y: 0,
					}}
					transition={{
						duration: 0.3,
					}}
					className="w-full flex flex-col gap-4 items-center justify-center "
				>
					<QRDisplay params={params} />
					<p className="text-center text-xs text-muted-foreground">
						Made with ❤️ by{" "}
						<Link
							className="border-b hover:text-foreground hover:border-foreground transition-colors"
							target="_blank"
							href={"https://npitt.dev"}
						>
							Noah Pittman
						</Link>
					</p>
				</motion.div>
			)}
		</div>
	);
};

export default Home;
