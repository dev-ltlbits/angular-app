import { Component } from '@angular/core';
import { MainService } from './main.service';
import { DataService } from '../data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  isRecording = false;
  recordedData: any = {};
  recorderdFile: File | undefined;
  questionAudio: SafeResourceUrl = "";
  question: string = '';
  answer: string = '';

  constructor(private audioService: MainService,
    private dataService: DataService, private sanitizer: DomSanitizer) { }

  async ngOnInit() {
    await this.audioService.getAudioStream();
    this.getQuestion();
  }

  async startRecording() {
    this.isRecording = true;
    this.audioService.startRecording();
    this.recordedData = {};

    // Stop recording after 1 min
    setTimeout(() => {
      this.stopRecording();
    }, 60000);
  }

  async stopRecording() {
    this.isRecording = false;
    await this.audioService.stopRecording();

    let recordedBlob = this.audioService.getRecordedBlob();

    // console.log(recordedBlob)
    // Check if the blob has content
    if (recordedBlob.size > 0) {
      let file = new File([recordedBlob], 'recorded_audio.wav', { type: 'audio/wav' });
      // this.recordedAudioUrl = URL.createObjectURL(file);
      // console.log(file);
      // this.recordedAudioUrl = URL.createObjectURL(this.audioService.getRecordedBlob());
      // console.log(this.recordedAudioUrl)
      (await this.dataService.transcribeAudio(file)).subscribe(data => {
        this.recordedData = data;
        console.log(data.transcription, data.url);
      });
    } else
      console.log("No audio data was recorded.");
  }

  async getQuestion() {
    (await this.dataService.generateQuestions('give 1 short question for a person interviewing for an HR position')).subscribe(async data => {
      this.question = data.answer;

      if (this.question && this.question.length > 0)
        await this.synthesize(this.question);
    }, error => {
      console.log(error);
    });
  }

  // async uploadRecordedFile(file: File) {
  //   (await this.dataService.transcribeAudio(file)).subscribe(data => {
  //     // console.log(data.transcription, data.url);
  //   });
  // }

  async synthesize(text: string) {
    (await this.dataService.synthesizeSpeech(text)).subscribe(data => {
      this.questionAudio = (data.filePath);
    });
  }
}
