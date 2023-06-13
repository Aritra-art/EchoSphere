import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Aritra",
    lastName: "Chowdhury",
    username: "aritrachowdhury",
    password: "aritrachowdhury123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    profileAvatar: "https://picsum.photos/id/1012/200/200",
  },
  {
    _id: uuid(),
    firstName: "Subham",
    lastName: "Soni",
    username: "subhamsoni",
    password: "subhamsoni123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    profileAvatar: "https://picsum.photos/id/1009/200/200",
  },
  {
    _id: uuid(),
    firstName: "Rinku",
    lastName: "Singh",
    username: "rinkusingh",
    password: "rinkusingh123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    profileAvatar: "https://picsum.photos/id/1005/200/200",
  },
];
