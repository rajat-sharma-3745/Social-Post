export const server = import.meta.env.VITE_BACKEND_URL;


export const API_PATHS = {
    USER: {
        LOGIN: '/users/login',
        SIGNUP: '/users/signup',
    },
    POST: {
        GET: '/posts',
        CREATE:'/posts',
        LIKE:(id)=>`/posts/${id}/like`,
        COMMENT:(id)=>`/posts/${id}/comment`
    
    },
    
}