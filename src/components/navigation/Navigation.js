// import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
// import SignedInLinks from "./SignedInLinks";
// import SignedOutLinks from "./SignedOutLinks";

/**
 * This is a navigation bar, that appears on all sites
 */

// export const Navigation = props => {
//   if (!localStorage.getItem("token")) {
//     return props.children;
//   }
//   changeState = () => {
//     this.setState({
//       token: localStorage.getItem("token")
//     })
//   };
//
//   return (
//     <div>
//       <nav className="nav-wrapper blue darken-3">
//         <div className="container">
//           <Link to="/" className="brand-logo"><i class="large material-icons">code</i>Armin Project</Link>
//           {/* This displays the right Links we either have a token or dont have one-> If we log out we do not have a token anymore */}
//           {this.state.token == null ? <SignedOutLinks /> : <SignedInLinks />}
//         </div>
//       </nav>
//     </div>
//   )
// }
// export default Navigation;

const Navigation = () => {
    return (
        <>
            <Nav>
                <NavLogo to="/">
                    Logo
                </NavLogo>
                <Bars />

                <NavMenu>
                    <NavLink
                        to="/"
                        activeStyle={{ color: 'black' }}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/login"
                        activeStyle={{ color: 'black' }}
                    >
                        Sign In
                    </NavLink>
                    <NavBtn>
                        <NavBtnLink to="/registration">Sign Up</NavBtnLink>
                    </NavBtn>
                </NavMenu>
            </Nav>
        </>
    );
};

export const Nav = styled.nav`
    background: blue;
    height: 85px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem calc((100vw - 1000px) / 2);
    z-index: 12;
`;
export const NavLogo = styled(Link)`
  cursor: pointer;
  color: #fff;
  font-size: 2rem;
  text-decoration: none;

`;

export const NavLink = styled(Link)`
color: #fff;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;
&:hover {
  color: black;
}
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: transparent;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: 1px solid #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #808080;
  }
`;

export default Navigation;
