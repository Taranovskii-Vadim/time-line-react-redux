import { STATUS } from "./constants";
import { TState as TUsersState } from "./models/users/types";

type TStatus = keyof typeof STATUS;

type TResponseStatus = "success" | "error";

// TODO: Если в проекте нет any то удалить

export type StupidType = any;

export interface IStatus<Data> {
  data: Data;
  status: TStatus;
}

export interface IResponse<T> {
  result: T;
  message: TResponseStatus;
}

export interface IRootState {
  users: TUsersState;
}
