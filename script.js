const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled
}

// Passing JOke to VoiceRSS API
function tellMe(joke) {
    console.log('I got you here is the subtitle xD : ', joke);
    VoiceRSS.speech({
        key: '7243023ec33d4857aa42d2734bb7af72',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


//  Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist'
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke
        }
        // Text-To-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        // Catch Errors Here
        console.log('Whoops', error)
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);