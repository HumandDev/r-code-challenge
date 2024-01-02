import { localApi } from "../config/api";
import { Character, Comment, Interaction } from "../interfaces/character";
import { LocalApiPaginatedResponse } from "../interfaces/pagination";

const BASE_PATH = "/character";

export const getCharacters = (page: number = 1, name: string = "") =>
  localApi.get<LocalApiPaginatedResponse<Character[]>>(
    `${BASE_PATH}?page=${page}&name=${name}`
  );

export const getCharacter = async (id: number) => {
  return await localApi.get<Character>(`${BASE_PATH}/${id}`);
};

export const editCharacter = (character: Partial<Character>, id: number) =>
  localApi.put<Character>(`${BASE_PATH}/${id}`, character);

export const deleteCharacter = (id: number) =>
  localApi.delete<Character>(`${BASE_PATH}/${id}`);

export const getInteractions = (id: number) =>
  localApi.get<Interaction[]>(`${BASE_PATH}/${id}/interactions`);

export const getComments = (id: number) =>
  localApi.get<Comment[]>(`${BASE_PATH}/${id}/comments`);

export const createComment = (id: number, commentBody: string) =>
  localApi.post<Comment>(`${BASE_PATH}/${id}/comments`, { body: commentBody });
