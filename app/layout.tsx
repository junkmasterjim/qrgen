import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
	subsets: ["devanagari"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: "QRgen - Generate QR codes",
	description:
		"Generate QR codes for any URL with QRgen. It's free and open source.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${poppins.className} min-h-screen overflow-hidden bg-[#111729]`}
			>
				{children}
			</body>
		</html>
	);
}
