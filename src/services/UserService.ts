interface User {
     id: string;
     name: string;
     email: string;
}

const users: User[] = [];
const userData: Record<string, any[]> = {};

const createUserZapier = async (user: User): Promise<User> => {
     if (users.find(u => u.id === user.id)) {
          throw new Error('User with this ID already exists');
     }
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

const getUserFromService = async (userId: string): Promise<User | undefined> => {
     return users.find(u => u.id === userId);
};

export { createUserZapier, saveUserDataToZapier, getUserDataFromZapier, getUserFromService };
