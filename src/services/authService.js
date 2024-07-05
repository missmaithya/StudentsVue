import apiClient from './apiClient';
import router from '../router';

export const logout = async () => {
    const refresh = localStorage.getItem('refresh');
    if (refresh) {
        try {
            // await apiClient.post('logout', { refresh });
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            router.push({ name: 'login' });
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }
};