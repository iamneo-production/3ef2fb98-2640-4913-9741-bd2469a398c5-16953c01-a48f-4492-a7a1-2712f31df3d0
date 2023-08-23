import React from "react";
import App from "../App";
import { shallow, mount } from "enzyme";


var wrapper;
describe('Testing App Component', () => {

   // App Component renders without crashing 
    test('test_case9', () => {
        wrapper = mount(<App />);
        expect(wrapper.instance()).toBeDefined();
        wrapper.unmount();
    });

    // Testing the Start Quiz button 

    test('test_case10', () => {
        wrapper = mount(<App />);
        expect(wrapper.find('h1 center').text()).toBe('Quizz App');
        expect(wrapper.find('button').instance()).toBeDefined();
        wrapper.unmount();
    });
})