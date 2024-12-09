import { NextRequest, NextResponse } from 'next/server';

const NYT_API_KEY = process.env.NYT_API_KEY;

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || ''; // 검색어
    const page = searchParams.get('page') || '0'; // 페이지 번호

    if (!query) {
        return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    try {
        const apiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(
            query
        )}&page=${page}&api-key=${NYT_API_KEY}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching articles:', error.message);
        return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
    }
}
