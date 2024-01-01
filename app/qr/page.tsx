"use client";

import { Button } from "@/components/ui/button";
import { Copy, Download, Link, Share } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import * as htmlToImage from "html-to-image";
import QRCode from "react-qr-code";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const QR = () => {
	const searchParams = useSearchParams();

	const [url, setUrl] = useState<string | null>(searchParams.get("url"));

	const handleDownload = () => {
		htmlToImage
			.toPng(document.getElementById("qr") as HTMLElement)
			.then(function (dataUrl) {
				var link = document.createElement("a");
				link.download = "qr.png";
				link.href = dataUrl;
				link.click();
			});
	};

	const dataURLtoBlob = (dataurl: string) => {
		var arr = dataurl.split(","),
			mime = arr[0].match(/:(.*?);/)![1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while (n--) u8arr[n] = bstr.charCodeAt(n);
		return new Blob([u8arr], { type: mime });
	};

	const handleImageCopy = () => {
		htmlToImage
			.toPng(document.getElementById("qr") as HTMLElement)
			.then((dataUrl) => {
				var blob = dataURLtoBlob(dataUrl);
				var item = new ClipboardItem({ "image/png": blob });
				navigator.clipboard.write([item]);
			});
	};

	return (
		<div className="flex flex-col space-y-8 p-2 max-w-xl mx-auto min-h-screen justify-center items-center">
			<h1 className="text-center text-5xl font-bold text-[#3662E3]">QRgen</h1>
			{url && (
				<div className="p-4 rounded-lg bg-white">
					<QRCode id="qr" size={352} className="" value={url || ""} />
				</div>
			)}
			<div className="flex gap-4 justify-center w-full">
				<Button
					className="rounded-xl bg-[#3662E3] text-white hover:bg-[#3557b3]"
					onClick={handleDownload}
					variant={"secondary"}
				>
					<Download className="h-4 w-4 mr-2" />
					Download
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							className="rounded-xl bg-[#3662E3] text-white hover:bg-[#3557b3]"
							variant={"secondary"}
						>
							<Share className="h-4 w-4 mr-2" />
							Share
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={handleImageCopy}>
							<Copy className="w-4 h-4 mr-2" /> Copy Image
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {
								if (url) {
									navigator.clipboard.writeText(url);
								}
							}}
						>
							<Link className="w-4 h-4 mr-2" /> Copy Link
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
};

export default QR;
