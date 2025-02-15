import { NextResponse } from "next/server"
import QRCode from "qrcode"

export async function POST(request: Request) {
  try {
    const { productName } = await request.json()

    if (!productName) {
      return NextResponse.json({ message: "Product name is required" }, { status: 400 })
    }

    // Use the environment variable for the base URL
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"
    const productUrl = `${baseUrl}/products/view?name=${encodeURIComponent(productName)}`

    // Generate QR code with better error correction
    const qrCodeDataUrl = await QRCode.toDataURL(productUrl, {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 400,
      color: {
        dark: "#383535",
        light: "#ffffff",
      },
    })

    return NextResponse.json({ qrCodeDataUrl })
  } catch (error) {
    console.error("Error generating QR code:", error)
    return NextResponse.json({ message: "Failed to generate QR code" }, { status: 500 })
  }
}

