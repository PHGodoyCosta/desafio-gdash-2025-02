
type VideoTemplateProps = {
    children: React.ReactNode,
    opacity?: number,
    video: string
}

function VideoTemplate({ children, opacity, video }: VideoTemplateProps) {
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
                    <source src={video} type="video/mp4" />
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