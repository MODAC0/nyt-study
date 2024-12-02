// /app/api/news/route.tsx
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const NYT_API_KEY = process.env.NYT_API_KEY;

export async function GET(req: NextRequest) {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?api-key=${NYT_API_KEY}`
    );
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching news:', error.message);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
