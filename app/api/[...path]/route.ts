// app/api/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

const BACKEND_URL = 'http://3.37.80.119';

function getTargetUrl(params: string[], search: string) {
  const url = `${BACKEND_URL}/${params.join('/')}`;
  return search ? `${url}?${search}` : url;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  const url = getTargetUrl(params.path, req.nextUrl.searchParams.toString());
  const cookie = req.headers.get('cookie');

  try {
    const response = await axios.get(url, {
      headers: {
        Cookie: cookie || '',
      },
      withCredentials: true,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (err: unknown) {
    const error = err as AxiosError;
    return NextResponse.json(
      { error: error.response?.data || 'GET Proxy Error' },
      { status: error.response?.status || 500 },
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  const url = getTargetUrl(params.path, '');
  const body = await req.json();
  const cookie = req.headers.get('cookie');

  try {
    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie || '',
      },
      withCredentials: true,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (err: unknown) {
    const error = err as AxiosError;
    return NextResponse.json(
      { error: error.response?.data || 'POST Proxy Error' },
      { status: error.response?.status || 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  const url = getTargetUrl(params.path, '');
  const body = await req.json();
  const cookie = req.headers.get('cookie');

  try {
    const response = await axios.put(url, body, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie || '',
      },
      withCredentials: true,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (err: unknown) {
    const error = err as AxiosError;
    return NextResponse.json(
      { error: error.response?.data || 'PUT Proxy Error' },
      { status: error.response?.status || 500 },
    );
  }
}
