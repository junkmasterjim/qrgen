import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

const poppins = Poppins({
	subsets: ["devanagari"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: "QR | npitt.dev",
	description: "Generate QR codes for any URL. 100% free and instant.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${poppins.className} min-h-screen overflow-hidden`}>
				<Suspense>{children}</Suspense>
			</body>
		</html>
	);
}
