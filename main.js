var loadedFileAudioBuffers = []; //this is where we store the decoded audio data from our file

var browserAudioLibrary = new AudioContext();//window.webkitAudioContext(); //this is what the browser gives us to process audio stuff


const setup = () => {
    var fileInput = document.querySelector('input[type="file"]');
    fileInput.addEventListener('change',filePicked, false);

    var buttons = document.querySelectorAll('.pad');
    console.log(buttons);
    buttons.forEach(function(element) {
        element.addEventListener('click', playSound);
    }, this);

    var assign = document.querySelectorAll('.padAssign');
    assign.forEach(function(element){
        element.addEventListener('click', assignPad);
    })
};


const assignPad = (event) => {

    var assign = document.querySelectorAll('.padAssign');
    assign.forEach(function(element){
        element.classList.remove('assignHighlighted');
    })

    var clickedButton = event.currentTarget;
    clickedButton.classList.add('assignHighlighted');
};

const filePicked = (event) => {
    console.log("file pic")
    var reader = new FileReader();
    reader.onload = function(e){
        console.log("file finished loading")
        initSound(this.result);
    }
   
    reader.readAsArrayBuffer(event.currentTarget.files[0])
}

const initSound = (soundBuffer) => {
    console.log("now we need to process uadio from loaded file")
    browserAudioLibrary.decodeAudioData(soundBuffer, function(buffer) {

        var assign = document.querySelector('.assignHighlighted');
        var whichButton = assign.//substring of button id #
        
        loadedFileAudioBuffers[whichButton] = buffer;
        console.log("stored file", loadedFileAudioBuffer);
        assign.classList.remove('assignHighlighted');
//        playSound();
    }, function(e) {
        console.log('Error decoding file', e);
    });     
};

const playSound = (event) => {

    var clickedButton = event.currentTarget;
    clickedButton.classList.add('padHighlighted');

    var whichButton = clickedButton.//substring of button id #

    player = browserAudioLibrary.createBufferSource();
    player.buffer = loadedFileAudioBuffers[whichButton];
    player.loop = false;
    player.connect(browserAudioLibrary.destination);
    player.start(); // Play immediately.
    
};

console.log("hello mpc");
setup();