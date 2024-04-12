import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import students from "../../storage/students.json";
import groups from "../../storage/groups.json";
import path from "path";
import fs from "fs";
import { IStudent } from "@/app/types/IStudent";
import { IGroup } from "@/app/types/Igroup";

interface Context {
  params: undefined;
}

export async function POST(req: NextRequest, context: Context) {
  const body: IStudent = await req.json();
  const { groupId } = body;
  const studentsByGroup = students.filter(
    (student) => student.groupId === +groupId
  ).length;
  const selectedGroup = groups.find(
    (group) => +group.id === +groupId
  ) as IGroup;
  if (+selectedGroup.studentCount < +selectedGroup.maxCount) {
    selectedGroup.studentCount++;
  }
  console.log(selectedGroup?.studentCount);

  const groupLimit = selectedGroup?.maxCount;
  // console.log(groupId,studentsByGroup, groupLimit);
  if (studentsByGroup + 1 > Number(groupLimit)) {
    return NextResponse.json({
      error: `The "${selectedGroup?.name}" is complete. There are no more places...`,
    });
  }
  fs.writeFileSync(
    path.resolve("app/storage/students.json"),
    JSON.stringify([...students, body])
  );
  fs.writeFileSync(
    path.resolve("app/storage/groups.json"),
    JSON.stringify([...groups])
  );
  return NextResponse.json({ success: ` Student added to group ${selectedGroup.name}...` });
}
