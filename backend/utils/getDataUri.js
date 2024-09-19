import dataUriParser from 'datauri/parser.js';
import path from 'path';

const parser = new dataUriParser();

const getDataUri = (file) => {
    // Check for required fields and valid buffer type
    if (!file || typeof file.originalname !== 'string' || !Buffer.isBuffer(file.buffer)) {
        throw new Error('Invalid file object. Ensure "originalname" is a string and "buffer" is a valid buffer.');
    }

    // Extract the file extension and format the buffer as a data URI
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer).content;
};

export default getDataUri;
