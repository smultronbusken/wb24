
import App from './ts/App';
import AudioPlayer from './ts/AudioPlayer';


let app: App = new App()

document.addEventListener('DOMContentLoaded', async () => {
    await app.setUp() 
});