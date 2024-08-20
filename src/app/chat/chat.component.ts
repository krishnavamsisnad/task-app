import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Message } from '../chatmodel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  chatForm !: FormGroup ;
  messages: Message[] = [];

 private readonly message: string[] = [
    "Hi, how are you?",
    "Ohh... I can't understand what you trying to say. Sorry!",
    "I like to play games... But I don't know how to play!",
    "Sorry if my answers are not relevant. :))",
    "I feel sleepy! :("
  ];
  readonly recived_img = "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg";
  readonly send_img = "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg";
  readonly reviced_name: string = "sai";
  readonly send_message: string = "vamsi";


  constructor(private fb: FormBuilder){}
  ngOnInit(): void {
    this.appendMessage(this.send_message, this.send_img, 'left', "Hi, welcome to SimpleChat! Go ahead and send me a message. ");
    this.appendMessage(this.reviced_name, this.recived_img, 'right', "I feel sleepy");

    this.chatForm = this.fb.group({
      message: ['']
    });
  }

  sendMessage() {
    if (!this.chatForm.get('message')?.value) return;

    this.appendMessage(this.send_message, this.send_img, 'right', this.chatForm.get('message')?.value);
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

    this.messages.push(msg);
    setTimeout(() => {
      const chatElement = document.querySelector('.msger-chat') as HTMLElement;
      chatElement.scrollTop = chatElement.scrollHeight;
    }, 100);
  }

  botResponse() {
    const randomIndex = this.random(0, this.message.length - 1);
    const msgText = this.message[randomIndex];
   // const delay = msgText.split(" ").length * 100;

    setTimeout(() => {
      this.appendMessage(this.reviced_name, this.recived_img, 'left', msgText);
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
}
