import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import ListAltIcon from "@material-ui/icons/ListAlt";

import LGPDOK_Logo from "@material-ui/icons/VerifiedUser";
//import LGPDOK_Logo from '../../../images/LGPD-OK.svg'
import "./Widget.scss";

const lgpdok_info =
  "Lei Geral de Proteção de Dados <br><br>" +
  "Através deste atalho você poderá ter acesso a todos os tratamentos de dados feitos pela EMPRESA, trazendo transparência para o nosso relacionamento <br><br>" +
  "Também é possível entrar em contato conosco para obter maiores informações sobre o tratamento de dados e seus direitos.<br><br>" +
  "Clique no botão LGPD OK para ver as opções";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

const timeoutLength = 200;

class Widget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      isMouseHover: false
    };
  }

  handleLogoClick = (event) => {
    console.log(event.currentTarget);
    this.setState({
      anchorEl: event.currentTarget,
      isMouseHover: false
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMouseHover = ({ mouseHover }) => {
    console.log("mouseHover: " + mouseHover);
    this.setState({
      isMouseHover: mouseHover
    });
    console.log("handleMouseHover: " + this.state.isMouseHover);
  };

  leaveMenu = () => {
    setTimeout(() => {
      this.handleClose();
    }, timeoutLength);
  };

  render() {
    return (
      <div className="lgpdok-box">
        <LGPDOK_Logo
          className="lgpdok-box-logo"
          onClick={this.handleLogoClick}
          color="primary"
          opacity={Boolean(this.state.anchorEl) ? 0 : 100}
          onMouseEnter={() => this.handleMouseHover({ mouseHover: true })}
          onMouseLeave={() => this.handleMouseHover({ mouseHover: false })}
        />

        {this.state.isMouseHover && (
          <div
            id="info"
            className="lgpdok-box-info"
            dangerouslySetInnerHTML={{ __html: lgpdok_info }}
          ></div>
        )}

        <StyledMenu
          id="customized-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
          // onMouseLeave={() => this.leaveMenu()}
          MenuListProps={{
            onMouseLeave: this.leaveMenu
          }}
        >
          <StyledMenuItem onClick={this.handleClose}>
            <ListItemIcon>
              <QuestionAnswerIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Solicitar Informações" />
          </StyledMenuItem>
          <StyledMenuItem onClick={this.handleClose}>
            <ListItemIcon>
              <AccountBoxIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Dados do Encarregado" />
          </StyledMenuItem>
          <StyledMenuItem onClick={this.handleClose}>
            <ListItemIcon>
              <ListAltIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Sobre Dados Pessoais" />
          </StyledMenuItem>
        </StyledMenu>
      </div>
    );
  }
}

export default Widget;
