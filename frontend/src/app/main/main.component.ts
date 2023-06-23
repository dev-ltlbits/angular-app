import { Component } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  isRecording = false;
  audioUrl: string | any;

  constructor(private audioService: MainService) { }

  async ngOnInit() {
    await this.audioService.getAudioStream();
  }

  startRecording() {
    this.isRecording = true;
    this.audioService.startRecording();
  }

  async stopRecording() {
    this.isRecording = false;
    await this.audioService.stopRecording();
    this.audioUrl = URL.createObjectURL(this.audioService.getRecordedBlob());
  }
}
