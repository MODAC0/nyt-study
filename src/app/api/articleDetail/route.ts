import { NextRequest, NextResponse } from "next/server";

const NYT_API_KEY = process.env.NYT_API_KEY; // 환경 변수에서 API 키를 가져옴

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // ID가 없는 경우 에러 반환
    if (!id) {
        return NextResponse.json(
            { error: "ID parameter is required" },
            { status: 400 }
        );
    }

    try {
        // NYT API 요청 URL 생성
        const apiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=_id:("${id}")&api-key=${NYT_API_KEY}`;

        // NYT API로 데이터 요청
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching article detail:", error.message);
        return NextResponse.json(
            { error: "Failed to fetch article details" },
            { status: 500 }
        );
    }
}
