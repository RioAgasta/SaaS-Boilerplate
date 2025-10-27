import { NextResponse } from 'next/server';

export type ApiSuccessResponse<T = any> = {
  success: true;
  message: string;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  error: {
    message: string;
    code: string;
    statusCode: number;
  };
};

export function apiSuccess<T>(data: T, message: string = 'Success'): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json({
    success: true,
    message,
    data,
  });
}

export function apiError(
  message: string,
  code: string,
  statusCode: number = 500,
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        code,
        statusCode,
      },
    },
    { status: statusCode },
  );
}
