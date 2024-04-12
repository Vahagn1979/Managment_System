import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import students from "../../../storage/students.json";
import groups from "../../../storage/groups.json";
import path from "path";
import fs from "fs";
import { IGroup } from "@/app/types/Igroup";
import { IStudent } from "@/app/types/IStudent";

interface Context {
  params: { id: number };
}

export async function DELETE(req: NextRequest, { params: { id } }: Context) {
  const selectedStudent = students.find(
    (student) => student.id === Number(id)
  ) as IStudent;
  const studentGroup = groups.find(
    (group) => group.id === selectedStudent?.groupId
  ) as IGroup;
  const studentsAfterRemoval = students.filter(
    (student) => student.id !== Number(id)
  );
  studentGroup.studentCount--;
  fs.writeFileSync(
    path.resolve("app/storage/students.json"),
    JSON.stringify(studentsAfterRemoval)
  );
  fs.writeFileSync(
    path.resolve("app/storage/groups.json"),
    JSON.stringify([...groups])
  );
  return NextResponse.json({ success: `Student by ID ${id} deleted` });
}
