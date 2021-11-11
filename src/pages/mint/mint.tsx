import * as p5 from "p5";
import * as React from "react";
import style from './mint.module.css';
import MintButton from '../../components/mint-button/mint-button';
import RandomFaceSketch from '../../components/p5/random-face/random-face';
import P5Wrapper from '../../components/p5/wrapper';

interface IProps {
}

interface IState {
    sketch: (sketch: p5) => void;
}

export default class MintPage extends React.Component<IProps, IState> {
    private mint = () => {
        this.setState({ sketch: RandomFaceSketch });
    }
    
    private onP5Changed = (p: p5) => {
        // tslint:disable:no-console
        // console.log(p5)
        console.log("Change")
    }
    
    public render() {
        return (
            <div>
                <div className={style.main}>
                    <div className={style.mainItem} > 
                        <P5Wrapper sketch={RandomFaceSketch} onP5Changed={this.onP5Changed}/>
                    </div>
                    <div className={style.mainItem} >
                        <MintButton handleClick={this.mint}/>
                    </div>
                </div>
            </div>
        );
    }
}