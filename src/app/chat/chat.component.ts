import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Message } from '../chatmodel';
import { CommonModule } from '@angular/common';
import { WeatherrserivcesService } from '../weatherrserivces.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewInit {
  chatForm!: FormGroup;


  private readonly message: string[] = [
    "Hi, how are you?",
    "Ohh... I can't understand what you are trying to say. Sorry!",
    "I like to play games... But I don't know how to play!",
    "Sorry if my answers are not relevant. :))",
    "I feel sleepy! :("
  ];

  readonly received_img = "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg";
  readonly send_img = "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg";
  readonly received_name: string = "sai";
  readonly send_message: string = "bot";

  constructor(private fb: FormBuilder, public http:WeatherrserivcesService) {}

  ngOnInit(): void {
    if(this.http.send_message().length === 0){
      this.appendMessage(this.send_message, this.send_img, 'left', "Hi, welcome to SimpleChat! Go ahead and send me a message. 😄");
    this.appendMessage(this.received_name, this.received_img, 'right', "Hi how are you . 😄");
    }
    

    this.chatForm = this.fb.group({
      message: ['']
    });
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  sendMessage() {
    if (!this.chatForm.get('message')?.value) return;

    this.appendMessage(this.received_name, this.received_img, 'right', this.chatForm.get('message')?.value);
    this.chatForm.reset();
    this.botResponse();
  }

  appendMessage(name: string, img: string, side: 'left' | 'right', text: string) {
    const msg: Message = {
      name,
      img,
      side,
      text,
      time: this.formatDate(new Date())
    };
    this.http.send_message.update((value) => [...value, msg])
    setTimeout(() => {
      this.scrollToBottom();
    }, 1000);
  }

  botResponse() {
    const randomIndex = this.random(0, this.message.length - 1);
    const msgText = this.message[randomIndex];

    setTimeout(() => {
      this.appendMessage(this.send_message, this.send_img, 'left', msgText);
    }, 2000);
  }

  formatDate(date: Date): string {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
  }

  random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  private scrollToBottom(): void {
    const chatElement = document.querySelector('.msger-chat') as HTMLElement;
    if (chatElement) {
      chatElement.scrollTop = chatElement.scrollHeight;
    }
  }
}
