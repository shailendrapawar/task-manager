import Joi from "joi";

export const createTaskSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500),

    status: Joi.string().valid('todo', 'in-progress', 'done'),
    priority: Joi.string().valid('low', 'medium', 'high'),

    assignedTo: Joi.string().optional(),
    dueDate: Joi.string(),

}).unknown(false);

export const updateTaskSchema = Joi.object({
    title: Joi.string().min(3).max(100).optional(),
    description: Joi.string().max(500).optional(),
    status: Joi.string().valid('todo', 'in-progress', 'done').optional(),
    priority: Joi.string().valid('low', 'medium', 'high').optional(),
    assignedTo: Joi.string().optional(),
    dueDate: Joi.date().optional(),
}).unknown(false);
