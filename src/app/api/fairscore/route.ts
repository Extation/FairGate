import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const wallet = request.nextUrl.searchParams.get("wallet");

  if (!wallet) {
    return NextResponse.json(
      { error: "Wallet address is required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.FAIRSCALE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.fairscale.xyz/fairScore?wallet=${wallet}`,
      {
        headers: {
          fairkey: apiKey,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `FairScale API error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching fair score:", error);
    return NextResponse.json(
      { error: "Failed to fetch fair score from FairScale" },
      { status: 500 }
    );
  }
}
