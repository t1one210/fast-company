import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const professionSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionRequested: (state) => {
            state.isLoading = true;
        },
        professionReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        professionRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionReducer, actions } = professionSlice;
const { professionRequested, professionReceived, professionRequestFailed } =
    actions;

export const loadProfessinsList = () => async (dispatch) => {
    dispatch(professionRequested());
    try {
        const { content } = await professionService.get();
        dispatch(professionReceived(content));
    } catch (error) {
        dispatch(professionRequestFailed(error.message));
    }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;

export const getProfessionsByIds = (professionsIds) => (state) => {
    console.log(state.professions.entities);
    if (state.professions.entities) {
        const professionsArray = [];
        for (const profId of professionsIds) {
            for (const profession of state.professions.entities) {
                if (profession._id === profId) {
                    professionsArray.push(profession);
                    break;
                }
            }
        }
        return professionsArray;
    }
    return [];
};

export default professionReducer;
