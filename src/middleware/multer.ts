import multer from 'multer';
import path from 'path';

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: (arg0: null, arg1: string) => void) => {
        // Use path.join to create an absolute path to the uploads directory
        const uploadPath = path.join(__dirname, '../../uploads/'); // Adjust the path as necessary
        cb(null, uploadPath); // Specify the directory to save uploaded files
    },
    filename: (req: any, file: { originalname: any; }, cb: (arg0: null, arg1: any) => void) => {
        cb(null, file.originalname); // Use original file name
    }
});

const upload = multer({ storage });

export default upload;