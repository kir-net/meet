import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';


describe('<NumberOfEvents /> component', () => {

    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    /* -------------------------------------------------------------------
            FEATURE 3: SPECIFY NUMBER OF EVENTS
    ---------------------------------------------------------------------*/

    /* ----------------- SCENARIO 1 --------------------------------------: 
    When user hasn’t specified a number, 32 is the default number
    ---------------------------------------------------------------------*/
    test('display 32 by default', () => {
        expect(
            NumberOfEventsWrapper.find('.number-of-events').get(0).props.value
        ).toEqual(32);
    });

    test('display 32 if user input is not in range 1-32', () => {
        NumberOfEventsWrapper.find('.number-of-events').simulate(
            'change', {target: { value: 40 }}
        );
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(32);
    });

    /* ----------------- SCENARIO 2 --------------------------------------: 
    User can change the number of events they want to see
    ---------------------------------------------------------------------*/
    test('user change number of events', () => {
        NumberOfEventsWrapper.find('.number-of-events').simulate(
            'change', {target: { value: 24 }}
        );
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(24);
      });

});  