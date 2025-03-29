import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../server/database.js";

// GET all solutions
export async function GET(request: NextRequest) {
  try {
    // Using the Services model instead of Solution which doesn't exist yet
    const solutions = await prisma.services.findMany();
    
    return NextResponse.json({ solutions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching solutions:", error);
    return NextResponse.json({ error: "Failed to fetch solutions" }, { status: 500 });
  }
}

// POST new solution
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation
    if (!body.title || !body.description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }
    
    const solution = await prisma.services.create({
      data: {
        title: body.title,
        description: body.description,
        servicelink: body.href || body.title.toLowerCase().replace(/\s+/g, '-'),
        overviewtitle: body.content?.overview || "Overview",
        overviewcontent: body.content?.overview || body.description,
        status: true
      }
    });
    
    return NextResponse.json({ solution }, { status: 201 });
  } catch (error) {
    console.error("Error creating solution:", error);
    return NextResponse.json({ error: "Failed to create solution" }, { status: 500 });
  }
}

// PUT update solution
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: "Solution ID is required" }, { status: 400 });
    }
    
    const solution = await prisma.services.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        description: body.description,
        servicelink: body.href || body.title.toLowerCase().replace(/\s+/g, '-'),
        overviewtitle: body.content?.overview ? "Overview" : undefined,
        overviewcontent: body.content?.overview || body.description,
        status: true
      }
    });
    
    return NextResponse.json({ solution }, { status: 200 });
  } catch (error) {
    console.error("Error updating solution:", error);
    return NextResponse.json({ error: "Failed to update solution" }, { status: 500 });
  }
}

// DELETE solution
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: "Solution ID is required" }, { status: 400 });
    }
    
    await prisma.services.delete({
      where: { id: parseInt(id) }
    });
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting solution:", error);
    return NextResponse.json({ error: "Failed to delete solution" }, { status: 500 });
  }
}