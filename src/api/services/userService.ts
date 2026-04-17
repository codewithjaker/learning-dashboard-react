import apiClient from '../client';
import type { User, CreateUserRequest, UpdateUserRequest, UserListResponse, UserQueryParams } from '../../types/user.types';

export const userService = {
  getUsers: (params: UserQueryParams) =>
    apiClient.get<UserListResponse>('/users', { params }).then((res) => res.data),

  getUserById: (id: number) =>
    apiClient.get<User>(`/users/${id}`).then((res) => res.data),

  createUser: (data: CreateUserRequest) =>
    apiClient.post<User>('/users', data).then((res) => res.data),

  updateUser: (id: number, data: UpdateUserRequest) =>
    apiClient.patch<User>(`/users/${id}`, data).then((res) => res.data),

  deleteUser: (id: number) =>
    apiClient.delete(`/users/${id}`),
};