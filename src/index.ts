
import App from './ts/App';
import AudioPlayer from './ts/AudioPlayer';

document.addEventListener('DOMContentLoaded', async () => {
    let app: App = new App()
    await app.setUp() 
});