import {UsersEntity} from "./+state/users.entity";
import {UsersDTO} from "./users-dto.model";

export type UsersDTOAdapter = {
  DTOtoEntity(dto: UsersDTO): UsersEntity;
  entityToDTO(entity: UsersEntity): UsersDTO;
};

export const usersDTOAdapter: UsersDTOAdapter = {
  DTOtoEntity(dto) {
    const {created_at, ...otherFields} = dto;

    return {
      ...otherFields,
    };
  },
  entityToDTO(entity) {
    return {
      ...entity,
    };
  },
};
