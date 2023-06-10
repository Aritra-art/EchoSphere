import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: "d4f1b65f-10b1-40d3-b25a-0e2e6193837c",
    content:
      "Juicy and vibrant, nature's sweet delight,Fruit's colorful palette, a healthy sight.Nourishing bodies with vitamins and fiber,Nature's gift, a refreshing desire.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    fullname: "Aritra Chowdhury",
    username: "aritrachowdhury",
    postImage: "https://source.unsplash.com/random/900x700/?fruit",
    createdAt: "2023-06-01",
    updatedAt: formatDate(),
  },
  {
    _id: "6790b8f9-1427-4273-b819-425add5df006",
    content:
      "Weights clanking, bodies in motion,Gym's energy fuels dedication and devotion.Sweat dripping, muscles pushing to the max,A place where strength and fitness intersect.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    fullname: "Subham Soni",
    username: "subhamsoni",
    postImage: "https://source.unsplash.com/random/900x700/?gym",
    createdAt: "2023-06-02",
    updatedAt: formatDate(),
  },
  {
    _id: "04abace9-d253-431b-8b74-ca5f3d664bfb",
    content:
      "ChatGPT, an advanced language model,A virtual assistant, clever and intellectual,With its vast knowledge, it helps and interacts,Understanding queries, providing accurate facts.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    fullname: "Rinku Singh",
    username: "rinkusingh",
    postImage: "https://source.unsplash.com/random/900x700/?chatGPT",
    createdAt: "2023-06-03",
    updatedAt: formatDate(),
  },
  {
    _id: "7aef0ff6-79c4-444a-8404-3add2916c058",
    content:
      "ReactJS, a popular JavaScript library,Used for building user interfaces that are extraordinary.Component-based architecture, reusable and neat,Efficiently updates the view with a virtual DOM treat.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    fullname: "Rinku Singh",
    username: "rinkusingh",
    postImage: "https://source.unsplash.com/random/900x700/?reactjs",
    createdAt: "2023-06-04",
    updatedAt: formatDate(),
  },
];
