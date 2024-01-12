const express=require('express'); 
const router=  express.Router(); 
const controller=require('../Controllers/userControllers');
const upload =require('../multerConfig/storageConfig');
router.post('/register',upload.single('Profile'),controller.registerUser);
router.get('/details',controller.getAllUser);
router.get("/exportcsv",controller.userExport);
router.get('/:id',controller.getSingleUser);
router.put('/status/:id',controller.updateStatus);
router.delete('/delete/:id',controller.deleteUser);

router.put('/edit/:id',upload.single('Profile'),controller.editUser);

module.exports=router;