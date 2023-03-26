import fs from "fs";
import AWS from "aws-sdk";
import formidable from "formidable";

const s3Client = new AWS.S3({
  endpoint: process.env.DO_SPACES_URL,
  region: "sgp1",
  credentials: {
    accessKeyId: process.env.DO_SPACES_ID as string,
    secretAccessKey: process.env.DO_SPACES_SECRET as string,
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: any, res: any) => {
  return new Promise<void>((resolve) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error", err);
        res.status(500).json({ error: err.message });
        resolve();
      }

      const file = files.file as unknown as formidable.File;

      if (!files.file) {
        res.status(400).json({ error: "No file found" });
        resolve();
      }

      try {
        s3Client.putObject(
          {
            Bucket: process.env.DO_SPACES_BUCKET as string,
            Key: file.originalFilename as string,
            Body: fs.createReadStream(file.filepath),
            ACL: "public-read",
          },
          async (err: AWS.AWSError, data: AWS.S3.PutObjectOutput) => {
            if (err) {
              console.error(err);
              res.status(500).json({ error: err.message });
              return;
            }
            res.status(200).json({
              message: `https://${
                process.env.DO_SPACES_BUCKET as string
              }.sgp1.digitaloceanspaces.com/${file.originalFilename as string}`,
            });
            resolve();
          }
        );
      } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: err.message });
        resolve();
      }
    });
  });
};
