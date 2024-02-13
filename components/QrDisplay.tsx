import QRCode from "react-qr-code";
import { Button } from "./ui/button";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import * as htmlToImage from "html-to-image";

import { Copy, Download, LinkIcon, Share } from "lucide-react";
import { useRouter } from "next/navigation";

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

const QRDisplay = (params: { params: string }) => {
	const router = useRouter();

	return (
		<>
			<div className="p-4 opacity90 rounded-lg border bg-white w-96 h-96">
				<QRCode id="qr" className="h-full w-full" value={params.params || ""} />
			</div>
			<div className="flex gap-4 justify-center w-full">
				<Button
					className="rounded-xl"
					variant={"outline"}
					onClick={() => {
						router.push("/");
					}}
				>
					<Link href={"/"}>New QR Code</Link>
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button className="rounded-xl" variant={"outline"}>
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
								if (params) {
									navigator.clipboard.writeText(params.params);
								}
							}}
						>
							<LinkIcon className="w-4 h-4 mr-2" /> Copy URL
						</DropdownMenuItem>
						<DropdownMenuItem onClick={handleDownload}>
							<Download className="w-4 h-4 mr-2" /> Download File
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</>
	);
};

export default QRDisplay;
