import {DeepReadonly} from "@users/core/utils";
import {UsersEntity} from "@users/data-access";

export type UsersVM = DeepReadonly<Pick<UsersEntity, "id" | "name" | "username" | "email">>;
