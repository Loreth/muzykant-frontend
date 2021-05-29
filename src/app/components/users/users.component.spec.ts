import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {of} from 'rxjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UsersComponent} from './users.component';
import {Musician} from '../../shared/models/musician';
import {Equipment} from '../../shared/models/equipment';
import {UserType} from '../../shared/models/user-type';
import {UserService} from '../../core/services/user.service';
import {UserImageService} from '../../core/services/user-image.service';
import {MusicianWantedAdService} from '../../core/services/musician-wanted-ad.service';
import {BandWantedAdService} from '../../core/services/band-wanted-ad.service';
import {JamSessionAdService} from '../../core/services/jam-session-ad.service';
import {EquipmentService} from '../../core/services/equipment.service';
import {ActivatedRoute, RouterLinkWithHref} from '@angular/router';
import {Location} from '@angular/common';
import moment from 'moment';
import createSpyObj = jasmine.createSpyObj;
import {UserServiceFactoryService} from '../../core/services/user-service-factory.service';
import {MatIconHarness, MatIconTestingModule} from '@angular/material/icon/testing';
import {MatIcon} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {CapitalizePipe} from '../../shared/pipes/capitalize.pipe';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {MatButtonHarness} from '@angular/material/button/testing';
import {MatTooltipHarness} from '@angular/material/tooltip/testing';
import {MatListHarness} from '@angular/material/list/testing';
import {MatChipListHarness} from '@angular/material/chips/testing';
import {MatChipList, MatChipsModule} from '@angular/material/chips';
import {MatExpansionPanelHarness} from '@angular/material/expansion/testing';
import {MatExpansionModule} from '@angular/material/expansion';
import {PhonePipe} from '../../shared/pipes/phone.pipe';
import {ChatComponent} from '../chat/chat.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let loader: HarnessLoader;

  const musician: Musician = {
    id: 1,
    userType: UserType.MUSICIAN,
    linkName: 'grajek',
    displayName: 'Grajek',
    description: 'Some text.',
    phone: '923645183',
    city: 'Wrocław',
    voivodeship: {id: 1, name: 'dolnośląskie'},
    profileImageLink: null,
    userImages: null,
    genres: [
      {id: 36, name: 'Punk Rock'},
      {id: 30, name: 'Punk'},
      {id: 11, name: 'Metal'},
      {id: 33, name: 'Trash Metal'},
      {id: 3, name: 'Rock'},
      {id: 8, name: 'Rock progresywny'},
      {id: 24, name: 'Hard Rock'}
    ],
    instruments: [
      {id: 29, name: 'Pianino'},
      {id: 28, name: 'Perkusja'},
      {id: 4, name: 'Bas'},
      {id: 45, name: 'Gitara elektryczna'},
      {id: 34, name: 'Syntezator'},
      {id: 17, name: 'Klawisze'},
      {id: 44, name: 'Wokal wspierający'},
      {id: 46, name: 'Gitara akustyczna'}
    ],
    socialMediaLinks: {
      youtube: null,
      soundcloud: 'https://soundcloud.com/muse',
      webpage: null,
      userId: 3,
      version: 0,
      id: 3
    },
    person: {
      id: 3,
      firstName: 'Andrzej',
      lastName: 'Zalewski',
      pseudo: 'Grajek',
      gender: 'M',
      birthdate: moment([1985, 11, 12])
    }
  };
  const musicianEquipment: Equipment[] = [
    {id: 1, name: 'Marshall DSL40', musicianId: 3},
    {id: 3, name: 'Shure SM47 x2', musicianId: 3},
    {id: 2, name: 'Vox AC30', musicianId: 3}
  ];

  const userServiceMock = createSpyObj('userService', {getDto: of(musician), searchDtos: of({content: [musician]})});
  const userServiceFactoryServiceMock = createSpyObj('userServiceFactoryService', {getUserService: userServiceMock});
  const userImageServiceMock = createSpyObj('userImageService', {searchDtos: of({content: []})});
  const musicianWantedAdServiceMock = createSpyObj('musicianWantedAdService', {searchDtos: of({content: []})});
  const bandWantedAdServiceMock = createSpyObj('bandWantedAdAdService', {searchDtos: of({content: []})});
  const jamSessionAdServiceMock = createSpyObj('jamSessionAdService', {searchDtos: of({content: []})});
  const equipmentServiceMock = createSpyObj('equipmentService', {searchDtos: of({content: musicianEquipment})});
  const routeMock = createSpyObj('route', {}, {params: of({'link-name': 'grajek'})});
  const locationMock = createSpyObj('location', ['back']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent, CapitalizePipe, PhonePipe, MatIcon],
      imports: [BrowserAnimationsModule, MatIconTestingModule, MatListModule, MatButtonModule, MatChipsModule,
        MatExpansionModule, RouterTestingModule.withRoutes([
          {path: 'messages', component: ChatComponent}
        ])],
      providers: [
        {provide: UserService, useValue: userServiceMock},
        {provide: UserServiceFactoryService, useValue: userServiceFactoryServiceMock},
        {provide: UserImageService, useValue: userImageServiceMock},
        {provide: MusicianWantedAdService, useValue: musicianWantedAdServiceMock},
        {provide: BandWantedAdService, useValue: bandWantedAdServiceMock},
        {provide: JamSessionAdService, useValue: jamSessionAdServiceMock},
        {provide: EquipmentService, useValue: equipmentServiceMock},
        {provide: ActivatedRoute, useValue: routeMock},
        {provide: Location, locationMock},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should contain fallback icon in DOM for user without profile image', async () => {
    const fallbackUserIcon = await loader.getHarness<MatIconHarness>(MatIconHarness.with({
      selector: '.profile-image'
    }));

    expect(fallbackUserIcon).toBeTruthy();
  });

  it('should display translated user type', async () => {
    const userTypeDebugElement = fixture.debugElement.query(By.css('.user-type'));

    expect(userTypeDebugElement.nativeElement.textContent).toEqual('Muzyk');
  });

  it('should enable user link buttons only for provided links', async () => {
    const socialMediaLinkButtons = fixture.debugElement.query(By.css('.link-icons')).queryAll(By.css('a'));
    expect(socialMediaLinkButtons.length).toEqual(3);
    expect(socialMediaLinkButtons[0].attributes.disabled).toBeFalsy();
    expect(socialMediaLinkButtons[1].attributes.disabled).toEqual('true');
    expect(socialMediaLinkButtons[2].attributes.disabled).toEqual('true');
  });

  it('should contain list with voivodeship and city correctly describing user', async () => {
    const list = await loader.getHarness<MatListHarness>(MatListHarness);
    const listItems = await list.getItems();

    expect(await listItems[0].getText()).toEqual('Województwo Dolnośląskie');
    expect(await listItems[1].getText()).toEqual('Miasto Wrocław');
  });

  it('should contain chip lists with correct amount of chips', async () => {
    const genreChipList = await loader.getHarness<MatChipListHarness>(MatChipListHarness.with({selector: '.genre-chip-list'}));
    const genreChips = await genreChipList.getChips();
    const instrumentChipList = await loader.getHarness<MatChipListHarness>(MatChipListHarness.with({selector: '.instrument-chip-list'}));
    const instrumentChips = await instrumentChipList.getChips();

    expect(genreChips.length).toEqual(musician.genres.length);
    expect(instrumentChips.length).toEqual(musician.instruments.length);
  });

  it('should contain user description in DOM', async () => {
    const descriptionElement = fixture.debugElement.query(By.css('.description'));
    const description = descriptionElement.queryAll(By.css('p'))[1];

    expect(description.nativeElement.textContent).toEqual(musician.description);
  });

  it('should display formatted user phone number only after clicking display number button', async () => {
    const phonePipe = new PhonePipe();
    let phoneNumberElement = fixture.debugElement.query(By.css('.phone-number'));
    const userNumberButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({selector: '.show-number-button'}));

    expect(phoneNumberElement).toBeFalsy();

    await userNumberButton.click();
    phoneNumberElement = fixture.debugElement.query(By.css('.phone-number'));
    expect(phoneNumberElement.nativeElement.textContent).toEqual(phonePipe.transform(musician.phone));
  });

  it('should not contain image slider in DOM for user without pictures', async () => {
    const imageSliderElement = fixture.debugElement.query(By.css('ng-image-slider'));

    expect(imageSliderElement).toBeFalsy();
  });

  it('should contain soundcloud widget in DOM for user with soundcloud link', async () => {
    const soundcloudWidgetElement = fixture.debugElement.query(By.css('app-soundcloud-widget'));

    expect(soundcloudWidgetElement).toBeTruthy();
  });

  it('should redirect to chat with the user after clicking message button', async () => {
    const location = TestBed.inject(Location);
    const messageButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({selector: '#message-button'}));
    await messageButton.click();

    expect(location.path()).toEqual('/messages;recipient=grajek');
  });
});
