// Мок-функция для получения количества подписчиков
export const mockFetchFollowersCount = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(0); 
        }, 1000);
    });
};


// Функция для получения данных подписчиков с реального API
export const fetchFollowersCount = async () => {
    try {
        const response = await fetch('/api/followersCount');
        if (!response.ok) {
            throw new Error('Failed to fetch followers count');
        }
        const data = await response.json();
        console.log(data);
        return data.count;
        
    } catch (error) {
        console.error('Error fetching followers count:', error);
        throw error;  
    }
};