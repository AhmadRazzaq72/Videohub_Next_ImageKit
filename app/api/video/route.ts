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
        const session = await getServerSession(authOptions)
        if(!session){
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }

        await connectToDatabase()

        const body: IVideo = await request.json()

        if (!body.title || !body.videoUrl || !body.description || !body.thumbnailUrl) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
            
        }

        const videoData = {
            ...body,
            controls: body?.controls ?? true,
            transformation:{
                width:  1920,
                height: 1080,
                quality: body.transformation?.quality ?? 100, 
                },
            };
            const newVideo = await Video.create(videoData)
        return NextResponse.json(newVideo, { status: 201 })
    
    } catch (error) {
        return NextResponse.json(
            {error: "Error creating video",}, { status: 500 })
        
    }
}