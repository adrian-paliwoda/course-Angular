import {
  animate,
  group,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  animations: [
    trigger("divState", [
      state(
        "normal",
        style({
          backgroundColor: "red",
          transform: "transformX(0)",
        })
      ),
      state(
        "highlighted",
        style({
          backgroundColor: "blue",
          transform: "translateX(100px)",
        })
      ),
      transition("normal <=> highlighted", animate(300)),
      // transition('highlighted => normal', animate(800))
    ]),
    trigger("wildState", [
      state(
        "normal",
        style({
          backgroundColor: "red",
          transform: "transformX(0) scale(1)",
        })
      ),
      state(
        "highlighted",
        style({
          backgroundColor: "blue",
          transform: "translateX(100px) scale(1)",
        })
      ),
      state(
        "shrunken",
        style({
          backgroundColor: "green",
          transform: "translateX(0px) scale(0.5)",
        })
      ),
      transition("normal => highlighted", animate(300)),
      transition("highlighted => normal", animate(800)),
      transition("shrunken <=> *", [
        style({
          backgroundColor: "orange",
          borderRadius: "0",
        }),
        animate(
          1000,
          style({
            borderRadius: "50px",
          })
        ),
        animate(500),
      ]),
    ]),
    trigger("list1", [
      state(
        "in",
        style({
          opacity: 1,
          transform: "translateX(0px)",
        })
      ),
      transition("void => *", [
        style({
          opacity: 0,
          transform: "translateX(-100px))",
        }),
        animate(300),
      ]),
      transition("* => void", [
        animate(300),
        style({
          transform: "translateX(100px)",
          opacity: 0,
        }),
      ]),
    ]),
    trigger("list2", [
      state(
        "in",
        style({
          opacity: 1,
          transform: "translateX(0px)",
        })
      ),
      transition("void => *", [
        animate(
          1000,
          keyframes([
            style({
              transform: "translateX(-100px)",
              opacity: 0,
              offset: 0.1,
            }),
            style({
              transform: "translateX(-50px)",
              opacity: 0.5,
              offset: 0.3,
            }),
            style({
              transform: "translateX(-20px)",
              opacity: 1,
              offset: 0.8,
            }),
            style({
              transform: "translateX(0px)",
              opacity: 1,
              offset: 1,
            }),
          ])
        ),
      ]),
      transition("* => void", [
        group([
          animate(300, style({
            color: 'red'
          })),
          animate(800, style({
            transform: 'translateX(100px)',
            opacity: 0
          }))
        ])
      ]),
    ]),
  ],
})
export class AppComponent {
  state = "normal";
  wildState = "normal";
  list = ["Milk", "Sugar", "Bread"];

  animationStarted($event) {
    console.log($event);
  }

  animationDone($event) {
    console.log($event);
  }

  onAdd(item) {
    this.list.push(item);
  }

  onAnimate() {
    this.state === "normal"
      ? (this.state = "highlighted")
      : (this.state = "normal");
    this.wildState === "normal"
      ? (this.wildState = "highlighted")
      : (this.wildState = "normal");
  }

  onShrunken() {
    console.log("Shrunken");

    this.wildState = "shrunken";
  }

  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }
}
