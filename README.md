# Descubre Rankings Musicales

Esta aplicación de Next.js permite a los usuarios descubrir rankings musicales utilizando la API de OpenAI, mediante la dependencia @ai-sdk/openai. Al ingresar un término de búsqueda, la aplicación genera una lista de canciones relevantes y permite al usuario buscar esas canciones en Spotify con un solo click.

## Características

- Generación de listas de canciones utilizando el modelo GPT-4 de OpenAI.
- Búsqueda de canciones en Spotify.
- Interfaz intuitiva y fácil de usar.

## Requisitos

- Node.js
- Una cuenta en OpenAI con una clave API.
- Una cuenta en Spotify.

## Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/antoniamora/music-ranking-generator-beta
cd music-ranking-generator-beta
```

2. Instala las dependencias

```bash
npm install
```

3. Crea un archivo .env.local en la raíz del proyecto con la siguiente configuración:

```.env
NEXT_PUBLIC_OPENAI_API_KEY=tu-api-key-de-openai
```
## Uso

1. Inicia la aplicación en modo de desarrollo:

```bash
npm run dev
```

2. Abre http://localhost:3000 en tu navegador.

## Ejemplo de uso

1. Ingresa un término de búsqueda en el campo de texto, por ejemplo: Quiero las canciones más alegres de 1983.
2. Haz clic en "Generar".
3. Una lista de canciones aparecerá en la tabla.
4. Haz click en una canción para buscarla en Spotify.