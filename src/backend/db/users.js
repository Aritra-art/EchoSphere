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
    bio: "Passionate learner dedicated to exploring the intersections of art and technology for creative problem-solving. Embracing challenges with an open mind and a thirst for knowledge.",
    website: "https://aritraportfolio.netlify.app/",
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
    bio: "Motivated gym trainer committed to inspiring clients to achieve their fitness goals through personalized training programs and continuous support. Empowering individuals to transform their bodies and lives with a holistic approach to health and wellness.",
    website: "https://www.mantrahealthclub.com/mantra/",
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
    bio: "Dynamic cricketer with exceptional batting skills and a fierce passion for the game. Known for delivering match-winning performances and contributing to the team's success with an unwavering dedication to the sport.",
    website: "https://www.kkr.in/players/rinku-singh-profile-64727",
  },
];
