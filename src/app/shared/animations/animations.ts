import {animate, query, stagger, style, transition} from '@angular/animations';

export class Animations {
  private static enterQuery = query(':enter', [
    style({opacity: 0}),
    stagger(90, [
      animate('260ms', style({opacity: 1}))
    ])
  ], {optional: true});

  private static leaveQuery = query(':leave',
    animate('100ms', style({opacity: 0})),
    {optional: true});

  public static enterTransition = transition('* => *', [Animations.enterQuery]);

  public static enterLeaveTransition = transition('* => *', [
    Animations.enterQuery,
    Animations.leaveQuery
  ]);
}
