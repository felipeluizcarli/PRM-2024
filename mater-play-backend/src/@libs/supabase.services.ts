import { Update } from './../../../mater-play-cms/node_modules/@remix-run/router/dist/history.d';
import { Injectable, Inject } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseService{
    constructor(
        @Inject('SUPABASE_CLIENT')
        private readonly supabase: SupabaseClient) {}

    upload(): Promise<any> {}

    async Update(movieID: string, file: any) : Promise<any>{ 
        const { originalname, buffer } = file;

        const extensao = originalname.substring(
            originalname.lastIndexOf('.')
            String(originalname).length
        );


        const { data, error} = await this.supabase.storage
            .from('mater-play')
            .update(`movies/&{movieId}&{extensao}`, buffer,{

            });

            if (error) throw error;

            return data
    }
}