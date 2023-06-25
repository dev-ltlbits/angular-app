import { Injectable } from '@angular/core';
import * as RecordRTC from 'recordrtc';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private stream: MediaStream | any;
  private recorder: RecordRTC | any;
  private blob: Blob | any;

  async getAudioStream() {
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  }

  startRecording() {
    let options: any = {
      type: 'audio',
      // numberOfAudioChannels: 2,
      // checkForInactiveTracks: true,
      // bufferSize: 16384,
      // sampleRate: 44100,
      // desiredSampRate: 16000
    };

    this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, options);
    this.recorder.record();
  }

  async stopRecording() {
    return new Promise<Blob>((resolve, reject) => {
      this.recorder.stop((blob: any) => {
        this.blob = blob;
        resolve(blob);
      });
    });
  }

  getRecordedBlob() {
    return this.blob;
  }
}
