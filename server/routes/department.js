import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addDepartment , getDepartments, editDepartment} from '../controllers/departmentController.js'

const router = express.Router()


router.get('/add', authMiddleware, getDepartments)
router.post('/add', authMiddleware, addDepartment)
router.get('/:id', authMiddleware, editDepartment)


export default router