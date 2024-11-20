import { get } from '../request';

export function rankPage(data) {
    return get('rank', data)
}