export interface NoteEntity {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteState {
  loading: boolean;
  list: NoteEntity[];
}