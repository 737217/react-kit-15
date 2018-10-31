import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { emailValidation, phoneValidation } from './Func';
import InputMask from 'react-input-mask';
import { addData } from '../actions/index';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const Label = styled.div`
  position: absolute;
  top: 10px;
  z-index: 1;
  font-size: 12px;
  color: #717171;
`;

const StyledInput = styled.input`
  border: 4px solid #717171;
  height: 60px;
  width: 240px;
  margin: 10px 10px 30px;
  text-align: center;
  background: #fff;
  position:relative;
  z-index: 999;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: 16px;
  &:hover {
    border: 1px solid #717171;
    transition: all 0.2s ease-in-out;
  }
`;

const Error = styled.div`
  position: absolute;
  bottom: 13px;
  font-size: 12px;
  color: #ff2731;
`;

const StyledInputMask = styled(StyledInput.withComponent(InputMask))``;

class View extends Component {

    state = {
        name: '',
        active: false,
        isValid: true,
    };

    onChange = ({ target }) => {
        this.setState({
            name: target.value,
        });
    };

    onFocus = () => {
        this.label.style.transform = 'translateY(-20px)';
        this.label.style.transition = 'all 0.5s ease-in-out';
        this.setState({
            active: true
        });
    };

    validInput = (type, name) => {
        const { addData } = this.props;
        if(type === 'phone') {
            this.phone.style.border = '4px solid #cfaa6b';
        } else {
            this.input.style.border = '4px solid #cfaa6b';
        }
        this.setState({
            isValid: true
        });
        addData({ type, name });
    };

    invalidInput = (type) => {
        if(type === 'phone') {
            this.phone.style.border = '1px solid #ff2731';
        } else {
            this.input.style.border = '1px solid #ff2731';
        }
        this.setState({
            isValid: false
        });
    };

    validateForm = () => {
        const { name } = this.state;
        const { type } = this.props;
        switch (type) {
            case 'text':
                name ? this.validInput('name', name) : this.invalidInput('name');
                break;
            case 'email':
                emailValidation(name) ? this.validInput('email', name) : this.invalidInput('email');
                break;
            case 'phone':
                phoneValidation(name) ? this.validInput('phone', name) : this.invalidInput('phone');
                break;
            default:
                break;
        }
    };

    onBlur = () => {
        const { name } = this.state;
        if(!name || name.indexOf('_')) {
            this.label.style.transform = 'translateY(20px)';
            this.label.style.transition = 'all 0.5s ease-in-out';
            this.setState({
                active: false
            });
        }
        this.validateForm();
    };

    phoneInput = () => {
        const { active } = this.state;
        const { placeholder } = this.props;
        return (
            <StyledInputMask
                mask="+7 (999) 999 99 99"
                maskChar="_"
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                placeholder={!active ? placeholder : null}
                inputRef={el => this.phone = el}
            />
        );
    };

    renderInput = () => {
        const { name, active } = this.state;
        const { placeholder, type } = this.props;
        if(type === 'phone') {
            return this.phoneInput();
        }
        return (
            <StyledInput
                type={type}
                value={name}
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                placeholder={!active ? placeholder : null}
                ref={el => this.input = el}
            />
        );
    };

    render() {
        const { isValid } = this.state;
        const { placeholder, error } = this.props;
        return (
            <Wrapper>
                <Label ref={el => this.label = el}>{placeholder}</Label>
                {this.renderInput()}
                <Error>{!isValid && error}</Error>
            </Wrapper>
        );
    }
}

export const Input = connect(
    state => ({}),
    dispatch=>({
        addData: data => dispatch(addData(data))
    }),
)(View);


View.propTypes = {
    addData: PropTypes.func.isRequired
};
