import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { createClient } from "@supabase/supabase-js";
import env from '#start/env'
import * as fs from 'fs';
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid';
import Pet from '#models/pet';
import storage from '#services/storage_service';

export default class FilesController {

  async readFile(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async upload({ request, response, params }: HttpContext) {
    const pet_id = params.pet_id
    const image_name = uuidv4();
    const image = request.file('croppedImage', { size: '50mb', extnames: ['jpg', 'png', 'jpeg'] })
    if (image) {

      const supabase = createClient(env.get('SUPABASE_URL'), env.get('SUPABASE_ANON'))
      image.clientName = "temp." + image.extname
      await image.move(app.makePath('uploads'))
      console.log(app.makePath('uploads'));
      const absolutePath = app.makePath('uploads', "temp." + image.extname)
      const file = await this.readFile(absolutePath);
      if (file) {
        const file_name = `i-${image_name}.${image.extname}`
        const resizedImage = await sharp(file)
          .resize(768, 480)
          .toBuffer()
        await supabase.storage
          .from('images')
          .upload(file_name, resizedImage, {
            contentType: 'image/png',
            cacheControl: '3600',
            upsert: false,
          })

        const image_url = storage.get(file_name)

        
        const pet = await Pet.find(pet_id)
        
        if (pet) {
         
          // if (pet?.images){
          //   images = pet?.images
          // }
          const images = pet?.images || [];
          images.push(image_url)
          pet.images = images
          await pet.save()
        }
      }
    }
    return response.send(200)
  }

  async delete({ response, params }: HttpContext) {
    const pet_id = params.pet_id
    const image_id = params.image_id
    const pet = await Pet.find(pet_id)
    if (pet) {
      const image_name = pet?.images[image_id]
      const supabase = createClient(env.get('SUPABASE_URL'), env.get('SUPABASE_ANON'))
      await supabase.storage
        .from('images')
        .remove([image_name])

      pet?.images.splice(image_id, 1);
      await pet.save()

    }
    console.log(pet_id);
    console.log(image_id);
    return response.redirect(`/account/upload/${pet_id}`)
  }

}

