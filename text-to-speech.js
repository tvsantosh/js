let speech = new SpeechSynthesisUtterance();
const rangeslider = document.getElementById('rangeslider');
const spanvalue = document.getElementById('spanvalue');
let rangevalue = parseFloat(rangeslider.value);

function updaterange() {
    rangevalue = parseFloat(rangeslider.value);
    spanvalue.textContent = rangevalue;
}

rangeslider.addEventListener('input', updaterange);




    let voices = [];
    let voiceSelect = document.querySelector('select');
    
    window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        speech.voice = voices[0];
        voices.forEach((voice,i)=>{
            let option=new Option(voice.name,i);
            option.style.color='black';
            voiceSelect.options.add(option);
        });
        
    };

    voiceSelect.addEventListener('change', () => {
        let selectedIndex = voiceSelect.value;
        if (voices[selectedIndex]) {
            speech.voice = voices[selectedIndex];
        }
    });

    document.querySelector('button').addEventListener('click', () => {
        speech.text = document.querySelector('textarea').value;
        speech.rate = rangevalue;
        window.speechSynthesis.speak(speech);
    });





//////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

//may code 2
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const abc = document.getElementById('abc');

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();

let stopRecognition = false;
let recognitionStarted = false;

recognition.continuous = true; // Keep listening continuously
recognition.interimResults = true; // Get interim results

recognition.onstart = function () {
    abc.placeholder = "Listening, please speak...";
};


recognition.onspeechend = function () {
    abc.innerHTML = " ";
};

recognition.onresult = function (event) {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
    }
    document.getElementById('abc').innerHTML = transcript;
}

recognition.onend = function () {
    if (!stopRecognition) {
        recognition.start();
    } else {
        abc.innerHTML = "Recognition stopped.";
    }
};

startBtn.addEventListener('click', () => {
    if (!recognitionStarted) {
        stopRecognition = false;
        recognition.start();
        recognitionStarted = true;
    }
});

stopBtn.addEventListener('click', () => {
    stopRecognition = true;
    recognition.stop();
    recognitionStarted = false;
});