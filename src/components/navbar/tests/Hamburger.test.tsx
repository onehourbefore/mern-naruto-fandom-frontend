import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from 'react-router-dom';
import * as reduxHooks from '../../../store/index';
import { menuVisionTestState } from "./utils/hamburgerTestData";

import Hamburger from "../Hamburger";
import cl from '../Navbar.module.scss';


const mockedUseAppSelector  = jest.spyOn (reduxHooks, 'useAppSelector');

describe ('Hamburger', () => {
    it ('menu vision test', () => {
        mockedUseAppSelector.mockReturnValue (menuVisionTestState);
        render (
            <MemoryRouter>
                <Hamburger />
            </MemoryRouter>
        );
        expect (screen.getByAltText (/логотип/i)).toBeInTheDocument ();
        expect (screen.getByText (/войти/i)).toBeInTheDocument ();
        expect (screen.getByText (/регистрация/i)).toBeInTheDocument ();

        expect(screen.getByTestId ('menu')).toHaveClass (cl.root__noVisible);
        userEvent.click (screen.getByTestId ('hamburger'));
        expect(screen.getByTestId ('menu')).toHaveClass (cl.root__visible);
        
        userEvent.click (screen.getByAltText (/закрыть/i));
        expect(screen.getByTestId ('menu')).toHaveClass (cl.root__noVisible);
    });
});