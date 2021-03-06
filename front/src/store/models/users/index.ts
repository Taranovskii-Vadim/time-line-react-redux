import produce, { Draft } from "immer";
import { STATUS } from "../../constants";

import { TAction, TState, ETypes } from "./types";

let localUsers: TState["data"]["items"] = [];

const initialState: TState = {
  data: {
    items: [],
  },
  status: STATUS.initial,
};

export const usersReducer = produce((draft: Draft<TState>, action: TAction) => {
  if (action.type === ETypes.SEARCH_USERS) {
    draft.data.items = localUsers.filter(item => {
      const fullName = `${item.surname} ${item.name}`;
      return fullName.includes(action.payload);
    });
  } else if (action.type === ETypes.FILTER_BY_SKILLS) {
    if (action.payload.length) {
      draft.data.items = localUsers.filter(item => {
        const skills = item.skills.map(skill => skill.label);
        return action.payload.every(skill => skills.includes(skill));
      });
    } else {
      draft.data.items = localUsers;
    }
  } else if (action.type === ETypes.SET_USERS) {
    const users = action.payload;
    localUsers = [...users];
    draft.data.items = users;
    draft.status = STATUS.initial;
  } else if (action.type === ETypes.SET_STATUS) {
    draft.status = action.payload;
  }
}, initialState);
