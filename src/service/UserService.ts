import type User from '@/interfaces/User';
import RestApiService from './service';

const apiService = new RestApiService();

// ATM fake data from 'https://reqres.in/api/' have only 12 values of users, without any possible to modify it with POST and PUT calls
// After got all data, we can do simulation of acctions on 'create', 'update' and 'delete' with temporary cache in browser
// Link to swagger -> https://reqres.in/api-docs/#/default/get_users

// Sample values for a recruitment task
// const total = 30;
// const total_pages = 5;
const page = 1;
const per_page = 100;

// -----------------------------------------------------------------------------------------------------
// GET all user list
export async function getAllUsers(): Promise<{ data: User[] }> {
    return apiService.get('users', { page, per_page });
}

// GET single user
export async function getUser(id: number): Promise<{ data: User }> {
    return apiService.get(`users/${id}`, null);
}

// POST create user
export async function createUser(body: any): Promise<any> {
    return apiService.post(`users`, null, body);
}
