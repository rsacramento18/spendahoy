import { Request } from 'express'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb:any) => {
    cb(null,"./uploads/");
  },
  filename: (req: Request, file: Express.Multer.File, cb: any) => {
    cb(null, file.fieldname + "-" + Date.now() + "." + file.fieldname);
  }
});

const csvFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.includes("csv") || file.mimetype.includes("vnd.ms-excel")) {
    cb(null, true);
  } else {
    cb(
      "Please upload only csv/xls file.The file is -->" + file.mimetype,
      false
    );
  }
};

const upload = multer({ storage: storage, fileFilter: csvFilter });

export default upload;
