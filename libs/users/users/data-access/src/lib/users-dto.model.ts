import {DeepReadonly} from "@users/core/utils";

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export type UsersDTO = DeepReadonly<{
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}>;

export type CreateUserDTO = DeepReadonly<{
  id?: number | null;
  name: string;
  username?: string;
  email: string;
  address?: Address;
  // city?: string;
  // role?: Role;
}>
