import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RxStompService} from '@stomp/ng2-stompjs';
import {UserService} from './core/services/user.service';
import createSpyObj = jasmine.createSpyObj;
import createSpy = jasmine.createSpy;
import {ChatMessageService} from './core/services/chat-message.service';

describe('AppComponent', () => {
  const rxStompService = createSpy('rxStompService');
  const chatMessageService = createSpy('chatMessageService');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: RxStompService, useValue: rxStompService},
        {provide: ChatMessageService, useValue: chatMessageService},
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'muzykant-frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('muzykant-frontend');
  });
});
