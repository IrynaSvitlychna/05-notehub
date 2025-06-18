export interface Note {
    id: number;
    title: string; // Заголовок нотатки
    content: string; // Текст нотатки
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  }
  