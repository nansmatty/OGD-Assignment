import { NextFunction, Request, Response } from 'express';
import CatchAsyncError from '../utils/catchAsyncError';
import { Project, Task } from '../models';
import ErrorHandler from '../utils/errorHandler';
import logger from '../config/logger';

export const getAllTasks = CatchAsyncError(async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await Task.findAll();

    if (tasks.length === 0) {
      return next(new ErrorHandler('No tasks found', 404));
    }

    return res.status(200).json(tasks);
  } catch (error) {
    logger.error('Get All Tasks Catch Error: ', error);
    return next(new ErrorHandler('Something went wrong. Please try after sometime!', 500));
  }
});

export const getTaskById = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) {
      return next(new ErrorHandler('Task not found', 404));
    }

    return res.status(200).json(task);
  } catch (error) {
    logger.error('Get Task By Id Catch Error: ', error);
    return next(new ErrorHandler('Something went wrong. Please try after sometime!', 500));
  }
});

export const getAllTasksByProjectId = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { project_id } = req.params;

    const project = await Project.findByPk(project_id);

    if (!project) {
      return next(new ErrorHandler('Project not found', 404));
    }

    const tasksListBasedOnProjectId = await Task.findAll({ where: { project_id } });

    if (tasksListBasedOnProjectId.length === 0) {
      return next(new ErrorHandler('Tasks list not found', 404));
    }

    return res.status(200).json(tasksListBasedOnProjectId);
  } catch (error) {
    logger.error('Get All Tasks By Project Id Catch Error: ', error);
    return next(new ErrorHandler('Something went wrong. Please try after sometime!', 500));
  }
});

export const createTask = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, status, project_id } = req.body;

    if (!title || !status || !project_id) {
      return next(new ErrorHandler('Please provide all required fields', 400));
    }

    const project = await Project.findByPk(project_id);

    if (!project) {
      return next(new ErrorHandler('Project not found', 404));
    }

    const task = await Task.create({
      title,
      description,
      status,
      project_id,
    });

    return res.status(201).json(task);
  } catch (error) {
    logger.error('Create Task Catch Error: ', error);
    return next(new ErrorHandler('Something went wrong. Please try after sometime!', 500));
  }
});

export const updateTask = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await Task.findByPk(id);

    if (!task) {
      return next(new ErrorHandler('Task not found', 404));
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    await task.save();

    return res.status(200).json(task);
  } catch (error) {
    logger.error('Update Task Catch Error: ', error);
    return next(new ErrorHandler('Something went wrong. Please try after sometime!', 500));
  }
});

export const deleteTask = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) {
      return next(new ErrorHandler('Task not found', 404));
    }

    await task.destroy();

    return res.status(204).json(null);
  } catch (error) {
    logger.error('Delete Task Catch Error: ', error);
    return next(new ErrorHandler('Something went wrong. Please try after sometime!', 500));
  }
});
