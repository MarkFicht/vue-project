const apiURL = 'https://reqres.in/api/';
const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Origin', 'http://localhost:5173');
const modeCors = 'cors';
const modeNoCors = 'no-cors';
const cache = 'no-cache';
const credentials = 'same-origin';

export default class RestApiService {
    get<T>(path: string, queryParams: Record<string, any> | null): Promise<T> {
        const fullPath = `${apiURL}${path}${
            queryParams === null ? '' : this.convertQueryParamsToString(queryParams)
        }`;

        return fetch(fullPath, { method: 'GET', headers, mode: modeCors, cache, credentials })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json() as Promise<T>;
            })
            .catch((error: Error) => {
                this.handleError(error);
                return {} as Promise<T>;
            });
    }

    post<T>(path: string, queryParams: Record<string, any> | null, body: any): Promise<T> {
        const fullPath = `${apiURL}${path}${
            queryParams === null ? '' : this.convertQueryParamsToString(queryParams)
        }`;

        return fetch(fullPath, { method: 'POST', headers, mode: modeNoCors, cache, body })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json() as Promise<T>;
            })
            .catch((error: Error) => {
                this.handleError(error);
                return {} as Promise<T>;
            });
    }

    convertQueryParamsToString(queryParams: Record<string, any>): string {
        let str: string = '?';
        for (const [key, value] of Object.entries(queryParams)) {
            str === '?' ? (str += `${key}=${value}`) : (str += `&${key}=${value}`);
        }
        return str;
    }

    handleError(error: any) {
        let errorMessage = '';
        if (error instanceof ErrorEvent) {
            errorMessage = error.message;
        } else {
            errorMessage = `\nError Code: ${error.status}\nMessage: ${error.message}`;
        }
        throw new Error(errorMessage);
    }
}
