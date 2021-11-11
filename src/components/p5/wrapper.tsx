import * as p5 from "p5";
import * as React from "react";
import style from './wrapper.module.css';

export interface IProps {
  sketch: (sketch: p5) => void;
  onP5Changed?: (sketch: p5) => void;
}

export default class P5Wrapper extends React.Component<IProps, {}> {
  public canvas: p5 = new p5.default(() => {}, undefined);
  private wrapper: React.RefObject<HTMLDivElement> = React.createRef();

  public componentDidMount() {
    this.setSketch(this.props);
  }

  public componentDidUpdate(newprops: IProps) {
      console.log("update");
      this.setSketch(newprops);
  }

  public render() {
    return <div ref={this.wrapper} />;
  }

  private setSketch(props: IProps) {
    const current = this.wrapper.current;
    current?.classList.add(style.wrapper);

    if (current) {
      if (current.childNodes[0]) {
        current.removeChild(current.childNodes[0]);
      }

      this.canvas = new p5.default(props.sketch, current);
      
      if (props.onP5Changed) {
        props.onP5Changed(this.canvas);
      }
    }
  }
}