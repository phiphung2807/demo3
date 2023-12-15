export interface IPost {
    _id?: string,
    post_name: string,
    post_images: string,
    post_content:string,
    updatedAt?: Date,
    createAt?: Date,
    slug?: string
}