import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {ListBucketsCommand, PutObjectCommand, S3Client} from '@aws-sdk/client-s3'

@Injectable()
export class UploadService {
    constructor(private readonly configService: ConfigService) {}

    private readonly s3Client = new S3Client({
        credentials: {
            accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
            // accessKeyId: 'e53836de959a451b9426644d1e362d52',
            // secretAccessKey: 'b016b28568184d63b07c32b721cf394b',
          },
        // endpoint:"https://s3.storage.selcloud.ru",
        endpoint:"https://s3.ru-1.storage.selcloud.ru",
        region: "ru-1", 
        apiVersion: 'latest' 
    })
 
    async upload(fileName: string, file: Buffer) {
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: 'firstanapa',
                Key: fileName,
                Body: file
            })
        )
    }

    async getListBuckets() {
        const listBuckets = await this.s3Client.send(
             new ListBucketsCommand({
                Bucket: "firstanapa",
                Key: "flowers_1.jpeg",
                Body: "Test"
            })
        )
        return listBuckets
    }
}

