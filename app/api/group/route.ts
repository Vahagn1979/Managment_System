import { IGroup } from "@/app/types/Igroup";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import path from "path";
import fs, { writeFileSync } from "fs";
import groups from "../../storage/groups.json"
import { error } from "console";

interface Context {
    params: undefined
}

export async function POST(req: NextRequest, context: Context) {
    const body: IGroup = await req.json();
    const {name} = body;
    if(groups.find(group => group.name.toLowerCase() === name.toLowerCase())) {
        return NextResponse.json({error: `There is a group called "${name}"`})
    }
    fs.writeFileSync(path.resolve("app/storage/groups.json"), JSON.stringify([...groups, body]))
    return NextResponse.json({success: "New Group Added Successfully..."})
}

export async function GET(req: NextRequest, context: Context) {
    return NextResponse.json({groups})
}