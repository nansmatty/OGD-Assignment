import { NextFunction, Request, Response } from 'express';
import CatchAsyncError from '../utils/catchAsyncError';
import ErrorHandler from '../utils/errorHandler';
import logger from '../config/logger';
import { Project, ProjectAssociation, User } from '../models';

export const getProjectUsers = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findOne({ where: { id: req.params.project_id } });

    if (!project) {
      return next(new ErrorHandler('Project not found', 404));
    }

    if (project.user_id !== res.locals.user.id) {
      return next(new ErrorHandler('You are not authorized to view users of this project', 403));
    }

    const users = await ProjectAssociation.findAll({
      where: { project_id: req.params.project_id },
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
    });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    logger.error('Get Project Users Catch Error: ', error);
    return next(new ErrorHandler('Something went wrong. Please try after sometime!', 500));
  }
});

export const assignUsersToProject = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get the project and user IDs from the request body
    const { user_ids } = req.body;

    const project = await Project.findOne({ where: { id: req.params.project_id } });

    if (!project) {
      return next(new ErrorHandler('Project not found', 404));
    }

    if (project.user_id !== res.locals.user.id) {
      return next(new ErrorHandler('You are not authorized to assign users to this project', 403));
    }

    // Check if the project ID and user IDs are provided
    if (user_ids.length === 0) {
      return next(new ErrorHandler('Please provide atleast 1 user IDs', 400));
    }

    const checkUsers = await User.findAll({ where: { id: user_ids } });

    if (checkUsers.length !== user_ids.length) {
      return next(new ErrorHandler('One or more users not found', 404));
    }

    const association = user_ids.map((user_id: number) => {
      return { user_id, project_id: req.params.project_id };
    });

    await ProjectAssociation.bulkCreate(association, { ignoreDuplicates: true });

    res.status(200).json({
      success: true,
      message: 'Users assigned to project successfully',
    });
  } catch (error) {
    logger.error('Assign Users To Project Catch Error: ', error);
    return next(new ErrorHandler('Something went wrong. Please try after sometime!', 500));
  }
});

export const removeUsersFromProject = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findOne({ where: { id: req.params.project_id } });

    if (!project) {
      return next(new ErrorHandler('Project not found', 404));
    }

    if (project.user_id !== res.locals.user.id) {
      return next(new ErrorHandler('You are not authorized to remove users from this project', 403));
    }

    const { user_ids } = req.body;

    if (user_ids.length === 0) {
      return next(new ErrorHandler('Please provide atleast 1 user IDs', 400));
    }

    if (user_ids.includes(project.user_id)) {
      return next(new ErrorHandler('Project owner cannot be removed from the project', 400));
    }

    const checkUsers = await User.findAll({ where: { id: user_ids } });

    if (checkUsers.length !== user_ids.length) {
      return next(new ErrorHandler('One or more users not found', 404));
    }

    await ProjectAssociation.destroy({ where: { user_id: user_ids, project_id: req.params.project_id } });

    res.status(200).json({
      success: true,
      message: 'Users removed from project successfully',
    });
  } catch (error) {
    logger.error('Remove Users From Project Catch Error: ', error);
    return next(new ErrorHandler('Something went wrong. Please try after sometime!', 500));
  }
});
