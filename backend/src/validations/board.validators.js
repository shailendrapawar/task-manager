import Joi from 'joi';

export const createBoardSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).optional()
}).unknown(false);

export const updateBoardSchema = Joi.object({
    title: Joi.string().min(3).max(100).optional(),
    description: Joi.string().max(500).optional()
}).unknown(false);
