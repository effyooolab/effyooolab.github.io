//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

function startRecording() {
  console.log("recordButton clicked");

  /*
    Simple constraints object, for more advanced audio features see
    https://addpipe.com/blog/audio-constraints-getusermedia/
  */

  var constraints = { audio: true, video: false }


  /*
    We're using the standard promise based getUserMedia() 
    https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
  */

  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

    /*
      create an audio context after getUserMedia is called
      sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
      the sampleRate defaults to the one set in your OS for your playback device

    */
    audioContext = new AudioContext();

    /*  assign to gumStream for later use  */
    gumStream = stream;

    /* use the stream */
    input = audioContext.createMediaStreamSource(stream);

    /* 
      Create the Recorder object and configure to record mono sound (1 channel)
      Recording 2 channels  will double the file size
    */
    rec = new Recorder(input, { numChannels: 1 })

    //start the recording process
    rec.record()

    console.log("Recording started");

  }).catch(function (err) {
    alert("cannot record audio!");
    console.log(err)
  });
}

function stopRecording(word_to_check) {
  console.log("stopButton clicked");

  //tell the recorder to stop the recording
  rec.stop();

  //stop microphone access
  gumStream.getAudioTracks()[0].stop();

  //create the wav blob and pass it on to getReportFromSpeechace
  rec.exportWAV(getReportFromSpeechace, word_to_check);
}

function getReportFromSpeechace(blob, word_to_check) {

  // var url = URL.createObjectURL(blob);

  //name of .wav file to use during upload and download (without extendion)
  var filename = new Date().toISOString() + ".wav";

  var formdata = new FormData();
  formdata.append("text", word_to_check);
  formdata.append("user_audio_file", blob, filename);
  formdata.append("question_info", "'u1/q1'");
  formdata.append("no_mc", "1");

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch("https://api2.speechace.com/api/scoring/text/v9/json?key=CGUUSsrcz%2Bv%2BHwmFY6Vi9%2BCxENZ0tMbSRcgjyyUFd7EyOuptab7Td1JYcltG6S40Az25fKvMz8cCYwpf%2BF3qoFsvT6SMWV04l97GZlMOi%2FRlnoQoI4XXcaDnyfvWxSMq&dialect=en-us&user_id=XYZ-ABC-99001", requestOptions)
    .then(response => response.text())
    .then(result => {
      var json_result = JSON.parse(result);
      var score = json_result.text_score.speechace_score.pronunciation;
      // var phone_score_list = json_result.text_score.word_score_list[0].phone_score_list; //get total score - refer to json network when inspect
      // var sound_1_score = phone_score_list[0].quality_score; //get score for 1st sound
      // var sound_2_score = phone_score_list[1].quality_score; //get score for 2nd sound
      var player = GetPlayer();
      player.SetVar("scoreAI", score); //assign total score to SL variable
      // player.SetVar("word_C", sound_1_score); //assign 1st sound to SL variable
      // player.SetVar("word_OW", sound_2_score); //assign 2nd sound to SL variable
    })
    .catch(error => console.log('error', error));
}

// function getReportFromSpeechace(blob) {

//   var url = URL.createObjectURL(blob);

//   //name of .wav file to use during upload and download (without extendion)
//   var filename = new Date().toISOString() + ".wav";

//   var formdata = new FormData();
//   formdata.append("text", "cow");
//   formdata.append("user_audio_file", blob, filename);
//   formdata.append("question_info", "'u1/q1'");
//   formdata.append("no_mc", "1");

//   var requestOptions = {
//     method: 'POST',
//     body: formdata,
//     redirect: 'follow'
//   };

//   fetch("https://api2.speechace.com/api/scoring/text/v9/json?key=CGUUSsrcz%2Bv%2BHwmFY6Vi9%2BCxENZ0tMbSRcgjyyUFd7EyOuptab7Td1JYcltG6S40Az25fKvMz8cCYwpf%2BF3qoFsvT6SMWV04l97GZlMOi%2FRlnoQoI4XXcaDnyfvWxSMq&dialect=en-us&user_id=XYZ-ABC-99001", requestOptions)
//     .then(response => response.text())
//     .then(result => {
//       var json_result = JSON.parse(result);
//       var score = json_result.text_score.speechace_score.pronunciation;
//       // var phone_score_list = json_result.text_score.word_score_list[0].phone_score_list; //get total score - refer to json network when inspect
//       // var sound_1_score = phone_score_list[0].quality_score; //get score for 1st sound
//       // var sound_2_score = phone_score_list[1].quality_score; //get score for 2nd sound
//       var player = GetPlayer();
//       player.SetVar("scoreAI", score); //assign total score to SL variable
//       // player.SetVar("word_C", sound_1_score); //assign 1st sound to SL variable
//       // player.SetVar("word_OW", sound_2_score); //assign 2nd sound to SL variable
//     })
//     .catch(error => console.log('error', error));
// }

function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6WJmUbHstxc":
        Script1();
        break;
      case "6JaVTtgMC2T":
        Script2();
        break;
      case "6fpDq9DGu6T":
        Script3();
        break;
      case "6mX2l1jWZOh":
        Script4();
        break;
      case "6ODNPJ3SyhX":
        Script5();
        break;
      case "6Cj2COvgHNd":
        Script6();
        break;
  }
}

function Script1()
{
  console.log("Cow: Recording starts");
  startRecording();
}

function Script2()
{
  console.log("Cow: Recording stop");
  stopRecording("cow");
}

function Script3()
{
  console.log("Duck: Recording starts");
  startRecording();
}

function Script4()
{
  console.log("Duck: Recording stop");
  stopRecording("duck");
}

function Script5()
{
  console.log("Pork: Recording starts");
  startRecording();
}

function Script6()
{
  console.log("Pork: Recording stop");
  stopRecording("pork");
}

