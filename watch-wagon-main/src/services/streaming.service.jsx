class StreamingService {

    static getStreamingIcon(streamingName) {
        switch (streamingName) {
            case 'Netflix': return 'https://cdn-icons-png.flaticon.com/256/732/732228.png';
            case 'Amazon Prime Video': return 'https://1.bp.blogspot.com/-w5a7XmHCeK4/XvyHv_da-XI/AAAAAAAABF4/WjJGrLmRyHcJBE4lHUWTlam8HkhYF94vQCK4BGAsYHg/w256-h256/unnamed.png';
            case 'HBO Max': return 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/00/2c/6e/002c6e54-2ee2-c51d-cbda-eb1ff112e025/AppIcon-Release-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/256x256bb.png';
            case 'Telecine': return 'https://www.tvprogramacao.com/static/storage/app/epg_channel_icons/c7d/1dd/c7d1dd31-d13d-42d1-b4a3-123a29c79cc4.png';
            case 'YouTube': return 'https://cdn-icons-png.flaticon.com/256/1384/1384060.png';
            case 'Star+': return 'https://logospng.org/download/star-plus/logo-star-plus-256.png';
            default: return 'https://cdn-icons-png.flaticon.com/256/732/732228.png';
        }
    }
}

export default StreamingService;