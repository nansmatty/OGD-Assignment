import { NextFunction, Request, Response } from 'express';
import CatchAsyncError from '../utils/catchAsyncError';
import { Project } from '../models';
import ErrorHandler from '../utils/errorHandler';
import logger from '../config/logger';

export const getAllProjects = CatchAsyncError(async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await Project.findAll();

    if (projects.length === 0) {
      return next(new ErrorHandler('No projects found', 404));
    }

    return res.status(200).json(projects);
  } catch (error) {
    logger.error('Get All Projects Catch Error: ', error);
    return next(new ErrorHandler('Something went wrong. Try after sometime!', 500));
  }
});

export const getProjectById = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return next(new ErrorHandler('Project not found', 404));
    }

    return res.status(200).json(project);
  } catch (error) {
    logger.error('Get Project By Id Catch Error: ', error);
    return next(new ErrorHandler('Something went wrong. Try after sometime!', 500));
  }
});

export const createProject = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return next(new ErrorHandler('Please fill all the fields', 400));
    }

    const project = await Project.create({
      name,
      description,
      user_id: res.locals.user.id,
    });

    if (!project) {
      return next(new ErrorHandler('Something went wrong while creating project. Please try after sometime', 400));
    }

    return res.status(201).json(project);
  } catch (error) {
    logger.error('Create Project Catch Error: ', error);
    return next(new ErrorHandler('Something went wrong. Try after sometime!', 500));
  }
});

export const updateProject = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return next(new ErrorHandler('Please fill all the fields', 400));
    }

    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return next(new ErrorHandler('Project not found', 404));
    }

    if (project.user_id !== res.locals.user.id) {
      return next(new ErrorHandler('You are not authorized to update this project', 401));
    }

    project.name = name || project.name;
    project.description = description || project.description;

    await project.save();

    return res.status(200).json(project);
  } catch (error) {
    logger.error('Update Project Catch Error: ', error);
    return next(new ErrorHandler('Something went wrong. Try after sometime!', 500));
  }
});

export const deleteProject = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return next(new ErrorHandler('Project not found', 404));
    }

    if (project.user_id !== res.locals.user.id) {
      return next(new ErrorHandler('You are not authorized to delete this project', 401));
    }

    await project.destroy();

    return res.status(204).json({ message: 'Project deleted successfully' });
  } catch (error) {
    logger.error('Delete Project Catch Error: ', error);
    return next(new ErrorHandler('Something went wrong. Try after sometime!', 500));
  }
});
