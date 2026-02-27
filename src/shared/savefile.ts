import { resolve } from 'path';
import { existsSync, mkdirSync, createWriteStream } from 'fs';
import { v4 as uuid } from 'uuid';

function saveFile(
  createReadStream: Function,
  filename: string,
): Promise<string> {
  const uploadDir = resolve(process.cwd(), 'uploads');

  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }

  const uniqueFilename = `${uuid()}-${filename}`;
  const filePath = resolve(uploadDir, uniqueFilename);

  const stream = createReadStream();
  const writeStream = createWriteStream(filePath);

  return new Promise((resolve, reject) => {
    stream.pipe(writeStream);
    stream.on('error', reject);

    writeStream.on('finish', () => {
      writeStream.close(); 
      resolve(`uploads/${uniqueFilename}`);
    });

    writeStream.on('error', reject);
  });
}

export { saveFile };
