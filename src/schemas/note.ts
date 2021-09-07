export interface NoteSchema {
    _id: string;
    title: string;
    type: string;
    content: string;
    attachment: any[];
    authors: string[];
    tags: string[];
}