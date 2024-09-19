interface User {
     id: string;
     name: string;
     email: string;
}

const users: User[] = [];
const userData: Record<string, any[]> = {};

const createUserZapier = async (user: User): Promise<User> => {
     users.push(user);
     return user;
};

const saveUserDataToZapier = async (userId: string, data: any): Promise<void> => {
     if (!userData[userId]) {
          userData[userId] = [];
     }
     userData[userId].push(data);
};

const getUserDataFromZapier = async (userId: string): Promise<any[]> => {
     return userData[userId] || [];
};

export { createUserZapier, saveUserDataToZapier, getUserDataFromZapier };
