import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import students from "../../../storage/students.json";
import groups from "../../../storage/groups.json";


interface Context {
    params: {groupId: string}
}

export async function GET(req: NextRequest, {params: {groupId}}: Context) {
    const studentsByGroup = students.filter(student => student.groupId === Number(groupId));
    const groupName = groups.find(group => group.id === Number(groupId))?.name;

    return NextResponse.json({students: studentsByGroup, groupName });
}