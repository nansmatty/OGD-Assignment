import express from 'express';
import { isAuthenticated } from '../middlewares/authCheckMiddleware';
import { getAllUsers, getUserById } from '../controllers/userController';
const router = express.Router();

/**
 * @swagger
 * /api/v1/users/get-all-users:
 *   get:
 *     summary: Retrieve all users
 *     description: Fetches a list of all users. Requires authentication.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized. Authentication required.
 *     security:
 *       - cookieAuth: []
 */
router.get('/get-all-users', isAuthenticated, getAllUsers);
/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     description: Fetches a user by their unique ID. Requires authentication.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User data retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *       401:
 *         description: Unauthorized. Authentication required.
 *     security:
 *       - cookieAuth: []
 */

router.get('/:id', isAuthenticated, getUserById);

export default router;
