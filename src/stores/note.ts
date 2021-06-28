export interface Note {
    _id: string;
    title: string;
    type: string;
    content: string;
    attachment: array;
    tags: string[];
}