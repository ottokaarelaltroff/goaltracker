import useHttpService from './useHttpService';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export const usePost = (postId: number) => {
    return useHttpService<Post>(
        'posts', `https://jsonplaceholder.typicode.com/posts/${postId}`, { enabled: postId !== undefined }
    );
};