import { NextRequest, NextResponse } from 'next/server';
import { IA_Handler } from '@/app/Handler/IA_Handler';


// Configuración de formidable para manejar la carga de archivos
export const config = {
    api: {
        bodyParser: false, // Desactiva el bodyParser predeterminado de Next.js
    },
};
const ia_handler = new IA_Handler();

export async function POST(request: Request) {

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
        }

        const buffer = await file.arrayBuffer();
        const imageBuffer = Buffer.from(buffer);
        const imageBase64 = imageBuffer.toString('base64');

        const analysisResult = await ia_handler.analyzeClothing(imageBase64);
        console.log(analysisResult.busquedas);

        return NextResponse.json({ respuesta: analysisResult });
    } catch (error: unknown) {
        console.error('Error en el endpoint:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Error desconocido en el servidor' }, { status: 500 });
    }
}





