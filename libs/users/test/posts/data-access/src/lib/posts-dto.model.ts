import {DeepReadonly} from "@users/core/utils";

export type PostsDTO = DeepReadonly<{
  userId: number;
  id: number;
  title: string;
  body: string;
}>;
