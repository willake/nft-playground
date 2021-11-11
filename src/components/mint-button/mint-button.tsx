import { Component } from 'react';
import style from './mint-button.module.css';

interface IProps {
    handleClick: () => void
}

export default class MintButton extends Component<IProps, {}> {

    render() {
        return <button className={style.button} onClick={this.props.handleClick}>
            Mint
        </button>
    };
}

