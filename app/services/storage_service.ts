import { createClient } from "@supabase/supabase-js";
import env from '#start/env'
import { MultipartFile } from "@adonisjs/core/bodyparser";

class StorageService {

    supabase: any;
    constructor() {
        this.supabase = createClient(env.get('SUPABASE_URL'), env.get('SUPABASE_ANON'))
    }

    get(img: string) {
        const { data } = this.supabase.storage.from('images').getPublicUrl(img)
        return data.publicUrl
    }
    async upload(id: String, file: MultipartFile) {
        await this.supabase.storage.from('images').upload('gatos/' + id + '.png', file, {
            contentType: 'image/png',
          })
    }
}

const storage = new StorageService()
export default storage
