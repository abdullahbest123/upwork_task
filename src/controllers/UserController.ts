import { Request, Response } from 'express';
import { createUserZapier, saveUserDataToZapier, getUserDataFromZapier, getUserFromService } from '../services/UserService';
import axios from 'axios';
import Joi from 'joi';
import dotenv from 'dotenv';

dotenv.config();

const ZAPIER_WEBHOOK_URL = process.env.ZAPIER_WEBHOOK_URL || '';

const userSchema = Joi.object({
     id: Joi.string().required(),
     name: Joi.string().required(),
     email: Joi.string().email().required(),
});

const createUser = async (req: Request, res: Response) => {
     const { id, name, email } = req.body;

     const { error } = userSchema.validate({ id, name, email });
     if (error) {
          return res.status(400).json({ error: error.details[0].message });
     }

     try {
          const newUser = await createUserZapier({ id, name, email });
          return res.status(201).json({ message: 'User created successfully', data: newUser });
     } catch (error: any) {
          console.error('Error creating user:', error.message);
          return res.status(500).json({ error: error.message || 'An error occurred while creating the user' });
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

          console.log(ZAPIER_WEBHOOK_URL)
          await axios.post(ZAPIER_WEBHOOK_URL, { user, ...userData });

          return res.status(200).json({ message: 'Data posted and webhook triggered' });
     } catch (error: any) {
          console.error('Error:', error.message);
          return res.status(500).json({ error: error.message || 'An error occurred while creating the user' });
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
     } catch (error: any) {
          console.error('Error:', error.message);
          return res.status(500).json({ error: error.message || 'An error occurred while creating the user' });
     }
};

export { createUser, postData, getData };
