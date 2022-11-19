import { RootState } from "../store";

export const getAuthorization = (state: RootState) => state.authorization;

export const getExperts = (state: RootState) => state.experts;

export const getFilter = (state: RootState) => state.filter;

export const getOnepostActive = (state: RootState) => state.onePost.active;
export const getOnepostActivePostID = (state: RootState) => state.onePost.active.post?._id;

export const getPosts = (state: RootState) => state.posts;
export const getPostsAll = (state: RootState) => state.posts.all;

export const getRegistration = (state: RootState) => state.registration;

export const getComments = (state: RootState) => state.comments;

export const getEditForm = (state: RootState) => state.editForm;