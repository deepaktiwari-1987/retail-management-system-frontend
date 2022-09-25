import styled from 'styled-components'


// Create a Title component that'll render an <h1> tag with some styles
const GridContainer = styled.div`
    display: grid;
    grid-template-areas:
    'header'
    'main'
    'footer';
    grid-template-columns: 1fr;
    grid-template-rows: 5rem 1fr 5rem;
    height: 100%;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Header = styled.header`
    grid-area: header;
    background-color: #203040;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
`;

const Brand = styled.div`
    color: #ffffff;
    font-size: 3rem;
    font-weight: bold;
    text-decoration: none;
    a {
        color: #ffffff;
        font-size: 3rem;
        font-weight: bold;
        text-decoration: none;
    }
    button {
        font-size: 3rem;
        padding: 0.5rem;
        background: none;
        border: none;
        color: #ffffff;
        cursor: pointer;
    }
`;

const HeaderLinks = styled.div`
    color: #ffffff;
    text-decoration: none;
    padding: 1rem;
    a {
    color: #ffffff;
    text-decoration: none;
    padding: 1rem;
    }
    a:hover {
    color: #ff8000;
    }
`;

const DropDown = styled.div`
    display: inline-block;
    position: relative;
    :hover .dropdown-content:{
        display: block;
    }
`;

const DropDownContent = styled.ul`
    position: absolute;
    display: none;
    right: 0;
    padding: 1rem;
    list-style-type: none;
    z-index: 1;
    background-color: #203040;
    margin: 0;
    margin-top: 0.4rem;
`;

const Sidebar = styled.aside`
    position: fixed;
    transition: all 0.5s;
    transform: translateX(-30rem);
    width: 30rem;
    background-color: #f0f0f0;
    height: 100%;
    z-index: 1000;
    .open {
        transform: translateX(0);
    }
`;

const SidebarCloseButton = styled.button`
    border-radius: 50%;
    border: 0.1rem #000000 solid;
    width: 3rem;
    height: 3rem;
    padding: 0.5rem;
    font-size: 2rem;
    padding-top: 0;
    cursor: pointer;
    position: absolute;
    right: 0.5rem;
    top: 1.5rem;  
`;

const Categories = styled.ul`
    padding: 0;
    list-style-type: none;
    a {
        display: flex;
        padding: 1rem;
    }
    a:hover {
        background-color: #c0c0c0;
    }  
`;

const Main = styled.main`
    grid-area: main;
`;

const Content = styled.div`
    
`;

const Footer = styled.footer`
    grid-area: footer;
    background-color: #203040;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export {
    GridContainer,
    Header,
    Brand,
    HeaderLinks,
    DropDown,
    DropDownContent,
    Sidebar,
    SidebarCloseButton,
    Categories,
    Main,
    Content,
    Footer
}
