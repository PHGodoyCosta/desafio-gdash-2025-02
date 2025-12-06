import chuva_forte from '../assets/video_weather/chuva_forte.mp4'
import chuva_leve from '../assets/video_weather/chuva_leve.mp4'
import ensolarado from '../assets/video_weather/ensolarado.mp4'
import granizo from '../assets/video_weather/granizo.mp4'
import nevoa_e_neblina from '../assets/video_weather/nevoa_e_neblina.mp4'
import parcialmente_nublado from '../assets/video_weather/parcialmente_nublado.mp4'
import nublado from '../assets/video_weather/nublado.mp4'
import tempestade from '../assets/video_weather/tempestade.mp4'

type VideoTemplateProps = {
    children: React.ReactNode,
    opacity?: number,
    weather_code: number
}

function VideoTemplate({ children, opacity, weather_code }: VideoTemplateProps) {
    const getVideoByCode = (code: number) => {
        if ([0, 1].find(p => p === code)) {
            return ensolarado
        } else if ([2].find(p => p === code)) {
            return parcialmente_nublado
        } else if ([3].find(p => p === code)) {
            return nublado
        } else if ([45, 48].find(p => p === code)) {
            return nevoa_e_neblina
        } else if ([51, 53, 55, 56, 57, 61, 63, 80, 81].find(p => p === code)) {
            return chuva_leve
        } else if ([65, 82].find(p => p === code)) {
            return chuva_forte
        } else if ([71, 73, 75, 77, 85, 86].find(p => p === code)) {
            return granizo
        } else if ([95, 96, 99].find(p => p === code)) {
            return tempestade
        } else {
            return ensolarado
        }
    }

    return (
        <>
            <div className="relative w-full overflow-hidden mt-2 rounded-xl">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover"
                >
                    <source src={getVideoByCode(weather_code)} type="video/mp4" />
                </video>

                {/* Conteúdo por cima */}
                <div className="relative z-10 p-6 text-white">
                    {children}
                </div>

                {/* Sombra escura opcional */}
                <div className={`absolute inset-0 bg-black/${opacity ?? 50}`}></div>
            </div>
        </>
    )
}

export default VideoTemplate