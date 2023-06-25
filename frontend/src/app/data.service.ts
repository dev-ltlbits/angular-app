import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:3000'; // Your LoopBack API url

  constructor(private http: HttpClient) { }

  // Assume you have an endpoint '/items' in your LoopBack API
  getItems(): Observable<any> {
    return this.http.get(`${this.baseUrl}/items`);
  }

  async generateQuestions(query: string): Promise<Observable<any>> {
    return this.http.post<{ answer: string }>(`${this.baseUrl}/questions`, { query });
  }

  async transcribeAudio(file: File): Promise<Observable<any>> {
    //console.log(file)
    const formData = new FormData();
    formData.append('audio', file);
    //console.log(formData.get('audio'))

    return this.http.post<{ transcription: string, url: string }>(`${this.baseUrl}/transcribe`, formData);
  }

  async synthesizeSpeech(text: string): Promise<Observable<any>> {
    return this.http.post<{ filePath: string }>(`${this.baseUrl}/synthesize`, { text });
  }
}
