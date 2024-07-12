import {UsersEntity} from "@users/data-access";
import {UsersVM} from "./users-vm";

type UsersVMAdapter = {
  entityToVM(entity: UsersEntity): UsersVM;
};

export const usersVMAdapter: UsersVMAdapter = {
  entityToVM({id, name, username, email}) { // entityToVM(entity)
    return {id, name, username, email};
  },
};
