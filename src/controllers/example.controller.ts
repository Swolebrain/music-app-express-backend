import { Request, Response } from 'express';
import * as exampleService from '../services/example.service';

/**
 * Example controller functions
 */
export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await exampleService.findAll();
    res.status(200).json(items);
  } catch (error) {
    console.error('Error in getAll controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const item = await exampleService.findById(id);
    
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    
    res.status(200).json(item);
  } catch (error) {
    console.error('Error in getById controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 