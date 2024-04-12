import { IGroup } from "@/app/types/Igroup";
import { createAppSlice } from "@/lib/createAppSlice";
import { addGroup, getAllGroups } from "./groupAPI";

interface GroupState {
    groups: IGroup[];
    group: IGroup;
    status: "idle" | "loading" | "failed";
}

const initialState:GroupState = {
    groups: [],
    group: {} as IGroup,
    status: "loading",
}

export const groupSlice = createAppSlice({
    name: "group",
    initialState,
    reducers: (create) => ({
        addGroupAsync: create.asyncThunk(
            async (body: IGroup) => {
                const response = await addGroup(body);
                return response;
            },
            {
                pending: (state) => {
                    state.status = "loading";
                },
                fulfilled: (state) => {
                    state.status = "idle"
                },
                rejected: (state, action) => {
                    state.status = "failed";
                }
            }
        ),
        getAllGroupsAsync: create.asyncThunk(
            async (_:void) => {
                const data = await getAllGroups();
                return data.groups;
            },
            {
                pending: (state) => {
                    state.status = "loading";
                },
                fulfilled: (state, action) => {
                    state.status = "idle";
                    state.groups = action.payload;
                },
                rejected: (state) => {
                    state.status = "failed"
                }
            }
        )
    }),

    selectors: {
        selectGroups: state => state.groups,
        selectStatus: (group) => group.status
    }
})

export const { selectGroups, selectStatus } = groupSlice.selectors;
export const { addGroupAsync, getAllGroupsAsync } = groupSlice.actions;