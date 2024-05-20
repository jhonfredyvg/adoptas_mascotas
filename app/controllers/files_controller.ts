import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { createClient } from "@supabase/supabase-js";
import env from '#start/env'
import * as fs from 'fs';
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid';

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
        const resizedImage = await sharp(file)
          .resize(300, 300) 
          .toBuffer()
        await supabase.storage
          .from('images')
          .upload(`i-${image_name}.${image.extname}`, resizedImage, {
            contentType: 'image/png',
            cacheControl: '3600',
            upsert: false,
          })
      }
      response.redirect().back();
    }
  }
}

// .upload(`${Date.now()}.${image.extname}`, resizedImage, {
// async upload({ request, response }: HttpContext) {

//   const image = request.file('croppedImage', {
//     size: '50mb',
//     extnames: ['jpg', 'png', 'jpeg']
//   })
//   if (image) {
//     const supabase = createClient(env.get('SUPABASE_URL'), env.get('SUPABASE_ANON'))
//     image.clientName = "temp." + image.extname

//     await image.move(app.makePath('uploads'))
//     console.log(app.makePath('uploads'));

//     const absolutePath = app.makePath('uploads', "temp." + image.extname)
//     const file = await this.readFile(absolutePath);

//     if (file) {
//       await supabase.storage
//         .from('images') // Replace with your bucket name
//         .upload(`${Date.now()}.${image.extname}`, file, {
//           contentType: 'image/png ',
//           cacheControl: '3600',
//           upsert: false,
//         })
//     }

//     return response.ok('Archivo cargado correctamente.');
//   }
//   else {
//     {
//       return response.ok('Archivo cargado correctamente.');
//     }
//   }
// }
// }
//   try {
//     const file = request.file('archivo'); // 'archivo' es el nombre del campo en el formulario

//     if (!file) {
//       return response.badRequest('No se ha proporcionado ningún archivo.');
//     }
//     storage.upload("img10", file);
//     // Aquí puedes procesar el archivo, validarlo y guardarlo en una ubicación persistente
//     // o en un servicio de almacenamiento en la nube como S3.

//     return response.ok('Archivo cargado correctamente.');
//   } catch (error) {
//     console.error('Error al cargar el archivo:', error);
//     return response.internalServerError('Error al cargar el archivo.');
//   }
// }

// }