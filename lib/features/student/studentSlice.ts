import { IStudent } from "@/app/types/IStudent";
import { createAppSlice } from "@/lib/createAppSlice";
import {
  addNewStudnet,
  deleteStudent,
  getAllStudentsByGroup,
} from "./studentAPI";
import { log } from "console";

interface StudentState {
  students: IStudent[];
  student: IStudent;
  groupName: string;
  isLoading: boolean;
}

const initialState: StudentState = {
  students: [],
  student: {} as IStudent,
  groupName: "",
  isLoading: true,
};

export const studentSlice = createAppSlice({
  name: "student",
  initialState,
  reducers: (create) => ({
    addNewStudentAsync: create.asyncThunk(async (body: IStudent) => {
      const response = await addNewStudnet(body);
      // console.log(response);
      return response;
    }),
    getAllStudentsByGroupAsync: create.asyncThunk(
      async (groupId: number) => {
        const response = await getAllStudentsByGroup(groupId);
        return response;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.students = action.payload.students;
          state.groupName = action.payload.groupName;
          state.isLoading = false;
        },
      }
    ),
    deleteStudentAsync: create.asyncThunk(async (id: number) => {
      const response = await deleteStudent(id);
      return response;
    }),
  }),
  selectors: {
    selectStudents: (state) => state.students,
    selectGroupName: (state) => state.groupName,
    selectIsLoading: (state) => state.isLoading,
  },
});

export const { selectStudents, selectGroupName, selectIsLoading } =
  studentSlice.selectors;
export const {
  addNewStudentAsync,
  getAllStudentsByGroupAsync,
  deleteStudentAsync,
} = studentSlice.actions;
