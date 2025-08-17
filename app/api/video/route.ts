import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET (){
      try {
        const session = await getServerSession(authOptions)
        if(!session){
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }
        
        await connectToDatabase()
       const Videos =  await Video.find({}).sort({createdAt: -1})

        if (!Videos || Videos.length === 0) {
            return NextResponse.json([], { status: 200 });
            }
            return NextResponse.json(Videos)

      } catch (error) {
        
        return NextResponse.json(
            { error: "Error fetching videos" },
            { status: 500 }
            
        )

      }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    console.log("✅ Connected to DB");

    const body: IVideo = await request.json();
    console.log("📥 Incoming request body:", body);

    if (!body.title || !body.videoUrl || !body.description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const videoData = {
      title: body.title,
      description: body.description,
      videoUrl: body.videoUrl,
      thumbnailUrl:
        body.thumbnailUrl ??
        `${body.videoUrl}/ik-thumbnail.jpg`, // fallback if missing
      controls: body?.controls ?? false,
      transformation: {
        width: body.transformation?.width ?? 1280,
        height: body.transformation?.height ?? 1920,
        quality: body.transformation?.quality ?? 100,
      },
    };

    const newVideo = await Video.create(videoData);
    console.log("✅ Video saved:", newVideo);

    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating video:", error);
    return NextResponse.json(
      { error: "Error creating video" },
      { status: 500 }
    );
  }
}
