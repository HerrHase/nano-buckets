export interface BucketSchema {
    _id: string;
    title: string;
    description: string;
    owner: string;
    configuration: string[];
    visiblity: string;
    created_at: string;
    updated_at: string;
}