import { Request, Response } from 'express';
import { createUserZapier, saveUserDataToZapier, getUserDataFromZapier, getUserFromService } from '../services/UserService';
import axios from 'axios';

const ZAPIER_WEBHOOK_URL = process.env.ZAPIER_WEBHOOK_URL || '';

const createUser = async (req: Request, res: Response) => {
     const { id, name, email } = req.body;

     if (!id || !name || !email) {
          return res.status(400).json({ error: 'ID, Name, and Email are required' });
     }

     try {
          const newUser = await createUserZapier({ id, name, email });
          return res.status(201).json({ message: 'User created successfully', data: newUser });
     } catch (error) {
          console.error('Error creating user:', error);
          return res.status(500).json({ error: 'An error occurred while creating the user' });
     }
};

const postData = async (req: Request, res: Response) => {
     const userId = req.params.id;
     const userData = req.body;

     try {
          await saveUserDataToZapier(userId, userData);

          const user = await getUserFromService(userId);
          if (!user) {
               return res.status(404).json({ error: 'User not found' });
          }

          await axios.post(ZAPIER_WEBHOOK_URL, { user, ...userData });

          return res.status(200).json({ message: 'Data posted and webhook triggered' });
     } catch (error) {
          console.error('Error posting data:', error);
          return res.status(500).json({ error: 'An error occurred while posting data' });
     }
};

const getData = async (req: Request, res: Response) => {
     const userId = req.params.id;

     try {
          const data = await getUserDataFromZapier(userId);
          if (!data) {
               return res.status(404).json({ error: 'No data found for this user' });
          }
          return res.status(200).json({ data });
     } catch (error) {
          console.error('Error retrieving data:', error);
          return res.status(500).json({ error: 'An error occurred while retrieving data' });
     }
};

export { createUser, postData, getData };
