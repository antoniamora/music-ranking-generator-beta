const useSpotify = () => {

    const go = (song = "") => {

        const encodedSong = encodeURIComponent(song);
        // Para redirigir a una URL externa, usa window.location.href
        window.open(`https://open.spotify.com/search/${encodedSong}`, '_blank');
    }

    return go;
}

export default useSpotify;
