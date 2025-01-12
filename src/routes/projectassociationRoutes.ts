import express from 'express';
import { isAuthenticated } from '../middlewares/authCheckMiddleware';
import { assignUsersToProject, getProjectUsers, removeUsersFromProject } from '../controllers/projectAssociationControllers';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Project Association
 *   description: Associate users into projects
 */

/**
 * @swagger
 * /api/v1/associations/get-users/{project_id}:
 *   get:
 *     summary: Get all users associated with a project
 *     description: Fetch all users who are associated with a specific project by its ID.
 *     tags: [Project Association]
 *     parameters:
 *       - in: path
 *         name: project_id
 *         required: true
 *         description: ID of the project to fetch associated users
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully fetched users for the project
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: User ID
 *                   name:
 *                     type: string
 *                     description: Name of the user
 *                   email:
 *                     type: string
 *                     description: Email of the user
 *       400:
 *         description: Invalid project ID or no users found
 *       500:
 *         description: Internal server error
 */
router.get('/get-users/:project_id', isAuthenticated, getProjectUsers);

/**
 * @swagger
 * /api/v1/associations/assign-users:
 *   post:
 *     summary: Assign users to a project
 *     description: Assign one or more users to a specific project.
 *     tags: [Project Association]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project_id:
 *                 type: integer
 *                 description: ID of the project to which users will be assigned
 *               user_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: List of user IDs to assign to the project
 *     responses:
 *       201:
 *         description: Successfully assigned users to the project
 *       400:
 *         description: Invalid input or project/user not found
 *       500:
 *         description: Internal server error
 */
router.post('/assign-users', isAuthenticated, assignUsersToProject);

/**
 * @swagger
 * /api/v1/associations/remove-users:
 *   delete:
 *     summary: Remove users from a project
 *     description: Remove one or more users from a specific project.
 *     tags: [Project Association]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project_id:
 *                 type: integer
 *                 description: ID of the project from which users will be removed
 *               user_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: List of user IDs to remove from the project
 *     responses:
 *       200:
 *         description: Successfully removed users from the project
 *       400:
 *         description: Invalid input or project/user not found
 *       500:
 *         description: Internal server error
 */
router.delete('/remove-users', isAuthenticated, removeUsersFromProject);

export default router;
