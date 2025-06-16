import axios from "axios";
import { type Note } from "../types/note";


export interface Params {
  params: {
    page: number;
    perPage: number;
    search?: string;
  }
}

  export interface PaginatedNotesResponse {
    notes: Note[];
    totalPages: number;
  }  
 

const request = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async (
  page: number,
  search: string
): Promise<PaginatedNotesResponse> => {
 
  const params: Params["params"] = {
    page,
    perPage: 12,
        ...(search !== "" && { search: search }),
    
  }
 
    const response = await request.get("/notes", {
      params
    });

  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
   
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {

  const response = await request.post<Note>("/notes", note);
  
  return response.data;
  
};

export const deleteNote = async (id: number): Promise<Note> => {
 
    const response = await request.delete<Note>(`/notes/${id}`);

    return response.data;
  
};