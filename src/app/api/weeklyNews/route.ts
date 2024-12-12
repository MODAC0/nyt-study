import { NextRequest, NextResponse } from "next/server";

const NYT_API_KEY = process.env.NYT_API_KEY;

export async function GET(request: NextRequest) {

  try {
    const url = `https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?api-key=${NYT_API_KEY}`;
    const res = await fetch(url, { method: 'GET' });

    if (!res.ok) {
      console.error('failed to fetch weeklyNews:', res.statusText);
      return NextResponse.json(
        { error: 'weeklyNews 로드에 실패했습니다.' },
        { status: res.status }
      )
    }

    const data = await res.json();
    return data.results && data.results.length > 0 ? NextResponse.json(data, { status: 200 }) : NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching news:', error.message);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}