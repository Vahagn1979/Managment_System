import { IStudent } from "@/app/types/IStudent";

export const addNewStudnet = async (body: IStudent) => {
    const response = await fetch("http://localhost:3000/api/student", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    });
    const data = await response.json();
    // console.log(data);
    return data;
}

export const getAllStudentsByGroup = async (groupId: number) => {
    const response = await fetch(`http://localhost:3000/api/group/${groupId}`);
    const data = await response.json();
    return data;
}

export const deleteStudent = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/student/${id}`, {
        method: "DELETE"
    });
    const data = await response.json();
    return data;
}