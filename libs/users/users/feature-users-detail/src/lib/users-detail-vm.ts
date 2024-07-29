import {DeepReadonly} from "@users/core/utils";
import {UsersStatus} from "@users/data-access";
import {CreateUserDTO} from "libs/users/users/data-access/src/lib/users-dto.model";

export type UsersDetailVM = DeepReadonly<{
  user: CreateUserDTO | null;
  status: UsersStatus;
  editMode: boolean;
}>;
