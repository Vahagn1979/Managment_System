import { IGroup } from "@/app/types/Igroup";
import { string } from "yup";

export const addGroup = async (body: IGroup) => {
    try {
        const response = await fetch("http://localhost:3000/api/group", {
            method: "POST",
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify(body)
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getAllGroups = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/group");
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}