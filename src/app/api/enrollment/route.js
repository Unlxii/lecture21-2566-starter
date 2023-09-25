import { checkToken } from "@/libs/checkToken";
import { getPrisma } from "@/libs/getPrisma";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const payload = checkToken();
  if (!payload) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }
  const { role, studentId } = payload;

  if (role === "ADMIN") {
    return NextResponse.json(
      {
        ok: true,
        message: "Only Student can access this API route",
      },
      { status: 403 }
    );
  }

  const prisma = getPrisma();
  const enrollments = await prisma.enrollment.findMany({
    where: {
      studentId,
    },
    include: {
      course: true,
    },
  });

  return NextResponse.json({
    ok: true,
    enrollments,
  });
};

export const POST = async (request) => {
  const payload = checkToken();
  if (!payload) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }
  const { role, studentId } = payload;

  if (role === "ADMIN") {
    return NextResponse.json(
      {
        ok: true,
        message: "Only Student can access this API route",
      },
      { status: 403 }
    );
  }

  //read body request & validate it
  const body = await request.json();
  const { courseNo } = body;
  if (typeof courseNo !== "string" || courseNo.length !== 6) {
    return NextResponse.json(
      {
        ok: false,
        message: "courseNo must contain 6 characters",
      },
      { status: 400 }
    );
  }

  //will be coded in lab!

  return NextResponse.json({
    ok: true,
    message: "You has enrolled a course successfully",
  });
};

export const DELETE = async (request) => {
  const payload = checkToken();
  if (!payload) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }
  const { role, studentId } = payload;

  if (role === "ADMIN") {
    return NextResponse.json(
      {
        ok: true,
        message: "Only Student can access this API route",
      },
      { status: 403 }
    );
  }

  //read body request
  const body = await request.json();
  const { enrollmentId } = body;
  if (typeof enrollmentId !== "string") {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid enrollmentId",
      },
      { status: 400 }
    );
  }

  const prisma = getPrisma();
  //perform deletion here

  return NextResponse.json({
    ok: true,
    message: "You has dropped from this course. See you next semester.",
  });
};
