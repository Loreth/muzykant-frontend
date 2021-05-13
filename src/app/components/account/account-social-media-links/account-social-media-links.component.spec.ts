import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AccountSocialMediaLinksComponent} from './account-social-media-links.component';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatInputHarness} from '@angular/material/input/testing';
import {MatButtonHarness} from '@angular/material/button/testing';
import {of} from 'rxjs';
import {SocialMediaLinks} from '../../../shared/models/social-media-links';
import {SocialMediaLinksService} from '../../../core/services/social-media-links.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import {AccountComponent} from '../account.component';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from '../../../core/services/auth.service';
import {MatFormFieldHarness} from '@angular/material/form-field/testing';

describe('AccountSocialMediaLinksComponent', () => {
  let component: AccountSocialMediaLinksComponent;
  let fixture: ComponentFixture<AccountSocialMediaLinksComponent>;
  let loader: HarnessLoader;
  const snackBarMock = jasmine.createSpyObj('snackBar', ['open']);
  let socialMediaLinks: SocialMediaLinks = {
    id: 1,
    youtube: null,
    soundcloud: null,
    webpage: null,
    userId: 1,
    version: 0
  };
  const socialMediaLinksServiceMock = jasmine.createSpyObj('socialMediaLinksService', {
    getDto: of(socialMediaLinks),
    updateDto: of(socialMediaLinks)
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AccountSocialMediaLinksComponent, AccountComponent],
      imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        {provide: SocialMediaLinksService, useValue: socialMediaLinksServiceMock},
        {provide: MatSnackBar, useValue: snackBarMock},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSocialMediaLinksComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    socialMediaLinksServiceMock.getDto.calls.reset();
    socialMediaLinksServiceMock.updateDto.calls.reset();
    snackBarMock.open.calls.reset();
    spyOnProperty(AuthService, 'loggedUserId').and.returnValue(1);
    socialMediaLinks = {
      id: 1,
      youtube: null,
      soundcloud: null,
      webpage: null,
      userId: 1,
      version: 0
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should save correct youtube link', async () => {
    const expectedSocialLinks = Object.assign({}, socialMediaLinks);
    expectedSocialLinks.youtube = 'https://youtube.com/channel/correct-name-and-link';

    const youtubeMatInput = await loader.getHarness<MatInputHarness>(MatInputHarness.with({
      placeholder: 'https://youtube.com/channel/nazwa-uzytkownika'
    }));
    await youtubeMatInput.setValue('https://youtube.com/channel/correct-name-and-link');

    const saveButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({
      text: 'Zapisz zmiany'
    }));
    await saveButton.click();

    expect(socialMediaLinksServiceMock.getDto).toHaveBeenCalled();
    expect(socialMediaLinksServiceMock.updateDto).toHaveBeenCalledWith(expectedSocialLinks);
  });

  it('should not save incorrect links and display validation errors', async () => {
    const youtubeMatInput = await loader.getHarness<MatInputHarness>(MatInputHarness.with({
      placeholder: 'https://youtube.com/channel/nazwa-uzytkownika'
    }));
    await youtubeMatInput.setValue('definitelynotyoutube.com/smth');

    const soundcloudMatInput = await loader.getHarness<MatInputHarness>(MatInputHarness.with({
      placeholder: 'https://soundcloud.com/nazwa-uzytkownika'
    }));
    await soundcloudMatInput.setValue('isthissoundcloud?.com/a/b');

    const webpageMatInput = await loader.getHarness<MatInputHarness>(MatInputHarness.with({
      placeholder: 'https://moja.strona.pl'
    }));
    await webpageMatInput.setValue('random words');

    const saveButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({
      text: 'Zapisz zmiany'
    }));
    await saveButton.click();

    const youtubecloudMatFormFieldHarness = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness.with({
      floatingLabelText: 'Link do kanału Youtube'})
    );
    const soundcloudMatFormFieldHarness = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness.with({
      floatingLabelText: 'Link do profilu Soundcloud'})
    );
    const webpageMatFormFieldHarness = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness.with({
      floatingLabelText: 'Link do strony internetowej'})
    );


    youtubecloudMatFormFieldHarness.hasErrors().then(hasErrors => expect(hasErrors).toBeTrue());
    youtubecloudMatFormFieldHarness.getTextErrors().then(value => expect(value[0]).not.toBe(''));
    soundcloudMatFormFieldHarness.hasErrors().then(hasErrors => expect(hasErrors).toBeTrue());
    soundcloudMatFormFieldHarness.getTextErrors().then(value => expect(value[0]).not.toBe(''));
    webpageMatFormFieldHarness.hasErrors().then(hasErrors => expect(hasErrors).toBeTrue());
    webpageMatFormFieldHarness.getTextErrors().then(value => expect(value[0]).not.toBe(''));
    expect(socialMediaLinksServiceMock.getDto).toHaveBeenCalled();
    expect(socialMediaLinksServiceMock.updateDto).not.toHaveBeenCalled();
  });

  it('should open snackbar with happy message after successful save', async () => {
    const saveButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({
      text: 'Zapisz zmiany'
    }));
    await saveButton.click();

    expect(snackBarMock.open).toHaveBeenCalledWith('Zmiany zostały zapisane', jasmine.any(String), jasmine.any(Object));
  });

  it('should not open snackbar for save with invalid input', async () => {
    const youtubeMatInput = await loader.getHarness<MatInputHarness>(MatInputHarness.with({
      placeholder: 'https://youtube.com/channel/nazwa-uzytkownika'
    }));
    await youtubeMatInput.setValue('definitelynotyoutube.com/smth');

    const saveButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({
      text: 'Zapisz zmiany'
    }));
    await saveButton.click();

    expect(snackBarMock.open).not.toHaveBeenCalled();
  });
});
